import React from "react";

export default function SubmitId(props) {
  return (
    <div>
      <form onSubmit={props.submitId}>
        {/* consider inputs for city and state for those inclined.  also, geolocation */}
        <input
          type="text"
          name="userId"
          placeholder="Enter your user ID number"
        />

        <button>Submit</button>
      </form>
    </div>
  );
}
