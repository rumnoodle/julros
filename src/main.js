const file = require('./file.js');
const parser = require('./parser.js');

exports.html = (viewPath, data, layoutPath = undefined) => {
  let viewContents = file.fetch(viewPath);

  if (layoutPath) {
    viewContents = layoutHandler.wrap(layoutPath, viewContents);
  }

  return parser.run(viewContents, data);
}
