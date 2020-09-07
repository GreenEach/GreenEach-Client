import React, { useCallback } from "react";
import { observable } from "mobx";
import { useObserver } from "mobx-react"
import Link from "next/link";
import SignUp from './modal/signUpModal'
import SignIn from './modal/signInModal'
import { modalShowState, userState } from "../store/homeStore/sign"
import styles from "../styles/Nav.module.css";
import Axios from "axios"

const nav = () => {
  const signUpModalOpen = useCallback(() => {
    modalShowState.signUpshow = true;
  })

  const signInModalOpen = useCallback(() => {
    modalShowState.signInshow = true;
  })

  const logOut = useCallback(() => {
    if(userState.data === null){
      console.log(userState.data)
    }else{
      return Axios.post('http://18.191.16.175:3000/sign/signout')
      .then((response) => {
       console.log(response)
       alert("로그아웃 되었습니다.")
       userState.logOut();
       })
       .catch((err) => {
         console.log(err)
       }),[userState.data]
    }
    
  }, [])
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

export default nav;
