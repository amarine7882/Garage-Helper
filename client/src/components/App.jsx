import React, { Component } from 'react';

import Garage from './Garage';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: ''
    };
  }

  componentDidMount() {
    // TODO: Update to prompt or login
    this.setState({ userID: 'place.com' });
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
