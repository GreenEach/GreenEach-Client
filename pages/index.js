import React, { useCallback, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { modalShowState, userState } from "../store/homeStore/sign";
import { observer, useObserver, useLocalStore } from "mobx-react";
import Axios from "axios";
import { Cookies, withCookies } from "react-cookie";
import Link from "next/link";
const Home = ({cookies}) => {
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

  

  const getImage = () =>{
   Axios.get('http://18.191.16.175:3000/content/random', {
        headers:{token : cookies.get("userInfo")},
      }
      )
        .then((response) => { 
          // for(let i = 0; i < 4; i++){
          //   state.img = response.data[i].photoUrl
          // }
       
          state.img = imgJSON.parse(response.data[0].photoUrl)
        
        })
        .catch((err) => {
          console.log(err);
        });
  }

        useEffect(() => {
          getImage()
        })

  // let imgmapping = imgList.map((url) => <img className={styles.flex_child} src={url}></img>);

  return useObserver(() => {
    return (
    <div className={styles.container}>
      <div className={styles.flex_item1}>
        <Link href="/plantList">
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
          <div>로그인 후 사용</div>
          <div>다양한 유저들과 소통</div>
          <div>각종 게시글 및 데이터 활용</div>
        </div>
        </div>
      <div className={styles.flex_item3}>
        {console.log(state.img)}
        <img src={state.img} className={styles.image}></img>
      </div>
    </div>
    );
  });
};

export default withCookies(Home);
