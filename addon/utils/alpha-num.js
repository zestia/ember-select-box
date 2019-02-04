const { fromCharCode } = String;
const alphaNumeric = /^[0-9a-z]$/i;

export function isAlphaNumericChar(char) {
  return alphaNumeric.test(char);
}

export function isAlphaNumericKeyCode(keyCode) {
  return isAlphaNumericChar(fromCharCode(keyCode));
}
