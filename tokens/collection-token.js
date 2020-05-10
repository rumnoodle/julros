exports.getToken = function (value) {
  let containerTag = undefined;
  let parsedContainerTag = false;
  let content = undefined;
  let parsedContent = false;
  let collection = undefined;
  let index = 0;
  let stringMode = false;

  while (!parsedContainerTag && index < value.length) {
    if (value[index] === '"') {
      stringMode = !stringMode;
    }

    if (!stringMode && value[index] === ",") {
      parsedContainerTag = true;
      if (value.indexOf('"') === 0) {
        containerTag = value.substring(1, index - 1);
      } else {
        containerTag = value.substring(0, index);
      }

      if (containerTag.indexOf("<") === 0) {
        containerTag = containerTag.substring(1, containerTag.length - 1);
      }
    }

    index++;
  }

  let startIndex = index;
  while (!parsedContent && index < value.length) {
    if (value[index] === '"') {
      stringMode = !stringMode;
    }

    if (!stringMode && value[index] === ",") {
      parsedContent = true;
      content = value.substring(startIndex, index).trim();

      if (content.indexOf('"') === 0) {
        content = content.substring(1, content.length - 1);
      }
    }

    index++;
  }

  collection = value.substring(index).trim();

  resolveVariable = function (name, data) {
    let scope = data;
    let nameParts = name.split(".");

    for (const part of nameParts) {
      if (scope[part] === undefined) {
        return undefined;
      }

      scope = scope[part];
    }

    return scope;
  };

  validate = function () {
    return (
      containerTag !== undefined &&
      content !== undefined &&
      collection !== undefined &&
      containerTag.search(/^[a-z-]*$/) !== -1 &&
      collection.search(/^[a-z0-9\.]+$/) !== -1
    );
  };

  return {
    type: "collection",
    valid: validate(),
    getValue: function () {
      return value;
    },
    getContainerStartTag: function () {
      return this.valid && `<${containerTag}>`;
    },
    getContainerEndTag: function () {
      return this.valid && `</${containerTag}>`;
    },
    getContentTemplate: function () {
      return this.valid && content;
    },
    getCollection: function (data) {
      return this.valid && resolveVariable(collection, data);
    },
  };
};
