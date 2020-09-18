import React, { useCallback, useEffect, useState } from 'react';
import { plantListStore } from '../store/plantList';
import { commentClick } from '../store/plant';
import axios from 'axios';
import Link from 'next/link';

const Comment = ({ com, writer, cookies }) => {
  const [isMine, setIsMine] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [isReviseMode, setIsReviseMode] = useState(false);
  const [placeHolder, setPlaceHolder] = useState(com.comment);

  let yearMonthDay = com.createdAt.substring(0, 10);
  let hour = com.createdAt.substring(11, 13);
  let min = com.createdAt.substring(14, 16);

  const handleHour = (hour) => {
    if (Number(hour) + 9 > 24) {
      let fixedHour = '0' + (Number(hour) + 9 - 24);
      return fixedHour;
    } else {
      return Number(hour) + 9 + '';
    }
  };

  const patchCommentHandler = () => {
    axios
      .patch(
        'https://greeneachdomain.tk/comment',
        { comment: placeHolder, commentId: com.id },
        { headers: { token: cookies } }
      )
      .then((data) => (window.location = '/plant'))
      .catch((error) => console.log(error));
  };

  //댓글삭제요청 함수
  const deleteCommentHandler = () => {
    axios({
      url: 'https://greeneachdomain.tk/comment',
      method: 'delete',
      data: { commentId: com.id },
      headers: { token: cookies },
    });
  };

  // comment를 클릭하면 넓어지는 부분을 위한 토글메소드
  useEffect(() => {
    if (writer === com.User.email) {
      setIsMine(true);
    }
  });
  return isMine ? ( // 내가 쓴 글 (true)
    isClick ? ( // 클릭된 상태 (true)
      <div onClick={() => setIsClick(!isClick)}>
        <div className='comment__list'>
          <div className='comment__userinfo'>
            <div>{com.User.username}</div>
            <div>
              {yearMonthDay}일 {'' + hour}시 {'' + min}분
            </div>
          </div>
          <div className="comComment">{com.comment}</div>
          <div className="clickSpace"></div>
          <button onClick={() => setIsReviseMode(!isReviseMode)}>수정</button>
          {/* <Link onClick={() => deleteCommentHandler()} href='/plantList'> */}
          <button onClick={() => deleteCommentHandler()}>삭제</button>
          {/* </Link> */}
        </div>
        <img
          className='tglcomment__photo'
          src={JSON.parse(com.photoUrl)[0]}
          alt='사진'
        ></img>
        <style jsx='true'>
          {`
           .comComment{
            width: 40vw;
          }
            .tglcomment__photo {
              max-width: 600px;
            }
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
    ) : // 내가 쓴 글(true), 클릭된 상태(false) 수정 모드(true)
      isReviseMode ? (
        <div>
          <div className='comment__list'>
            <div className='comment__userinfo'>
              <div>{com.User.username}</div>
              <div>
                {yearMonthDay}일 {'' + hour}시 {'' + min}분
            </div>
            </div>
            <input
              type='text'
              value={placeHolder}
              onChange={(e) => setPlaceHolder(e.target.value)}
              className="comComment"
            ></input>
            <img
              className='comment__photo'
              src={JSON.parse(com.photoUrl)[0]}
              alt='사진'
            ></img>
            {/* <Link onClick={() => patchCommentHandler()} href='/plantList'> */}
            <button onClick={() => patchCommentHandler()}>완료</button>
            {/* </Link> */}
            <button onClick={() => setIsReviseMode(!isReviseMode)}>취소</button>
          </div>
          <style jsx='true'>
            {`
             .comComment{
              width: 40vw;
            }
            .tglcomment__photo {
              max-width: 600px;
            }
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
      ) : (
          // 내가 쓴 글(true) 클릭된 상태(false) 수정 모드(false)
          <div>
            <div className='comment__list'>
              <div
                onClick={() => setIsClick(!isClick)}
                className='comment__userinfo'
              >
                <div>{com.User.username}</div>
                <div>
                  {yearMonthDay}일 {'' + hour}시 {'' + min}분
            </div>
              </div>
              <div className="comComment" onClick={() => setIsClick(!isClick)}>{com.comment}</div>
              <img
                onClick={() => setIsClick(!isClick)}
                className='comment__photo'
                src={JSON.parse(com.photoUrl)[0]}
                alt='사진'
              ></img>
              <button onClick={() => setIsReviseMode(!isReviseMode)}>수정</button>
              <Link onClick={() => deleteCommentHandler()} href='/plantList'>
                <button onClick={() => deleteCommentHandler()}>삭제</button>
              </Link>
            </div>
            <style jsx='true'>
              {`
              .comComment{
                width: 40vw;
              }
            .tglcomment__photo {
              max-width: 600px;
            }
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
            .clickSpace{
              background-color: transparent;
              min-height: 5vh;
              min-width: 5vw;

            }
            .comment__photo {
              height: 5vh;
            }
          `}
            </style>
          </div>
        )
  ) : isClick ? ( //내글(x) , 클릭(ㅇ)
    <div onClick={() => setIsClick(!isClick)}>
      <div className='comment__list'>
        <div className='comment__userinfo'>
          <div>{com.User.username}</div>
          <div>
            {yearMonthDay}일 {'' + hour}시 {'' + min}분
          </div>
        </div>
        <div className="comComment">{com.comment}</div>
        <div className="clickSpace"></div>
        <div className="trans" ></div>
        <div className="trans"></div>
      </div>
      <img
        className='tglcomment__photo'
        src={JSON.parse(com.photoUrl)[0]}
        alt='사진'
      ></img>

      <style jsx='true'>
        {`
        .trans{
          min-width:6vh;
        }
         .comComment{
          width: 40vw;
        }
          .tglcomment__photo {
            max-width: 600px;
          }
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
  ) : (
        <div onClick={() => setIsClick(!isClick)}>
          <div className='comment__list'>
            <div className='comment__userinfo'>
              <div>{com.User.username}</div>
              <div>
                {yearMonthDay}일 {'' + hour}시 {'' + min}분
          </div>
            </div>
            <div className="comComment">{com.comment}</div>
            <img
              className='comment__photo'
              src={JSON.parse(com.photoUrl)[0]}
              alt='사진'
            ></img>
            <div className="trans"></div>
            <div className="trans"></div>
          </div>

          <style jsx='true'>
            {`
            .trans{
              min-width:6vh;
            }
             .comComment{
              width: 40vw;
            }
          .tglcomment__photo {
            max-width: 600px;
          }
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
      );
};

export default Comment;
