import React, { Component } from 'react'
import {Layout, Row, Col, Button} from 'antd';
import history from './../history';
import {reactLocalStorage} from 'reactjs-localstorage';

const {Header} = Layout;

export default class Topbar extends Component {

    handleLogout = () => {
        reactLocalStorage.remove('email');
        history.push("/")
    }
    render() {
        return (
            <Header className="header">
                <Row>

                    <Col lg={12}>
                        <h1 className="header-logo"> TASK HANDLER </h1>
                    </Col>
                    <Col lg={12}>
                        <Button className="float-right logout-btn" onClick={this.handleLogout}> Logout </Button>
                    </Col>
                </Row>

            </Header>
        )
    }
}
