import React, { useCallback } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { observable } from "mobx";
import { observer, useObserver, useLocalStore } from "mobx-react";
import { modalShowState, userState } from "../../store/homeStore/sign";
import Axios from "axios";

const signUpModal = () => {
  const handleClose = useCallback(() => {
    modalShowState.signUpshow = false;
  });

  const state = useLocalStore(() => ({
    email: "",
    password: "",
    username: "",
    onChangeEmail(e) {
      this.email = e.target.value;
    },
    onChangePassword(e) {
      this.password = e.target.value;
    },
    onChangeUsername(e) {
      this.username = e.target.value;
    },
  }));

  const handleSubmit = useCallback(() => {
    return Axios.post("https://greeneachdomain.tk:443/sign/signup", {
      ...state,
    })
      .then((response) => {
        alert("회원가입을 축하합니다!");
        console.log(response);
        userState.signUp({
          email: state.email,
          password: state.password,
          username: state.username,
        });
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return useObserver(() => {
    return (
      <Modal
        show={modalShowState.signUpshow}
        onHide={handleClose}
        animation={false}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>아이디</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={state.email}
                onChange={state.onChangeEmail}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={state.password}
                onChange={state.onChangePassword}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter username"
                value={state.username}
                onChange={state.onChangeUsername}
              />
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
    );
  });
};

export default signUpModal;
