// bring in Validator
const Validator = require("validator");
//bring in isEmpty function
const isEmpty = require("./is-empty");

//we want access to this funciton "outside"
module.exports = function validateLoginInput(data) {
  let errors = {};

  //in order to test input using Validator, we must ensure that our test data is a string. and so the code below is a precaution.  we utilize the custom made isEmpty as distinguished from the isEmpty provided by Validator.  This code says the following: "if data.username (data.email, etc) is a string, assign it to the variable data.username (data.email, etc); otherwise, ensure that data.username (data.email, etc) is an empty string by assigning "" to data.username (data.email, etc)""
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  //the assigning of "" to data.username if data.username isn't already a string allows for the following code since Validator requires strings for testing. the same code follows for the other cases (email, etc)
  if (Validator.isEmpty(data.email)) {
    errors.email = "An email must be included!";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Must be a valid email!";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "A password must be included!";
  }

  //end of function: make sure we return an object with all errors
  return {
    errors: errors,
    isValid: isEmpty(errors) //we want to see if it's valid as well. we check to see if it's empty.  Validator has isEmpty but "errors" here is an object so we can't use isEmpty directly.  because of this, we'll create a 'global' method isEmpty into which we can pass in anything.  if everything passes, the errors will be empty at the end and therefore isValid will be "empty" as well according to the code in is-empty.js -- meditate on this
  };
};
