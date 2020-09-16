import React, { useCallback,  } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { observable } from 'mobx';
import { observer, useObserver, useLocalStore } from 'mobx-react';
import { modalShowState, userState } from "../../store/homeStore/sign";
import Axios from "axios";
import { Cookies, withCookies } from "react-cookie";

const signInModal = ({ cookies }) => {
  const handleClose = useCallback(() => {
    modalShowState.signInshow = false
  })

  const state = useLocalStore(() => ({
    email : '',
    id : '',
    password : '',
    isLoggedIn : false,
    onChangeEmail(e) {
      this.email = e.target.value;
    },
    onChangePassword(e) {
      this.password =  e.target.value;
    }
  }));
  
const handleLogin = useCallback(() => {
  if(!state.email){
    alert("이메일을 입력해주세요.")
  }else if(!state.password){
    alert("패스워드를 입력해주세요.")
  }else{
    return Axios.post('http://greeneachdomain.tk:3000/sign/signin', 
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

        //토큰으로 유저 정보를 가져오는 api를 app.js에서 실행시켜주자
        cookies.set("userInfo", response.data.token, { path : '/' })
        let base64Url = cookies.get("userInfo").split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
              
          userState.signIn({
            email : JSON.parse(jsonPayload).email,
            id : JSON.parse(jsonPayload).id
          })
        handleClose();
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
              <Form.Control type="email" placeholder="Enter email" value={state.email} onChange={state.onChangeEmail}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="password" placeholder="Password" value={state.password} onChange={state.onChangePassword}/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember Email" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" value={state.password} onClick={handleLogin}>
            SignIn
          </Button>
        </Modal.Footer>
      </Modal>
    ) 
  });
}
  


export default withCookies(signInModal);
