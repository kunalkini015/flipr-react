import React, { Component } from 'react'
import {Input, Row, Col, Modal, DatePicker, Checkbox, TimePicker, Upload, Button, message} from 'antd';
import { createNewList, createNewCard, updateCard } from '../api/flipr';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';

export default class CreatePersonalBoardModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: this.props.visible,
            name: this.props.item.name,
            description: this.props.item.description,
            checked: this.props.item.completed,
            date: this.props.item.due_date,
            time: this.props.item.due_time,
            attachmentDescription: undefined,
            attachmentFile: undefined
        }
    }


    handleOk = async () => {
        const requestObj = {
            name: this.state.name,
            description: this.state.description,
            completed: this.state.checked,
            due_date: this.state.date,
            due_time: this.state.time
        }
        await updateCard(this.props.item.id, this.props.item.archived, requestObj)
        this.props.toggleUpdate(true)
        this.props.toggleCardVisibility(false)
    }

    handleCancel = () => {
        this.props.toggleCardVisibility(false)
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
          title="Create New List"
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row className="row-top-margin">
            <Col lg={8}>
              {" "}
              <b>Enter new Card name:</b>
            </Col>
            <Col lg={10}>
              <Input onChange = { this.handleCardNameChange }
                    value={this.state.name}
              />
            </Col>
          </Row>
          <Row className="row-top-margin">
            <Col lg={8}>
              {" "}
              <b>Description:</b>
            </Col>
            <Col lg={10}>
              <Input type="area" onChange = { this.handleDescriptionChange }
                        value={this.state.description}
              />
            </Col>
          </Row>

          <Row className="row-top-margin">
            <Col lg={6}>
            <Checkbox onChange={this.handleCheckBoxClick}
                checked={this.state.checked}
            >Completed</Checkbox>
            </Col>
            
          </Row>

          <Row className="row-top-margin">
            <Col lg={6}>
              <DatePicker onChange={this.handleDateSelection}  placeholder="Due date"
                value={moment(this.state.date)}
              />
            </Col>
            <Col lg={4}></Col>
            <Col lg={6}>
              <TimePicker onChange={this.handleTimeSelection}  placeholder="Due time"
                value={moment(this.state.time, "HH:mm:ss")}
              />
            </Col>
            
          </Row>
          
            

        </Modal>
        )
    }
}