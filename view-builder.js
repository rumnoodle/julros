let viewData = {};

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
      view += viewData[tokenData.token];
    }
  }

  return view;
};

exports.build = function (content, data) {
  viewData = data;
  return parse({ content: content, index: 0, eof: false }, "");
};
