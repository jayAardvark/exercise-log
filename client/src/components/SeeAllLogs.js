import React from "react";

export default function SeeAllLogs(props) {
  return (
    <div>
      <h3>See All Logs</h3>
      <form onSubmit={props.seeAllLogs}>
        {props.userId ? null : (
          <p>
            You need to submit your userId above before you can see your
            JogLogs.
          </p>
        )}
        <button>See all JogLogs!</button>
      </form>
      {props.allLogs ? (
        <p>{props.allLogs[0].date}</p> /*expand this out*/
      ) : null}
    </div>
  );
}
