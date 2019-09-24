import React from 'react';
import { Button, Row, Col, Typography } from 'antd';

import './Landing.scss';

export class Landing extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { signIn } = this.props;

    return (
      <div className="page">
        <Row>
          <Col xs={24} className="landing">
            <img src="/icon.png" className="logo" alt="Vyse Auth" />
            <Typography.Title level={2}>Vyse Auth</Typography.Title>
            <Typography.Title level={4}>
              Privacy First 2FA Token Manager
            </Typography.Title>
            <Button size="large" type="primary" onClick={signIn.bind(this)}>
              Sign In with Blockstack
            </Button>
            <Typography.Paragraph>
              <a href="https://www.producthunt.com/posts/vyse-auth?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-vyse-auth" target="_blank" rel="noopener noreferrer">
                <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=168984&theme=dark" alt="Vyse Auth - Privacy First and Always Available 2FA Token Manager | Product Hunt Embed" style={{ width: "250px", height: "54px", marginTop: "2em" }} width="250px" height="54px" />
              </a>
            </Typography.Paragraph>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col xs={24} sm={16}>
            <img src="/images/mockup-desktop.png" alt="Vyse Auth" className="mock-reset" />
          </Col>
          <Col xs={24} sm={8}>
            <img src="/images/mockup-mobile.png" alt="Vyse Auth" className="mock-reset" />
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={12}>
            <img src="/images/why.png" alt="" />
          </Col>
          <Col xs={24} sm={12} className="content-container">
            <Typography.Title level={1}>Why 2FA?</Typography.Title>
            <Typography.Title level={4}>
              Relying on just usernames and passwords to secure your online accounts is no longer considered safe. Protect yourself by enabling two-factor authentication (2FA). This blocks anyone using your stolen data by verifying your identity through your device.
            </Typography.Title>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={12} className="content-container">
            <Typography.Title level={1}>Secure</Typography.Title>
            <Typography.Title level={4}>
              Vyse Auth is secured by Blockstack's security promise. Blockstack ID provides user-controlled login and storage that enable you to take back control of your identity and data. Your data is stored on your private data lockers with blockchain-based security and encryption.
            </Typography.Title>
            <a href="https://blockstack.org/try-blockstack" className="link" rel="noopener">
              <Typography.Title level={4}>Learn More</Typography.Title>
            </a>
          </Col>
          <Col xs={24} sm={12}>
            <img src="/images/secure.png" alt="" />
          </Col>
        </Row>
        {/* <Row>
          <Col xs={24} sm={12}>
            <img src="/images/available.png" alt="" />
          </Col>
          <Col xs={24} sm={12} className="content-container">
            <Typography.Title level={1}>Always Available</Typography.Title>
            <Typography.Title level={4}>
              Vyse Auth is always available, even when you're offline. Your 2FA tokens are stored on your device and updated when you go online. Never get locked out just because you have no connection.
            </Typography.Title>
          </Col>
        </Row> */}
        <Row>
          <Col xs={24} sm={12}>
            <img src="/images/lost.png" alt="" />
          </Col>
          <Col xs={24} sm={12} className="content-container">
            <Typography.Title level={1}>Access Your Content Anywhere</Typography.Title>
            <Typography.Title level={4}>
              Vyse Auth is available on all your devices. It can be your laptop, your phone, even your game console or your TV! All your 2FA tokens sync across devices and are always available for use.
            </Typography.Title>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Landing;
