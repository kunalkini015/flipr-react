import React, { Component } from 'react'
import {Card, Button, Row, Col, Tooltip, Menu, Dropdown} from 'antd';
import {deleteCard, getCardsPerList, updateCard } from './../api/flipr';
import { DeleteOutlined, EditOutlined, FileAddOutlined, MoreOutlined } from '@ant-design/icons';
import CardDetailsModal from './CardDetailsModal';
import AddAttachmentModal from './AddAttachmentModal';
import MoveCardModal from './MoveCardModal';
export default class CardItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            cards: undefined,
            isCardDetailModalVisible: false,
            isAttachmentModalVisible: false,
            isMoveModalVisible: false
            
        }
    }

    

    handleCardDelete = async () => {
        await deleteCard(this.props.item.id);
        const response = await getCardsPerList(this.props.listId);
        this.props.setCards(response.data);
    }

    isToday = (date) => {
        const givenDate = new Date(date);
        const today = new Date();
        if(givenDate.getFullYear() === today.getFullYear() && givenDate.getMonth() === today.getMonth()
        && givenDate.getDate() === today.getDate()
        )
            return true
        else return false
    }


    getBorderColor = () => {
        const item = this.props.item;
        const due_date = item.due_date;
        const cardDate = new Date(item.due_date+ " "+item.due_time);
        if(item.completed)
            return "green";
        if(new Date() > cardDate)
            return "red";
        if(this.isToday(due_date))
            return "yellow";

    }

    handleArchiveClick = async (value) => {

        const response = await updateCard(this.props.item.id, value, null)
        this.props.toggleUpdate()
    }

    handleAttachmentClick = () => {
        this.setState({isAttachmentModalVisible: true, isCardDetailModalVisible: false})
    }

    toggleAttachmentVisibility = (value) => {
        this.setState({isAttachmentModalVisible: value})
    }

    handleCardClick = () => {
        this.setState({ isCardDetailModalVisible: true})
    }
    toggleCardVisibility = (value) => {
        this.setState({ isCardDetailModalVisible: false})
    }
    handleMoveClick = () => {
        this.setState({isMoveModalVisible: true})
    }

    toggleMoveVisibility = (value) => {
        this.setState({isMoveModalVisible: value})
        this.props.toggleReload(true)
    }

    componentDidMount = () => {
        console.log("In card Item", this.props.board)
    }
    render() {
        const menu = (
            <Menu>
              <Menu.Item key="0" onClick={this.handleMoveClick}>
                     Move
              </Menu.Item>
              
            </Menu>
          );
        return (
            <div>
                <Card className="card" draggable={true}
                    style={{ border: "2px solid "+(this.getBorderColor())}}
                    
                > 

                    <Row>
                        <Col lg={12} className="card-name-in-list">
                            <h4> {this.props.item.name} </h4>
                        </Col>     
                        <Col lg={12}>
                            <Tooltip title="Delete card">
                                    <DeleteOutlined className="float-right" onClick={this.handleCardDelete}/>
                            </Tooltip>
                            <Tooltip title="Edit card">
                                <EditOutlined className="float-right card-edit-btn" onClick={this.handleCardClick}/>
                            </Tooltip>
                            <Tooltip title="Add attachments">
                                <FileAddOutlined className="float-right card-attach-btn"  onClick={this.handleAttachmentClick}/>
                            </Tooltip>
                            <Tooltip title="More">
                            <Dropdown overlay={menu} trigger={['click']}>
                                <MoreOutlined className="float-right card-more-btn"/>
                            </Dropdown>
                            </Tooltip>
                        </Col>           
                    </Row>
                    {

                        this.props.item.due_date !== undefined &&
                        <Row>
                        <Col lg={24}>

                            <span> Due: {this.props.item.due_date} {this.props.item.due_time}</span>
                        </Col>
                    </Row>

                    }

                    <Row className="row-top-margin"> 
                        <Col lg={24}>
                            {
                                this.props.item.archived 
                                ? <Button onClick={() => this.handleArchiveClick(false)}> Remove from archive </Button>
                                :<Button onClick={() => this.handleArchiveClick(true)}> Archive </Button>
                            }
                            
                        </Col>
                    </Row>
                </Card>
                {
                    this.state.isCardDetailModalVisible &&
                    <CardDetailsModal visible={this.state.isCardDetailModalVisible}
                        toggleCardVisibility={this.toggleCardVisibility}
                        item={this.props.item}
                        toggleUpdate={this.props.toggleUpdate}
                        />
                }

                {
                    this.state.isAttachmentModalVisible &&
                    <AddAttachmentModal visible={this.state.isAttachmentModalVisible}
                        toggleAttachmentVisibility={this.toggleAttachmentVisibility}
                        item={this.props.item}
                        toggleUpdate={this.props.toggleUpdate}
                        />
                }
                {
                    this.state.isMoveModalVisible && 
                    <MoveCardModal item={this.props.item} 
                                board={this.props.board} 
                                visible={this.state.isMoveModalVisible}
                                toggleMoveVisibility = {this.toggleMoveVisibility}
                                personal={this.props.personal}
                                />
                }
        </div>
        )
    }
}
