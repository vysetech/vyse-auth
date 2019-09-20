import React from 'react';
import { Empty, Typography, Button, Icon, Drawer, Input, Tooltip, Form, Skeleton, message } from 'antd';
import SingleToken from './SingleToken/SingleToken';
import QrReader from 'react-qr-reader';

import './TokenList.scss';

export class TokenList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      tokenIndex: 0,
      tokens: [],
      drawerVisible: false,
      qrVisible: false,
      tempCompany: "",
      tempUsername: "",
      tempSecret: ""
    };
  }

  async fetchData() {
    const { userSession } = this.props;
    this.setState({
      isLoading: true
    });
    const file = await userSession.getFile('tokens.json');
    const tokens = JSON.parse(file || '[]');
    const tokenIndex = tokens.reduce((res, item) => res > item.id ? res : item.id, 0);
    console.log(tokenIndex);
    this.setState({
      tokenIndex,
      tokens,
      isLoading: false
    });
  }

  showDrawer = () => {
    this.setState({
      drawerVisible: true
    });
  };

  showQrScanner = () => {
    this.setState({
      qrVisible: true
    });
  };

  onClose = () => {
    this.setState({
      drawerVisible: false,
      qrVisible: false
    });
  };

  handleAddToken = (e) => {
    e.preventDefault();
    console.log(e);
  }

  handleTempCompany = (e) => {
    console.log(e.target.value);
    this.setState({
      tempCompany: e.target.value
    });
  }

  handleTempUsername = (e) => {
    this.setState({
      tempUsername: e.target.value
    });
  }

  handleTempSecret = (e) => {
    this.setState({
      tempSecret: e.target.value
    });
  }

  async handleSaveToken() {
    const { tokens, tokenIndex, tempCompany, tempUsername, tempSecret } = this.state;
    const { userSession } = this.props;
    this.setState({
      isLoading: true
    });
    if ([tempCompany, tempUsername, tempSecret].map(e => e.trim().toLowerCase()).indexOf("") > -1) {
      message.error("One of the values is missing!", 3);
      return;
    }
    tokens.push({
      id: tokenIndex + 1,
      user: tempUsername,
      service: tempCompany,
      secretKey: tempSecret
    });
    await userSession.putFile('tokens.json', JSON.stringify(tokens));
    this.setState({
      tokens,
      drawerVisible: false,
      qrVisible: false,
      tokenIndex: tokenIndex + 1,
      tempCompany: "",
      tempUsername: "",
      tempSecret: "",
      isLoading: false
    });
  }

  handleScan = data => {
    if (data && !this.state.isLoading) {
      const te = new URL(data);
      this.setState({
        tempCompany: te.searchParams.get("issuer"),
        tempUsername: te.pathname.split("/").slice(-1)[0].split(":").slice(-1)[0],
        tempSecret: te.searchParams.get("secret"),
        qrVisible: false,
      }, this.handleSaveToken);
    }
  }

  async removeToken(e) {
    let { tokens } = this.state;
    const { userSession } = this.props;
    this.setState({
      isLoading: true
    });
    tokens = tokens.filter(f => f.id !== e);
    await userSession.putFile('tokens.json', JSON.stringify(tokens));
    this.setState({
      tokens: tokens.filter(f => f.id !== e),
      isLoading: false
    });
  }

  handleError = err => {
    console.error(err)
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { tokens, drawerVisible, qrVisible, isLoading } = this.state;
    const { tempCompany, tempUsername, tempSecret } = this.state;

    return (
      <div className="holder">
        <Typography.Title level={2}>Authentication Tokens</Typography.Title>
        <div className="actions">
          <Button.Group size={'large'}>
            <Button type="primary" onClick={this.showDrawer}>
              <Icon type="plus" /> Add New
            </Button>
            <Button type="primary" onClick={this.showQrScanner}>
              Scan QR <Icon type="qrcode" />
            </Button>
          </Button.Group>
        </div>
        <Drawer
          title="Add Token"
          placement="bottom"
          closable={true}
          onClose={this.onClose}
          visible={drawerVisible}
          height={'70%'}
          style={{ textAlign: "center" }}
          destroyOnClose
        >
          <div className="add-holder">
            <Form onSubmit={this.handleAddToken}>
              <Form.Item>
                <Input
                  placeholder="Service Name"
                  size={'large'}
                  allowClear
                  prefix={<Icon type="appstore" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  suffix={
                    <Tooltip title="Name of the service or company">
                      <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                  }
                  onChange={this.handleTempCompany}
                  value={tempCompany}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder="Username"
                  size={'large'}
                  allowClear
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  suffix={
                    <Tooltip title="Username Identifier">
                      <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                  }
                  onChange={this.handleTempUsername}
                  value={tempUsername}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder="Secret Key"
                  size={'large'}
                  allowClear
                  prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  suffix={
                    <Tooltip title="Secret Key for 2FA">
                      <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                  }
                  onChange={this.handleTempSecret}
                  value={tempSecret}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={this.handleSaveToken.bind(this)}
                  loading={this.state.isLoading}
                >
                  Add
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Drawer>
        <Drawer
          title="Add Token"
          placement="bottom"
          closable={true}
          onClose={this.onClose}
          visible={qrVisible}
          height={'70%'}
          style={{ textAlign: "center" }}
          destroyOnClose
        >
          <div className="qr-holder">
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%' }}
            />
          </div>
        </Drawer>
        <div className="tokens">
          {
            isLoading ? (<Skeleton active />) : (tokens.length > 0 ? tokens.map(token => (
              <SingleToken key={token.id} token={token} remove={this.removeToken.bind(this)} />
            )) : (<Empty description={
              <span>
                You have no tokens, start by adding a new 2FA Token!
              </span>
            } />))
          }

        </div>
      </div>
    );
  }
}

export default TokenList;
