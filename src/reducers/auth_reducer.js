import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from '../actions/types';

// FALSE authentication as the Very Beginning Default
// When user FIRST hits site.
// Hopefully this won't goof up subsequent ... ?
// (later) - seems to be ok
export default function(state = { ...state, authenticated: false}, action) {
// export default function(state = {}, action) {
  switch(action.type) {
    // WR__ I figured it all out, on my own
    // If you just successfully authenticated someone, set error to empty
    // Why? In case this user a moment before had gotten the password wrong, and was presented our nifty red alert error msg.
    // If you don't set error to empty here, that nifty red box remains even on successful login.
    // Cheers.
    case AUTH_USER:
      return { ...state, authenticated: true, error: '' };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:


// MIDDLEWARES Section
// from /reducers/users.js
// LECTURE 57, 58 HANDLING PROMISES
      console.log("WR__ 11111 reducers/auth_reducer, FETCH_MESSAGE - what we got back from the Action's axios call to the auth API! action.payload: ", action.payload);

      console.log("WR__ 22222 reducers/auth_reducer, FETCH_MESSAGE - action.payload.data: ", action.payload.data);


      // return { ...state, message: action.payload };
      // return { ...state, message: action.payload.data };
      return { ...state, message: action.payload.data.message };
  }
  // default
  return state;
}
