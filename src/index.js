import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

// https://www.udemy.com/react-redux-tutorial/learn/v4/questions/1371882
/*  HMM << I fixed this later ...
bundle.js:21664 mapStateToProps() in Connect(Feature) must return a plain object. Instead received undefined.
*/
import reduxPromise from 'redux-promise';

/*
TRYING THE HOME-ROLLED GROWN YER OWN: YAH. WORKED.
/Users/william.reilly/dev/JavaScript/React/Udemy-ADVANCED-React-Redux-Grider/03-middleware/advanced-middlewares/src/middlewares/async.js
*/
import Async from './middlewares/async';

import App from './components/app';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_authentication';
import Welcome from './components/welcome';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

// https://www.udemy.com/react-redux-tutorial/learn/v4/questions/1371882
const createStoreWithMiddleware = applyMiddleware(reduxThunk, reduxPromise)(createStore);
// GROWN YER OWN:
// const createStoreWithMiddleware = applyMiddleware(reduxThunk, Async)(createStore);

/* WAS:
  <Provider store={createStoreWithMiddleware(reducers)}>
  NOW: (see below)
    <Provider store={store}>
*/
// NEW: create reduxStore AHEAD OF TIME
// BEFORE all that RENDERING going on below
// That way we can Check whether we have a Token!
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
// IF THERE'S A TOKEN, USER IS LOGGED IN! :o)
if (token) {
  // we need to update application state
  // can we modify state directly? NO !!
  // Instead we dispatch an action to do so
  // dispatch is a method on the store !
  // This will send our action to all our reducers
  store.dispatch( { type: AUTH_USER } );
  // Changes authenticated from false to true
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin}>
        </Route>
        <Route path="signup" component={Signup}>
        </Route>
        <Route path="signout" component={Signout}>
        </Route>
        <Route path="feature" component={RequireAuth(Feature)}>
        </Route>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
