import React from 'react';
import { Card, Icon, Progress, Typography, Drawer, Descriptions, Modal } from 'antd';
import { authenticator } from 'otplib/otplib-browser';

import './SingleToken.scss';

export class SingleToken extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      timeRemaining: null,
      showInfo: false
    };
    this.timeStep = 30;
  }

  updateToken() {
    const { secretKey } = this.props.token;
    const token = authenticator.generate(secretKey);
    const timeRemaining = authenticator.timeRemaining();

    this.setState({
      token,
      timeRemaining
    });
    this.timer = setTimeout(this.updateToken.bind(this), 1000);
  }

  onClose = () => {
    this.setState({
      showInfo: false
    });
  };

  showInfo = () => {
    this.setState({
      showInfo: true
    });
  }

  componentDidMount() {
    this.updateToken();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { id, user, service, secretKey } = this.props.token;
    const { token, timeRemaining } = this.state;
    const { remove } = this.props;

    return (
      <div className="token" key={id}>
        <Card
          hoverable
          actions={[
            <Icon type="delete" key="delete" theme="twoTone" twoToneColor="#eb2f96" onClick={() => {
              Modal.confirm({
                title: 'Are you sure?',
                content: (
                  <div>
                    <Typography.Paragraph>This action is irreversible.</Typography.Paragraph>
                    <Typography.Paragraph><strong>{service}</strong> - <strong>{user}</strong></Typography.Paragraph>
                    <Typography.Paragraph>will be removed permanently.</Typography.Paragraph>
                  </div>
                ),
                onOk() {
                  remove(id);
                }
              })
            }} />,
            <Icon type="eye" key="eye" onClick={this.showInfo} />
          ]}
        >
          <Typography.Title level={3}>
            <Typography.Paragraph>{service}</Typography.Paragraph>
          </Typography.Title>
          <Typography.Paragraph>{user}</Typography.Paragraph>
          <Typography.Title level={3} className="code">
            <Typography.Paragraph copyable>{token}</Typography.Paragraph>
          </Typography.Title>
          <Typography.Paragraph type="secondary">
            Your token expires in <strong>{timeRemaining}s</strong>
          </Typography.Paragraph>
          <Progress percent={(timeRemaining / this.timeStep) * 100} showInfo={false} />
        </Card>
        <Drawer
          title="2FA Token Information"
          placement="bottom"
          closable={true}
          onClose={this.onClose}
          visible={this.state.showInfo}
          height={'70%'}
          style={{ textAlign: "center" }}
        >
          <div className="info-holder">
            <Descriptions bordered column={1}>
              {/* <Descriptions.Item label="ID">
                <Typography.Paragraph>{id}</Typography.Paragraph>
              </Descriptions.Item> */}
              <Descriptions.Item label="Service">
                <Typography.Paragraph copyable>{service}</Typography.Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="Username">
                <Typography.Paragraph copyable>{user}</Typography.Paragraph>
              </Descriptions.Item>
              <Descriptions.Item label="Secret Key">
                <Typography.Paragraph copyable>{secretKey}</Typography.Paragraph>
              </Descriptions.Item>
            </Descriptions>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default SingleToken;
