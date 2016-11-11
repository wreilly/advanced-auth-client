import axios from 'axios';

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
    axios.post(`${ROOT_API_URL}/signin`, { email, password });


    // 2. If okay,
    // - update state to AUTH:true
    // - save JWT token for next requests
    // - redirect to /feature

    // 3. If *not* okay
    // - show error


  }

}
