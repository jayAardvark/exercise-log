import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
//note: the route whence we're importing is simply "./reducers" instead of "./reducers/index"
//we can do this because we called our rootReducer "index.js" and so "index.js" is unnecessary below
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

//temporary to prevent app malfunction
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    //below is from redux dev tool documentation
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
