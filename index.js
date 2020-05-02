const fs = require("fs");
const path = require("path");

getLayout = function (fileName) {
  try {
    return fs.readFileSync(fileName, "utf8");
  } catch (err) {
    return "";
  }
};

wrapLayout = function (layout, view) {
  const viewRegex = /\{\{\s*view\s*\}\}/;
  if (layout) {
    if (layout.match(viewRegex)) {
      return layout.replace(viewRegex, view);
    }
  }
  return view;
};

getViewsFolder = function (filePath, viewsPath) {
  const relativeViewsFolder = viewsPath.replace(/^\.\//, "");
  const viewsFolder = filePath.substring(
    0,
    filePath.lastIndexOf(relativeViewsFolder) + relativeViewsFolder.length
  );
  return viewsFolder;
};

getLayoutFilePath = function (viewsFolder, layoutName) {
  const layoutsFolder = path.join(viewsFolder, "layouts");
  const layoutFileName = (layoutName || "default") + ".julros";
  const layoutFilePath = path.join(layoutsFolder, layoutFileName);
  return layoutFilePath;
};

exports.render = function (filePath, options) {
  const viewsFolder = getViewsFolder(filePath, options.settings.views);
  const viewContent = fs.readFileSync(filePath, "utf8");
  const layoutFilePath = getLayoutFilePath(viewsFolder, options.layout);
  const layoutContent = getLayout(layoutFilePath);
  let content = wrapLayout(layoutContent, viewContent);
  return content;
};

exports.renderFile = function (filePath, options, callback) {
  callback(null, exports.render(filePath, options));
};

exports.__express = exports.renderFile;
