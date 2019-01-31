import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddName from "./components/AddName";
import AddJogLog from "./components/AddJogLog";
import FilterLog from "./components/FilterLog";
import SeeAllLogs from "./components/SeeAllLogs";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <h1>test</h1>
          <Link to="/">Home</Link>
          <Link to="/api/exercise/new-user">new user</Link>
          <Link to="/api/exercise/add">add to log</Link>
          <Link to="/api/exercise/all-logs">see all logs</Link>
          <Link to="/api/exercise/filter-log">filter logs by date</Link>
          <Route exact path="/" component={Welcome} />
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
