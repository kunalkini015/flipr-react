import React, { Component } from 'react'
import {Row, Col, Modal,Input,message} from 'antd';
import { createNewPersonalBoard } from '../api/flipr';
import {reactLocalStorage} from 'reactjs-localstorage';

export default class CreatePersonalBoardModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: this.props.visible,
            name: undefined
        }
    }


    handleOk = async () => {
      if(this.state.name === undefined)
        message.error("Please enter a name to continue");
      else
      {
        const email = reactLocalStorage.get('email', true);
        const response = await createNewPersonalBoard(this.state.name, email);
        message.info("Success! We have added 3 lists for you! Feel free to add or delete!", 10)
        this.props.toggleSelecedPersonalBoard(true, response.data)
        this.props.toggleCreateModalVisibility(false)
      }
    }

    handleCancel = () => {
        this.props.toggleCreateModalVisibility(false)
    }

    handleBoardNameChange = e => {
        this.setState({name: e.target.value});
    }
    render() {
        return (
            <Modal
          title="Create board"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row>
            <Col lg={6}>
              {" "}
              <b>Board name:</b>
            </Col>
            <Col lg={10}>
              <Input onChange = {this.handleBoardNameChange }/>
            </Col>
          </Row>
        </Modal>
        )
    }
}
