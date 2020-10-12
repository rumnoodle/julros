const pattern = /\{\{ .*? \}\}/;

exports.html = (view) => {
  while(item = pattern.exec(view)) {
    // do something
  }

  return "";
}
