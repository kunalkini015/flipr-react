import React, { Component } from 'react'
import {Input, Upload, Row, Col, Modal, Button, Form, message, Card} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { addAttachment, getAttachments, downloadAttachments } from '../api/flipr';

export default class AddAttachmentModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            description: undefined,
            file: undefined,
            attachments: undefined
        }
    }


    handleOk = async () => {
        this.props.toggleAttachmentVisibility(false)
    }

    handleCancel = () => {
        this.props.toggleAttachmentVisibility(false)
    }
    dummyRequest = ({file, onSuccess}) => {
        this.setState({attachmentFile: file})
        setTimeout(() => {
            onSuccess("ok");
        }, 0)
    }

    onFinish = values => {
        addAttachment(values);
    }
    componentDidMount = async () => {
        const response = await getAttachments(this.props.item.id);
        this.setState({attachments: response.data});
    }

    handleAttachmentClick = async (item) => {
        console.log(item);
        await downloadAttachments(item);
    }

    renderAttachments = () => {

        return (
            this.state.attachments.map((item) => {
                console.log(item);
                return (
                    <Card className="attachment" onClick={() => this.handleAttachmentClick(item)}> <h3> {item.name} </h3> </Card>
                )
            })
        )
    }

    render() {
        const props = {
            name: 'file',
            action: 'http://localhost:8000/attachment/',
            // action: 'https://flipr-django.herokuapp.com/attachment/',
            headers: {
              authorization: 'authorization-text',
            },
            data: {
                id: this.props.item.id
            },
            onChange: async (info) => {
              if (info.file.status !== 'uploading') {
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                const response = await getAttachments(this.props.item.id);
                this.setState({attachments: response.data});
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
          };
        return (
                <Modal
                    title="Attachment"
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className="attachment-container">
                <Row className="row-top-margin ">
                    <Form
                    onFinish={this.onFinish}
                    type="multipart/form-data"
                    >
                        <Col lg={24}>
                        <Form.Item
                            name="file"
                            label="file"
                        >
                            <Upload name="file" {...props}>
                                <Button>
                                <UploadOutlined /> Upload attachment
                                </Button>
                            </Upload>
                        </Form.Item>
                        </Col>
                    </Form>
                </Row>
                {
                    this.state.attachments !== undefined &&
                    <h1> Attachments </h1>
                }
                {
                    this.state.attachments !== undefined &&
                    <Row className="row-top-margin">
                        {this.renderAttachments()}
                    </Row>
                }
                </div>
            </Modal>
        )
    }
}
