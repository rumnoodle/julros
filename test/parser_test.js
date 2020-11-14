const assert = require("chai").assert;
const parser = require("../src/parser.js");

describe("Test parser", () => {
  it("should return empty run when content is empty", () => {
    const result = parser.run("");
    assert.equal("", result);
  });

  it("should return content as is if there isn't anything to replace", () => {
    const content = "<p>Content should be returned as is";
    const result = parser.run(content);
    assert.equal(result, content);
  });

  it("should replace variable with its contents", () => {
    const content = "<p>Violets are {{ violet }}</p>";
    const result = parser.run(content, { violet: "blue" });
    assert.equal(result, "<p>Violets are blue</p>");
  });

  it("should replace nested variable with its contents", () => {
    const content = "<p>Paradise is {{ here.now }}</p>";
    const result = parser.run(content, { here: { now: "a basket of flowers" } });
    assert.equal(result, "<p>Paradise is a basket of flowers</p>");
  });

  it("should handle multiple variables", () => {
    const content = "<p>{{ ten }} {{ acious }}</p>";
    const result = parser.run(content, { ten: "A complete", acious: "sentence" });
    assert.equal(result, "<p>A complete sentence</p>");
  });
});
