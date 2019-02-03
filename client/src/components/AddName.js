import React from "react";

export default function Add(props) {
  return (
    <div>
      <h5>
        If this is your first time using JogLog, enter a username to begin!
      </h5>

      <form onSubmit={props.addUsername}>
        <input type="text" name="username" placeholder="username" />
        <button>Submit</button>
      </form>

      {props.userId ? (
        <p>
          Here is your userId:
          <br />
          <br /> {props.userId} <br />
          <br />
          copy it and paste it somewhere safe! You'll use this userId to access
          your data whenever you return.
        </p>
      ) : null}
    </div>
  );
}
