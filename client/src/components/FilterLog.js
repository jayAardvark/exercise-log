import React from "react";

export default function FilterLog(props) {
  return (
    <div>
      <h3>Filter Log</h3>
      <form onSubmit={props.filterLog}>
        {props.userId ? (
          <input type="text" name="userId" placeholder={props.userId} />
        ) : (
          <input type="text" name="userId" placeholder="userId" />
        )}
        <input type="text" name="username" placeholder="username" />
        <input type="text" name="from" placeholder="from" />
        <input type="text" name="to" placeholder="to" />
        <button>Submit</button>
      </form>
    </div>
  );
}
