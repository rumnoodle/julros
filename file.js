const fs = require("fs");
const path = require("path");

exports.getFileContents = function (fileName) {
  try {
    return fs.readFileSync(fileName, "utf8");
  } catch (err) {
    return "";
  }
};

exports.getViewsFolder = function (filePath, viewsPath) {
  const relativeViewsFolder = viewsPath.replace(/^\.\//, "");
  const viewsFolder = filePath.substring(
    0,
    filePath.lastIndexOf(relativeViewsFolder) + relativeViewsFolder.length
  );
  return viewsFolder;
};

exports.getLayoutFilePath = function (viewsFolder, layoutName) {
  const layoutsFolder = path.join(viewsFolder, "layouts");
  const layoutFileName = (layoutName || "default") + ".julros";
  const layoutFilePath = path.join(layoutsFolder, layoutFileName);
  return layoutFilePath;
};
