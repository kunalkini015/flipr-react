import React, { Component } from "react";
import { Row, Col, Input, Modal, message } from "antd";
import { forgotPassword } from "../api/flipr";

export default class ForgotPasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      email: undefined,
      password: undefined,
      confirmedPassword: undefined
    };
  }

  handleOk = async () => {

    if (this.state.email === undefined)
      message.error("Please enter an email to continue");
    else if (this.state.password === undefined)
      message.error("Please enter a password to continue");
    else if (this.state.confirmPassword === undefined)
      message.error("Please confirm password to continue");
    else if (this.state.password !== this.state.confirmPassword)
      message.error("Password doesn't match");
    else {
      await forgotPassword(this.state.email, this.state.password);
      this.props.toggleForgotPasswordModalVisiblity(false);
    }
  };

  handleCancel = () => {
    this.props.toggleForgotPasswordModalVisiblity(false);
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handleConfirmPasswordChange = e => {
    this.setState({ confirmPassword: e.target.value });
  };
  render() {
    return (
      <div>
        <Modal
          title="Forgot Password"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row className="row-top-margin">
            <Col lg={6}>
              {" "}
              <b>Email:</b>
            </Col>
            <Col lg={10}>
              <Input
                placeholder="Enter email"
                onChange={this.handleEmailChange}
              />
            </Col>
          </Row>
          <Row className="row-top-margin">
            <Col lg={6}>
              <b>Password:</b>{" "}
            </Col>
            <Col lg={10}>
              <Input
                placeholder="Enter password"
                type="password"
                onChange={this.handlePasswordChange}
              />
            </Col>
          </Row>
          <Row className="row-top-margin">
            <Col lg={6}>
              <b>Confirm:</b>{" "}
            </Col>
            <Col lg={10}>
              <Input
                placeholder="Enter password again"
                type="password"
                onChange={this.handleConfirmPasswordChange}
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
