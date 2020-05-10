const file = require("./file.js");
const parser = require("./parser.js");

exports.parse = function (content, data) {
  const p = parser.getParser(content, data);
  let view = "";

  while ((token = p.getParsedToken())) {
    if (token.type === "include" && token.valid) {
      view += exports.parse(token.getValue(), data);
    } else if (token.type === "collection" && token.valid) {
      let collectionToken = token;
      const contentTemplate = collectionToken.getContentTemplate();
      const collection = collectionToken.getCollection(data);
      if (collection && typeof collection[Symbol.iterator] === "function") {
        view += collectionToken.getContainerStartTag();
        for (item of collection) {
          view += exports.parse(contentTemplate, { item: item });
        }
        view += collectionToken.getContainerEndTag();
      }
    } else if (token.valid) {
      view += token.getValue(data);
    } else {
      view += `{INVALID TOKEN: ${token.type}}`;
    }
  }

  return view;
};

exports.build = function (content, data) {
  return exports.parse(content, data);
};
