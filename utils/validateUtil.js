export function validateEmail(email) {
  var regExp = /\S+@\S+\.\S+/;
  return regExp.test(email);
}
