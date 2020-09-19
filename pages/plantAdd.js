import React, { useCallback, useState, cloneElement } from "react";
import Nav from "../components/nav";
import styled from "styled-components";
import axios from "axios";
import { observer, useObserver, useLocalStore } from "mobx-react";
import FormData from "form-data";
import { Cookies, withCookies } from "react-cookie";
import Link from "next/link";
import styles from "../styles/plantAdd.module.css";
import { Steps } from "antd";
import { Select } from "antd";

// const background = styled.div;
// const Container = styled.div`
//   width: 745px;
//   height: 836px;
//   left: 579px;
//   top: 114px;
//   background-color: #c4c4c4;
// `;
const File = styled.input`
  display: flex;
  width: 500px;
  height: 70px;
  left: 500px;
  top: 332px;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const List = styled.div`
  width: 500px;
  height: 108px;
  left: 600px;
  top: 172px;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
// const Select1 = styled.select`
//   min-width: 200px;
//   display: flex;
//   border: none;
//   font-size: 20px;
//   padding: 7px 10px;
//   margin: 10px;
//   width: 206px;
//   height: 50px;
//   left: 593px;
//   margin-bottom: 294px;
// `;
// const Select2 = styled.select`
//   min-width: 200px;
//   display: flex;
//   border: none;
//   font-size: 20px;
//   padding: 7px 10px;
//   margin: 10px;

//   width: 206px;
//   height: 50px;
//   left: 813px;
//   top: 294px;
// `;
const Title = styled.textarea`
  width: 4ㄴ21px;
  height: 55px;
  display: flex;
  left: 591px;
  top: 375px;
  resize: none;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
  font-size: 30px;
`;
const Content = styled.textarea`
  width: 721px;
  display: flex;
  height: 399px;
  left: 593px;
  top: 445px;
  resize: none;
  background: #ffffff;
  font-size: 25px;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const Send = styled.button`
  display: flex;
  width: 164px;
  height: 57px;
  left: 879px;
  top: 877px;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const Delete1 = styled.div`
  display: none;
  top: 300px;
`;
const Thumb1 = styled.img`
  display: none;
`;
const Delete2 = styled.div`
  display: none;
`;
const Thumb2 = styled.img`
  display: none;
  margin-top: -150px;
  margin-left: 160px;
`;
const Delete3 = styled.div`
  display: none;
`;
const Thumb3 = styled.img`
  display: none;
  margin-top: -150px;
  margin-left: 320px;
`;
const Delete4 = styled.div`
  display: none;
`;
const Thumb4 = styled.img`
  display: none;
  margin-top: -150px;
  margin-left: 480px;
`;
const Delete5 = styled.div`
  display: none;
`;
const Thumb5 = styled.img`
  display: none;
  margin-top: -150px;
  margin-left: 640px;
`;

const Line = styled.img`
  margin-top: "2000px";
  alt: "asdasdsa";
`;
// 4season icon
// level icon
// 아이콘 -연결- 기능 (+ hovr)
//
//

const start = ({ cookies }) => {
  const { Option } = Select;
  const { Step } = Steps;
  const currentTime = new Date();
  const [progress, setProgress] = useState(0);
  //초기값=0을 progress로 변수 취한다 setProgress로 변경
  const [error, setError] = useState("");
  const state = useLocalStore(() => ({
    img: null,
    title: "",
    content: "",
    level: "",
    season: "",
    onAddedImg(e) {
      this.img = e.target.files;
      this.progressFunc();
      if (e.target.files.length > 5) {
        alert("사진이 다섯 장을 초과하였습니다.");
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
    progressFunc() {
      if (
        this.img !== null &&
        this.title !== "" &&
        this.level !== "" &&
        this.season !== "" &&
        this.content !== ""
      ) {
        setProgress(1);
      }
    },
    onChangeTitle(e) {
      this.title = e.target.value;
      this.progressFunc();
    },
    onChangeLevel(value) {
      this.level = value;
      console.log(this.level);
      this.progressFunc();
    },
    onChangeSeason(value) {
      this.season = value;
      this.progressFunc();
    },
    onChangeContent(e) {
      this.content = e.target.value;
      this.progressFunc();
    },
  }));

  const onClick = (e) => {
    if (state.img !== null) {
      e.preventDefault();
      setProgress(2);
      const Data = new FormData();
      for (let i = 0; i < state.img.length; i++) {
        Data.append("img", state.img[i]);
      }
      Data.append("content", state.content);
      Data.append("title", state.title);
      Data.append("level", state.level);
      Data.append("season", state.season);
      console.log(Data.get("img", state.img));
      axios
        .post("https://greeneachdomain.tk/content", Data, {
          headers: { token: cookies.get("userInfo") },
        })
        .then((res) => {
          if (res.status === 200) {
            alert("컨텐츠가 업로드 되었습니다.");
            window.location = "/plantList";
          }
        })
        .catch((err) => {
          console.log(err);
          alert("컨텐츠 업로드에 실패했습니다.");
          setError("error");
          // setProgress(0);
        });
    } else {
      e.preventDefault();
      alert("컨텐츠를 작성해주세요");
    }
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
    document.querySelector(".delButton1").style.display = "none";
    document.querySelector(".delButton2").style.display = "none";
    document.querySelector(".delButton3").style.display = "none";
    document.querySelector(".delButton4").style.display = "none";
    document.querySelector(".delButton5").style.display = "block";
  };
  const thumbDel1 = (e) => {
    let thumbImg = e.target.previousElementSibling; //직전요소의 이벤트 객체 = 생성된 썸네일
    thumbImg.src = "";
    document.querySelector(".IMG").value = "";
    document.querySelector(".delButton1").style.display = "none";
    document.querySelector(".thumbImg1").style.display = "none";
    alert("사진을 다시 선택해주세요");
  };
  const thumbDel2 = (e) => {
    let thumbImg = e.target.previousElementSibling; //직전요소의 이벤트 객체 = 생성된 썸네일
    thumbImg.src = "";
    let newFileList = Array.from(document.querySelector(".IMG").files);
    newFileList.splice(1);
    state.img = newFileList;
    document.querySelector(".delButton2").style.display = "none";
    document.querySelector(".thumbImg2").style.display = "none";
    document.querySelector(".delButton1").style.display = "block";
    alert("두번째 이미지가 삭제되었습니다.");
  };
  const thumbDel3 = (e) => {
    let thumbImg = e.target.previousElementSibling; //직전요소의 이벤트 객체 = 생성된 썸네일
    thumbImg.src = "";
    let newFileList = Array.from(document.querySelector(".IMG").files);
    newFileList.splice(2);
    state.img = newFileList;
    document.querySelector(".delButton3").style.display = "none";
    document.querySelector(".thumbImg3").style.display = "none";
    document.querySelector(".delButton2").style.display = "block";
    alert("세번째 이미지가 삭제되었습니다.");
  };
  const thumbDel4 = (e) => {
    let thumbImg = e.target.previousElementSibling; //직전요소의 이벤트 객체 = 생성된 썸네일
    thumbImg.src = "";
    let newFileList = Array.from(document.querySelector(".IMG").files);
    newFileList.splice(3);
    state.img = newFileList;
    document.querySelector(".delButton4").style.display = "none";
    document.querySelector(".thumbImg4").style.display = "none";
    document.querySelector(".delButton3").style.display = "block";
    alert("네번째 이미지가 삭제되었습니다.");
  };
  const thumbDel5 = (e) => {
    let thumbImg = e.target.previousElementSibling; //직전요소의 이벤트 객체 = 생성된 썸네일
    thumbImg.src = "";
    let newFileList = Array.from(document.querySelector(".IMG").files);
    newFileList.splice(4);
    state.img = newFileList;
    document.querySelector(".delButton5").style.display = "none";
    document.querySelector(".thumbImg5").style.display = "none";
    document.querySelector(".delButton4").style.display = "block";
    alert("마지막 이미지가 삭제되었습니다.");
  };

  return useObserver(() => {
    return (
      <div className={styles.Container}>
        <form enctype="multipart/form-data">
          <File
            accept="image/jpeg, image/jpg, image/png"
            type="file"
            name="file"
            className="IMG"
            id={styles.IMG}
            onChange={state.onAddedImg}
            multiple
          ></File>
          <div>
            <Thumb1 src="" className="thumbImg1" />
            <Thumb2 src="" className="thumbImg2" />
            <Thumb3 src="" className="thumbImg3" />
            <Thumb4 src="" className="thumbImg4" />
            <Thumb5 src="" className="thumbImg5" />
          </div>
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

          <Select
            onChange={(value) => state.onChangeLevel(value)}
            className={styles.Select1}
          >
            <Option value="disabled" disabled>
              선택해주세요
            </Option>
            <Option value="easy">초보자</Option>
            <Option value="normal">경험자</Option>
            <Option value="hard">숙련자</Option>
          </Select>
          <Select
            onChange={(value) => state.onChangeSeason(value)}
            className={styles.Select2}
          >
            <Option value="disabled" disabled>
              선택해주세요
            </Option>
            <Option value="any">사계절</Option>
            <Option value="spring">봄</Option>
            <Option value="summer">여름</Option>
            <Option value="fall">가을</Option>
            <Option value="winter">겨울</Option>
          </Select>

          {/* <Select1 onChange={state.onChangeLevel} className={styles.Select1}>
            <option value="none">선택해주세요</option>
            <option value="easy">초보자</option>
            <option value="normal">경험자</option>
            <option value="hard">숙련자</option>
          </Select1>
          <Select2 onChange={state.onChangeSeason} className={styles.Select2}>
            <option value="any">선택해주세요</option>
            <option value="spring">봄</option>
            <option value="summer">여름</option>
            <option value="fall">가을</option>
            <option value="winter">겨울</option>
          </Select2> */}
          <Title onChange={state.onChangeTitle}></Title>
          <Content onChange={state.onChangeContent}></Content>

          <Send
            className={styles.create_button}
            type="submit"
            onClick={onClick}
          >
            POST!
          </Send>
          <Steps
            className={styles.Step}
            current={progress}
            status={error}
            // direction="vertical"
          >
            <Step
              title="In Progress"
              // subTitle={currentTime}
              description="게시글을 작성해주세요."
            />
            <Step
              title="Finished"
              // subTitle={currentTime}
              description="POST버튼을 눌러주세요."
            />

            <Step
              title="Waiting"
              // subTitle={currentTime}
              description="데이터를 전송중입니다."
            />
          </Steps>
        </form>
      </div>
    );
  });
};
export default withCookies(start);
