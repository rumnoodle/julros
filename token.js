const defaultToken = require("./tokens/default-token.js");
const literalToken = require("./tokens/literal-token.js");
const collectionToken = require("./tokens/collection-token.js");
const includeToken = require("./tokens/include-token.js");
const variableToken = require("./tokens/variable-token.js");

exports.makeToken = function (type, value) {
  let token = null;

  switch (type) {
    case "default":
      token = defaultToken.getToken(value);
      break;
    case "literal":
      token = literalToken.getToken(value);
      break;
    case "collection":
      token = collectionToken.getToken(value);
      break;
    case "include":
      token = includeToken.getToken(value);
      break;
    case "variable":
      token = variableToken.getToken(value);
      break;
  }

  return token;
};
