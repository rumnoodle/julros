exports.getToken = function (value) {
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

  validate = function () {
    return true;
  };

  return {
    type: "variable",
    valid: validate(),
    getValue: function (data) {
      return resolveVariable(value, data) || "";
    },
  };
};
