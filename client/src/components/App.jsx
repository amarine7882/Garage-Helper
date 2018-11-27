import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Layout } from 'antd';

import Garage from './Garage';
import Nav from './Nav';

const { Content, Header, Footer } = Layout;

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
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ position: 'fixed', width: '100%', zIndex: 1 }}>
          <Nav />
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Garage userID={userID} />
        </Content>
        <Footer style={{ textAlign: 'center' }} />
      </Layout>
    );
  }
}

export default hot(module)(App);
