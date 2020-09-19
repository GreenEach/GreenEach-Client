import React, { useCallback } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { observable } from "mobx";
import { observer, useObserver, useLocalStore } from "mobx-react";
import { modalShowState, userState } from "../../store/homeStore/sign";
import Axios from "axios";
import { Cookies, withCookies } from "react-cookie";
import SocialLogin from "../googleLogin";

const userInfoUpdateModal = ({ cookies }) => {
  const handleClose = useCallback(() => {
    modalShowState.infoUpdateshow = false;
  });

  const state = useLocalStore(() => ({
    email: '',
    password: '',
    password2: '',
    username: '',
    onChangeUserName(e) {
      this.username = e.target.value;
    },
    onChangePassword(e) {
      this.password = e.target.value;
    },
    onChangePassword2(e) {
      this.password2 = e.target.value;
    },
  }));

  const userInfoUpdate = useCallback(() => {
    if (!state.username) {
      alert("이메일을 입력해주세요.")
    } else if (!state.password) {
      alert("패스워드를 입력해주세요.");
    } else if (!state.password2) {
      alert("패스워드2를 입력해주세요.");
    } else {
      return Axios.post('https://greeneachdomain.tk/sign/mypage',
        {
          ...state
        },
        { headers: { token: cookies.get("userInfo") } },
      )
        .then((response) => {
          alert("회원정보가 변경되었습니다.");
          modalShowState.infoUpdateshow = false;
          console.log(response)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  })

  return useObserver(() => {
    return (
      <Modal
        show={modalShowState.infoUpdateshow}
        onHide={handleClose}
        animation={false}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>UserInfo Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group  controlId="formBasicEmail">
                <Form.Label>이름</Form.Label>
                <Form.Control type="username" placeholder="username" value={state.username} onChange={state.onChangeUserName} />
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
                <Form.Group controlId="formBasicPassword">
                <Form.Label>비밀번호 확인</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={state.password2}
                    onChange={state.onChangePassword2}
                />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={userInfoUpdate}>
                  변경하기
            </Button>
          
        </Modal.Footer>
      </Modal>
    );
  });
};

export default withCookies(userInfoUpdateModal);
