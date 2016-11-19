/* FROM SECTION '02-HOC' OF THIS COURSE
HIGHER-ORDER COMPONENT (HOC)

https://raw.githubusercontent.com/wreilly/advanced-hoc/master/src/components/require_authentication.js
*/

/*  *******************************
    **** SKELETON OF HOC **********
// HOC !
// Higher Order Component

import React, { Component } from 'react';

// For HOC, not a class, but a function:
// ComposedComponent is convention naming
export default function(ComposedComponent) {
  class Authentication extends Component {
    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  return Authentication;
}
  **** /SKELETON OF HOC **********
  *******************************
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';


/*
We need to 'connnect' our Authentication class to our Redux store, so that the component can know if user is authenticated or not ...
*/
export default function(ComposedComponent) {
  class Authentication extends Component {

      // Need to DECLARE context.types
      // STATIC - the property here goes on the CLASS, not an instance of the class
      // So: Authentication.contextTypes  <<<
    static contextTypes = {
      router: React.PropTypes.object
    }

    // Where (the hell) does this ".context." (below) come (the hell) from?
    // https://facebook.github.io/react/docs/context.html
    // Mo' magic  - You gotta name it '.context.' and all is going to be swell.
    // Outta thin (reactive) air.

    // Works!
    componentWillMount() {
      /* Hmm. Before we get started ...
      Here in any wrapped/composed component (e.g. Resources), when we go to mount, first we're going to do this little check, courtesy of the HOC wrapper/composer: require_authentication. Cheers
      */
      // Not Logged In? Then back to Home/Login page for you:
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    // *next* set of properties
    /* If user, on Resources page, (logged in) clicks Sign Out, we get updated new state/props of being logged OUT:
    */
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }

    }

    render() {

      // console.log("WR__ rendering (woot) our requireAuth() wrapped ComposedComponent of Resources ", ComposedComponent);

      // console.log("WR__ okay now connected mapStateToProps done , so - this.props.authenticated? ", this.props.authenticated);


      console.log("WR__ this.context ", this.context);

      return <ComposedComponent {...this.props} />
    }
  }


  function mapStateToProps(state) {
    // WAS: in course section 02: (Middlewares) state structure:
    // return { authenticated: state.authenticated };
    // IN USE HERE section 05: (Client Auth) we have an extra 'auth' organizing our state structure:
    return { authenticated: state.auth.authenticated };
  }

  // NESTED HOCs  connect()()
  return connect(mapStateToProps)(Authentication);
}

/* CONTEXT

WR__ this.context  Objectrouter: Object__v2_compatible__: truecreateHref: createHref(location, query)createKey: createKey()createLocation: createLocation(location)createPath: createPath(location, query)go: go(n)goBack: goBack()goForward: goForward()isActive: isActive(location)listen: listen(listener)listenBefore: listenBefore(hook)push: push(location)pushState: ()registerTransitionHook: registerTransitionHook(hook)replace: replace(location)replaceState: ()setRouteLeaveHook: listenBeforeLeavingRoute(route, hook)setState: ()transitionTo: transitionTo(nextLocation)unregisterTransitionHook: unregisterTransitionHook(hook)__proto__: Object__proto__: Object


Empty Object.

WR__ this.context  Object__proto__: Object
*/

/* Works!

WR__ okay now connected mapStateToProps done , so - this.props.authenticated?  false

(I click "Sign In")

bundle.js:29356 WR__ okay now connected mapStateToProps done , so - this.props.authenticated?  true

( I click "Sign Out")
bundle.js:29356 WR__ okay now connected mapStateToProps done , so - this.props.authenticated?  false

*/

/*
WR__ rendering (woot) our requireAuth() wrapped ComposedComponent of Resources  function() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    'statically speaking resources text'
	  );
	}
*/


/*  *******************************
PSEUDOCODE: notes

not in this file ... some where else
we want to use this HOC

import Authentication // this is the HOC function
import Resources // the component I want to wrap, with the HOC

const ComposedComponent = Authentication(Resources);

// in some render method...
<ComposedComponent /> // (not the regular <Resources /> component)

-------
you can call as many times as you want
new copy each time ..

--------
{...this.props}

E.g.:
<ComposedComponent resources={resourceList} />

As we render this <ComposedComponent />, we are really rendering that returned Authentication class (above), from the wrapping by the HOC.
And that Authentication class above in turn renders the passed-in ComposedComponent (which began as Resources! :o) - it is now wrapped Resources, composed Resources, Resources that have additional info in this case having to do with whether the user is Authentcated or not. Very nice.

So, the props passed to <ComposedComponent> (like: resources={resourceList}) are in turn destructured using the spread operator '...' right there in the HOC above, to ensure that they in turn get passed to the about to be rendered ComposedComponent from inside the HOC, or by the HOC if you like.
Props passed on through ... .... Cheers.

<ComposedComponent /> is an instance of the Authentication class.  Its "HOC".

*/
