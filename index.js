const fs = require("fs");
const path = require("path");

getFileContents = function (fileName) {
  try {
    return fs.readFileSync(fileName, "utf8");
  } catch (err) {
    return "";
  }
};

wrapLayout = function (layout, view) {
  const viewRegex = /\{\s*view\s*\}/;
  if (layout) {
    if (layout.match(viewRegex)) {
      return layout.replace(viewRegex, view);
    }
  }
  return view;
};

replaceVariables = function (view, input) {
  const templateVars = view.matchAll(/\{\s*([^\s\{\}]+)\s*\}/g);
  for (const variable of templateVars) {
    if (input[variable[1]]) {
      view = view.replace(variable[0], input[variable[1]]);
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

exports.render = function (viewFilePath, options) {
  const viewsFolder = getViewsFolder(viewFilePath, options.settings.views);
  const layoutFilePath = getLayoutFilePath(viewsFolder, options.layout);

  const viewContent = getFileContents(viewFilePath);
  const layoutContent = getFileContents(layoutFilePath);

  let content = wrapLayout(layoutContent, viewContent);
  return content;
};

exports.renderFile = function (viewFilePath, options, callback) {
  callback(null, exports.render(viewFilePath, options));
};

exports.__express = exports.renderFile;
