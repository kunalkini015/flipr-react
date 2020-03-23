import React, { Component } from "react";
import { Row, Col, Button, Tooltip } from "antd";
import PersonalBoard from "../containers/PersonalBoard";
import TeamBoard from "../containers/TeamBoard";
import CreatePersonalBoardModal from "./CreatePersonalBoardModal";
import CreateTeamBoardModal from "./CreateTeamBoardModal";

import { getPersonalBoards, getTeamBoards, deletePersonalBoard, deleteTeamBoard } from "../api/flipr";
import {reactLocalStorage} from 'reactjs-localstorage';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
export default class MainPageBoards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPersonalBoardClicked: false,
      isTeamBoardClicked: false,
      selectedBoardItem: undefined,
      isCreatePersonalBoardClicked: false,
      createPersonalBoardModalVisible: false,
      isCreateTeamBoardClicked: false,
      createTeamBoardModalVisible: false,
      personalBoards: undefined,
      teamBoards: undefined,
      shouldReload: false
    };
  }

  toggleReload = (value) => {
    this.setState({
      isPersonalBoardClicked: false,
      isTeamBoardClicked: false,
      selectedBoardItem: undefined

    })
}


  toggleCreateModalVisibility = async (value) => {
    this.setState({createPersonalBoardModalVisible: value})
    const email = reactLocalStorage.get('email', true);
    const response = await getPersonalBoards(email);
      this.setState({personalBoards: response.data});
  }

  handleCreatePersonalBoardClick = () => {
    this.setState({createPersonalBoardModalVisible: true})
  }

  handleCreateTeamBoardClick = () => {
    this.setState({createTeamBoardModalVisible: true})
  }

  toggleCreateTeamBoardModalVisibility = async (value) => {
    this.setState({createTeamBoardModalVisible: value})
    const email = reactLocalStorage.get('email', true);
    const response = await getTeamBoards(email);
      this.setState({teamBoards: response.data});
  }

  toggleSelecedPersonalBoard = (isPersonalBoardClicked, selectedBoardItem) => {
    this.setState({ selectedBoardItem, isPersonalBoardClicked });
  };

  toggleSelectedTeamBoard = (isTeamBoardClicked, selectedBoardItem) => {
    this.setState({ selectedBoardItem, isTeamBoardClicked });
  };

  handleTeamBoardDelete = async (item) => {
    const email = reactLocalStorage.get('email', true);
    await deleteTeamBoard(item.id, email);
    const response = await getTeamBoards(email);
    this.setState({teamBoards: response.data});
  }

  handlePersonalBoardDelete = async (item) => {
    await deletePersonalBoard(item.id)
    const email = reactLocalStorage.get('email', true);   
    const response = await getPersonalBoards(email);
    this.setState({personalBoards: response.data});

  }

  renderPersonalBoards = () => {
    if(this.state.personalBoards === undefined) return null;
    return this.state.personalBoards.map(item => (
      <Col
        lg={10}
        md={10}
        xs={16}
        className="board-container"
        
      >
        <Row>
          <Col lg={12}>
              <h3> {item.name} </h3>
          </Col>
          <Col lg={12} className="float-right">
              <Tooltip title="Delete board">
                  <DeleteOutlined className="float-right" onClick={() => this.handlePersonalBoardDelete(item)}/>
              </Tooltip>
              <Tooltip title="Edit board">
                  <EditOutlined className="float-right card-edit-btn" onClick={() => this.handlePersonalBoardClick(item)}/>
              </Tooltip>
          </Col>
        </Row>
        
      </Col>
    ));
  };

  handlePersonalBoardClick = selectedBoardItem => {
    this.setState({
      isPersonalBoardClicked: true,
      selectedBoardItem: selectedBoardItem
    });
  };

  handleTeamBoardClick = selectedBoardItem => {
    this.setState({
      isTeamBoardClicked: true,
      selectedBoardItem: selectedBoardItem
    });
  };


  renderTeamBoards = () => {
    if(this.state.teamBoards === undefined) return null;
    return this.state.teamBoards.map(item => (
      <Col
        lg={10}
        md={10}
        xs={16}
        className="board-container"
      >
        <Row>
          <Col lg={12}>
              <h3> {item.name} </h3>
          </Col>
          <Col lg={12} className="float-right">
              <DeleteOutlined className="float-right" onClick={() => this.handleTeamBoardDelete(item)}/>
              <EditOutlined className="float-right card-edit-btn" onClick={() => this.handleTeamBoardClick(item)}/>
          </Col>
        </Row>
        
      </Col>
    ));
  };




  componentDidMount = async () => {
      const email = reactLocalStorage.get('email', true);   
      const response = await getPersonalBoards(email);
      this.setState({personalBoards: response.data});


      // Team Board 
       
      const teamResponse = await getTeamBoards(email);
      this.setState({teamBoards: teamResponse.data});
  }


  render() {
    return (
      <div className="main-container">
        {this.state.selectedBoardItem === undefined ? (
          <Row>
            <Col lg={12} className="board-heading-container" >
              <h1 className="board-heading"> Personal Boards </h1>
              <div>
                <Row>
                  <Col
                    lg={10}
                    md={10}
                    xs={16}
                    className="create-board-container"
                    onClick={this.handleCreatePersonalBoardClick}
                  >
                    <Row>
                        <Col>
                            <PlusOutlined style={{fontSize: 20}}/>
                        </Col>
                        <Col>
                            <h3 className="create-board-container-heading"> Create new Board </h3>
                        </Col>
                    </Row>
                  </Col>
                  {this.renderPersonalBoards()}
                </Row>
              </div>
            </Col>
            <Col lg={1} className="vertical-line"></Col>
            <Col lg={11} className="board-heading-container">
              <h1 className="board-heading"> Team Boards </h1>
              <div>
                <Row>
                  <Col lg={10} md={10} xs={16} className="create-board-container"
                    onClick={this.handleCreateTeamBoardClick}
                  >
                    <Row>
                        <Col>
                            <PlusOutlined style={{fontSize: 20}}/>
                        </Col>
                        <Col>
                            <h3 className="create-board-container-heading"> Create new Board </h3>
                        </Col>
                    </Row>
                  </Col>
                  {this.renderTeamBoards()}
                </Row>
              </div>
            </Col>
          </Row>
        ) : this.state.isPersonalBoardClicked ? (
          <PersonalBoard boardItem={this.state.selectedBoardItem} 
          toggleReload={this.toggleReload}
          userEmail={this.props.userEmail}
              />
        ) : (
          this.state.isTeamBoardClicked && (
            <TeamBoard boardItem={this.state.selectedBoardItem} 
            userEmail={this.props.userEmail}
            toggleReload={this.toggleReload}
            />
          )
        )}

        {this.state.createPersonalBoardModalVisible && (
          <CreatePersonalBoardModal

            visible={this.state.createPersonalBoardModalVisible}
            toggleSelecedPersonalBoard={this.toggleSelecedPersonalBoard}
            toggleCreateModalVisibility = {this.toggleCreateModalVisibility}
          />
        )}

        {this.state.createTeamBoardModalVisible && (
          <CreateTeamBoardModal

            visible={this.state.createTeamBoardModalVisible}
            toggleSelectedTeamBoard={this.toggleSelectedTeamBoard}
            toggleCreateTeamBoardModalVisibility = {this.toggleCreateTeamBoardModalVisibility}
          />
        )}
      </div>
    );
  }
}
