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
      username: undefined,
      allLogs: [],
      filteredLog: [],
      duration: undefined,
      date: undefined
    };
  }

  filterLog = async e => {
    e.preventDefault();

    if (this.state.userId) {
      let userId = this.state.userId;
      let from = e.target.from.value;
      let to = e.target.to.value;

      const res = await axios.get(
        `/api/exercise/filter-log?userId=${userId}&from=${from}&to=${to}`
      );
      const { data } = await res;
      this.setState({
        filteredLog: data.filteredLog
      });
    } else return;
  };

  addJogLog = async e => {
    e.preventDefault();

    if (this.state.userId) {
      let userId = this.state.userId;
      let duration = e.target.duration.value;
      let date = e.target.date.value;

      const res = await axios.post("/api/exercise/add", {
        userId: userId,
        duration: duration,
        date: date
      });

      const { data } = await res;
      this.setState({
        duration: data.duration,
        date: data.date,
        //updating the state of both logs upon
        //submission of new log prevents awkward
        //display logs missing most recent log
        allLogs: [],
        filteredLog: []
      });
      console.log(data);
      // .then(res => console.log(res.data))
      // .catch(err => console.log(err));
    } else return;
  };

  seeAllLogs = async e => {
    e.preventDefault();

    if (this.state.userId) {
      let userId = this.state.userId;
      const res = await axios.get(`/api/exercise/all-logs?userId=${userId}`);
      const { data } = await res;
      console.log(data.log);
      this.setState({
        allLogs: data.log
      });
    } else return;
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
      username: data.username,
      allLogs: data.log
    });
  };

  addUsername = async e => {
    e.preventDefault();

    let username = e.target.username.value;

    //combine axios with async await to access json data...
    const res = await axios.post("/api/exercise/new-user", {
      username: username
    });
    const { data } = await res;
    this.setState({
      userId: data._id,
      username: data.username,
      allLogs: [],
      filteredLog: undefined,
      duration: undefined,
      date: undefined
    });
    console.log(data.username);
    console.log(data._id);
    console.log(data);
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="title">Jog Log</div>
          <Link to="/" className="home-link">
            Home
          </Link>
          <Link to="/api/exercise/new-user" className="new-link">
            {" "}
            new user
          </Link>
          <Link to="/api/exercise/add" className="add-link">
            {" "}
            add to log
          </Link>
          <Link to="/api/exercise/all-logs" className="see-link">
            {" "}
            see all logs
          </Link>
          <Link to="/api/exercise/filter-log"> logs by date</Link>
          {!this.state.userId ? (
            <SubmitId submitId={this.submitId} />
          ) : (
            <p>You are logged in as: {this.state.username}</p>
          )}
          <Route exact path="/" component={Welcome} />
          <Route exact path="/return-user" component={ReturnUser} />
          {/*<AddName />*/}
          <Route
            exact
            path="/api/exercise/new-user"
            render={props => (
              <AddName
                {...props}
                addUsername={this.addUsername}
                userId={this.state.userId}
                username={this.state.username}
              />
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
                date={this.state.date}
                duration={this.state.duration}
                submitId={this.submitId}
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
                allLogs={this.state.allLogs}
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
                filteredLog={this.state.filteredLog}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
