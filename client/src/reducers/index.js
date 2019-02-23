//this is our "root reducer".  we bring all reducers here
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

//when we access any of these Reducers later, we'll use the syntax "this.props.auth" etc
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
