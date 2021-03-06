import React, { Component } from "react";
import axios from "axios";
import isEmpty from "../../validation/is-empty";
import PropTypes from "prop-types";
import classnames from "classnames";
//use connect to connect Redux to this component
import { connect } from "react-redux";

export class AddLog extends Component {
  constructor() {
    super();
    this.state = {
      duration: "",
      date: "",
      errors: {
        // duration: "",
        // date: ""
      }
    };
  }

  //when user is logged in, prevent access to endpoints which
  //are not appropriate
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      //if user is authenticated/logged in, we redirect them
      this.props.history.push("/login");
    }
  }

  componentWillReceiveProps = nextProps => {
    if (!nextProps.auth.isAuthenticated) {
      //if user is not authenticated/logged in, we redirect them
      this.props.history.push("/login");
    }
  };

  onChange = e => {
    //when the user types into field, we want to update the state
    //of this component to reflect that
    //because there are multiple props in state, we'll use
    //syntax that, in essence, automatically detects which state we update
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const entryData = {
      duration: this.state.duration,
      date: this.state.date
    };

    //check if duration is an integer value and if date is in the form yyyy-mm-dd

    //check if either is
    if (isEmpty(entryData.duration) && isEmpty(entryData.date)) {
      this.setState({
        errors: {
          duration: "Be sure to include jog duration!",
          date: "Be sure to include a date!"
        }
      });
    } else if (isEmpty(entryData.duration)) {
      this.setState({
        errors: { duration: "Be sure to include jog duration!" }
      });
    } else if (isEmpty(entryData.date)) {
      this.setState({ errors: { date: "Be sure to include a date!" } });
    }
    //check if either
    else if (
      //in the future, refine this input check/validation
      !isEmpty(entryData.duration) &&
      !isEmpty(entryData.date)
    ) {
      axios
        .post("/api/exercise/add", entryData)
        .then(res => console.log("success"))
        .catch(err => console.log(err));

      //redirect upon submission? perhaps to SeeAllLogs
      // window.location.href = "/seeLogs";
      this.props.history.push("/seeLogs");
    }
  };

  render() {
    let styles = { textAlign: "center" };
    return (
      <div className="cont-rend">
        <div>
          <h1 className="mt-3" style={styles}>
            Add to your log!
          </h1>
          <form onSubmit={this.onSubmit} className="add-fields">
            <input
              autoComplete="off"
              type="text"
              name="duration"
              placeholder="enter jog duration"
              value={this.state.equipment}
              onChange={this.onChange}
              // className="form-control form-control-lg"
              className={classnames("form-control form-control-lg", {
                "is-invalid": this.state.errors.duration
              })}
            />
            {this.state.errors.duration && (
              <div className="invalid-feedback">
                {this.state.errors.duration}
              </div>
            )}
            <input
              autoComplete="off"
              type="text"
              name="date"
              placeholder="enter the date"
              value={this.state.date}
              onChange={this.onChange}
              // className="form-control form-control-lg mt-4"
              className={classnames("form-control form-control-lg mt-4", {
                "is-invalid": this.state.errors.date
              })}
            />
            {this.state.errors.date && (
              <div className="invalid-feedback">{this.state.errors.date}</div>
            )}
            <button className="btn btn-block btn-primary mt-4">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

AddLog.propTypes = {
  auth: PropTypes.object.isRequired
};
//to access auth's State within this component, use mapStateToProps.  "state.auth" is defined in "/reducers/index" or our "root reducer"
//the code below allows us to access the contents of "state.auth" (etc) via the syntax this.props.auth (etc)
//the auth (etc) below were mapped from Redux state
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AddLog);
