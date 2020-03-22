import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import LoginModal from "../components/LoginModal";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import RegistrationModal from "../components/RegistrationModal";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginModalVisible: false,
      isRegistrationModalVisible: false,
      isForgotPasswordModalVisible: false
    };
  }

  toggleLogInModalVisiblity = booleanValue => {
    this.setState({ isLoginModalVisible: booleanValue });
  };

  toggleRegisrationModalVisiblity = booleanValue => {
    this.setState({ isRegistrationModalVisible: booleanValue });
  };
  toggleForgotPasswordModalVisiblity = booleanValue => {
    this.setState({ isForgotPasswordModalVisible: booleanValue });
  };

  handleLogInClick = () => {
    this.setState({ isLoginModalVisible: true });
  };

  handleRegistrationClick = () => {
    this.setState({ isRegistrationModalVisible: true });
  };
  handleForgotPasswordClick = () => {
    this.setState({ isForgotPasswordModalVisible: true });
  };

  render() {
    return (
      <div className="home-page-container">
        <Row className="home-page-row">
          <Col span={12}>
            <Button
              type="primary"
              className="home-page-btn"
              onClick={this.handleLogInClick}
            >
              LOG IN
            </Button>
          </Col>
          <Col span={12}>
            <Button 
                type="primary" 
                className="home-page-btn"
                onClick={this.handleRegistrationClick}>
              REGISTER
            </Button>
          </Col>
        </Row>
        <Row className="home-page-row">
          <Col span={24}>
            <p 
                className="forgot-password-text"
                onClick={this.handleForgotPasswordClick}> Forgot Password </p>
          </Col>
        </Row>
        {this.state.isLoginModalVisible && (
          <LoginModal
            visible={this.state.isLoginModalVisible}
            toggleLogInModalVisiblity={this.toggleLogInModalVisiblity}
            setUserEmail={this.props.setUserEmail}
          />
        )}
        {this.state.isRegistrationModalVisible && (
          <RegistrationModal
            visible={this.state.isRegistrationModalVisible}
            toggleRegisrationModalVisiblity={this.toggleRegisrationModalVisiblity}
            setUserEmail={this.props.setUserEmail}
          />
        )}
        {this.state.isForgotPasswordModalVisible && (
          <ForgotPasswordModal
            visible={this.state.isForgotPasswordModalVisible}
            toggleForgotPasswordModalVisiblity={this.toggleForgotPasswordModalVisiblity}
          />
        )}
      </div>
    );
  }
}
