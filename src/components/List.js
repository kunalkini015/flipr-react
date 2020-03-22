import React, { Component } from 'react'
import { Button, Card, Row, Checkbox, Col, message } from 'antd';
import CardItem from './CardItem';
import {getCardsPerList, deleteList} from './../api/flipr';
import CreateCardModal from './CreateCardModal';
import { PlusOutlined } from '@ant-design/icons';
export default class List extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            cards: undefined,
            isCreateCardModalVisible: false,
            shouldUpdate: false,
            showArchieved: false
        }
    }

    toggleUpdate = async (value) => {
        const response = await getCardsPerList(this.props.item.id);
        this.setState({cards: response.data});
    }

    componentDidMount = async () => {
        const response = await getCardsPerList(this.props.item.id);
        this.setState({cards: response.data});
    }

    setCards = (cards) => {
        this.setState({cards})
    }

    renderCards = () => {
        return (
            this.state.cards.map((item) => {
                if(this.state.showArchieved){
                    return <CardItem item={item}
                            setCards = {this.setCards}
                            listId = {this.props.item.id}
                            toggleUpdate = {this.toggleUpdate}
                    />
                }
                else{
                    if(!item.archived)
                    return <CardItem item={item}
                            setCards = {this.setCards}
                            listId = {this.props.item.id}
                            toggleUpdate = {this.toggleUpdate}
                    />
                }


                
            })
        )
    }

    handleCreateNewCardClick = () => {
        this.setState({ isCreateCardModalVisible: true })
    }

    toggleCreateCardModalVisiblity = async (value) => {
        this.setState({isCreateCardModalVisible: value})
        const response = await getCardsPerList(this.props.item.id);
        this.setState({cards: response.data});
    }

    handleDeleteListClick = async () => {
        await deleteList(this.props.item.id);
        message.success("Deleted successfully")
        this.props.toggleReload(true)

    }

    handleArchiveClick = (e) => {
        this.setState({showArchieved: e.target.checked})
        
    }

    render() {
        return (
            <Card 
                className="list"
                title={this.props.item.name}
                extra={<Button type="primary" onClick={this.handleDeleteListClick}> Delete </Button>}
                >
                    <Row>
                        <Col lg={14}>
                            <Button className="create-new-card-btn" icon = {<PlusOutlined />} onClick={this.handleCreateNewCardClick}>Add new card  </Button>
                        </Col>
                        <Col lg={10}>
                            <Checkbox checked={this.state.showArchieved} onClick={this.handleArchiveClick}> Show Archieved</Checkbox>
                        </Col>
                    </Row>
                {
                    this.state.isCreateCardModalVisible && <CreateCardModal 
                                                                visible={this.state.isCreateCardModalVisible}
                                                                toggleCreateCardModalVisiblity = {this.toggleCreateCardModalVisiblity}
                                                                currentList = {this.props.item}
                                                                />
                }
                {
                    this.state.cards !== undefined && this.renderCards()
                }
                
            
            </Card>
        )
    }
}
