import React, { Component } from 'react'
import {Row, Col, Modal,Input,message, Select} from 'antd';
import { createNewTeamBoard } from '../api/flipr';
import {reactLocalStorage} from 'reactjs-localstorage';


const { Option } = Select;
export default class CreatePersonalBoardModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: this.props.visible,
            name: undefined,
            children:[],
            selectedMembers: []
        }
    }


    handleOk = async () => {

        const email = reactLocalStorage.get('email', true);
        const response = await createNewTeamBoard(this.state.name, this.state.selectedMembers, email);
        message.info("We have prepopulated your board with following lists. Feel free to delete or add new lists", 10)
        this.props.toggleSelectedTeamBoard(true, response.data)
        this.props.toggleCreateTeamBoardModalVisibility(false)
    }

    handleCancel = () => {
        this.props.toggleCreateTeamBoardModalVisibility(false)
    }

    handleBoardNameChange = e => {
        this.setState({name: e.target.value});
    }


    handleChange = (value) => {
        this.setState({
            children: [],
            selectedMembers:  value
        })
    }

    handleSearch = (value) => {

        const children = this.state.children;
        children.push(value);
        this.setState({children})
    }

    renderOptions = () => {
        return (
            this.state.children.map((item) => {
                return <Option key={item}> {item} </Option>
            })
        )
    }

    render() {
        return (
            <Modal
          title="LOG IN"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row>
            <Col lg={6}>
              {" "}
              <b>Enter board name:</b>
            </Col>
            <Col lg={10}>
              <Input onChange = {this.handleBoardNameChange }/>
            </Col>
          </Row>

          <Row>
          <Col lg={6}>
              <b>Add members:</b>
            </Col>
            <Col lg={10}>
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={this.handleChange}
                onSearch={this.handleSearch}
            >
                {this.renderOptions()}
            </Select>
            </Col>

          </Row>
        </Modal>
        )
    }
}
