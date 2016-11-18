import axios from 'axios';

// You can get history, but also change URL!
import { browserHistory } from 'react-router';

import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types';

import lilInspector from '../lilInspector';

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


// ***********************************
// ACTION CREATOR   SIGN *IN*
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
      // .catch( (response) => { // << Didn't work; see below
        // 3. If *not* okay
        // - show error
        // N.B. Here in signinUser we need to handle errors, but also we will need to do same in signupUser...

        // So, instead of inline here generating the direct dispatch of an action, we will instead call an Action Creator (authError), right from here inside (this) Action Creator (signinUser)

        dispatch(authError('Bad login info'));
        // dispatch(authError(response.data.error));
        /* Hmm, above did not work, here in signin() anyway
        bundle.js:39099 Uncaught (in promise) TypeError: Cannot read property 'error' of undefined(…)
        */
      });
  }

}


// ***********************************
// ACTION CREATOR   ERROR
/* Interesting: Since this is used/called-from (only?) right here within this same file (?), I seem to be able to get away without "exporting" it.
*/
function authError(error) { // <<<< DON'T  NEED TO "EXPORT"
// export function authError(error) {
  console.log("WR__ 01 authError error (NOT EXPORTED): ", error);
  return {
    type: AUTH_ERROR,
    payload: error
  };
}


// ***********************************
// ACTION CREATOR SIGN *OUT*
export function signoutUser () {
  // remove JWT token
  localStorage.removeItem('token');

  // this will set authenticated to FALSE
  return {
    type: UNAUTH_USER
  }
}



// ***********************************
// ACTION CREATOR SIGN *UP*
// export function signupUser( { email, password, passwordConfirmation } ) {
export function signupUser( { email, password } ) {

  /* Gah. (above)
No need to pass that 'passwordConfirmation' to the back-end, friend: (the API doesn't know what to do with it)
  */



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
    // axios.post(`${ROOT_API_URL}/signup`, { email, password, passwordConfirmation })
    axios.post(`${ROOT_API_URL}/signup`, { email, password })
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
      // .catch( () => {
// https://www.udemy.com/react-redux-tutorial/learn/v4/questions/1521726
      // .catch( (response) => {
      // .catch( (error) => {
      .catch( (foobar) => {


        // 3. If *not* okay
        // - show error
        // N.B. Here in signinUser we need to handle errors, but also we will need to do same in signupUser...


/* In case you were wondering,
what this response looks like coming from the SERVER:

/Users/william.reilly/dev/JavaScript/React/Udemy-ADVANCED-React-Redux-Grider/04-auth-server/auth/server/controllers/authentication.js

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    Not:              response.data.error
    Instead: response.response.data.error

*/


        // So, instead of inline here generating the direct dispatch of an action, we will instead call an Action Creator (authError), right from here inside (this) Action Creator (signinUser)

        // dispatch(authError('Bad SIGNING UP info'));
        // dispatch(authError(response.data.error)); // << Nope.
        /* bundle.js:39200 Uncaught (in promise) TypeError: Cannot read property 'error' of undefined(…)
        Response:
        {"error":"Email is already in use!"}
        Let's remove that '.data.' ...
        */
        // console.log("WR__ Yet Another 444 Sign UP ACTION response: ", response);
        // console.log("WR__ Yet Another 555 Sign UP ACTION response.error: ", response.error);
        // console.log("WR__ Yet Another 666 Sign UP ACTION response.data.error: ", response.data.error);
        // dispatch(authError(response.error)); // Yes, but ...
        // console.log("WR__ Yet Another 888 Sign UP ACTION response.response.data.error: ", response.response.data.error);

        lilInspector(foobar, 'that foobar thing');
        // lilInspector(response, 'that response thing');
        // lilInspector(error, 'that error thing');
        // lilInspector(response.response, 'that response thing response.response');
        // lilInspector(error.response, 'that response thing error.response');
        lilInspector(foobar.response, 'that foobar thing foobar.response');
        /*

 **** !!!! lilInspector !!!! ****
bundle.js:41158 objectVariableNameThisTime : that response thing
bundle.js:41165 KEY   : lilKey            : config
bundle.js:41166 VALUE : lilObject[lilKey] : [object Object]
bundle.js:41165 KEY   : lilKey            : response
bundle.js:41166 VALUE : lilObject[lilKey] : [object Object]
bundle.js:41171 **** !!!! /END lilInspector !!!! ****

Not:              response.data.error
Instead: response.response.data.error
OR:         error.response.data.error

response: {
  config: { ... },
  response: { ... },
}

// appears to be SAME THING:
error: {
  config: { ... },
  response: { ... },
}

response: {
  config: { ... },
  response: {
    data: { ... },
    status: 422,
    statusText: 'Unprocessable Entity',
    headers: { ... },
    config: { ... },
    request: { ... }
  }
}

response: {
error: {
  config: { ... },
  response: {
    data: {
      error: 'Email is in use',
      ...
    },
    status: 422,
    statusText: 'Unprocessable Entity',
    headers: { ... },
    ...
  }
}




        */

        /*
**** !!!! lilInspector !!!! ****
bundle.js:41169 objectVariableNameThisTime : that response thing response.response
bundle.js:41176 KEY   : lilKey            : data
bundle.js:41177 VALUE : lilObject[lilKey] : [object Object]
bundle.js:41176 KEY   : lilKey            : status
bundle.js:41177 VALUE : lilObject[lilKey] : 422
bundle.js:41176 KEY   : lilKey            : statusText
bundle.js:41177 VALUE : lilObject[lilKey] : Unprocessable Entity
bundle.js:41176 KEY   : lilKey            : headers
bundle.js:41177 VALUE : lilObject[lilKey] : [object Object]
bundle.js:41176 KEY   : lilKey            : config
bundle.js:41177 VALUE : lilObject[lilKey] : [object Object]
bundle.js:41176 KEY   : lilKey            : request
bundle.js:41177 VALUE : lilObject[lilKey] : [object XMLHttpRequest]
bundle.js:41182 **** !!!! /END lilInspector !!!! ****
        */
// https://www.udemy.com/react-redux-tutorial/learn/v4/questions/1521726
        // dispatch(authError(response.response.data.error)); // try it?  YEP THAT IS IT
        // dispatch(authError(error.response.data.error));
        dispatch(authError(foobar.response.data.error)); // try it?  YEP THAT IS IT
        // APPARENTLY 'RESPONSE' GETS WRAPPED IN ANOTHER OUTER 'RESONSE'  All righty.

/* try it = hah!
Whatever the hell this 'response' is, I don't know where it is hiding the error I sent with it. Hmmph.

Time for the lilInspector()!

bundle.js:901 Uncaught (in promise) Error: Objects are not valid as a React child (found: Error: Request failed with status code 422). If you meant to render a collection of children, use an array instead or wrap the object using createFragment(object) from the React add-ons. Check the render method of `Signup`.(…)
*/



        // the authError isn't getting the text ... hmm.
        /*
WR__ Yet Another 444 Sign UP ACTION response:  Error: Request failed with status code 422(…)
bundle.js:39207 WR__ Yet Another 555 Sign UP ACTION response.error:  undefined

the '666' one can't be run: no 'response.data ...'
bundle.js:39208 Uncaught (in promise) TypeError: Cannot read property 'error' of undefined(…)

From my auth server API:
../../../04-auth-server/auth/server/controllers/authentication.js:
----------
{"error":"Email is already in use!"}

  return res.status(422).send( {
        error: "Email is already in use!"
      });
        */

      });
  }
} //  /signupUser()
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&





/* ******** REDUX *THUNK*  ********* */
// ***** ACTION CREATOR
/* **********************************
export function fetchMessage() {
  // redux THUNK - we're returning a FUNCTION from this Action Generator:

// TO SEND TOKEN IT IS IN HEADERS

  return function(dispatch) {
    axios.get(ROOT_API_URL, {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })  // hitting API '/'
      .then(response => {
        // Bummer. Not getting anything logged. Hmm.
        // Hmm. Now that I also trigger (below) a dispatch, I *DO* get this console.log to work. Odd ?
        // And now, I temporarily remove the dispatch, retain the console.log, and it does work. wtf.
        console.log("WR__ 8889 fetchMessage() API '/' response: ", response);

// WR__ 8889 fetchMessage() API '/' response:  Object
	// config: Object
	// data: Object
	// 	message: "Super-duper secret code is (if you must know) ABC123f"

        dispatch({
          type: FETCH_MESSAGE,
          // payload: action.payload.data.message // ?? << error by instructor in video. The course source code has correct:
          payload: response.data.message
        });

      });
  }
} //  /fetchMessage()   USING THUNK
     **********************************
*/
/* ******** /REDUX *THUNK*  ********* */




/*
&&&&&&&&&&&&&&&&&
LECTURE 116
MAKING AUTHENTICATED API REQUESTS
We'll use Redux Thunk here.
You could use Redux Promise. (but it is less secure!)
*/
/*
SERVER: /ROUTER.JS
  app.get('/', requireAuth, function(req, res) {
    res.send( { message: 'Super-duper secret code is (if you must know) ABC123f'});
  });
*/

/*
bundle.js:39408 Uncaught (in promise) ReferenceError: action is not defined(…)



WR__ 888 fetchMessage() API '/'
response:  Object
  data: Object
    message: "Super-duper secret code is (if you must know) ABC123f"
*/


/* ******** REDUX *PROMISE*  ********* */
// Hmm, this is NOT working. 2016-11-17-0808AM oh well.
// LESS SECURE! ?? ?? ??
// export function fetchMessagePromise() {

/* *****************************
  //   NOT working. 2016-11-17-0808AM
*/
export function fetchMessage() {
  const request = axios.get(ROOT_API_URL, {
    headers: { authorization: localStorage.getItem('token') }
  });

console.log("WR__ 9777 fetchMessagePROMISE() API '/' request: ", request);
console.log("WR__ 9777A fetchMessagePROMISE() API '/' request.data: ", request.data);
// console.log("WR__ 9777B fetchMessagePROMISE() API '/' request.data.message: ", request.data.message);

  return {
    type: FETCH_MESSAGE,
    payload: request
  }
}
/* *******************************
*/


/*
WR__ 9777 fetchMessagePROMISE() API '/' request:
request:
Promise__proto__:
Promise[[PromiseStatus]]: "resolved"
[[PromiseValue]]: Object
  config: Object
  data: Object
    message: "Super-duper secret code is (if you must know) ABC123f"








WR__ 7777 Feature mapStateToProps
state:  Object
  auth: Object
    authenticated: true
    error: "Bad login info"
    message: Promise__proto__:
        Promise[[PromiseStatus]]: "resolved"
        [[PromiseValue]]: Object
          config: Object
          data: Object
            message: "Super-duper secret code is (if you must know) ABC123f"
*/
/* ******** /REDUX *PROMISE*  ********* */
