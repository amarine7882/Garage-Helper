import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import Garage from './Garage';
import Nav from './Nav';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: 'place.com'
    };
  }

  render() {
    const { userID } = this.state;

    return (
      <div>
        <Nav />
        <Garage userID={userID} />
      </div>
    );
  }
}

export default hot(module)(App);
