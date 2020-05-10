exports.getToken = function (value) {
  let literalVariable = false;
  if (value.indexOf('"') === 0) {
    value = value.substring(1, value.length - 1);
  } else {
    literalVariable = true;
  }

  resolveVariable = function (name, data) {
    let scope = data;
    let nameParts = name.split(".");

    for (const part of nameParts) {
      if (scope[part] === undefined) {
        return undefined;
      }

      scope = scope[part];
    }

    return scope;
  };

  isLiteralVariable = function () {
    return literalVariable;
  };

  validate = function () {
    return true;
  };

  return {
    type: "literal",
    valid: validate(),
    getValue: function (data) {
      return isLiteralVariable() ? resolveVariable(value, data) : value;
    },
  };
};
