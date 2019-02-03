import React from "react";

export default function FilterLog(props) {
  return (
    <div>
      <h3>Filter Log</h3>
      <form onSubmit={props.filterLog}>
        {props.userId ? null : (
          <p>
            You need to submit your userId above before you can see your
            JogLogs.
          </p>
        )}
        <input type="text" name="from" placeholder="from" />
        <input type="text" name="to" placeholder="to" />
        <button>Submit</button>
      </form>
    </div>
  );
}
