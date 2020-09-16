import React, { useCallback } from "react";
import { observable, get } from "mobx";
import { useObserver, useLocalStore } from "mobx-react";
import Link from "next/link";
import SignUp from "./modal/signUpModal";
import SignIn from "./modal/signInModal";
import { modalShowState, userState } from "../store/homeStore/sign";
import styles from "../styles/Nav.module.css";
import Axios from "axios";
import { Cookies, withCookies, removeCookie } from "react-cookie";

const nav = ({cookies}) => {
  const state = useLocalStore(() => ({
    isLoggedIn: false
  }));

  if(cookies.get("userInfo")){
    state.isLoggedIn = true;
  } else {
    state.isLoggedIn = false;
  }

  const signUpModalOpen = useCallback(() => {
    modalShowState.signUpshow = true;
  });

  const signInModalOpen = useCallback(() => {
    modalShowState.signInshow = true;
  });

  const logOut = useCallback(() => {
    return Axios.post(
      "http://greeneachdomain.tk:3000/sign/signout",
      {},
      { headers: { token: cookies.get("userInfo") } }
    ).then((response) => {
      cookies.remove("userInfo");
      alert("로그아웃 되었습니다.");
      console.log(response);
    });
  });

  return useObserver(() => {
    return (
      <div className={styles.flex_container}>
        <a href="/">
          <img src="greenEachLogo (1).png" className={styles.logo} ></img>
        </a>
        {!state.isLoggedIn ? (
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
        ) : (
          <div className={styles.flex_item3}>
            <div className={styles.flex_item1}>
              <a onClick={logOut}>LogOut</a>
            </div>
            <div className={styles.flex_item2}>
             <Link href="/myPage"><a>myPage</a></Link>
            </div>
          </div>
        )}
      </div>
    );
  });
};

export default withCookies(nav);
