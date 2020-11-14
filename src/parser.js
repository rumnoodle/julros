const variable = require("./variable.js");
const include = require("./include.js");
const conditional = require("./conditional.js");
const loop = require("./loop.js");

// If possible keep pattern this simple, only to search for next occurrence until all have been replaced.
const pattern = /\{\{ .*? \}\}/;

exports.run = (view, data) => {
  let result = view;
  let value = "";
  let nextItem = "";
  let variableHandler = new variable.Variable(data);
  let includeHandler = new include.Include();
  let conditionalHandler = new conditional.Conditional();
  let loopHandler = new loop.Loop();

  while(item = pattern.exec(result)) {
    value = "";

    nextItem = item[0].substring(2, item[0].length - 2).trim();
    nextItemComponents = nextItem.split(" ");
    switch(nextItemComponents[0]) {
      case "include":
        value = includeHandler.fetch(nextItemComponents[1]);
        break;
      case "if":
        condition = variableHandler.fetch(nextItemComponents[1]);
        value = conditionalHandler.checkIf(
          condition,
          nextItemComponents[2],
          nextItemComponents[3] || undefined
        );
        break;
      case "loop":
        items = variableHandler.fetch(nextItemComponents[2]);
        value = loopHandler.run(nextItemComponents[1], items);
        break;
      default:
        value = variableHandler.fetch(nextItemComponents[0]);
        break;
    }

    result = result.replace(pattern, value);
  }

  return result;
}
