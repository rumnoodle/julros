const assert = require("chai").assert;
const collectionToken = require("../tokens/collection-token.js");

describe("Test collection token", () => {
  it("should parse valid token into its parts", () => {
    const value = '"<ul>", "<li>{item}</li>", collection';
    assert.equal(collectionToken.getToken(value).valid, true);
  });

  it("should ignore empty container tag", () => {
    const value = '"", "<li>{item}</li>", collection';
    assert.equal(collectionToken.getToken(value).valid, true);
  });

  it("should invalidate token if invalid container tag", () => {
    const value = '"30", "<li>{item}</li>", collection';
    assert.equal(collectionToken.getToken(value).valid, false);
  });

  it("should be valid collection token if empty content tag", () => {
    const value = '"ul", "", collection';
    assert.equal(collectionToken.getToken(value).valid, true);
  });

  it("should invalidate if collection is impossible variable name", () => {
    const value = '"ul", "<li>{item}</li>", collection$';
    assert.equal(collectionToken.getToken(value).valid, false);
  });

  it("should invalidate if collection is missing", () => {
    const value = '"ul", "<li>{item}</li>"';
    assert.equal(collectionToken.getToken(value).valid, false);
  });

  it("should invalidate if empty collection tag", () => {
    const value = "";
    assert.equal(collectionToken.getToken(value).valid, false);
  });

  it("should handle crazy formatting of collection token", () => {
    const value = '"<ul>" and "<ol>", "<li>{item}</li>", collection';
    const token = collectionToken.getToken(value);
    assert.equal(token.valid, false);
  });

  it("should be possible to get parts of valid token", () => {
    const value = '"<ul>", "<li>{item}</li>", collection';
    const token = collectionToken.getToken(value);
    assert.equal(token.getContainerStartTag(), "<ul>");
    assert.equal(token.getContentTemplate(), "<li>{item}</li>");
    // assert.equal(token.getCollection(), []);
    assert.equal(token.getContainerEndTag(), "</ul>");
  });
});
