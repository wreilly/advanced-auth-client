// https://www.udemy.com/react-redux-tutorial/learn/v4/questions/1590508
// REDUX-FORM V6
// http://redux-form.com/6.2.0/docs/MigrationGuide.md/

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

// ReduxForm v6 requires you to use connect yourself
// (v5 had connect built in, for you)
import { connect } from 'react-redux';

import * as actions from '../../actions';


/* *** REDUXFORM V6  **********
*/
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


class Signup extends Component {


/* JESUS CHRIST IF THIS WORKS I'LL BE PISSED
AND IT WORKS!
AND I'M PISSED
(as well as veddy veddy glad)

https://gist.github.com/ZwaarContrast/1a8510954d6c0f602e283cce01e3fd1d
CORRECT-A-MUNDO:
Line 8
  handleSignin({ email, password }){ ...

/SRC/COMPONENTS/AUTH/SIGNUP.JS:
---------
I have: PROBLEMATIC-O:
  handleFormSubmit ( values ) { ... << No Stinkin' "values" here!
Oughta be (I think): << Spell 'em out!!
  handleFormSubmit ( {email, password, passwordConfirmation } ) { ...
Or (same deal):
  handleFormSubmit ( {
    email: email,
    password: password,
    passwordConfirmation:passwordConfirmation } ) { ...
*/
  // handleFormSubmit ( { email, password, passwordConfirmation } ) {
  // handleFormSubmit ( values ) {
  handleFormSubmit ( { email, password, passwordConfirmation } ) {

    // The client-side validation on password match:
    // Hmm - client-side is in VALIDATE(), not here ...

// NO. No "values" nor "formProps". We have to spell out each form field.
    // console.log("WR__ SIGNUP 7766 handleFormSubmit(values) values: ", values);
    console.log("WR__ SIGNUP 5544 handleFormSubmit(email, password, passwordConfirmation) values: ", email, password, passwordConfirmation);


    // server-side signup (with its own validation)
    // this.props.signupUser( { email, password} );
    // this.props.signupUser( values ); // ?
    this.props.signupUser( { email, password, passwordConfirmation} );
  }


  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Voops.</strong>
          {this.props.errorMessage}
        </div>
      )
    }
  }


  render() {
    const { handleSubmit } = this.props;

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
        <Field
          name="passwordConfirmation"
          label="Password Confirmation"
          type="password"
          component={renderField}
        />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up!</button>
      </form>
    );
  }
}

// http://redux-form.com/6.0.0-alpha.4/examples/syncValidation/
// 'validate' RESERVE WORD for REDUXFORM
// function validate(fieldsObject) {
function validate(values) {
    /*
    We get an Object - fieldnames and field values
    We return a new Object - fieldnames and error message values
    */

    console.log("WR__ SIGNUP 9988 validate() values: ", values);

    // OUR Object to return:
    const errors = {};

    // default
    return errors;
  }


function mapStateToProps(state) {
  return {
    // t.b.d. Anything re: that client-side validation ?? hmm. don't think so.
    errorMessage: state.auth.error
  };
}

// 1. (As in SIGNIN.JS) - Do the reduxForm v6 "decoration (?)" on our Signin component
Signup = reduxForm({
  form: 'signup',
    // no array of fields in ReduxForm v6
  // validate: validate
  validate
})(Signup);

// 2. Do the connect on it too`
// http://www.pshrmn.com/tutorials/react/react-redux/
// export default connect(mapStateToProps, validate, actions)(Signup); // << WRONG
// export default connect(
//   mapStateToProps,
//   {
//     // validate: validate, // Oops. validate is NOT an Action Creator.
//     actions: actions
//   }
// )(Signup);
export default connect(mapStateToProps, actions)(Signup);
