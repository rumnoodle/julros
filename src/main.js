const file = require('./file.js');
const parser = require('./parser.js');
const layout = require('./layout.js');

exports.html = (viewPath, data, layoutPath = undefined) => {
  let viewContents = file.fetch(viewPath);

  if (layoutPath) {
    viewContents = layout.wrap(layoutPath, viewContents);
  }

  return parser.run(viewContents, data);
}
