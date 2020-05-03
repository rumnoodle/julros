const viewBuilder = require("./view-builder.js");
const file = require("./file.js");

wrapLayout = function (layout, view) {
  const viewRegex = /\{\s*view\s*\}/;
  if (layout) {
    if (layout.match(viewRegex)) {
      return layout.replace(viewRegex, view);
    }
  }
  return view;
};

exports.render = function (viewFilePath, options) {
  const viewsFolder = file.getViewsFolder(viewFilePath, options.settings.views);
  const layoutFilePath = file.getLayoutFilePath(viewsFolder, options.layout);

  const viewContent = file.getFileContents(viewFilePath);
  const layoutContent = file.getFileContents(layoutFilePath);

  let content = wrapLayout(layoutContent, viewContent);
  return viewBuilder.build(content, options);
};

exports.renderFile = function (viewFilePath, options, callback) {
  callback(null, exports.render(viewFilePath, options));
};

exports.__express = exports.renderFile;
