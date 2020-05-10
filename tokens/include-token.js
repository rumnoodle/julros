const file = require("../file.js");

exports.getToken = function (value) {
  if (value.indexOf('"') === 0) {
    value = value.substring(1, value.length - 1);
  }

  validate = function () {
    return file.fileExists(value);
  };

  return {
    type: "include",
    valid: validate(),
    getValue: function () {
      return this.valid && file.getFileContents(value);
    },
  };
};
