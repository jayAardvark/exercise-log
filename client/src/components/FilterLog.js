import React from "react";

export default function FilterLog(props) {
  //create list items from an array of objects
  let mappedLogs = props.filteredLog.map(eachObject => {
    return (
      <p key={`${eachObject._id}`}>
        Date: {eachObject.date} <br />
        Duration: {eachObject.duration} minutes
      </p>
    );
  });

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
      {props.filteredLog ? <div>{mappedLogs}</div> : <p>no filtered log</p>}
    </div>
  );
}
