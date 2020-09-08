import React, { useCallback } from "react";
import styled from "styled-components";
import styles from "../styles/myPage.module.css";
import { Modal, Button, Form } from "react-bootstrap";
import { observer, useObserver, useLocalStore } from 'mobx-react'
import { modalShowState, userState } from "../store/homeStore/sign"
import { observable } from "mobx";

const myPage = () => {
  const state = useLocalStore(() => ({
    email : '',
    password : '',
    username : '',
  onChangeEmail(e) {
      this.email = e.target.value;
  },
  onChangePassword(e) {
      this.password =  e.target.value;
  },
  onChangeUsername(e) {
      this.username =  e.target.value;
  }
  }));

  const onCahngeEditProfile = useCallback(() =>{
    return Axios.post('http://18.191.16.175:3000/sign/mypage', {...state})
      .then((response) => {
        alert("회원정보가 변경되었습니다!")
        console.log(response)
        userState.signUp({
            email : state.email,
            password : state.password,
            username : state.username
        })
        handleClose();
      })
      .catch((err) => {
          console.log({email, password, username})
        console.log(err)
      }) 
  })

  return useObserver (() => { 
    return(
    <div className={styles.flex_container}>
      <div className={styles.flex_item1}>
        <div>
          내가 쓴 글
          <div>2222222</div>
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
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
           <Form.Label>비밀번호</Form.Label>
           <Form.Control type="password" placeholder="Password"/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control type="password" placeholder="Password"/>
          </Form.Group>
          <Button variant="primary">
              변경하기
          </Button>
        </Form>
      </div>
    </div>
    )
  })
};

export default myPage;
