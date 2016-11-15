// NO APP state to start, begin...
// FUNCTIONAL COMPONENT

// BUT FOR LOGIC, we'll go with CLASS

import React, { Component } from 'react';

// MAKE IT A *CONTAINER*
// So it gets state, can know if Authenticated
import { connect } from 'react-redux';

import { Link } from 'react-router';


class Header extends Component {

  // T/F
  // renderLinks() { }
  helperShowRightLinks () {
      console.log("WR__ H 99 did we get here at all at all this.props.wr__auth ", this.props.wr__auth);
      console.log("WR__ H 100 did we get here at all at all this.props.wr__auth.wr__error ", this.props.wr__auth.wr__error);
      console.log("WR__ H 101 did we get here at all at all this.props.wr__auth.wr__authenticated ", this.props.wr__auth.wr__authenticated);

    // NEW TEST: ! BANG on whether authenticated T/F, not wr__error (text or empty)
    // if (!this.props.authenticated) { // wrong
    if (!this.props.wr__auth.wr__authenticated) {
      // Nope. You are NOT authenticated, friend.
      console.log("WR__ H 98B NOPE did we get here at all at all this.props.wr__auth.wr__authenticated ", this.props.wr__auth.wr__authenticated);

    // if (this.props.wr__authenticated.wr__error) {
      // Nope, you got an error. Gotta authenticate
      console.log("WR__ H 982-PART-1 NOPE did we get here at all at all this.props.wr__auth.wr__error ", this.props.wr__auth.wr__error);

// REACT TRICK
// return ARRAY.
// No need for wrapping <div> or <ul> etc.
// NOTE! You need a COMMA between items in that array, though !! !!
/* ALTHOUGH...
Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of `Header`. See https://fb.me/react-warning-keys for more information.
REACT thinks it's an array of Components.
(silly REACT)
*/
      return [
          <li className="nav-item" key={1}>
            <Link className="nav-link" to="/signin">Sign In!</Link>
          </li>
          ,
          <li className="nav-item" key={2}>
            <Link className="nav-link" to="/signup">Sign Up!</Link>
          </li>
      ];

    } else {
      // NEW TEST (above). Authenticated? Yep...
      // No error? Yep, let 'em in
      console.log("WR__ H 97 YEP did we get here at all at all this.props.wr__auth.wr__error ", this.props.wr__auth.wr__error);
      console.log("WR__ H 96 YEP did we get here at all at all this.props.wr__auth.wr__authenticated ", this.props.wr__auth.wr__authenticated);

      return (
          <li className="nav-item">
            <Link className="nav-link" to="/signout">Sign Out!</Link>
          </li>
      );
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          {this.helperShowRightLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  // T/F
  console.log("WR__ H 87 that map thing state: ", state);
  console.log("WR__ H 88 that map thing state.auth: ", state.auth);
  /* state.auth is empty Object {} *UNTIL* I try a login that fails.
  THEN we get an .error property, w. text message.
  okay.
WR__ 88 that map thing state.auth:  Object
error: "Bad login info"
__proto__: Object
bundle.js:29174 WR__ 99 did we get here at all at all
this.props.auth  Object {error: "Bad login info"}

  And, when I do a login that SUCCEEDS, we get property of .authenticated: true
  and .error is empty text string

  WR__ 88 that map thing state.auth:  Object
  authenticated: true
  error: ""

  */
  // From state, Get the nested property, and, why not, maintain
  //  it on props as a nested property, too. Sanity check. (Mebbe.)

/* the 'auth' in state.auth.authenticated (below)
is defined in the /SRC/REDUCERS/INDEX.JS

the 'authenticated' in same
is defined in /SRC/REDUCERS/AUTH_REDUCER.JS

*/

  return  { wr__auth:
            { wr__error: state.auth.error,
              wr__authenticated: state.auth.authenticated
            },

          };
  // return { wr__authenticated: state.auth };
}

// that null is where 'actions' gets passed, on signin.js, fwiw:
export default Header = connect(mapStateToProps, null)(Header);
