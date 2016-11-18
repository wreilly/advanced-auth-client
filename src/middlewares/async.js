/*
COPIED FROM
/Users/william.reilly/dev/JavaScript/React/Udemy-ADVANCED-React-Redux-Grider/03-middleware/advanced-middlewares/src/middlewares/async.js
*/

// we'll be pulling off only the dispatch function, so, that's all we export:
/* Nifty ES6 style */
export default function( { dispatch } ) {
  return next => action => {
    // Looking to see if Promise or not.

/*
Jesus H. Christ.
A Promise has a payload property.
A Promise has a status.
When that status is PENDING, the payload is EMPTY
When that status is RESOLVED, the payload has DATA.
Either way, there IS a payload property.

Our *IF* statement below is testing whether our action has any payload at all, empty or not.
It is testing whether we have a Promise,
whether this action is Async.

If it is not a Promise, we just return next(action)
*/

/* JHC Update. Following comment is not the case. (sorry!) */
    // Promise means "PENDING" Promise.
    // NO DATA YET
    // *NOT* a "Resolved" "Promise" (Which *does* have the data, the payload)
    // We are filtering for PENDING PROMISES.
    // So: If no payload, or payload doesn't have .then property, send it on (next)

    // Note: that ".then" property is NOT seen on the browser console for the "action.payload" object.
    // I only saw it when explicitly calling for "action.payload.then" - it is "native code" - whatever deep magic that is.
    // http://stackoverflow.com/questions/11234664/what-does-native-code-mean


/* Painful Explication of !Logic in IF():

1. LEFT-SIDE
Does your action have a .payload property?
(Most do). If it DOES, then LEFT-SIDE is FALSE.
So far, we are NOT going in to the nested logic in this IF statement, but hold on... ...

2. RIGHT-SIDE
Does your action.payload have .then property?
(Only payloads that are Promises do! Be that Pending or Resolved, I believe. Purty sure.)
A Payload that is instead the response result is no longer a Promise - it is now replaced with the DATA of the response! No ".then" property.
If we have a Promise, we do have a .then, and this is FALSE on the RIGHT-SIDE. Ergo, we are NOT going in to the nested logic. We SKIP past this IF check, on to the next code...
If we do NOT have a Promise, we have DATA, we do NOT have a .then, and this is TRUE on the RIGHT-SIDE.

3. CONCLUSION
As we know, if LEFT-SIDE is FALSE but RIGHT-SIDE is TRUE, here in this OR (||) statement, that is "Good Enough" and we ARE going in to the nested logic.
And, of course, if both are FALSE, we are NOT going in.
Cheers.
*/

    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    // O.K. - not a "PROMISE, PENDING", so,
    // that means we GOT a payload.
    // In this middleware, we'll console.log and just pass it on to the Next one ...

    console.log("WR__ ES6 Got a Promise. It's got a payload property (be that empty or not). action: ", action);

    console.log("WR__ ES6 Here's the THEN bit:  action.payload.then: ", action.payload.then);
    /*
bundle.js:25271 WR__ ES6 Must be a Payload THEN ? action.payload.then:  then() { [native code] }
    */

    // next(action);

    /*
    1. Make sure the action's promise is Resolved.
    By calling .then --- it won't get called till it IS Resolved. Great.
    */
    action.payload
      .then(function(response) {
        // Whatever the action data is now, we "extend over it" our response onto the payload property
        // That is, 1) create newAction with the old (same, preserved) Type,
        // but 2) replace the payload (which was the Promise) with the data returned in the response:
        const newAction = { ...action, payload: response }
        // dispatch sends it through the TOP of where all the Actions get sent. (Not merely "next").
        dispatch(newAction);
      });



  };
}


/* Good Old ES5 style - so you can see What The Hell is going on
export default function( { dispatch } ) {
  return function(next) {
    return function(action){
    console.log("WR__ ES5 action: ", action);

    next(action);
    };
  };
}
*/
