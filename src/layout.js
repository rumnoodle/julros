const file = require('./file.js');

exports.wrap = (layoutPath, viewContents) => {
  let content = file.fetch(layoutPath);
  return content.replace("{{ page }}", viewContents);
}
