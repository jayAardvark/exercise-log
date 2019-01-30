import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Add from "./components/Add";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>test</h1>
        <Add />
      </div>
    );
  }
}

export default App;
