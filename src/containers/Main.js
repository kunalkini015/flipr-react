import React, { Component } from "react";
import { Row, Col } from "antd";
import MainPageBoards from "./../components/MainPageBoards";
import Topbar from "./../components/Topbar";
import Bottombar from "./../components/Bottombar";
import {reactLocalStorage} from 'reactjs-localstorage';

export default class Main extends Component {
  
  componentDidMount = () =>{
  }

  render() {
    return (
      <div>
        <Topbar />
        <MainPageBoards userEmail={this.props.userEmail}/>
        <Bottombar />
      </div>
    );
  }
}
