const fs = require("fs");
const path = require("path");

let viewPath = null;

function fetch(path) {
  if (fs.existsSync(path)) {
    return getFile(path);
  } else {
    if (!viewPath) {
      setViewPath();
    }
    return getFile(`${viewPath}/${path}.julros`);
  }
  
  throw `Unexpected error when fetching template '${path}'.`;
}

function getFile(fileName) {
  try {
    let fileContent = fs.readFileSync(fileName, { encoding: "utf8" });
    return fileContent.replace(/\n$/, "");
  } catch (err) {
    if (err.code === "ENOENT") {
      throw `Template '${fileName}' not found.`;
    }
  }
}

function setViewPath() {
  try {
    const fileNamePath = path.dirname(require.main.filename).split("/node_modules")[0];
    const mainModulePath = path.dirname(process.mainModule.filename).split("/node_modules")[0];

    viewPath = fileNamePath.length < mainModulePath ? fileNamePath : mainModulePath;
  } catch {
    viewPath = __dirname.split("/node_modules")[0];
  }

  if (fs.existsSync(`${viewPath}/src/views`)) {
    viewPath += "/src/views";
  } else if (fs.existsSync(`${viewPath}/views`)) {
    viewPath += "/views";
  } else {
    throw "No views folder found.";
  }
}

exports.fetch = fetch;
