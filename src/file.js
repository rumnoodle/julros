const fs = require("fs");
const path = require("path");

let viewPath = null;

function fetch(path) {
  if (!viewPath) {
    setViewPath();
  }
  
  try {
    let fileContent = fs.readFileSync(`${viewPath}/${path}.julros`, { encoding: "utf8" });
    return fileContent;
  } catch (err) {
    if (err.code === "ENOENT") {
      throw `Template '${path}' not found.`;
    }
  }

  throw `Unexpected error when fetching template '${path}'.`;
}

function setViewPath() {
  const fileNamePath = path.dirname(require.main.filename).split("/node_modules")[0];
  const mainModulePath = path.dirname(process.mainModule.filename).split("/node_modules")[0];

  viewPath = fileNamePath.length < mainModulePath ? fileNamePath : mainModulePath;

  if (fs.existsSync(`${viewPath}/src/views`)) {
    viewPath += "/src/views";
  } else if (fs.existsSync(`${viewPath}/views`)) {
    viewPath += "/views";
  } else {
    throw "No views folder found.";
  }
}

exports.fetch = fetch;
