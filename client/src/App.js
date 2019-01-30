import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddName from "./components/AddName";
import AddJogLog from "./components/AddJogLog";
import FilterLog from "./components/FilterLog";
import SeeAllLogs from "./components/SeeAllLogs";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>test</h1>
        <AddName />
        <AddJogLog />
        <SeeAllLogs />
        <FilterLog />
      </div>
    );
  }
}

export default App;
