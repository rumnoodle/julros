const variable = require("./variable.js");
const include = require("./include.js");

const pattern = /\{\{ .*? \}\}/;

exports.html = (view, data) => {
  let result = view;
  let value = "";
  let nextItem = "";
  let variableHandler = new variable.Variable(data);
  let includeHandler = new include.Include();

  while(item = pattern.exec(result)) {
    value = "";

    nextItem = item[0].substring(2, item[0].length - 2).trim();
    nextItemComponents = nextItem.split(" ");
    switch(nextItemComponents[0]) {
      case "include":
        value = includeHandler.fetch(nextItemComponents[1]);
        break;
      default:
        value = variableHandler.fetch(nextItemComponents[0]);
        break;
    }

    result = result.replace(pattern, value);
  }

  return result;
}
