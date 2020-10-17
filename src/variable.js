class Variable {
  constructor(data) {
    this.data = data;
  }

  fetch(key) {
    return this.getAttributeValue(
      item[0].substring(2, item[0].length - 2).trim().split("."),
      this.data
    );
  }
  
  getAttributeValue(path, data) {
    if (!path.length) {
      return data;
    } else {
      let current = path.shift();
      return this.getAttributeValue(path, data[current]);
    }
  }
}

exports.Variable = Variable;
