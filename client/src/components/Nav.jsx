import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'garage'
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing secondary>
          <Menu.Item
            name="garage"
            active={activeItem === 'garage'}
            onClick={this.handleMenuClick}
          />
          <Menu.Menu position="right">
            <Menu.Item name="logout" />
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}
