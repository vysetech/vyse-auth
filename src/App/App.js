import React from 'react';
import { UserSession, AppConfig } from 'blockstack';
import { Layout } from 'antd';
import UserPage from './UserPage/UserPage';

import './App.scss';
import Landing from './Landing/Landing';

const { Header, Content, Footer } = Layout;

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig });

export class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  async waitSignIn() {
    if (userSession.isSignInPending()) {
      await userSession.handlePendingSignIn();
      window.location = window.location.origin;
    }
  }

  componentDidMount() {
    this.waitSignIn();
  }

  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo">
            <img src="/logo.png" alt="" />
          </div>
        </Header>
        <Content>
          <div className="container">
            {
              !userSession.isUserSignedIn() ? <Landing signIn={this.handleSignIn} /> : <UserPage userSession={userSession} handleSignOut={this.handleSignOut} />
            }
          </div>
        </Content>
        <Footer>&copy; 2019 Vyse</Footer>
      </Layout>
    );
  }
}

export default App;
