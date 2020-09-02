import React, { useCallback } from "react";
import { observable } from "mobx";
import { useObserver } from "mobx-react"
import Link from "next/link";
import SignUp from './modal/signUpModal'
import SignIn from './modal/signInModal'
import { modalShowState, userState } from "../store/homeStore/sign"
import styles from "../styles/Nav.module.css";

const nav = () => {
  const signUpModalOpen = useCallback(() => {
    modalShowState.signUpshow = true;
  })

  const signInModalOpen = useCallback(() => {
    modalShowState.signInshow = true;
  })

  const logOut = useCallback(() => {
    userState.logout();
  }, [])
  return useObserver(() => {
    return(
    <div className={styles.flex_container}>
      <div>
        Logo
        {/* <Link href="/start" /> */}
      </div>
      <div className={styles.flex_item_2}>
        PAGE2
        {/* <Link href="/page2" /> */}
      </div>
      <div className={styles.flex_item_3}>
        PAGE3
        {/* <Link href="/page3" /> */}
      </div>
      
      <div className={styles.flex_item}>
        <button onClick={signUpModalOpen}>SignUp</button>
      </div>
      <SignUp />
      <div className={styles.flex_item}>
        <button onClick={signInModalOpen}>SignIn</button>
      </div>
      <SignIn />
      
    </div>
    )
  });
};

export default nav;
