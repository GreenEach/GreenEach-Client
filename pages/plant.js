import React, { useCallback, useState, useEffect } from "react";
import { useObserver, useLocalStore } from "mobx-react";
import Nav from "../components/nav";
import Link from "next/link";
import ImageGallery from "react-image-gallery";
import styled from "styled-components";
import { commentClick } from "../store/plant";
import axios from "axios";
import { useRouter } from "next/router";
import { plantListStore } from "../store/plantList";
import { Cookies, withCookies } from "react-cookie";
import Comment from "../components/comment";
import FormData from "form-data";
const Delete = styled.a`
  display: none;
`;
const Thumb = styled.img`
  display: none;
`;

const Plant = ({ cookies }) => {
  const [photoArr, setPhotoArr] = useState([]);
  const [comments, setcomments] = useState([]);
  const [id, setId] = useState(1);
  const [isMyContent, setIsMyContent] = useState(false);
  const [isMyComment, setIsMycomment] = useState(false);

  // 쿠키에서 가져온 토큰에서 email을 가져오는 부분
  let base64Url = cookies.get("userInfo")[1]; /*.split(".")*/
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      // .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  const writer = JSON.parse(jsonPayload).email;

  const fetchContentDetail = async () => {
    let id = plantListStore.listId;
    const result = await axios.post(
      "http://greeneachdomain.tk:3000/content/detail",
      { contentId: Number(id) },
      { headers: { token: cookies.get("userInfo") } }
    );

    setPhotoArr(JSON.parse(result.data[0].photoUrl));
    setcomments(result.data[0].Comments);
    if (writer === result.data[0].User.email) {
      setIsMyContent(true);
    }
  };
  useEffect(() => {
    fetchContentDetail();
    console.log(comments);
  }, []);

  const sliderArr = photoArr.map((plant, id) => {
    return {
      id: id,
      original: plant,
      thumbnail: plant,
    };
  });

  const commentMap = comments.map((com) => {
    return <Comment com={com} key={com.id} writer={writer} />;
  });

  // comment를 클릭하면 넓어지는 부분을 위한 토글메소드
  const toggle = useCallback(() => {
    commentClick.toggle();
  });
  //comment와 img의 기본상태를 생성해주는 스토어
  const state = useLocalStore(() => ({
    img: null,
    comment: "",
    contentId: 6,
    commentImg(e) {
      this.img = e.target.files[0];
      thumbnail(e);
    },
    inputComment(e) {
      this.comment = e.target.value;
    },
  }));
  //파일 선택시 이미지 상태값 변화
  //onClick 등록 코멘트와 이미지의 상태값을 전송
  const contentSubmit = (e) => {
    console.log("e=", e);
    e.preventDefault();
    const Data = new FormData();
    Data.append("img", state.img);
    Data.append("comment", state.comment);
    Data.append("contentId", state.contentId);
    console.log("img=", Data.get("img"));
    console.log("comment=", Data.get("comment"));
    console.log("contentId=", Data.get("contentId"));
    axios
      .post("http://greeneachdomain.tk:3000/comment", Data, {
        headers: { token: cookies.get("userInfo") },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("댓글이 등록되었습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("댓글 등록에 실패했습니다.");
      });
  };
  const thumbnail = (e) => {
    let thumbImg = document.querySelector(".thumbImg");
    thumbImg.src = URL.createObjectURL(e.target.files[0]); //이미지의 url생성
    thumbImg.height = 150;
    thumbImg.width = 150;
    thumbImg.style.display = "block";
    thumbImg.onload = function () {
      URL.revokeObjectURL(document.querySelector(".thumbImg").src); //썸네일이 출력되면 생성된 url삭제
    };
    document.querySelector(".delButton").style.display = "block";
  };
  const thumbDel = (e) => {
    let thumbImg = e.target.previousElementSibling; //직전요소의 이벤트 객체 = 생성된 썸네일
    thumbImg.src = "";
    document.querySelector(".delButton").style.display = "none";
    document.querySelector(".thumbImg").style.display = "none";
  };
  return useObserver(() => {
    return (
      // 상단부 사진슬라이더와 수정,삭제버튼
      <>
        <div>{plantListStore.id}</div>
        <div className="plantpage__top">
          <div className="slider__button">
            <ImageGallery items={sliderArr} showFullscreenButton={false} />

            {isMyContent ? (
              <div className="plant__buttons">
                <div>
                  <Link href="/plantAdd">
                    <button className="gallery__button">수정</button>
                  </Link>
                </div>
                <div>
                  <button className="gallery__button">삭제</button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>

          {/*하단 comment 부분 */}
          <div className="plantpage__bottom">
            <div className="create__comment">
              <div className="mainDescription">
                식물에 대한 설명설명 엄청 긴 설명
              </div>
              <form>
                <input
                  type="text"
                  placeholder="comment"
                  autoFocus
                  onChange={state.inputComment}
                ></input>
                <input type="file" onChange={state.commentImg}></input>
                <button onClick={contentSubmit}>등록</button>
                <Thumb src="" className="thumbImg" />
                <Delete className="delButton" onClick={thumbDel}>
                  썸네일삭제
                </Delete>
              </form>
              <button>등록</button>
            </div>
            <div>{commentMap}</div>
          </div>
          <style jsx="true">
            {`
              .plantpage__bottom {
                border: solid, 10px;
              }
              .mainDescription {
                padding: 15vh;
              }
              .plantpage__bottom {
                margin-top: 5vh;
                font-size: 2vw;
                text-align: center;
              }

              .comment__list {
                width: 50vw;
                display: flex;
                text-align: center;
                justify-content: space-between;
                margin: auto;
                margin-top: 5vh;
              }

              input {
                width: 25vw;
              }

              .comment__userinfo {
                font-size: 2vh;
              }

              .comment__photo {
                height: 5vh;
              }
            `}
          </style>
        </div>
      </>
    );
  });
};

export default withCookies(Plant);
