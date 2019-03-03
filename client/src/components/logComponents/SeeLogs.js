import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import classnames from "classnames";
//use connect to connect Redux to this component
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";

export class SeeLogs extends Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      mappedEntriesState: []
    };
  }

  //when user is logged in, prevent access to endpoints which
  //are not appropriate
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      //if user is not authenticated/logged in, we redirect them
      this.props.history.push("/login");
    }
  }

  componentWillReceiveProps = nextProps => {
    if (!nextProps.auth.isAuthenticated) {
      //if user is not authenticated/logged in, we redirect them
      this.props.history.push("/login");
    }
  };

  seeEntries = async e => {
    e.preventDefault();

    const res = await axios.get("/api/exercise/all-logs");
    const { data } = await res;
    console.log(data);
    this.setState({
      entries: data
    });

    //create list items from array of objects!
    let entries = this.state.entries.log;
    let mappedEntries = entries.map((eachObject /*, index*/) => {
      return (
        <div className="list-render" key={`${eachObject._id}`}>
          Date: {eachObject.date} <br />
          Duration: {eachObject.duration} minutes
          <hr />
        </div>
      );
    });
    this.setState({
      mappedEntriesState: mappedEntries
    });
  };

  render() {
    return (
      <div className="cont-rend">
        {/* <h4>Here are your logs:</h4> */}
        <form onSubmit={this.seeEntries}>
          <button className="btn btn-block btn-primary mb-1">
            click to load your JogLog
          </button>
          {!isEmpty(this.state.mappedEntriesState) ? (
            <div>{this.state.mappedEntriesState}</div>
          ) : null}
        </form>
      </div>
    );
  }
}

SeeLogs.propTypes = {
  auth: PropTypes.object.isRequired
};
//to access auth's State within this component, use mapStateToProps.  "state.auth" is defined in "/reducers/index" or our "root reducer"
//the code below allows us to access the contents of "state.auth" (etc) via the syntax this.props.auth (etc)
//the auth (etc) below were mapped from Redux state
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(SeeLogs);
