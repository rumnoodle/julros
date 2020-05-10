exports.getToken = function (value) {
  validate = function () {
    return true;
  };

  return {
    type: "default",
    valid: validate(),
    getValue: function () {
      return value;
    },
  };
};
