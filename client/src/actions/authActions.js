import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";

//Register A User
//1. we want to register a user.  we use an Action Creator below
//2. history is necessary because we want to
//redirect from within this action. see Register.js
//(this.props.registerUser(newUser, this.props.history))
//when in a component we can redirect with this.props.history.push("/desiredLocation")
//but we can't do that in this action
//3. we are retreiving data from the backend asynchronously, waiting for data retrieval occurs
//and so the Thunk Middleware can be used. we'll add "dispatch" after the 1st arrow function
//we do this instead of putting the dispatch function INSIDE the registerUser func
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/userAuth/register", userData)
    .then(res => history.push("/login")) //new registered users get redirected to /login
    .catch(err =>
      //since we can't use this.setState (we're not in component) to set errors here
      //and since we're within an  asynchronous call to
      //retrieve data from backend, we use Thunk (dispatch)--
      //we can't simply use "return" since we're making an async call
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//login user (get user token and store it locally)
export const loginUser = userData => dispatch => {
  axios
    .post("/api/userAuth/login", userData)
    .then(res => {
      //we save the res/token in Local Storage
      //use destructuring to PULL the token from res.data
      const { token } = res.data;
      //set token to Local Storage. local storage only stores strings
      localStorage.setItem("jwtToken", token);
      //set the token as Authorization Header
      //we created this function in a separate file
      setAuthToken(token);
      //get jwt decode. decode token. get user
      const decoded = jwt_decode(token);
      //we then set the current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set logged in user/dispatch to Reducer
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//logout a user
export const logoutUser = () => dispatch => {
  //first remove token from local storage
  localStorage.removeItem("jwtToken");
  //then remove Authorization header for further requests
  //see: "../utils/setAuthToken"
  setAuthToken(false);
  //then set current user to empty object {}
  //see setCurrentUser above--we call it with an empty object as argument
  //this will set isAuthenticated to false (see authReducer)
  dispatch(setCurrentUser({}));
};
