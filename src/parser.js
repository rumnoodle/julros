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
        value = variableHandler.fetch(item[0]);
        break;
    }

    result = result.replace(pattern, value);
  }

  return result;
}
