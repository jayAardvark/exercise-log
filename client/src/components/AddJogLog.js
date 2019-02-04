import React from "react";
import { Link } from "react-router-dom";
//import axios from "axios";

export default function AddJogLog(props) {
  return (
    <div>
      <h3>jog log</h3>
      {props.userId ? <p>state {props.userId}</p> : <p>no userId</p>}
      <form onSubmit={props.addJogLog}>
        {props.userId ? null : (
          <p>
            You need to submit your userId above before you can add to your
            JogLog.
          </p>
        )}
        <input type="text" name="duration" placeholder="minutes you jogged" />
        <input type="text" name="date" placeholder="yyyy-mm-dd" />
        <button>Submit</button>
      </form>
      {props.duration && props.date ? (
        <p>
          Congrats on jogging and logging! <br />
          Your most recent log was made for {props.duration} minutes on{" "}
          {props.date}.
          <br />
          Jog more and add another log!
          <br />
          <Link to="/api/exercise/all-logs"> Click here for logs!</Link>
        </p>
      ) : null}
    </div>
  );
}
