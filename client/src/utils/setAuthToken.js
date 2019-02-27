//we'll use axios to set default headers
//if we didn't, we'd have to manually make sure
//that we have the Authorization attached to each header
import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //we apply the token to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //we'll delete the auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
