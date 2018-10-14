import React, { Component } from 'react';
import CarContainer from './CarContainer';
import NewCarForm from './NewCarForm';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      isCreating: false,
    };

    this.displayNewCarForm = this.displayNewCarForm.bind(this);
  }

  componentDidMount() {
    const userId = prompt('User Name:');

    this.setState({ userId });
  }

  displayNewCarForm() {
    this.setState({ isCreating: true });
  }

  render() {
    const { isCreating } = this.state;

    return (
      <div>
        <button type="button" onClick={this.displayNewCarForm}>
          Create New Car
        </button>
        <NewCarForm isCreating={isCreating} />
      </div>
    );
  }
}
