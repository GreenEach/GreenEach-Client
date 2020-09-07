import React from "react";
import styled from "styled-components";
<<<<<<< HEAD
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
=======

const Line = styled.line`
  position: absolute;
  width: 737.5px;
  height: 0px;
  left: calc(50% - 737.5px / 2 + 369.25px);
  top: calc(50% - 0px / 2 - 322px);
  border: 1px solid #c4c4c4;
  transform: rotate(90deg);
`;
const HistoryTemp = styled.form`
  position: absolute;
  width: 750px;
  height: 269px;
  left: 79px;
  top: 220px;

  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const History1 = styled.form`
  position: absolute;
  width: 715px;
  height: 47px;
  background: #c4c4c4;
`;
const History2 = styled.form`
  position: absolute;
  width: 715px;
  height: 47px;
  left: 96px;
  top: 298px;

  background: #c4c4c4;
`;
const History3 = styled.form`
  position: absolute;
  width: 715px;
  height: 47px;
  left: 96px;
  top: 355px;

  background: #c4c4c4;
`;
const History4 = styled.form`
  position: absolute;
  width: 715px;
  height: 47px;
  left: 96px;
  top: 412px;

  background: #c4c4c4;
`;

const HistoryRepTemp = styled.form`
  position: absolute;
  width: 750px;
  height: 269px;

  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const HistoryRep1 = styled.form`
  position: absolute;
  width: 715px;
  height: 47px;

  background: #c4c4c4;
`;
const HistoryRep2 = styled.form`
  position: absolute;
  width: 715px;
  height: 47px;

  background: #c4c4c4;
`;
const HistoryRep3 = styled.form`
  position: absolute;
  width: 715px;
  height: 47px;

  background: #c4c4c4;
`;
const HistoryRep4 = styled.form`
  position: absolute;
  width: 715px;
  height: 47px;

  background: #c4c4c4;
`;
const ID = styled.input`
  position: absolute;
  width: 515px;
  height: 77px;
  left: 1213px;
  top: 262px;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const Email = styled.input`
  position: absolute;
  width: 515px;
  height: 75px;
  left: 1213px;
  top: 383px;

  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const PW = styled.input`
  position: absolute;
  width: 515px;
  height: 77px;
  left: 1213px;
  top: 500px;

  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const PW2 = styled.input`
  position: absolute;
  width: 515px;
  height: 74px;
  left: 1213px;
  top: 621px;

  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const Confirm = styled.input`
  position: absolute;
  width: 142px;
  height: 73px;
  left: 1586px;
  top: 763px;

  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;

const myPage = () => {
  return (
    <div>
      <div>
        <HistoryTemp>
          <History1></History1>
          <History2></History2>
          <History3></History3>
          <History4></History4>
        </HistoryTemp>
        <HistoryRepTemp>
          <HistoryRep1></HistoryRep1>
          <HistoryRep2></HistoryRep2>
          <HistoryRep3></HistoryRep3>
          <HistoryRep4></HistoryRep4>
        </HistoryRepTemp>
      </div>
      <Line></Line>
      <div>
        <ID></ID>
        <Email></Email>
        <PW></PW>
        <PW2></PW2>
        <Confirm></Confirm>
      </div>
    </div>
  );
>>>>>>> b1a6840a539c1c06e1e0640f0c87f62b5653540a
};

export default myPage;
