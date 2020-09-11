import React, { useCallback, useState, useEffect } from "react";
import { useObserver, useLocalStore } from 'mobx-react'
import Nav from "../components/nav";
import Link from "next/link";
import ImageGallery from 'react-image-gallery';
import styled from "styled-components"
import { commentClick } from '../store/plant'
import axios from 'axios'
import { useRouter } from 'next/router'
import { plantListStore } from '../store/plantList'
import { Cookies, withCookies } from "react-cookie";
import Comment from '../components/comment'

const Plant = ({ cookies }) => {

  const [photoArr, setPhotoArr] = useState([]);
  const [comments, setcomments] = useState([]);
  const [id, setId] = useState(1);

  const fetchContentDetail = async () => {
    let id = plantListStore.listId;
    const result = await axios.post('http://18.191.16.175:3000/content/detail', { contentId: Number(id) }, { headers: { token: cookies.get('userInfo') } })
    setPhotoArr(JSON.parse(result.data[0].photoUrl))
    setcomments(result.data[0].Comments)
  }
  useEffect(() => {
    fetchContentDetail()
    console.log(comments);
  }, [])

  const sliderArr = photoArr.map((plant, id) => {
    return ({
      id: id,
      original: plant,
      thumbnail: plant
    })
  })

  const commentMap = comments.map((com) => {
    return (
      <Comment com={com} key={com.id} />
    )
  })

  // comment를 클릭하면 넓어지는 부분을 위한 토글메소드
  const toggle = useCallback(() => {
    commentClick.toggle();
  })

  return useObserver(() => {
    return (
      // 상단부 사진슬라이더와 수정,삭제버튼
      <>
        <div>{plantListStore.id}</div>
        <div className="plantpage__top">
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
              <div className="mainDescription">식물에 대한 설명설명 엄청 긴 설명</div>
              <input type="text" placeholder="comment" autoFocus></input>
              <input type="file"></input>
              <button>등록</button>
            </div>
            <div>
              {commentMap}
            </div>

          </div>
          <style jsx="true">{`
          .plantpage__bottom{
            border: solid, 10px
          }
              .mainDescription{
                padding : 15vh;
              }
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

export default withCookies(Plant);