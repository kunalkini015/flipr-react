import React, { Component } from "react";
import { Row, Col, Input, Modal, message } from "antd";
import { register } from "./../api/flipr";

export default class RegistrationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      name: undefined,
      email: undefined,
      password: undefined,
      confirmedPassword: undefined
    };
  }

  handleOk = async () => {
    if (this.state.name === undefined)
      message.error("Please enter your name to continue");
    else if (this.state.email === undefined)
      message.error("Please enter an email to continue");
    else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)))
      message.error("Please enter a valid email")
    else if (this.state.password === undefined)
      message.error("Please enter a password to continue");
    else if (this.state.confirmPassword === undefined)
      message.error("Please confirm password to continue");
    else if (this.state.password !== this.state.confirmPassword)
      message.error("Password doesn't match");
    else {
      try {
        const response = await register(
          this.state.name,
          this.state.email,
          this.state.password
        );
        message.success("Registered Successfully. Please log in to continue");
        this.props.toggleRegisrationModalVisiblity(false);
      } catch (err) {
      }
    }
  };

  handleCancel = () => {
    this.props.toggleRegisrationModalVisiblity(false);
  };
  handleNameChange = e => {
    this.setState({ name: e.target.value });
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
          title="Register"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row>
            <Col lg={6}>
              {" "}
              <b>Name:</b>
            </Col>
            <Col lg={10}>
              <Input
                placeholder="Enter your full name"
                onChange={this.handleNameChange}
              />
            </Col>
          </Row>
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
