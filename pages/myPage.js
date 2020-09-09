import React, { useCallback } from "react";
import styled from "styled-components";
import styles from "../styles/myPage.module.css";
import { Modal, Button, Form } from "react-bootstrap";
import { observer, useObserver, useLocalStore } from "mobx-react";
import { modalShowState, userState } from "../store/homeStore/sign";
import { observable } from "mobx";

import Axios from "axios";

const myPage = () => {
  const state = useLocalStore(() => ({
    email: '',
    password: '',
    password2: '',
    username: '',
    onChangeEmail(e) {
      this.email = e.target.value;
    },
    onChangePassword(e) {
      this.password = e.target.value;
    },
    onChangePassword2(e) {
      this.password2 = e.target.value;
    }
  }));

  const userInfoUpdate = useCallback(() => {
    if (!state.email) {
      alert("이메일을 입력해주세요.")
    } else if (!state.password) {
      alert("패스워드를 입력해주세요.")
    } else if (!state.password2) {
      alert("패스워드2를 입력해주세요.")
    } else {
      return Axios.post('http://18.191.16.175:3000/sign/mypage:patch',
        {
          ...state
        },
      )
        .then((response) => {
          console.log(response)
          alert("로그인 되었습니다!")
          // TODO: userInfo를 키로 쿠키를 가져온다.
          // userInfo는 JWT 토큰 이므로 파싱해서 email, id를 구한다.
          // 그걸로 signIn 한다.
          cookies.set("userInfo", response.data.token, { path: '/' })
          let base64Url = cookies.get("userInfo").split('.')[1];
          let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));

          userState.signIn({
            email: JSON.parse(jsonPayload).email,
            id: JSON.parse(jsonPayload).id
          })
          handleClose();
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })
  return useObserver(() => {
    return (
      <div className={styles.flex_container}>
        <div className={styles.flex_item1}>
          <div>
            내가 쓴 글<div>2222222</div>
          </div>
          <div>
            내가 쓴 댓글
            <div>3333333</div>
          </div>
        </div>
        <div className={styles.flex_item2}>
          <Form className={styles.form_css}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>이름</Form.Label>
              <Form.Label type="username">{userState.data}</Form.Label>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>이메일</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={state.email} onChange={state.onChangeEmail} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="password" placeholder="Password" value={state.password} onChange={state.onChangePassword} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control type="password" placeholder="Password" value={state.password2} onChange={state.onChangePassword2} />
            </Form.Group>
            <Button variant="primary" onClick={userInfoUpdate}>변경하기</Button>
          </Form>
        </div>
      </div>
    );
  });
};

export default myPage;
