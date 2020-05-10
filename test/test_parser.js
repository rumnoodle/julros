const assert = require("chai").assert;
const parser = require("../parser.js");

describe("Test parser", () => {
  it("should return null on empty source", () => {
    const p = parser.getParser("", {});

    assert.isNull(p.getParsedToken());
  });

  it("should return plain html as is", () => {
    const input = "<p>plain html</p>";
    const p = parser.getParser(input, {});

    assert.equal(p.getParsedToken().getValue(), input);
  });

  it("should return html up until julros tag as is", () => {
    const input = "<p>plain html { variable }</p>";
    const p = parser.getParser(input, {});

    assert.equal(p.getParsedToken().getValue(), "<p>plain html ");
  });

  it("should return literal token when parsed a literal julros tag", () => {
    const input = '<p>plain html { literal "add this content" }</p>';
    const p = parser.getParser(input, {});
    p.getParsedToken();
    const literalToken = p.getParsedToken();

    assert.equal(literalToken.type, "literal");
  });

  it("should return collection token when parsed a collection julros tag", () => {
    const input =
      '<p>plain html { collection "ul", "<li>{item}</li>", coll }</p>';
    const p = parser.getParser(input, { coll: [1, 2] });
    p.getParsedToken();
    const literalToken = p.getParsedToken();

    assert.equal(literalToken.type, "collection");
  });

  it("should return include token when parsed a include julros tag", () => {
    const input = '<p>plain html { include "/path/to/file.julros" }</p>';
    const p = parser.getParser(input, {});
    p.getParsedToken();
    const literalToken = p.getParsedToken();

    assert.equal(literalToken.type, "include");
  });

  it("should return variable token when no julros keyword passed", () => {
    const input = "<p>plain html { variableName }</p>";
    const p = parser.getParser(input, {});
    p.getParsedToken();
    const literalToken = p.getParsedToken();

    assert.equal(literalToken.type, "variable");
  });
});
