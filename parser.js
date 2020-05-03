handleToken = function (token) {
  console.log(viewData);
  return token.toUpperCase();
};

let viewData = {};

exports.parse = function (str, data) {
  viewData = data;
  let parsedToken = "";
  let parsingToken = false;
  let parsedString = "";

  for (let i = 0; i < str.length; i++) {
    if (!parsingToken) {
      if (str[i] !== "{") {
        parsedString += str[i];
      } else {
        parsingToken = true;
      }
    } else {
      if (str[i] !== "}") {
        parsedToken += str[i];
      } else {
        parsedToken = parsedToken.trim();
        parsedString += handleToken(parsedToken);
        parsingToken = false;
      }
    }
  }

  return parsedString;
};
