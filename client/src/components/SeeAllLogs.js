import React from "react";

export default function SeeAllLogs(props) {
  return (
    <div>
      <h3>See All Logs</h3>
      <form onSubmit={props.seeAllLogs}>
        {props.userId ? (
          <input type="text" name="userId" placeholder={props.userId} />
        ) : (
          <input type="text" name="userId" placeholder="userId" />
        )}
        <button>Submit</button>
      </form>
    </div>
  );
}
