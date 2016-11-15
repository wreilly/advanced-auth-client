import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
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
  }
  // default
  return state;
}
