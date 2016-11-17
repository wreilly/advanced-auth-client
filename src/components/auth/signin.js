// https://www.udemy.com/react-redux-tutorial/learn/v4/questions/1590508
// REDUX-FORM V6
// http://redux-form.com/6.2.0/docs/MigrationGuide.md/

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

// ReduxForm v6 requires you to use connect yourself
// (v5 had connect built in, for you)
import { connect } from 'react-redux';

// import {signinUser } from '../../actions';
import * as actions from '../../actions';


// Copied from Udemy course Q&A page
// I guess 'renderField' must be reserved/required word from redux-form
/*
Note how used: renderField is a COMPONENT ( ? )
(my oh my)
<Field
  name="email"
  label="Email"
  component={renderField}
/>
So, it's declared here, above and outside the Class, as a const.
Doesn't work if you try to put this code inside the Class. Cheers.
Note though that, hmm, if this is a COMPONENT ( ? ), it doesn't get that whole class MyThing extends Component biz. Hmm.
Is it a COMPONENT?
If it isn't, should redux-form people have called it a COMPONENT ?
And if it is, pls. 'splain some of the how/why difference and all that ? ?

******** FOUND SOMETHING: ******
http://redux-form.com/6.2.0/examples/syncValidation/
Notice the reused stateless function component used to render each field. It is important that this not be defined inline (in the render() function), because it will be created anew on every render and trigger a rerender for the field, because the component prop will have changed.
****************************
*/
/* ************ */
const renderField = (
  {
    input,
    label,
    type,
    meta: {
      touched,
      error
    }
  }
) => (
  <fieldset className="form-group">
    <label>{label}</label>
    <div>
      <input
        {...input}
        type={type}
        placeholder={label} className="form-control"
      />
      { touched &&
        error &&
        <span className="error">{error}</span>
      }
    </div>
  </fieldset>
);
/* *************
*/



class Signin extends Component {

// Copied from course page
// renderField must be reserved/required word from redux-form
/* ***************
NOPE.
This code does NOT belong here inside the Class.
Just a little test. (See notes above.)

bundle.js:29345 Uncaught ReferenceError: renderField is not defined(…)
*/
/* ******************
renderField (
  {
    input,
    label,
    type,
    meta: {
      touched,
      error
    }
  }
)  {
  return (
  <fieldset className="form-group">
    <label>{label}</label>
    <div>
      <input
        {...input}
        type={type}
        placeholder={label} className="form-control"
      />
      { touched &&
        error &&
        <span className="error">{error}</span>
      }
    </div>
  </fieldset>
  );
}
  ***************
*/




  handleFormSubmit( { email, password} ) {
    this.props.signinUser( { email, password } );
  }

  renderAlert() {
    if (this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops.</strong>
          {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          name="email"
          label="Email"
          component={renderField}
        />
        <Field
          name="password"
          label="Password"
          type="password"
          component={renderField}
        />
      {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign In!</button>
      </form>
    );
  }
} // /class Signin


function mapStateToProps(state) {
  // console.log("WR__ SI 87 that map thing state: ", state);
  // console.log("WR__ SI 88 that map thing state.auth: ", state.auth);

  return { errorMessage: state.auth.error };
}

// ReduxForm v5 helper (includes connect helper)
// ReduxForm v6 helper does *not* include  connect helper - you must explicitly use connect
// http://redux-form.com/6.2.0/examples/simple/

// A HOC, n'est-ce pas? (config)(component)
// that null is for mapStateToProps (which we're not using (yet))
// we pass actions so we get access to all (*) our actions on props inside our component (Signin)

// 1. Do the reduxForm v6 "decoration (?)" on our Signin component
Signin = reduxForm({
  form: 'signin',
  // no array of fields in ReduxForm v6
})(Signin);

// 2. Do the connect on it too`
export default Signin = connect(mapStateToProps, actions)(Signin);
