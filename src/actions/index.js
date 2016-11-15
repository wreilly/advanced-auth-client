import axios from 'axios';

// You can get history, but also change URL!
import { browserHistory } from 'react-router';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';

const ROOT_API_URL = 'http://localhost:3090';

/*
Q. Why does this look this way?
( { email, password } )
A. ES6 destructure biz
( { email: email, password: password })

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
Object destructuring
Basic assignment

var o = {p: 42, q: true};
var {p, q} = o;
*/
// ACTION CREATOR
// ES6-y poo:
export function signinUser( { email, password } ) {
// Good old-fashioned ES5 ...
// export function signinUser( { email: email, password: password } ) {

// ***** MULTI-PART ACTION CREATOR !
/* Time to THUNK it up:
---------
Action Creator
Returns an Action (usually: an Object { type: })
Goes to DISPATCH (big funnel)
Ensures Action is sent to ALL Middlewares
And on to ALL Reducers
-------
*/

  return function(dispatch) {
    // THUNK provides us Direct access to DISPATCH! :o)
    // Inside OUR logic... we can at whatever point make our OWN call to dispatch:
    // Can wait. Not synchronous etc.
    // dispatch( { type: ... } )

    // 1. submit to server = our API server!
    // http://localhost:3090

    // ES6 Template String: `ticks`
    // ES6 cutesie short cutesie
    // { email: email, password: password }
    // PROMISE!
    axios.post(`${ROOT_API_URL}/signin`, { email, password })
      .then( response => {
        // 2. If okay, - we just successfully authenticated w. backend!
        // - update state to AUTH:true
        // REDUCER authReducer
        // Send ACTION to dispatch ...
        // from there headed to Reducers
        dispatch( { type: AUTH_USER });

        // - save JWT token for next requests
        // LOCAL STORAGE
        // available on window scope in JavaScript
        localStorage.setItem('token', response.data.token)
/*
localStorage.getItem('token')
"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ODI0NWJkNWZlNmEzMDliMWQ0M2FiZGUiLCJpYXQiOjE0Nzg5NTg2NTEwMTN9.5bRgZcoO85-g8zq7M_4ZLLeGrEAGS_rk6p-HYE1Vpa4"
*/

        // - redirect to /feature
        // use React Router, a la 'SPA' (not a whole page refresh)
        // PROGRAMMATIC NAVIGATION
        // User clicks submit
        // App waits for success response
        // THEN we/app navigate them to ...
        browserHistory.push('/feature');

      })
      .catch( () => {
        // 3. If *not* okay
        // - show error
        // N.B. Here in signinUser we need to handle errors, but also we will need to do same in signupUser...

        // So, instead of inline here generating the direct dispatch of an action, we will instead call an Action Creator (authError), right from here inside (this) Action Creator (signinUser)
        dispatch(authError('Bad login info'));
      });
  }

}

// ACTION CREATOR
/* Interesting: Since this is used/called-from (only?) right here within this same file (?), I seem to be able to get away without "exporting" it.
*/
function authError(error) { // <<<< NOT "EXPORT"
// export function authError(error) {
  console.log("WR__ 01 authError error (NOT EXPORTED): ", error);
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

// ACTION CREATOR
export function signoutUser () {
  // remove JWT token
  localStorage.removeItem('token');

  // this will set authenticated to FALSE
  return {
    type: UNAUTH_USER
  }
}

// ACTION CREATOR
export function signupUser( { email, password, passwordConfirmation } ) {

// ***** MULTI-PART ACTION CREATOR !
/* Time to THUNK it up:
---------
Action Creator
Returns an Action (usually: an Object { type: })
Goes to DISPATCH (big funnel)
Ensures Action is sent to ALL Middlewares
And on to ALL Reducers
-------
*/

  return function(dispatch) {
    // THUNK provides us Direct access to DISPATCH! :o)
    // Inside OUR logic... we can at whatever point make our OWN call to dispatch:
    // Can wait. Not synchronous etc.
    // dispatch( { type: ... } )

    // 1. submit to server = our API server!
    // http://localhost:3090

    // PROMISE!
    axios.post(`${ROOT_API_URL}/signup`, { email, password, passwordConfirmation })
      .then( response => {
        // 2. If okay, - we just successfully signed up w. backend!
        /* Hmm, most systems, upon signup, make you signin.
        Maybe our humble little system will just sign you in, upon signup. Cheers.
        */
        // - update state to AUTH:true
        // REDUCER authReducer
        // Send ACTION to dispatch ...
        // from there headed to Reducers
        dispatch( { type: AUTH_USER });

        // - save JWT token for next requests
        // LOCAL STORAGE
        // available on window scope in JavaScript
        localStorage.setItem('token', response.data.token)
/*
localStorage.getItem('token')
"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ODI0NWJkNWZlNmEzMDliMWQ0M2FiZGUiLCJpYXQiOjE0Nzg5NTg2NTEwMTN9.5bRgZcoO85-g8zq7M_4ZLLeGrEAGS_rk6p-HYE1Vpa4"
*/

        // - redirect to /feature = What you came for.
        browserHistory.push('/feature');
      })
      .catch( () => {
        // 3. If *not* okay
        // - show error
        // N.B. Here in signinUser we need to handle errors, but also we will need to do same in signupUser...

        // So, instead of inline here generating the direct dispatch of an action, we will instead call an Action Creator (authError), right from here inside (this) Action Creator (signinUser)
        dispatch(authError('Bad SIGNING UP info'));
      });
  }
}
