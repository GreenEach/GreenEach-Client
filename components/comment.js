import React, { useCallback, useEffect, useState } from "react";
import { plantListStore } from '../store/plantList'
import { commentClick } from '../store/plant'
const Comment = ({ com }) => {
    // comment를 클릭하면 넓어지는 부분을 위한 토글메소드
    const [isClick, setIsClick] = useState(true)
    useEffect(() => console.log((com.createdAt).substring(0, 10)))
    return (
        isClick ? (
            <div onClick={() => setIsClick(!isClick)}>
                <div className="comment__list" >
                    <div className="comment__userinfo">
                        <div>{com.User.username}</div>
                        <div>{com.createdAt}</div>
                    </div>
                    <div>{com.comment}</div>
                    <img className="comment__photo" src={com.photoUrl} alt="사진" ></img>

                    <button>수정</button>
                    <button>삭제</button>
                </div>
            </div>
        ) :
            (
                <div onClick={() => setIsClick(!isClick)} >
                    <div className="comment__list" >
                        <div className="comment__userinfo">
                            <div>{com.User.username}</div>
                            <div>{typeof (com.createdAt)}</div>
                        </div>
                        <div>{com.comment}</div>
                        <button>수정</button>
                        <button>삭제</button>
                    </div>
                    <img className="tglcomment__photo" src={com.photoUrl} alt="사진" ></img>
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
            )
    )
}

export default Comment;