const pattern = /\{\{ .*? \}\}/;

function getAttributeValue(path, data) {
  if (!path.length) {
    return data;
  } else {
    let current = path.shift();
    return getAttributeValue(path, data[current]);
  }
}

exports.html = (view, data) => {
  let result = view;
  while(item = pattern.exec(result)) {
    let value = getAttributeValue(item[0].substring(2, item[0].length - 2).trim().split("."), data);
    result = result.replace(pattern, value);
  }

  return result;
}
