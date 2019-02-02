import React from "react";
//import axios from "axios";

export default function AddJogLog(props) {
  return (
    <div>
      <h3>jog log</h3>
      {props.userId ? <p>state {props.userId}</p> : <p>no userId</p>}
      <form onSubmit={props.addJogLog}>
        {/* ternary: if user hasn't already input userId, render a form asking for it */}
        {props.userId ? (
          <input type="text" name="userId" placeholder={props.userId} />
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
