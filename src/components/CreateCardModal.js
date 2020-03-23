import React, { Component } from 'react'
import {Input, Row, Col, Modal, DatePicker, Checkbox, TimePicker, message} from 'antd';
import { createNewList, createNewCard } from '../api/flipr';
export default class CreatePersonalBoardModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: this.props.visible,
            name: undefined,
            description: undefined,
            checked: false,
            date: undefined,
            time: undefined
        }
    }


    handleOk = async () => {
        if(this.state.name === undefined)
          message.error("Please provide a name to the card")
        else if(this.state.date === undefined)
          message.error("Please select a date to continue")
        else if(this.state.time === undefined)
          message.error("Please select a due time to continue")
        else{
          const response = await createNewCard(this.props.currentList.id, 
            this.state.name,
            this.state.description,
            this.state.checked,
            this.state.date,
            this.state.time
            
            )
            message.success("New card created successfully.")

        this.props.toggleCreateCardModalVisiblity(false)
        }
        
    }

    handleCancel = () => {
        this.props.toggleCreateCardModalVisiblity(false)
    }

    handleCardNameChange = e => {
        this.setState({name: e.target.value});
    }

    handleDescriptionChange = e => {
        this.setState({description: e.target.value});
    }


    handleCheckBoxClick = e => {
        this.setState({checked: e.target.checked})
    }

    handleDateSelection = (date, dateString) => {
        this.setState({date: dateString})
    }

    handleTimeSelection = (time, timeString) => {
      this.setState({ time: timeString })
    }

    render() {
        return (
            <Modal
          title="Add task"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row className="row-top-margin">
            <Col lg={8}>
              {" "}
              <b>Card name:</b>
            </Col>
            <Col lg={10}>
              <Input onChange = { this.handleCardNameChange }/>
            </Col>
          </Row>
          <Row className="row-top-margin">
            <Col lg={8}>
              {" "}
              <b>Description:</b>
            </Col>
            <Col lg={10}>
              <Input onChange = { this.handleDescriptionChange }/>
            </Col>
          </Row>

          <Row className="row-top-margin">
            <Col lg={6}>
            <Checkbox onChange={this.handleCheckBoxClick}>Completed</Checkbox>
            </Col>
            
          </Row>

          <Row className="row-top-margin">
            <Col lg={6}>
              <DatePicker onChange={this.handleDateSelection}  placeholder="Due date"/>
            </Col>
            <Col lg={4}></Col>
            <Col lg={6}>
              <TimePicker onChange={this.handleTimeSelection}  placeholder="Due time"/>
            </Col>
            
          </Row>
            

        </Modal>
        )
    }
}