import React, { Component } from "react";
import axios from "axios";

class Add extends Component {
  render() {
    return (
      <div>
        <h2>Enter a username to get started.</h2>
        <p>
          for demonstration purposes, you may also use the following user ID:
          insert Id
        </p>
        <form onSubmit={this.props.addUsername}>
          <input type="text" name="username" placeholder="username" />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Add;
