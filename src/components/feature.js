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
  // THUNK: (works)
  // return { message: state.auth.message };

  // PROMISE:  (Works Holy Cow)(why? because reducer is now correct)
  return { message: state.auth.message }; // Can't beat 'em, join 'em. (same as THUNK)

  // PROMISE:  ? FAILED
  // return { message: state.auth.message.data.message }; // ? This is what is seen AFTER "resolved". But, NOT when just "pending". Ergo: No, nope, sorry. bummer.

  // PROMISE:  ? FAILED. (why? because reducer was WRONG!)
  // return { message: state.auth.message }; // ? Can't beat 'em, join 'em. ? (same as THUNK) << Nope.

  // PROMISE:  ? FAILED
  // return { message: state.message }; // Hmm. Idea from auth_reducer ... ? // No. sad.

  // PROMISE:  (not woikin'!) FAILED
  // return { message: state.auth.message.data.message }; // << NO

  // PROMISE:  ? FAILED
  // return { message: state.auth.response.data }; // << NO  

  // return { message: '7777 plain text promise testing' }; // Yeah plain text works.
}

// export default connect(null, actions)(Feature);
export default connect(mapStateToProps, actions)(Feature);
