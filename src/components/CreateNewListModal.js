import React, { Component } from 'react'
import {Input, Row, Col, Modal, message} from 'antd';
import { createNewList } from '../api/flipr';
export default class CreatePersonalBoardModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: this.props.visible,
            name: undefined
        }
    }


    handleOk = async () => {
        const response = await createNewList(this.state.name, this.props.board.id);
        message.success("New list created successfully");
        this.props.toggleNewListModalVisiblity(false)
    }

    handleCancel = () => {
        this.props.toggleNewListModalVisiblity(false)
    }

    handleListNameChange = e => {
        this.setState({name: e.target.value});
    }
    render() {
        return (
            <Modal
          title="Create New List"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row>
            <Col lg={6}>
              {" "}
              <b>Enter new list name:</b>
            </Col>
            <Col lg={10}>
              <Input onChange = { this.handleListNameChange }/>
            </Col>
          </Row>
        </Modal>
        )
    }
}