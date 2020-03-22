import React, { Component } from "react";
import { Row, Col, Modal, Input, message } from "antd";
import { login } from "../api/flipr";
import history from './../history';
import { Redirect } from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';
export default class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      email: undefined,
      password: undefined
    };
  }

  handleOk = async () => {
        if(this.state.email === undefined)
            message.error("Please enter an email to continue");
        else if(this.state.password === undefined)
            message.error("Please enter a password to continue");
        else{
          
          try {
            const response = await login(this.state.email, this.state.password);
            message.success("Login successfull");
            this.props.setUserEmail(this.state.email)
            reactLocalStorage.set('email', this.state.email);
            history.replace("/main/");
            this.props.toggleLogInModalVisiblity(false);
          }
          catch(err){
            message.error(err.response.data);

          }

        }
            
  };

  handleCancel = () => {
    this.props.toggleLogInModalVisiblity(false);
  };

  handleEmailChange = e => {
      this.setState({email: e.target.value})
  }

  handlePasswordChange = e => {
      this.setState({password: e.target.value})
  }


  render() {
    return (
      <div>
        <Modal
          title="LOG IN"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row>
            <Col lg={6}>
              {" "}
              <b>Email:</b>
            </Col>
            <Col lg={10}>
              <Input onChange = {this.handleEmailChange }/>
            </Col>
          </Row>
          <Row className="row-top-margin">
            <Col lg={6}>
              <b>Password:</b>{" "}
            </Col>
            <Col lg={10}>
              <Input onChange = {this.handlePasswordChange }/>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
