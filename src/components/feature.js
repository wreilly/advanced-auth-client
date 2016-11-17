import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }
  render() {

    return (
      <div>
        <p>Here is protected feature!</p>
        <p>And here is something special, just for you: {this.props.message} hmm</p>
      </div>
    );
  }
}

// Thus far, no mapStateToProps, ergo: null.
// Okay, now time to get that message, off state, to props, to show message to page ?? ??
// Ah - I hadn't yet done the AUTH_REDUCER part for FETCH_MESSAGE. okay.
// Note that this 'message', not really part of 'auth', does get added to the 'auth' part of state.
// Why? Because we a bit lazily plopped 'message' into the same auth_reducer, instead of making a whole other reducer, just to handle this one little case, here at the tail end of the course. Cheers.
function mapStateToProps(state) {
  console.log("WR__ 7777 Feature mapStateToProps state: ", state);
  return { message: state.auth.message }; // THUNK
  // return { message: state.auth.message.data.message }; // PROMISE
}

// export default connect(null, actions)(Feature);
export default connect(mapStateToProps, actions)(Feature);
