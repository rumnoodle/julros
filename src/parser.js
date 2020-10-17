const variable = require("./variable.js");

const pattern = /\{\{ .*? \}\}/;

exports.html = (view, data) => {
  let result = view;
  let value = "";
  let variableHandler = new variable.Variable(data);

  while(item = pattern.exec(result)) {
    switch(item[0]) {
      case "doh":
        break;
      default:
        value = variableHandler.fetch(item[0].substring(2, item[0].length - 2).trim());
        break;
    }

    result = result.replace(pattern, value);
  }

  return result;
}
