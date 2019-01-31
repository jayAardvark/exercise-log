import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddName from "./components/AddName";
import AddJogLog from "./components/AddJogLog";
import FilterLog from "./components/FilterLog";
import SeeAllLogs from "./components/SeeAllLogs";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1>test</h1>
          <a href="/api/exercise/new-user">new user</a>
          <a href="/api/exercise/add">add to log</a>
          <a href="/api/exercise/all-logs">see all logs</a>
          <a href="/api/exercise/filter-log">filter logs by date</a>
          {/*<AddName />*/}
          <Route exact path="/api/exercise/new-user" component={AddName} />
          {/*<AddJogLog />*/}
          <Route exact path="/api/exercise/add" component={AddJogLog} />
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
