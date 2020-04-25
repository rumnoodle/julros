exports.render = function (options, callback) {
  console.log(options);
  console.log(callback);
  return "<h1>Just testing</h1>";
};

exports.renderFile = function (path, options, callback) {
  callback(null, exports.render(options, callback));
};

exports.__express = exports.renderFile;
