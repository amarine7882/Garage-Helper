import React, { Component } from 'react';
import CarContainer from './CarContainer';
import NewCarForm from './NewCarForm';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: '',
      isCreating: false
    };

    this.toggleNewCarForm = this.toggleNewCarForm.bind(this);
  }

  componentDidMount() {
    const userID = prompt('email:');

    this.setState({ userID });
  }

  toggleNewCarForm() {
    const { isCreating } = this.state;

    this.setState({ isCreating: !isCreating });
  }

  render() {
    const { isCreating, userID } = this.state;

    return (
      <div>
        <button type="button" onClick={this.toggleNewCarForm}>
          Create New Car
        </button>
        <NewCarForm
          isCreating={isCreating}
          userID={userID}
          toggleNewCarForm={this.toggleNewCarForm}
        />
      </div>
    );
  }
}
