let viewData = {};

exports.build = function (src, data) {
  viewData = data;
  view = src.replace("{ variable }", "variable value");
  return view;
};
