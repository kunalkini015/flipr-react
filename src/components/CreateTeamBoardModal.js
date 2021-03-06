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
        if(this.state.name === undefined)
        message.error("Please enter a name to continue");
      else{
        const email = reactLocalStorage.get('email', true);
        const response = await createNewTeamBoard(this.state.name, this.state.selectedMembers, email);
        message.info("Success! We have added 3 lists for you! Feel free to add or delete!", 10)
        this.props.toggleSelectedTeamBoard(true, response.data)
        this.props.toggleCreateTeamBoardModalVisibility(false)
      }
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

          <Row className="row-top-margin">
          <Col lg={6}>
              <b>Add members:</b>
            </Col>
            <Col lg={10}>
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Add members"
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
