import React, { useCallback } from "react";
import { observable, get } from "mobx";
import { useObserver } from "mobx-react"
import Link from "next/link";
import SignUp from './modal/signUpModal'
import SignIn from './modal/signInModal'
import { modalShowState, userState } from "../store/homeStore/sign"
import styles from "../styles/Nav.module.css";
import Axios from "axios"
import { Cookies, withCookies, removeCookie } from "react-cookie";

const nav = ({cookies}) => {
  if(cookies.get("userInfo")){
    userState.isLoggedIn = true;
  }else{
    userState.isLoggedIn = false;
  }

  const signUpModalOpen = useCallback(() => {
    modalShowState.signUpshow = true;
  })

  const signInModalOpen = useCallback(() => {
    modalShowState.signInshow = true;
  })

  const logOut = useCallback(() => {
     return Axios.post('http://18.191.16.175:3000/sign/signout',{}, 
      {headers: {token: cookies.get("userInfo")} }
    )
    .then((response) => {
      cookies.remove("userInfo");
      alert("로그아웃 되었습니다.")
      console.log(response)
    })
    }
    )

  return useObserver(() => {
    return(
    <div className={styles.flex_container}>
      <a href="/">
        Logo
        {/* <Link href="/start" /> */}
      </a>
        {!userState.isLoggedIn 
        ? 
        <div className={styles.flex_item3}>
          <div className={styles.flex_item1}>
            <a onClick={signUpModalOpen}>SignUp</a>
            <SignUp />
          </div>
          <div className={styles.flex_item2}>
            <a onClick={signInModalOpen}>SignIn</a>
            <SignIn />
          </div>
          </div>
        :
        <div className={styles.flex_item3}>
          <div className={styles.flex_item1}>
            <a onClick={logOut}>LogOut</a>
          </div>
          <div className={styles.flex_item2}>
            <a href="/myPage">MyPage</a>
          </div>
         </div>
       }
    </div>
    )
  });
};

export default withCookies(nav);
