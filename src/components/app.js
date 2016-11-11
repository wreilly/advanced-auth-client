import React, { Component } from 'react';

import Header from './header';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <p>Client Auth React-Redux simple starter</p>
        {this.props.children}
      </div>
    );
  }
}
