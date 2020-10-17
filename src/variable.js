class Variable {
  constructor(data) {
    this.data = data;
  }

  fetch(key) {
    return this.getAttributeValue(key.split("."), this.data, []);
  }
  
  getAttributeValue(path, data, currentPath) {
    if (!path.length) {
      return data;
    } else {
      let current = path.shift();
      currentPath.push(current);

      if (!data.hasOwnProperty(current)) {
        throw `'${currentPath.join(".")}' does not exist in data provided.`;
      }

      return this.getAttributeValue(path, data[current], currentPath);
    }
  }
}

exports.Variable = Variable;
