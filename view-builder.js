const file = require("./file.js");

resolveVariable = function (name, data) {
  let scope = data;
  let nameParts = name.split(".");

  for (const part of nameParts) {
    if (scope[part] === undefined) {
      return undefined;
    }

    scope = scope[part];
  }

  return scope;
};

parseToNextToken = function (src) {
  tokenData = {
    eof: false,
    preTokenString: "",
    token: "",
    value: "",
  };
  tokenString = "";
  tokenFound = false;
  insideToken = false;
  insideTokenString = false;

  while (!tokenFound && !tokenData.eof) {
    if (!insideToken) {
      if (src.content[src.index] !== "{") {
        tokenData.preTokenString += src.content[src.index];
      } else {
        insideToken = true;
      }
    } else {
      if (src.content[src.index] === '"' && !insideTokenString) {
        tokenString += src.content[src.index];
        insideTokenString = true;
      } else if (insideTokenString && src.content[src.index] !== '"') {
        tokenString += src.content[src.index];
      } else if (insideTokenString && src.content[src.index] === '"') {
        tokenString += src.content[src.index];
        insideTokenString = false;
      } else if (src.content[src.index] !== "}") {
        tokenString += src.content[src.index];
      } else {
        tokenString = tokenString.trim();

        if (tokenString.match(/^include/)) {
          tokenData.token = "include";
          tokenData.value = tokenString.substr(7).trim();
        } else if (tokenString.match(/^literal/)) {
          tokenData.value = tokenString.substr(7).trim();
          if (!tokenData.value.match(/^"/)) {
            tokenData.token = "literal-variable";
          } else {
            tokenData.value = tokenData.value.substr(
              1,
              tokenData.value.length - 2
            );
            tokenData.token = "literal";
          }
        } else if (tokenString.match(/^collection/)) {
          tokenData.token = "collection";
          let values = tokenString.substr(10).split(",");
          values = values.map((value) =>
            value.match(/^"/) ? value.substr(1, value.length - 2) : value.trim()
          );
          tokenData.value = values;
        } else {
          tokenData.token = tokenString;
        }

        insideToken = false;
        tokenFound = true;
      }
    }

    src.index++;
    if (src.index === src.content.length) {
      tokenData.eof = true;
    }
  }

  return tokenData;
};

// Parse does not need to be exported but to work with rewire do it for now
exports.parse = function (src, data) {
  let tokenData = { eof: false };
  let view = "";

  while (!tokenData.eof) {
    tokenData = parseToNextToken(src);
    view += tokenData.preTokenString;

    if (tokenData.token && tokenData.token === "include") {
      let partialsPath = file.getPartialsPath(
        data.viewsFolder,
        tokenData.value
      );
      let partialContents = {
        content: file.getFileContents(partialsPath),
        index: 0,
      };
      view += exports.parse(partialContents, data);
    } else if (tokenData.token && tokenData.token === "literal") {
      view += tokenData.value;
    } else if (tokenData.token && tokenData.token === "literal-variable") {
      let variableValue = resolveVariable(tokenData.value, data);

      if (variableValue) {
        view += variableValue;
      }
    } else if (tokenData.token && tokenData.token === "collection") {
      [tag, content, variable] = tokenData.value;
      if (content.match(/^"/)) {
        content = content.substr(1, content.length - 2);
      }
      let collection = resolveVariable(variable, data);

      let collectionContent = "";
      if (collection && typeof collection[Symbol.iterator] === "function") {
        for (const item of collection) {
          collectionContent += exports.parse(
            { content: content, index: 0 },
            { item: item }
          );
        }

        if (collectionContent) {
          let tagName = tag;
          if (tagName.match(/^"/)) {
            tagName = tagName.substr(1, tagName.length - 2);
          }
          if (tagName.match(/^\</)) {
            tagName = tagName.substr(1, tagName.length - 2);
          }

          view += `<${tagName}>${collectionContent}</${tagName}>`;
        }
      }
    } else if (tokenData.token) {
      let variableValue = resolveVariable(tokenData.token, data);

      if (variableValue) {
        view += variableValue;
      }
    }
  }

  return view;
};

exports.build = function (content, data) {
  return exports.parse({ content: content, index: 0 }, data);
};
