
export default function isMandatoryTextValid(text) {
  let onlyWhitespace = /^\s*$/;
  let isEmpty = onlyWhitespace.test(text);
  let isValid = text.length != 0 && !isEmpty;
  console.log("return from isMandatoryTextValid="+isValid);
  return isValid;
}