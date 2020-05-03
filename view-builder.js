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
        tokenData.token += src.content[src.index];
      } else {
        tokenData.token = tokenData.token.trim();
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

parse = function (src, view) {
  tokenData = { eof: false };

  while (!tokenData.eof) {
    tokenData = parseToNextToken(src);
    view += tokenData.preTokenString;

    if (tokenData.token) {
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
  return parse({ content: content, index: 0, eof: false }, "");
};
