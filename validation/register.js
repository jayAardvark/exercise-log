// bring in Validator
const Validator = require("validator");
//bring in isEmpty function
const isEmpty = require("./is-empty");

//we want access to this funciton "outside"
module.exports = function validateRegisterInput(data) {
  let errors = {};

  //in order to test input using Validator, we must ensure that our test data is a string. and so the code below is a precaution.  we utilize the custom made isEmpty as distinguished from the isEmpty provided by Validator.  This code says the following: "if data.name (data.email, etc) is a string, assign it to the variable data.name (data.email, etc); otherwise, ensure that data.name (data.email, etc) is an empty string by assigning "" to data.name (data.email, etc)"
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : ""; //password2 is a "confirmation" password

  //the assigning of "" to data.name if data.name isn't already a string allows for the following code since Validator requires strings for testing. the same code follows for the other cases (email, etc)
  //code to validate name length
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters long!";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "A name must be included!";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "An email must be included!";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Must be a valid email!";
  }
  //validate password length
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters long!";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "A password must be included!";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Must confirm password!";
  }
  //ensure that confirmation password matches the password
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "The passwords don't match!";
  }

  //end of function: make sure we return an object with all errors
  return {
    errors: errors,
    isValid: isEmpty(errors) //we want to see if it's valid as well. we check to see if it's empty.  Validator has isEmpty but "errors" here is an object so we can't use isEmpty directly.  because of this, we'll create a 'global' method isEmpty into which we can pass in anything.  if everything passes, the errors will be empty at the end and therefore isValid will be "empty" as well according to the code in is-empty.js
  };
};
