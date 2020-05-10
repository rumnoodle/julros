const token = require("./token.js");

exports.getParser = function (src, data) {
  return {
    src: src,
    srcLength: src.length,
    data: data,
    index: 0,

    getParsedToken: function () {
      let token = null;

      if (this.src[this.index] === "{") {
        token = this.getJulrosToken();
      } else if (this.src[this.index] !== undefined) {
        token = this.getDefaultToken();
      }

      return token;
    },

    getDefaultToken: function () {
      let startIndex = this.index;

      while (this.src[this.index] !== "{" && this.srcLength > this.index) {
        this.index++;
      }

      return token.makeToken(
        "default",
        this.src.substring(startIndex, this.index)
      );
    },

    getJulrosToken() {
      let startIndex = this.index;
      let parsed = false;
      let stringMode = false;

      while (!parsed && this.srcLength > this.index) {
        this.index++;

        if (this.src[this.index] === "}" && !stringMode) {
          parsed = true;
        } else if (this.src[this.index] === '"') {
          stringMode = !stringMode;
        }
      }
      // to move past closing brace }
      this.index++;

      let tokenString = this.src
        .substring(startIndex + 1, this.index - 1)
        .trim();
      let tokenNameEnd = tokenString.indexOf(" ");

      if (tokenNameEnd !== -1) {
        return token.makeToken(
          tokenString.substring(0, tokenNameEnd),
          tokenString.substring(tokenNameEnd + 1)
        );
      } else {
        return token.makeToken("variable", tokenString);
      }
    },
  };
};
