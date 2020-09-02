import React, { useCallback } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { observable } from 'mobx';
import { observer, useObserver, useLocalStore } from 'mobx-react'
import { modalShowState, userState } from "../../store/homeStore/sign"

const signUpModal = () => {
    const handleClose = useCallback(() => {
        modalShowState.signUpshow = false
      })

    const state = useLocalStore(() => ({
        email : '',
        passowrd : '',
        username : '',
        onChangeEmail(e) {
            this.email = e.target.value;
        },
        onChangePassword(e) {
            this.passowrd =  e.target.value;
        },
        onChangeUsername(e) {
            this.username =  e.target.value;
        }
    }));
  
    const handleSubmit = useCallback(()=>{
      return Axios.post('http://18.191.16.175:3000/sign/signup', {email, password, username})
      .then((response) => {
        alert("회워가입을 축하합니다!")
        console.log(response)
        userState.signUp({
            email : state.email,
            password : state.password,
            username : state.username
        })
      })
      .catch((err) => {
        console.log(err)
      })
    });
    return useObserver (() => {
        return (
            <Modal 
            show={modalShowState.signUpshow}
            onHide={handleClose} 
            animation={false}
            backdrop="static"
            keyboard={false}
            >
                <Modal.Header closeButton>
                <   Modal.Title>Sign </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>아이디</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={state.onChangeEmail}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={state.onChangePassword}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>이름</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" onChange={state.onChangeUsername}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember Email" />
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    SignUp
                </Button>
                </Modal.Footer>
            </Modal>
        )
    })
}

export default signUpModal;
