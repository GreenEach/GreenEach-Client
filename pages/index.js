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
    Axios.get('https://greeneachdomain.tk/content/random', {
      headers: { token: cookies.get("userInfo") },
    }
    )
      .then((response) => {
        let responseImgArr = [];
        for(let i = 0; i < 4; i++){
          responseImgArr.push((JSON.parse(response.data[i].photoUrl)[0]))
          console.log(JSON.parse(response.data[i].photoUrl)[0])
        }
        state.img = responseImgArr;       
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getImage()
  }, [])

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
          <p className={styles.benefit}> GreenEach Introduce</p>
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
        <p className={styles.benefit}> Notice Board</p>
        <div className={styles.flex_item3}>
          {/* {console.log(state.img[0])} */}
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