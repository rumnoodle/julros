const fs = require("fs");
const path = require("path");

getLayout = function (filename) {
  try {
    return fs.readFileSync(filename, "utf8");
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

getViewsFolder = function (filepath, viewspath) {
  const relativeViewsFolder = viewspath.replace(/^\.\//, "");
  const viewsFolder = filepath.substring(
    0,
    filepath.lastIndexOf(relativeViewsFolder) + relativeViewsFolder.length
  );
  return viewsFolder;
};

exports.render = function (filepath, options) {
  const viewsFolder = getViewsFolder(filepath, options.settings.views);
  const layoutsFolder = path.join(viewsFolder, "layouts");
  const layoutFilename = (options.layout || "default") + ".julros";
  const layoutFilepath = path.join(layoutsFolder, layoutFilename);
  const layoutContent = getLayout(layoutFilepath);
  ("");
  const viewContent = fs.readFileSync(filepath, "utf8");
  let content = wrapLayout(layoutContent, viewContent);
  return content;
};

exports.renderFile = function (filepath, options, callback) {
  callback(null, exports.render(filepath, options));
};

exports.__express = exports.renderFile;
