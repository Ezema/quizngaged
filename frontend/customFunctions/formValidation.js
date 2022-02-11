// encapsulates common validations for UI elements
// in a way that is independent of the React framework to
// permit easy unit testing

function isValidMandatoryText(text) {
  let emptyRegExp = /^\s*$/;
  return !(text == undefined
    || text.length == 0
    || emptyRegExp.test(text));
}

module.exports.isValidMandatoryText = isValidMandatoryText;

function isValidNonEmptyArray(array) {
  return array != undefined 
      && Array.isArray(array)
      && array.length != 0;
}

module.exports.isValidNonEmptyArray = isValidNonEmptyArray;

