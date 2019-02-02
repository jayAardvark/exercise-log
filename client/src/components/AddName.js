import React from "react";

export default function Add(props) {
  return (
    <div>
      <h2>Enter a username to get started.</h2>
      <p>
        for demonstration purposes, you may also use the following user ID:
        insert Id
      </p>
      <form onSubmit={props.addUsername}>
        <input type="text" name="username" placeholder="username" />
        <button>Submit</button>
      </form>
    </div>
  );
}
