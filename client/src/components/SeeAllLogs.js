import React from "react";

export default function SeeAllLogs(props) {
  //create list items from array of objects!
  let allLogs = props.allLogs;
  let mappedLogs = props.allLogs.map((eachObject /*, index*/) => {
    return (
      <div key={`${eachObject._id}`}>
        Date: {eachObject.date} <br />
        Duration: {eachObject.duration} minutes
        <hr />
      </div>
    );
  });

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
      {props.allLogs ? <div>{mappedLogs}</div> : null}
    </div>
  );
}
