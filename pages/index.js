import React, { useCallback, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { modalShowState, userState } from "../store/homeStore/sign";
import { observer, useObserver, useLocalStore } from "mobx-react";
import Axios from "axios";
import { Cookies, withCookies } from "react-cookie";
import Link from "next/link";
const Home = ({ cookies }) => {
  // const goToStartPage = useCallback(() => {
  //   if(userState.isLoggedIn === false){
  //     alert("로그인이 안되잇어요");
  //     modalShowState.signInshow = true;
  //   }else{
  //   }
  // }
  const state = useLocalStore(() => ({
    img: []
  }));
  
  const getImage = () => {
    Axios.get('http://18.191.16.175:3000/content/random', {
      headers: { token: cookies.get("userInfo") },
    }
    )
      .then((response) => {
        state.img = JSON.parse(response.data[0].photoUrl)
        console.log(JSON.parse(response.data[0].photoUrl))
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getImage()
  }, [])

  let imgmapping = state.img.map((data) => {
    
      <img src={data} className={styles.image}></img>
   
  })
  console.log("img map = ", imgmapping)
  return useObserver(() => {
    return (
      <div className={styles.container}>
        <div className={styles.flex_item1}>
          <Link href="/plantList" >
            <p className={styles.start_btn} >
              Get Start
            </p>
          </Link>
        </div>
        <div className={styles.flex_item2}>
          <p className={styles.benefit}> GreenEach Benefit</p>
          <div className={styles.flex_item2_container}>
            <div className={styles.flex_item2_item}>
              <img src="/login.png" className={styles.icon}></img>
            </div>
            <div className={styles.flex_item2_item}>
              <img src="/social.png" className={styles.icon}></img>
            </div>
            <div className={styles.flex_item2_item}>
              <img src="/board.png" className={styles.icon}></img>
            </div>
          </div>
          <div className={styles.flex_item2_container2}>
            <div className={styles.child1}>로그인 후 사용</div>
            <div className={styles.child2}>다양한 유저들과 소통</div>
            <div className={styles.child3}>각종 게시글 및 데이터 활용</div>
          </div>
        </div>
        <p className={styles.benefit}> GreenEach</p>
        <div className={styles.flex_item3}>
          {/* {console.log(imgmapping)} */}
          <img src={state.img[0]} className={styles.image}></img>
          <img src={state.img[1]} className={styles.image}></img>
          <img src={state.img[2]} className={styles.image}></img>
          <img src={state.img[3]} className={styles.image}></img>
        </div>
      </div>
    );
  });
};
export default withCookies(Home);