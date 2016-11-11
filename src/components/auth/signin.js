import React, { Component } from 'react';

import { reduxForm } from 'redux-form';

import * as actions from '../../actions';

console.log("WR__ 02 /auth/signin.js actions ? ", actions);
/* Yep:
WR__ 02 /auth/signin.js actions ?  Object__esModule: true
signinUser: signinUser(_ref)
*/

class Signin extends Component {

    // ES6 destructure biz
    // ( { email: email, password: password })
  handleFormSubmit( { email, password} ) {
    console.log("WR__ 01 handleFormSubmit email, password: ", email, password);
/* WR__ 01 handleFormSubmit email, password:  undefined undefined
*/


    // need to log user in (sign 'em in)

    // ACTION:
    // ES6 destructure biz
    // ( { email: email, password: password })

console.log("WR__ 03 /auth/signin.js this.props.signinUser ? ", this.props.signinUser);
/* bundle.js:29258 WR__ 03 /auth/signin.js this.props.signinUser ?  undefined
*/


    this.props.signinUser( { email, password } );
  }

  render() {
    console.log("WR__ 00 this.props in render Signin ", this.props);

    // this.props - handleSubmit, getting from ReduxForm

    // all these damned curly braces are that cutesie ES6 "destructuring" (ooh)
    // they are *not* a JavaScript object
    // that's why they look so weird
    const { handleSubmit, fields: { email, password } } = this.props

    console.log("WR__ 00A this.props.fields.email in render Signin ", this.props.fields.email );

// ????????????????????? TODO
//  SyntaxError: Unexpected token (22:16) (fields.email)
    // const fields.email = this.props.fields.email;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" className="form-control" />
        </fieldset>
        <button action="submit" className="btn btn-primary">Sign In!</button>
      </form>
    );
  }
}

// Redux helper (like connect helper)
// A HOC, n'est-ce pas? (config)(component)
// that null is for mapStateToProps (which we're not using (yet))
// we pass actions so we get access to all (*) our actions on props inside our component (Signin)

console.log("WR__ 04 /auth/signin.js actions at BOTTOM export ? ", actions);


export default reduxForm({
  // actual name of the form (?...)
  form: 'signin',
  fields: [ 'email', 'password' ]
}, null, actions)(Signin);
// http://redux-form.com/6.2.0/examples/simple/
