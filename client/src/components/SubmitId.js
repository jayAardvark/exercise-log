import React from "react";

export default function SubmitId(props) {
  return (
    <div>
      <p>Returning users, submit your userId here:</p>
      <form onSubmit={props.submitId}>
        <input type="text" name="userId" placeholder="userId" />

        <button>Submit</button>
      </form>
    </div>
  );
}
