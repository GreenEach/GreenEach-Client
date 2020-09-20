import React, { useCallback, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { modalShowState, userState } from "../store/homeStore/sign";
import { observer, useObserver, useLocalStore } from "mobx-react";
import Axios from "axios";
import { Cookies, withCookies } from "react-cookie";
import Link from "next/link";

const Home = ({ cookies }) => {
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
          <div className={styles.intro_text}>
            사회적 거리두기가 시행되고, 저는 식물을 기르기 시작했습니다.<br/>
            사람들과 자신의 텃밭에 대한 정보를 공유하는 블로그를 찾게 되었습니다. <br/>
            웹상에서 서로의 식물을 공유하는 모습이 인상 깊었고 이런 기능을 가진 웹앱을 만들고 싶다는 생각이 들었습니다.<br/>
            코로나 블루가 대두 된 요즈음 다른 사람들과 서로의 텃밭을 공유하는 GreenEach는 사회에 좋은 영향을 줄 수 있을 것이라 생각합니다.<br/>
            </div>
        </div>

        <div className={styles.flex_item4}>
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

        <div className={styles.intro_Container}>
          <p className={styles.benefit}> About Us </p>
            <div className={styles.introItemBox}>
              <div className={styles.flex_introItem1}></div>
              <div className={styles.introBox}>
                깻잎과 결명자를 키우고있는 GreenEach팀장 김병관입니다.<br/>
                프로젝트에서 Front-end를 맡았습니다.<br/>
                 <a href="https://github.com/praconfi"><img src="/github.png" className={styles.github_img}></img></a>
                <a href=" https://velog.io/@praconfi"><img src="/velog.jpg" className={styles.vel_img}></img></a>

              </div>
            </div>
            <div className={styles.introItemBox2}>
              <div className={styles.flex_introItem2}></div>
              <div className={styles.introBox}>
              프로젝트에서 front-end를 맡았습니다.<br/>
              열려있는 마인드로 항상 소통하는 개발자를 꿈꾸는 강한얼입니다.<br/>
              <a href="https://github.com/hanur92"><img src="/github.png" className={styles.github_img}></img></a>
                <a href="https://hanur92.tistory.com/"><img src="/tstory.png" className={styles.tstory_img}></img></a>
                <a href=" https://www.instagram.com/han_ur92/"><img src="/insta.png" className={styles.insta_img}></img></a>
              </div>
            </div>
            <div className={styles.introItemBox}>
              <div className={styles.flex_introItem3}></div>
              <div className={styles.introBox}>
                서준형<br/>
                프로젝트에서 front-end를 맡았습니다.<br/>
                <a href="https://github.com/junhyeong32"><img src="/github.png" className={styles.github_img}></img></a>
                <a href="https://velog.io/@junhyeong32"><img src="/velog.jpg" className={styles.vel_img}></img></a>
                <a href="https://www.instagram.com/jun_h.s/"><img src="/insta.png" className={styles.insta_img}></img></a>
              </div>
            </div>
            <div className={styles.introItemBox2}>
              <div className={styles.flex_introItem4}></div>
              <div className={styles.introBox}>
                꾸준히 성장하는 개발자가 되고싶은 박진수 입니다.<br/>
                full-stack으로 참여했습니다.<br/>
                깻잎과 고기를 좋아합니다.<br/>  
                <a href="https://github.com/jinchuu1391"><img src="/github.png" className={styles.github_img}></img></a>
                <a href="https://jinchuu1391.tistory.com/"><img src="/tstory.png" className={styles.tstory_img}></img></a>
               



              </div>
            </div>
        </div>
        
        
        
      </div>
    );
  });
};
export default withCookies(Home);