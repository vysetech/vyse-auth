import React from 'react';
import { Avatar, Typography, Button } from 'antd';
import { Person } from 'blockstack';
import TokenList from './TokenList/TokenList';

import './UserPage.scss';

const { Title } = Typography;

export class UserPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      person: {
        name() {
          return 'Anonymous';
        },
        avatarUrl() {
          return 'https://s3.amazonaws.com/onename/avatar-placeholder.png';
        },
      },
      username: ""
    };
  }

  componentDidMount() {
    const { userSession } = this.props;
    const userData = userSession.loadUserData();

    this.setState({
      person: new Person(userData.profile),
      username: userData.username
    });
  }

  render() {
    const { userSession } = this.props;
    const { person, username } = this.state;

    return (
      <div className="page">
        <div className="profile">
          <Avatar
            src={person.avatarUrl()}
            name={person.name()}
            size={120}
          />
          <Title level={3}>{person.name()}</Title>
          <Title level={4}>{username}</Title>
          <Button onClick={this.props.handleSignOut.bind(this)} style={{ marginTop: '10px' }}>
            Logout
          </Button>
        </div>
        <div className="auth">
          <TokenList userSession={userSession} />
        </div>
      </div>
    );
  }
}

export default UserPage;
