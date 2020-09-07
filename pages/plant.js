import React, { useCallback } from "react";
import { useObserver, useLocalStore } from 'mobx-react'
import Nav from "../components/nav";
import Link from "next/link";
import ImageGallery from 'react-image-gallery';
import styled from "styled-components"
import { commentClick } from '../store/plant'

const expectedRes = [
  {
    "id": 1,
    "title": "token test",
    "content": "jinchuu",
    "level": "high",
    "season": "spring",
    "category": "potato",
    "photoUrl": ['https://user-images.githubusercontent.com/64571546/91794251-8cfd3080-ec55-11ea-94ac-0327ad8e7342.png', 'https://user-images.githubusercontent.com/64571546/91794251-8cfd3080-ec55-11ea-94ac-0327ad8e7342.png', 'https://user-images.githubusercontent.com/64571546/91794251-8cfd3080-ec55-11ea-94ac-0327ad8e7342.png', 'https://user-images.githubusercontent.com/64571546/91794251-8cfd3080-ec55-11ea-94ac-0327ad8e7342.png'],
    "createdAt": "2020-09-02T11:41:53.000Z",
    "updatedAt": "2020-09-02T11:41:53.000Z",
    "User": {
      "username": "jinchuu"
    },
    "comments": [
      {
        "id": 1,
        "comment": "comment is...",
        "photoUrl": 'https://user-images.githubusercontent.com/64571546/91794251-8cfd3080-ec55-11ea-94ac-0327ad8e7342.png',
        "createdAt": "2020-09-02T13:32:27.000Z",
        "User": {
          "username": "jinchuu"
        }
      },
      {
        "id": 2,
        "comment": "comment2 is...",
        "photoUrl": 'https://user-images.githubusercontent.com/64571546/91794251-8cfd3080-ec55-11ea-94ac-0327ad8e7342.png',
        "createdAt": "2020-09-02T13:32:39.000Z",
        "User": {
          "username": "jinchuu"
        }
      },
      {
        "id": 3,
        "comment": "yo",
        "photoUrl": 'https://user-images.githubusercontent.com/64571546/91794251-8cfd3080-ec55-11ea-94ac-0327ad8e7342.png',
        "createdAt": "2020-09-02T13:55:23.000Z",
        "User": {
          "username": "test"
        }
      },
      {
        "id": 4,
        "comment": "yo yo",
        "photoUrl": 'https://user-images.githubusercontent.com/64571546/91794251-8cfd3080-ec55-11ea-94ac-0327ad8e7342.png',
        "createdAt": "2020-09-02T13:55:29.000Z",
        "User": {
          "username": "test"
        }
      },
    ]
  }
]

const Plant = () => {
  // 스토어에서 해당 content의 사진들 가져오기
  const plantArr = expectedRes[0].photoUrl;

  // 사진들이 담긴 배열을 라이브러리 양식에 맞게 mapping
  const sliderArr = plantArr.map((plant, id) => {
    return ({
      id: id,
      original: plant,
      thumbnail: plant,
    })
  })

  //스토어에서 해당 content의 댓글들 가져오기
  const commentArr = expectedRes[0].comments;

  const commentMap = commentArr.map((com) =>
    <div>
      <div className="comment__list" onClick={toggle}>
        <div className="comment__userinfo">
          <div>{com.id}</div>
          <div></div>
        </div>
        <div>{com.comment}</div>
        <img className="comment__photo" src={com.photoUrl} alt="사진" ></img>
        <button>삭제</button>
      </div>
    </div>
  )

  // comment를 클릭하면 넓어지는 부분을 위한 토글메소드
  const toggle = useCallback(() => {
    commentClick.toggle();
  })

  return useObserver(() => {
    return (
      // 상단부 사진슬라이더와 수정,삭제버튼
      <>
        <div className="plantpage__top">
          <Nav />
          <div className="slider__button">
            <ImageGallery items={sliderArr} showFullscreenButton={false} />
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
          </div>

          {/*하단 comment 부분 */}
          <div className="plantpage__bottom">
            <div className="create__comment">
              <input type="text" placeholder="comment" autoFocus></input>
              <input type="file"></input>
              <button>등록</button>
            </div>
            {commentMap}

            {
              commentClick.isClick ? (
                <div>하이</div>
              ) : (
                  <div className="comment__list" onClick={toggle}>
                    <div className="comment__userinfo">
                      <div>id</div>
                      <div>작성날짜</div>
                    </div>
                    <div>댓글내용</div>
                    <img className="comment__photo" src="https://user-images.githubusercontent.com/64571546/91794251-8cfd3080-ec55-11ea-94ac-0327ad8e7342.png" alt="사진" ></img>
                    <button>삭제</button>
                  </div>
                )
            }
          </div>
          <style jsx="true">{`
              .plantpage__bottom {
                  margin-top: 5vh;
                  font-size: 2vw;
                 text-align: center;
              }
              
              .comment__list{
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
             
              .comment__userinfo{
                font-size : 2vh;
              }
  
              .comment__photo{
                height : 5vh;
              }
              `}
          </style>
        </div >
      </>
    )
  })


}

export default Plant;