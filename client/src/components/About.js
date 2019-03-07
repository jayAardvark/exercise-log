import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <h1 className="mt-3">About JogLog</h1>
      <div className="about-text mt-4">
        <h4 className="text-center">What is JogLog?</h4>
        <p>
          JogLog is a simple web app with one clear goal in mind: to help you
          keep track of when you jog and for how long.
        </p>
        <h4 className="text-center mt-4">Why use JogLog?</h4>
        <p>
          As busy, productive people, we tend to keep lists. These lists provide
          the order and motivation necessary to help us accomplish our goals.
          But what good is a list if it gets lost among our other lists? <br />
          <br />
          With JogLog, your jogging-data list is always in one place and readily
          available. Simply <Link to="/register">create an account</Link> and
          start logging!
        </p>
      </div>
    </div>
  );
}
