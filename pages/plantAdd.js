import React, { useCallback, useState } from "react";
import Nav from "../components/nav";
import styled from "styled-components";
import axios from "axios";
import { observer, useObserver, useLocalStore } from "mobx-react";
import FormData from "form-data";
import { Cookies, withCookies } from "react-cookie";
const Container = styled.div`
  position: absolute;
  width: 745px;
  height: 836px;
  left: 579px;
  top: 114px;
  background-color: #c4c4c4;
`;
const File = styled.input`
  position: absolute;
  width: 500px;
  height: 34px;
  left: 600px;
  top: 132px;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const Button = styled.button`
  position: absolute;
  width: 100px;
  height: 34px;
  left: 600px;
  top: 232px;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const List = styled.div`
  position: absolute;
  width: 500px;
  height: 108px;
  left: 600px;
  top: 172px;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const Select1 = styled.select`
  min-width: 200px;
  border: none;
  font-size: 20px;
  padding: 7px 10px;
  margin: 10px;
  position: absolute;
  width: 206px;
  height: 50px;
  left: 593px;
  top: 294px;
`;
const Select2 = styled.select`
  min-width: 200px;
  border: none;
  font-size: 20px;
  padding: 7px 10px;
  margin: 10px;
  position: absolute;
  width: 206px;
  height: 50px;
  left: 813px;
  top: 294px;
`;
const Title = styled.textarea`
  position: absolute;
  width: 721px;
  height: 37px;
  left: 591px;
  top: 375px;
  resize: none;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const Content = styled.textarea`
  position: absolute;
  width: 719px;
  height: 399px;
  left: 593px;
  top: 445px;
  resize: none;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const Send = styled.button`
  position: absolute;
  width: 164px;
  height: 57px;
  left: 879px;
  top: 877px;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const Delete1 = styled.a`
  display: none;
`;
const Thumb1 = styled.img`
  display: none;
`;
const Delete2 = styled.a`
  display: none;
`;
const Thumb2 = styled.img`
  display: none;
`;
const Delete3 = styled.a`
  display: none;
`;
const Thumb3 = styled.img`
  display: none;
`;
const Delete4 = styled.a`
  display: none;
`;
const Thumb4 = styled.img`
  display: none;
`;
const Delete5 = styled.a`
  display: none;
`;
const Thumb5 = styled.img`
  display: none;
`;
const start = ({ cookies }) => {
  const state = useLocalStore(() => ({
    img: null,
    title: "",
    content: "",
    level: "",
    season: "",
    onAddedImg(e) {
      this.img = e.target.files;
      if (e.target.files.length > 5) {
        alert(e.target.files.length + "장" + "은ㄴㄴ 5장만");
        this.img = null;
        document.querySelector(".IMG").value = "";
      } else if (e.target.files.length === 1) {
        thumbnail1(e);
      } else if (e.target.files.length === 2) {
        thumbnail1(e);
        thumbnail2(e);
      } else if (e.target.files.length === 3) {
        thumbnail1(e);
        thumbnail2(e);
        thumbnail3(e);
      } else if (e.target.files.length === 4) {
        thumbnail1(e);
        thumbnail2(e);
        thumbnail3(e);
        thumbnail4(e);
      } else if (e.target.files.length === 5) {
        thumbnail1(e);
        thumbnail2(e);
        thumbnail3(e);
        thumbnail4(e);
        thumbnail5(e);
      }
    },
    onChangeTitle(e) {
      this.title = e.target.value;
    },
    onChangeContent(e) {
      this.content = e.target.value;
    },
    onChangeLevel(e) {
      this.level = e.target.value;
    },
    onChangeSeason(e) {
      this.season = e.target.value;
    },
  }));
  const onClick = (e) => {
    e.preventDefault();
    const Data = new FormData();
    for (let i = 0; i < state.img.length; i++) {
      Data.append("img", state.img[i]);
    }
    Data.append("content", state.content);
    Data.append("title", state.title);
    Data.append("level", state.level);
    Data.append("season", state.season);
    axios
      .post("http://greeneachdomain.tk:3000/content", Data, {
        headers: { token: cookies.get("userInfo") },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("컨텐츠가 업로드 되었습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("컨텐츠 업로드에 실패했습니다.");
      });
  };
  const thumbnail1 = (e) => {
    let thumbImg = document.querySelector(".thumbImg1");
    thumbImg.src = URL.createObjectURL(e.target.files[0]); //이미지의 url생성
    thumbImg.height = 150;
    thumbImg.width = 150;
    thumbImg.style.display = "block";
    thumbImg.onload = function () {
      URL.revokeObjectURL(document.querySelector(".thumbImg1").src); //썸네일이 출력되면 생성된 url삭제
    };
    console.log(thumbImg.src);
    document.querySelector(".delButton1").style.display = "block";
  };
  const thumbnail2 = (e) => {
    let thumbImg = document.querySelector(".thumbImg2");
    thumbImg.src = URL.createObjectURL(e.target.files[1]); //이미지의 url생성
    thumbImg.height = 150;
    thumbImg.width = 150;
    thumbImg.style.display = "block";
    thumbImg.onload = function () {
      URL.revokeObjectURL(document.querySelector(".thumbImg2").src); //썸네일이 출력되면 생성된 url삭제
    };
    console.log(thumbImg.src);
    document.querySelector(".delButton2").style.display = "block";
  };
  const thumbnail3 = (e) => {
    let thumbImg = document.querySelector(".thumbImg3");
    thumbImg.src = URL.createObjectURL(e.target.files[2]); //이미지의 url생성
    thumbImg.height = 150;
    thumbImg.width = 150;
    thumbImg.style.display = "block";
    thumbImg.onload = function () {
      URL.revokeObjectURL(document.querySelector(".thumbImg3").src); //썸네일이 출력되면 생성된 url삭제
    };
    console.log(thumbImg.src);
    document.querySelector(".delButton3").style.display = "block";
  };
  const thumbnail4 = (e) => {
    let thumbImg = document.querySelector(".thumbImg4");
    thumbImg.src = URL.createObjectURL(e.target.files[3]); //이미지의 url생성
    thumbImg.height = 150;
    thumbImg.width = 150;
    thumbImg.style.display = "block";
    thumbImg.onload = function () {
      URL.revokeObjectURL(document.querySelector(".thumbImg4").src); //썸네일이 출력되면 생성된 url삭제
    };
    console.log(thumbImg.src);
    document.querySelector(".delButton4").style.display = "block";
  };
  const thumbnail5 = (e) => {
    let thumbImg = document.querySelector(".thumbImg5");
    thumbImg.src = URL.createObjectURL(e.target.files[4]); //이미지의 url생성
    thumbImg.height = 150;
    thumbImg.width = 150;
    thumbImg.style.display = "block";
    thumbImg.onload = function () {
      URL.revokeObjectURL(document.querySelector(".thumbImg5").src); //썸네일이 출력되면 생성된 url삭제
    };
    console.log(thumbImg.src);
    document.querySelector(".delButton5").style.display = "block";
  };
  const thumbDel1 = (e) => {
    let thumbImg = e.target.previousElementSibling; //직전요소의 이벤트 객체 = 생성된 썸네일
    thumbImg.src = "";
    document.querySelector(".delButton1").style.display = "none";
    document.querySelector(".thumbImg1").style.display = "none";
  };
  const thumbDel2 = (e) => {
    let thumbImg = e.target.previousElementSibling; //직전요소의 이벤트 객체 = 생성된 썸네일
    thumbImg.src = "";
    document.querySelector(".delButton2").style.display = "none";
    document.querySelector(".thumbImg2").style.display = "none";
  };
  const thumbDel3 = (e) => {
    let thumbImg = e.target.previousElementSibling; //직전요소의 이벤트 객체 = 생성된 썸네일
    thumbImg.src = "";
    document.querySelector(".delButton3").style.display = "none";
    document.querySelector(".thumbImg3").style.display = "none";
  };
  const thumbDel4 = (e) => {
    let thumbImg = e.target.previousElementSibling; //직전요소의 이벤트 객체 = 생성된 썸네일
    thumbImg.src = "";
    document.querySelector(".delButton4").style.display = "none";
    document.querySelector(".thumbImg4").style.display = "none";
  };
  const thumbDel5 = (e) => {
    let thumbImg = e.target.previousElementSibling; //직전요소의 이벤트 객체 = 생성된 썸네일
    thumbImg.src = "";
    thumbImg.value = "";
    document.querySelector(".delButton5").style.display = "none";
    document.querySelector(".thumbImg5").style.display = "none";
    document.querySelector(".IMG").files[4] = null;
    // state.img[4] = null;
    console.log(state.img);
    // state.img[4] = null;
  };
  return useObserver(() => {
    return (
      <div>
        <Container> </Container>
        <form enctype="multipart/form-data">
          <File
            accept="image/jpeg, image/jpg, image/png"
            type="file"
            name="file"
            className="IMG"
            onChange={state.onAddedImg}
            multiple
          ></File>
          <List>
            <Thumb1 src="" className="thumbImg1" />
            <Thumb2 src="" className="thumbImg2" />
            <Thumb3 src="" className="thumbImg3" />
            <Thumb4 src="" className="thumbImg4" />
            <Thumb5 src="" className="thumbImg5" />
          </List>
          <Delete1 className="delButton1" onClick={thumbDel1}>
            선택취소1
          </Delete1>
          <Delete2 className="delButton2" onClick={thumbDel2}>
            선택취소2
          </Delete2>
          <Delete3 className="delButton3" onClick={thumbDel3}>
            선택취소3
          </Delete3>
          <Delete4 className="delButton4" onClick={thumbDel4}>
            선택취소4
          </Delete4>
          <Delete5 className="delButton5" onClick={thumbDel5}>
            선택취소5
          </Delete5>
          <Select1 onChange={state.onChangeLevel}>
            <option value="none">선택해주세요</option>
            <option value="easy">초보자</option>
            <option value="normal">경험자</option>
            <option value="hard">숙련자</option>
          </Select1>
          <Select2 onChange={state.onChangeSeason}>
            <option value="any">선택해주세요</option>
            <option value="spring">봄</option>
            <option value="summer">여름</option>
            <option value="fall">가을</option>
            <option value="winter">겨울</option>
          </Select2>
          <Title onChange={state.onChangeTitle}></Title>
          <Content onChange={state.onChangeContent}></Content>
          <Send type="submit" onClick={onClick}>
            POST!
          </Send>
        </form>
      </div>
    );
  });
};
export default withCookies(start);
