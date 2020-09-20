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
  const [email, setEmail] = useState("");
  const [isMyContent, setIsMyContent] = useState(false);
  const [isMyComment, setIsMycomment] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const router = useRouter();

  const getIdPromise = new Promise((resolve, reject) => {
    const passedData = JSON.parse(router.query.id).id;
    if (passedData) {
      resolve(passedData);
    } else {
      reject(error);
    }
  });
  const fetchContentDetail = async (coolId) => {
    const result = await axios.post(
      "https://greeneachdomain.tk/content/detail",
      { contentId: coolId },
      { headers: { token: cookies.get("userInfo") } }
    );
    console.log(result);
    let rowCreatedAt = result.data.contentInfo[0].createdAt;
    let createdAt = `${rowCreatedAt.substring(0, 4)}년 ${rowCreatedAt.substring(
      5,
      7
    )}월 ${rowCreatedAt.substring(8, 10)}일`;
    setEmail(result.data.currentUser);
    setTitle(result.data.contentInfo[0].title);
    setUsername(result.data.contentInfo[0].User.username);
    setCreatedAt(createdAt);
    setContent(result.data.contentInfo[0].content);
    setPhotoArr(JSON.parse(result.data.contentInfo[0].photoUrl));
    setcomments(result.data.contentInfo[0].Comments);
    if (result.data.currentUser === result.data.contentInfo[0].User.email) {
      setIsMyContent(true);
    }
  };
  const deleteContentHandler = () => {
    let id = plantListStore.listId;
    axios({
      url: "https://greeneachdomain.tk/content",
      method: "delete",
      data: { contentId: Number(id) },
      headers: { token: cookies.get("userInfo") },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(Number(id));
          window.location = "/plantList";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getIdPromise.then((passedData) => {
      fetchContentDetail(passedData);
    });
  }, []);
  const sliderArr = photoArr.map((plant, id) => {
    return {
      id: id,
      original: plant,
      thumbnail: plant,
    };
  });
  const commentMap = comments.reverse().map((com) => {
    return (
      <Comment
        com={com}
        key={com.id}
        writer={email}
        cookies={cookies.get("userInfo")}
      />
    );
  });
  //comment와 img의 기본상태를 생성해주는 스토어
  const state = useLocalStore(() => ({
    img: null,
    comment: "",
    contentId: Number(plantListStore.listId),
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
      .post("https://greeneachdomain.tk/comment", Data, {
        headers: { token: cookies.get("userInfo") },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("댓글이 등록되었습니다.");
          getIdPromise.then((passedData) => {
            fetchContentDetail(passedData);
          });
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
    document.querySelector(".thumbImg").value = "";
    document.querySelector(".thumbImgInput").value = "";
    document.querySelector(".delButton").style.display = "none";
    document.querySelector(".thumbImg").style.display = "none";
    alert("사진을 다시 선택해주세요");
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
                  <Link href="/plantupdate">
                    <button
                      className="gallery__button"
                      value={plantListStore.id}
                    >
                      수정
                    </button>
                  </Link>
                </div>
                <div>
                  <button
                    className="gallery__button"
                    onClick={() => {
                      deleteContentHandler();
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          {/*하단 comment 부분 */}
          <div className="plantpage__bottom">
            <div className="create__comment">
              <div className="mainTitle">"{title}"</div>
              <div className="username">
                {username} ∙ {createdAt}
              </div>
              <div className="mainDescription">{content}</div>
              <form>
                <input
                  type="text"
                  placeholder="comment"
                  autoFocus
                  onChange={state.inputComment}
                ></input>
                <input
                  type="file"
                  onChange={state.commentImg}
                  className="thumbImgInput"
                ></input>
                <button onClick={contentSubmit}>등록</button>
                <Thumb src="" className="thumbImg" />
                <Delete className="delButton" onClick={thumbDel}>
                  썸네일삭제
                </Delete>
              </form>
            </div>
            <div>{commentMap}</div>
          </div>
          <style jsx="true">
            {`
              .plantpage__bottom {
                border: solid, 10px;
              }
              .mainTitle {
                font-size: 2em;
              }
              .username {
                font-size: 1.5vw;
                color: grey;
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
                width: 70vw;
                display: flex;
                text-align: center;
                justify-content: space-between;
                margin: auto;
                margin-top: 5vh;
                padding-bottom: 2vh;
                border-bottom: 1px solid darkgray;
              }
              input {
                width: 25vw;
              }
              .comment__userinfo {
                font-size: 2vh;
              }
              .comment__photo {
                height: 5vh;
                width: 5vw;
              }
            `}
          </style>
        </div>
      </>
    );
  });
};
export default withCookies(Plant);
