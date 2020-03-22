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
          <Col lg={24}>
                <h1 className="home-page-logo"> TASK HANDLER  </h1>
          </Col>
        </Row>
        <Row className="home-page-row">
          <Col lg={24}>
            <p class="home-page-instruction"> Introducing task handler to make your life easier.
                Manage your personal or professional, individual or team tasks on the go with Task handler.
                Task Handler has been designed especially to make your life easy and beautiful.
                Don't worry we have lot more things other than keeping track your activities. Register now to enjoy the perks.
              </p>

          </Col>

        </Row>
        

        <Row className="home-page-row">
          <Col lg={12} xs={12}>
            <Button
              type="primary"
              className="home-page-btn home-page-login-btn"
              onClick={this.handleLogInClick}
            >
              LOG IN
            </Button>
          </Col>
          <Col lg={12} xs={12}>
            <Button 
                type="primary" 
                className="home-page-btn home-page-reg-btn"
                onClick={this.handleRegistrationClick}>
              REGISTER
            </Button>
          </Col>
        </Row>
        <Row className="home-page-row">
          <Col lg={15} xs={17}>
            <p 
                className="forgot-password-text float-right"
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
