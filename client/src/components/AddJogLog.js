import React, { Component } from "react";
import axios from "axios";

class AddJogLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId
    };
  }
  onSubmit(e) {
    e.preventDefault();

    //userId is based on ternary below
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
  }

  render() {
    return (
      <div>
        <h3>jog log</h3>
        {this.props.userId ? (
          <p>state {this.props.userId}</p>
        ) : (
          <p>no userId</p>
        )}
        <form onSubmit={this.onSubmit}>
          {/* ternary: if user hasn't already input userId, render a form asking for it */}
          {this.props.userId ? (
            <input type="text" name="userId" placeholder={this.props.userId} />
          ) : (
            <input type="text" name="userId" placeholder="userId" />
          )}

          <input type="text" name="username" placeholder="username" />
          <input type="text" name="duration" placeholder="duration of jog" />
          <input type="text" name="date" placeholder="yyyy-mm-dd" />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default AddJogLog;
