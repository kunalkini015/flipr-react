import React, { Component } from 'react'
import {Row, Col, Modal, message, Select} from 'antd';
import { createNewPersonalBoard, getAllLists, moveCard } from '../api/flipr';
import {reactLocalStorage} from 'reactjs-localstorage';
const { Option } = Select;
export default class CreatePersonalBoardModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: this.props.visible,
            lists: undefined,
            cardId: undefined,
            listId: undefined
        }
    }


    handleOk = async () => {
        if(this.state.listId === undefined)
            message.error("Select a list to continue");
        else  {
            moveCard(this.state.cardId, this.state.listId);
            message.success("Card moved successfully. Please refresh to see the changes");
            this.props.toggleMoveVisibility(false)

        }
    }

    handleCancel = () => {
        this.props.toggleMoveVisibility(false)
    }

    handleBoardNameChange = e => {
        this.setState({name: e.target.value});
    }

    componentDidMount = async () => {
        console.log("In Move card modal", this.props.item)
        const board = this.props.board;
        console.log(board)
        const response = await getAllLists(board.id, this.props.personal);
        this.setState({ lists: response.data })
        console.log(response.data);
    }

    renderListsInTheBoard = () => {

        if(this.state.lists === undefined) return null;
        else{
            return (
                this.state.lists.map((item, index) => {
                    return(
                        <Option key={item.id}> {item.name} </Option>
                    )
                })
            )
        }
    }

    onChange = (value) => {
        console.log(value);
        const listId = value;
        const cardId = this.props.item.id;
        this.setState({
            cardId,
            listId
        })

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
                        <Select
                            showSearch
                            placeholder="Select a list"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            { this.renderListsInTheBoard()}
                        </Select>
                    </Col>
                </Row>
            </Modal>
        )
    }
}
