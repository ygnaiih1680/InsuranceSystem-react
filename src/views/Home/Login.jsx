import React, {useState} from "react";
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter
} from 'reactstrap';
import axios from 'axios';
import {connect} from 'react-redux'
import {login} from "../../globalStore";

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

const Login = (props) => {

    const [state, setOpen] = useState({})

    const warning = (message) => {
        setOpen({
            open: true,
            message
        })
    }
    
    const close = () => {
        setOpen(
            {open: false}
        )
    }

    const loginComplete = (responseData) => {
        if (responseData) {
            const user = {id: responseData.id, name: responseData.name, auth: responseData.auth}
            props.login(user)
            props.history.push('/home');
        } else {
            warning("해당 유저가 존재하지 않습니다. 아이디와 비밀번호를 다시 한 번 확인해주세요!")
        }
    }

    const loginCertification = (e) => {
        e.preventDefault()
        const uid = document.getElementById("uid").value
        const upw = document.getElementById("upw").value
        axios.post("/user/login", {id: uid, password: upw}).then(r => {
            loginComplete(r.data)
        })
    }

    return (
        <div className="app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="6">
                        <CardGroup>
                            <Card className="p-4">
                                <CardBody>
                                    <Form onSubmit={e=>loginCertification(e)}>
                                        <h1>Login</h1>
                                        <p className="text-muted">Sign In to your account</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Username" autoComplete="username" id='uid'/>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Password"
                                                   autoComplete="current-password" id='upw'/>
                                        </InputGroup>
                                        <Row>
                                            <Col xs="6">
                                                <Button type='submit' color="primary" className="px-4">Login</Button>
                                            </Col>
                                            <Col xs="6" className="text-right">
                                                <Button color="link" className="px-0">Forgot password?</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
            <Modal isOpen={state.open} toggle={close}
                   className={'modal-danger ' + props.className}>
                <ModalHeader toggle={close}>로그인 오류</ModalHeader>
                <ModalBody>
                    {state.message}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={close}>확인</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

const mapToDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(login(user))
    }
}

export default connect(null, mapToDispatchToProps)(Login);