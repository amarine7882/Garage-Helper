import React, { Component } from 'react';

import Garage from './Garage';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: 'place.com'
    };
  }

  componentDidMount() {
    // const userID = prompt('Enter email:');
    // TODO: add user login
    // this.setState({ userID });
  }

  render() {
    const { userID } = this.state;

    return (
      <div>
        <Garage userID={userID} />
      </div>
    );
  }
}
