//this function checks for an empty object, an "empty" string, an "undefined", and for a null.  it returns true or false
//we need it because using Validator requires strings but we want to test the errors object (register.js)
function isEmpty(value) {
  return (
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0) ||
    value === null ||
    value === undefined
  );
}

//export this so that it's useable
module.exports = isEmpty;
