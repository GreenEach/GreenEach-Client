import React, { useCallback, useEffect, useState } from "react";
import { plantListStore } from '../store/plantList'
import { commentClick } from '../store/plant'
const Comment = ({ com, writer }) => {
  const [isMine, setIsMine] = useState(false);
  const [isClick, setIsClick] = useState(true)

  let yearMonthDay = (com.createdAt).substring(0, 10)
  let hour = (com.createdAt).substring(11, 13)
  let min = (com.createdAt).substring(14, 16)

  const handleHour = (hour) => {
    if (Number(hour) + 9 > 24) {
      let fixedHour = '0' + ((Number(hour) + 9) - 24)
      return fixedHour;
    } else {
      return (Number(hour) + 9) + '';
    }
  }



  // comment를 클릭하면 넓어지는 부분을 위한 토글메소드
  useEffect(() => {
    if (writer === com.User.email) {
      setIsMine(true);
    }
    console.log(isMine)
  }

  )
  return (
    isMine ? (isClick ? (
      <div onClick={() => setIsClick(!isClick)}>
        <div className="comment__list" >
          <div className="comment__userinfo">
            <div>{com.User.username}</div>
            <div>{yearMonthDay}일{handleHour(hour)}시{min}분</div>
          </div>
          <div>{com.comment}</div>
          <img className="comment__photo" src={JSON.parse(com.photoUrl)[0]} alt="사진" ></img>

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
              <div>{yearMonthDay}일{hour}시{min}분</div>
            </div>
            <div>{com.comment}</div>
            <button>수정</button>
            <button>삭제</button>
          </div>
          <img className="tglcomment__photo" src={JSON.parse(com.photoUrl)[0]} alt="사진" ></img>
          <style jsx="true">{`
          .tglcomment__photo{
            max-width: 600px;
          }
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
      )) : (
        isClick ? (
          <div onClick={() => setIsClick(!isClick)}>
            <div className="comment__list" >
              <div className="comment__userinfo">
                <div>{com.User.username}</div>
                <div>{yearMonthDay}일{handleHour(hour)}시{min}분</div>
              </div>
              <div>{com.comment}</div>
              <img className="comment__photo" src={JSON.parse(com.photoUrl)[0]} alt="사진" ></img>
            </div>
          </div>
        ) :
          (
            <div onClick={() => setIsClick(!isClick)} >
              <div className="comment__list" >
                <div className="comment__userinfo">
                  <div>{com.User.username}</div>
                  <div>{yearMonthDay}일{hour}시{min}분</div>
                </div>
                <div>{com.comment}</div>
              </div>
              <img className="tglcomment__photo" src={JSON.parse(com.photoUrl)[0]} alt="사진" ></img>
              <style jsx="true">{`
              .tglcomment__photo{
                max-width: 600px;
              }
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

  )
}

export default Comment;