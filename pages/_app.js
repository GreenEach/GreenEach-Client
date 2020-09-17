import React from "react";
import Head from "next/head";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/nav";
import "../node_modules/react-image-gallery/styles/css/image-gallery.css";
import SignIn from "../components/modal/signInModal";
import { Cookies, withCookies } from "react-cookie";
import { modalShowState, userState } from "../store/homeStore/sign";
import Link from "next/link";
const greenEach = ({ Component }) => {
  //문제 1) 쿠키로 가져온 값을 state에 저장 못하고 있는중
  //문제 2) 로그아웃은 현재 쿠키가 삭제되는 것으로 로그아웃 실행중(
  //즉 로그인 때 유저 정보 state를 저장하지 못해서 로그아웃 state도 건들지 못하는 상태

  return (
    <>
      {/* <Nav /> */}
      <Head>
        <script
          src="https://kit.fontawesome.com/c6bb511901.js"
          crossorigin="anonymous"
        ></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap"
          rel="stylesheet"
        />
        <title>GreenEach</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Component />
    </>
  );
};

export default greenEach;
