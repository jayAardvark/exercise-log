import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddName from "./components/AddName";
import AddJogLog from "./components/AddJogLog";
import FilterLog from "./components/FilterLog";
import SeeAllLogs from "./components/SeeAllLogs";
import Welcome from "./components/Welcome";
import ReturnUser from "./components/ReturnUser";
import SubmitId from "./components/SubmitId";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: undefined,
      username: undefined
    };
  }

  filterLog = e => {
    e.preventDefault();

    //userId is based on conditional below
    //if the placeholder contains the userId
    //passed as props, then it becomes the user
    //for the code here
    let userId;
    if (e.target.userId.placeholder != "userId") {
      userId = e.target.userId.placeholder;
    } else {
      userId = e.target.userId.value;
    }

    //let userId = e.target.userId.value;
    let username = e.target.username.value;
    let from = e.target.from.value;
    let to = e.target.to.value;

    console.log(userId);

    axios
      .get(`/api/exercise/filter-log?userId=${userId}&from=${from}&to=${to}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  addJogLog = e => {
    e.preventDefault();

    //userId is based on conditional below
    //if the placeholder contains the userId
    //passed as props, then it becomes the user
    //for the code here
    let userId;
    if (e.target.userId.placeholder != "userId") {
      userId = e.target.userId.placeholder;
    } else {
      userId = e.target.userId.value;
    }
    //let userId = e.target.userId.value;
    let username = e.target.username.value;
    let duration = e.target.duration.value;
    let date = e.target.date.value;

    console.log("target below");
    console.log(e.target.userId.placeholder);
    //console.log(username);
    //console.log(this.state.userId);

    axios
      .post("/api/exercise/add", {
        userId: userId,
        username: username,
        duration: duration,
        date: date
      })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  seeAllLogs = e => {
    e.preventDefault();

    //userId is based on conditional below
    //if the placeholder contains the userId
    //passed as props, then it becomes the user
    //for the code here
    let userId;
    if (e.target.userId.placeholder != "userId") {
      userId = e.target.userId.placeholder;
    } else {
      userId = e.target.userId.value;
    }
    //let userId = e.target.userId.value;

    console.log(userId);

    axios
      .get(`/api/exercise/all-logs?userId=${userId}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  submitId = async e => {
    e.preventDefault();
    // console.log(e.target.userId.value);

    let userId = e.target.userId.value;

    //combine axios with async await to access json data...
    const res = await axios.get(
      `/api/exercise/returning-user?userId=${userId}`
    );

    const { data } = await res;

    this.setState({
      userId: data._id,
      username: data.username
    });

    if (this.state.userId) {
      console.log("there is state!");
    }

    // console.log(data._id);
    // console.log(data.username);
  };

  addUsername = async e => {
    e.preventDefault();

    let username = e.target.username.value;
    console.log(username);

    //combine axios with async await to access json data...
    const res = await axios.post("/api/exercise/new-user", {
      username: username
    });
    const { data } = await res;
    this.setState({
      userId: data._id,
      username: data.username
    });
    console.log(data.username);
    console.log(data._id);
    console.log(data);
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/">Home</Link>
          <Link to="/api/exercise/new-user"> new user</Link>
          <Link to="/api/exercise/add"> add to log</Link>
          <Link to="/api/exercise/all-logs"> see all logs</Link>
          <Link to="/api/exercise/filter-log"> filter logs by date</Link>
          {!this.state.userId ? (
            <SubmitId submitId={this.submitId} />
          ) : (
            <p>Greetings, {this.state.username}</p>
          )}
          <Route exact path="/" component={Welcome} />
          <Route exact path="/return-user" component={ReturnUser} />
          {/*<AddName />*/}
          <Route
            exact
            path="/api/exercise/new-user"
            render={props => (
              <AddName {...props} addUsername={this.addUsername} />
            )}
          />
          {/*<AddJogLog />*/}
          <Route
            exact
            path="/api/exercise/add"
            render={props => (
              <AddJogLog
                {...props}
                addJogLog={this.addJogLog}
                userId={this.state.userId}
              />
            )}
          />
          {/*<SeeAllLogs />*/}
          <Route
            exact
            path="/api/exercise/all-logs"
            render={props => (
              <SeeAllLogs
                {...props}
                seeAllLogs={this.seeAllLogs}
                userId={this.state.userId}
              />
            )}
          />
          {/*<FilterLog />*/}
          <Route
            exact
            path="/api/exercise/filter-log"
            render={props => (
              <FilterLog
                {...props}
                filterLog={this.filterLog}
                userId={this.state.userId}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
