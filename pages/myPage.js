import React, { useCallback, useEffect } from "react";
import styles from "../styles/myPage.module.css";
import { Button, Form, Table } from "react-bootstrap";
import { observer, useObserver, useLocalStore } from "mobx-react";
import Axios from "axios";
import { Cookies, withCookies } from "react-cookie";
import Link from "next/link";

const myPage = ({ cookies }) => {
  const state = useLocalStore(() => ({
    password: "",
    password2: "",
    username: "",
    contents: [],
    comments: [],
    onChangeUserName(e) {
      this.username = e.target.value;
    },
    onChangePassword(e) {
      this.password = e.target.value;
    },
    onChangePassword2(e) {
      this.password2 = e.target.value;
    },
  }));

  const getCommentsContents = () => {
    Axios.post(
      "http://18.191.16.175:3000/sign/mypage",
      {},
      { headers: { token: cookies.get("userInfo") } }
    )
      .then((response) => {
        let contentsArr = [];
        let commentsArr = [];
        //업뎃 시간, 카테고리(레벨, 시즌) [[title, ]]
        console.log(response.data[0]);
        for (let i = 0; i < response.data[0].Contents.length; i++) {
          contentsArr.push([
            response.data[0].Contents[i].title,
            response.data[0].Contents[i].level,
            response.data[0].Contents[i].season,
            response.data[0].Contents[i].updatedAt,
            response.data[0].Contents[i].id,
          ]);
        }

        for (let j = 0; j < response.data[0].Comments.length; j++) {
          commentsArr.push([
            response.data[0].Comments[j].comment,
            response.data[0].Comments[j].updatedAt,
            response.data[0].Comments[j].ContentId,
          ]);
        }

        state.contents = contentsArr;
        state.comments = commentsArr;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCommentsContents();
  }, []);

  const contentsList = () => {
    return state.contents.map((data, i) => {
      let yearMonthDay = data[3].substring(0, 10);
      let hour = data[3].substring(11, 13);
      let min = data[3].substring(14, 16);

      let contentIdToPass = JSON.stringify({ id: data[4] });
      return (
        <tbody className={styles.myContent}>
          <Link href={`/plant?id=${contentIdToPass}`} key={data[4]}>
            <tr>
              <td>{i + 1}</td>
              <td>{data[0]}</td>
              <td>{data[1]}</td>
              <td>{data[2]}</td>
              <td>
                {" "}
                {yearMonthDay}일 {"" + hour}시 {"" + min}분
              </td>
            </tr>
          </Link>
        </tbody>
      );
    });
  };

  useEffect(() => {
    contentsList();
  }, []);

  const commentsList = () => {
    return state.comments.map((data, i) => {
      let yearMonthDay = data[1].substring(0, 10);
      let hour = data[1].substring(11, 13);
      let min = data[1].substring(14, 16);

      let IdToPass = JSON.stringify({ id: data[2] });
      return (
        <tbody className={styles.myComment}>
          <Link href={`/plant?id=${IdToPass}`} key={data[2]}>
            <tr>
              <td>{i + 1}</td>
              <td>{data[0]}</td>
              <td>
                {" "}
                {yearMonthDay}일 {"" + hour}시 {"" + min}분
              </td>
            </tr>
          </Link>
        </tbody>
      );
    });
  };

  useEffect(() => {
    commentsList();
  }, []);

  return useObserver(() => {
    return (
      <div className={styles.myPage_container}>
        {/* <div className={styles.userInfoContainer}>
           <div className={styles.userInfoTitle}>회원 정보</div>
           <div className={styles.userInfoEmail}>email : {state.email}</div>
          
        </div> */}
        <div className={styles.flex_item1}></div>
        <div className={styles.contentsContainer}>
          <div className={styles.title}>내가 쓴 글</div>
          <div className={styles.item1_contents}>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Level</th>
                  <th>Weather</th>
                  <th>Update</th>
                </tr>
              </thead>
              {contentsList()}
            </Table>
          </div>
        </div>

        <div className={styles.flex_item2}>
          <div className={styles.commentsContainer}>
            <div className={styles.title}>내가 쓴 댓글</div>
            <div className={styles.item1_comments}>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Comments</th>
                    <th>Update</th>
                  </tr>
                </thead>
                {commentsList()}
              </Table>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default withCookies(myPage);
