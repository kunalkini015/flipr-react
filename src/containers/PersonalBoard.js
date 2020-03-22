import React, { Component } from 'react'
import { getAllLists } from '../api/flipr';
import List from './../components/List';
import history from './../history';
import CreateNewListModal from './../components/CreateNewListModal';
import { Button, Row, Col, Tooltip } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';


export default class PersonalBoard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            boardItem: this.props.boardItem,
            lists: undefined,
            isCreateNewListModalVisible: false,
            shouldReload: false
        }
    }
    componentDidMount = async () => {

        const response = await getAllLists(this.props.boardItem.id);
        this.setState({lists: response.data});
    }

    toggleReload = async (value) => {
        const response = await getAllLists(this.props.boardItem.id);
        this.setState({lists: response.data, shouldReload: value});
    }

    renderLists = () => {
        return(
            this.state.lists.map((item) => {
                return(
                    <List item={item}
                    toggleReload={this.toggleReload}
                    />
                )
            })
        )
    }

    toggleNewListModalVisiblity = async (value) => {
        this.setState({isCreateNewListModalVisible: value})
        const response = await getAllLists(this.props.boardItem.id);
        this.setState({lists: response.data});
    }
    handleNewListClick = () => {
        this.setState({isCreateNewListModalVisible: true})
    }

    handleBackIconClick = () => {
        this.props.toggleReload(true)
    }
    render() {
        if(this.state.lists === undefined)
            return (
                <div>
                    <h1>  {this.props.boardItem.name} </h1>
                </div>
            )
        else{
            return (
                <div >
                    <Row>
                        <Col lg={1} xs={2}>
                            <Tooltip title="Go back">
                                <ArrowLeftOutlined onClick={this.handleBackIconClick} className="board-back-icon" theme="outlined" />
                            </Tooltip>
                        </Col>
                        <Col lg={6} xs={2}>
                        </Col>
                        <Col lg={11} xs={20}>
                            <h1  className="board-name"> Welcome to {this.props.boardItem.name} board</h1>
                        </Col>
                        <Col lg={6}>
                            <Button  type="primary" className="add-new-list-btn"
                                    onClick={this.handleNewListClick}
                                    > Click here to add a new list </Button>

                            {
                                this.state.isCreateNewListModalVisible && <CreateNewListModal 
                                visible={this.state.isCreateNewListModalVisible}
                                toggleNewListModalVisiblity={this.toggleNewListModalVisiblity}
                                board={this.props.boardItem}
                                /> 
                            }
                        </Col>
                    </Row>
                    <div className="list-container">
                        {this.renderLists()}
                    </div>
                    
                </div>
            )
        }
    }
}
