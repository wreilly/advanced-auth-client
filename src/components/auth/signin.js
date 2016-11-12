// https://www.udemy.com/react-redux-tutorial/learn/v4/questions/1590508
// REDUX-FORM V6
// http://redux-form.com/6.2.0/docs/MigrationGuide.md/

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

// import {signinUser } from '../../actions';
import * as actions from '../../actions';

const renderField = (
  {
    input, label, type, meta: {
      touched, error
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
)
;

class Signin extends Component {

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
}


function mapStateToProps(state) {
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
