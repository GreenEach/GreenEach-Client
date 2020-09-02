import React, { useCallback,  } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { observable } from 'mobx';
import { observer, useObserver, useLocalStore } from 'mobx-react';
import { modalShowState, userState } from "../../store/homeStore/sign";
import Axios from "axios";

const signInModal = () => {
  const handleClose = useCallback(() => {
    modalShowState.signInshow = false
  })

  const state = useLocalStore(() => ({
    emial : '',
    passowrd : '',
    onChangeEmail(e) {
      this.email = e.target.value;
    },
    onChangePassword(e) {
      this.passowrd =  e.target.value;
    }
  }));
  
const handleLogin = useCallback(() => {
  if(!email){
    alert("이메일을 입력해주세요.")
  }else if(!password){
    alert("패스워드를 입력해주세요.")
  }else{
    return Axios.post('http://18.191.16.175:3000/sign/signin', {email, password})
     .then((response) => {
      console.log(response)
      alert("로그인 되었습니다!")
      userState.signIn({
        email : state.email,
        password : state.password
      })
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
)
  return useObserver(() => {
    return(
      <Modal 
      show={modalShowState.signInshow}
      onHide={handleClose} 
      animation={false}
      backdrop="static"
      keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>아이디</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="password" placeholder="Password" />
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
          <Button variant="primary" onClick={handleLogin}>
            SignIn
          </Button>
        </Modal.Footer>
      </Modal>
    ) 
  });
}
  


export default signInModal;
