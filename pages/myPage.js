import React, { useCallback, useEffect } from "react";
import styles from "../styles/myPage.module.css";
import { Button, Form } from "react-bootstrap";
import { observer, useObserver, useLocalStore } from "mobx-react";
import Axios from "axios";
import { Cookies, withCookies } from "react-cookie";



const myPage = ({ cookies }) => {
  const state = useLocalStore(() => ({
    email: '',
    password: '',
    password2: '',
    username: '',
    contents: [],
    comments: [],
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

  let base64Url = cookies.get("userInfo").split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  state.email = JSON.parse(jsonPayload).email

  const userInfoUpdate = useCallback(() => {
    if (!state.username) {
      alert("이메일을 입력해주세요.")
    } else if (!state.password) {
      alert("패스워드를 입력해주세요.");
    } else if (!state.password2) {
      alert("패스워드2를 입력해주세요.");
    } else {
      return Axios.post('http://18.191.16.175:3000/sign/mypage',
        {
          ...state
        },
        { headers: { token: cookies.get("userInfo") } },
      )
        .then((response) => {
          alert("회원정보가 변경되었습니다.")
          console.log(response)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  })

  const getCommentsContents = () =>{
    Axios.post('http://18.191.16.175:3000/sign/mypage',
      {},
      { headers: { token: cookies.get("userInfo") } },
    )
      .then((response) => {
        let contentsArr = []
        let commentsArr = []
        console.log("data.response = ",response.data[0].Comments)
        //response.data[0].Contents.length
        for (let i = 0; i < response.data[0].Contents.length; i++) {
          contentsArr.push(response.data[0].Contents[i].title); 
        }

        for(let j = 0; j < response.data[0].Comments.length; j++){
          commentsArr.push(response.data[0].Comments[j].comment)
        }

        state.contents = contentsArr;
        state.comments = commentsArr;
        
      })
      .catch((err) => {
        console.log(err)
      })
        
  }

    useEffect(() => {
      getCommentsContents()
    }, [])

 // console.log("contents ==", state.contents.length,"comments == ",state.comments.length)
  const map = () => {
    for(let i = 0; i < state.contents.length; i++){
      
    }
  }
  return useObserver(() => {
    return (
      <div className={styles.flex_container}>
        <div className={styles.flex_item1}>
          <div >
            내가 쓴 글
            <div className={styles.item1_contents}>
              <div>{state.contents[0]}</div>
              <div>{state.contentyts[1]}</div>
              {state.contents[2]}
            </div>
          </div>
          <div >
            내가 쓴 댓글
            <div className={styles.item1_comments}>
              <div>{state.comments[0]}</div>
              <div>{state.comments[1]}</div>
              
            </div>
          </div>
        </div>
        <div className={styles.flex_item2}>
          <Form className={styles.form_css}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>이름</Form.Label>
              <Form.Control type="username" placeholder="Enter username" value={state.username} onChange={state.onChangeUserName} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>email</Form.Label>
              <Form.Control placeholder={state.email} value={state.username}  />
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
            <Button variant="primary" onClick={userInfoUpdate}>
              변경하기
            </Button>
          </Form>
        </div>
      </div>
    );
  });
};

export default withCookies(myPage);
