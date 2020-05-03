const file = require("./file.js");

let viewData = {};

resolveVariable = function (name) {
  let scope = viewData;
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
  };
  tokenString = "";
  tokenFound = false;
  insideToken = false;

  while (!tokenFound && !tokenData.eof) {
    if (!insideToken) {
      if (src.content[src.index] !== "{") {
        tokenData.preTokenString += src.content[src.index];
      } else {
        insideToken = true;
      }
    } else {
      if (src.content[src.index] !== "}") {
        tokenString += src.content[src.index];
      } else {
        tokenString = tokenString.trim();

        if (tokenString.match(/^include/)) {
          tokenData.token = "include";
          tokenData.value = tokenString.substr(7).trim();
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

// Technically parse does not need to be exported but to work with rewire do it for now
exports.parse = function (src, view) {
  tokenData = { eof: false };

  while (!tokenData.eof) {
    tokenData = parseToNextToken(src);
    view += tokenData.preTokenString;

    if (tokenData.token && tokenData.token === "include") {
      console.log("found partial");
      let partialsPath = file.getPartialsPath(
        viewData.viewFolder,
        tokenData.value
      );
      let partialContents = file.getFileContents(partialsPath);
      console.log(partialContents);
      view += partialContents;
    } else if (tokenData.token) {
      let variableValue = resolveVariable(tokenData.token);

      if (variableValue) {
        view += variableValue;
      }
    }
  }

  return view;
};

exports.build = function (content, data) {
  viewData = data;
  return exports.parse({ content: content, index: 0, eof: false }, "");
};
