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
              <AddJogLog {...props} userId={this.state.userId} />
            )}
          />
          {/*<SeeAllLogs />*/}
          <Route exact path="/api/exercise/all-logs" component={SeeAllLogs} />
          {/*<FilterLog />*/}
          <Route exact path="/api/exercise/filter-log" component={FilterLog} />
        </div>
      </Router>
    );
  }
}

export default App;
