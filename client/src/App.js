import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FilterLog from "./components/FilterLog";
import Welcome from "./components/Welcome";
import ReturnUser from "./components/ReturnUser";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AddLog from "./components/logComponents/AddLog";
import SeeLogs from "./components/logComponents/SeeLogs";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
//Provider will provide the store
import { Provider } from "react-redux";
import store from "./store";
import classnames from "classnames";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

//we'll check for token. writing this here checks for every page request
//essentially, this checks if user is logged in and prevents state
//from being cleared upon refresh.
//we set auth header
//we decode token and get data
//we set call the setCurrentUser action to set user and to set isAuthenticated
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  //call action
  store.dispatch(setCurrentUser(decoded));

  //we also check for an expired token
  //compare in milliseconds
  const timeNow = Date.now() / 1000;
  if (decoded.exp < timeNow) {
    //call logoutUser action
    store.dispatch(logoutUser());
    //we'll also clear the current profile

    //after user is logged out, we redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: undefined,
      username: undefined,
      allLogs: [],
      filteredLog: [],
      duration: undefined,
      date: undefined
    };
  }

  onClickLogout(e) {
    e.preventDefault();
    store.dispatch(logoutUser());
  }

  // filterLog = async e => {
  //   e.preventDefault();

  //   if (this.state.userId) {
  //     let userId = this.state.userId;
  //     let from = e.target.from.value;
  //     let to = e.target.to.value;

  //     const res = await axios.get(
  //       `/api/exercise/filter-log?userId=${userId}&from=${from}&to=${to}`
  //     );
  //     const { data } = await res;
  //     this.setState({
  //       filteredLog: data.filteredLog
  //     });
  //   } else return;
  // };

  render() {
    //if user isn't logged in, user classnames to assign different classNames
    //for different screen render
    let notLoggedIn;
    if (localStorage.jwtToken) {
      console.log("token in storage");
      notLoggedIn = false;
    } else {
      notLoggedIn = true;
    }

    return (
      <Provider store={store}>
        <Router>
          {/* <div className="App"> */}
          <div
            className={classnames("App", {
              "App-no-auth": notLoggedIn
            })}
          >
            <div className="title bg-success">JogLog</div>
            <Navbar className="navbar" />
            <div className="main-render">
              <Route exact path="/" component={Welcome} />
              <Route exact path="/return-user" component={ReturnUser} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/addLog" component={AddLog} />
              <Route exact path="/seeLogs" component={SeeLogs} />
            </div>
            {notLoggedIn ? null : (
              <div className="mobile-buttons">
                <Link className="btn btn-primary mob-btns m-1 p-4" to="/addLog">
                  add log
                </Link>

                <Link
                  className="btn btn-primary mob-btns m-1 p-4"
                  to="/seeLogs"
                >
                  see logs
                </Link>

                <button
                  className="btn btn-secondary mob-btns m-1"
                  onClick={this.onClickLogout.bind(this)}
                >
                  sign out
                </button>
              </div>
            )}
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
