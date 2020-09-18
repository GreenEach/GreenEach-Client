import React, { useEffect, useCallback, useState } from "react";
import Link from "next/link";
import Nav from "../components/nav";
import axios from "axios";
import styled from "styled-components";
import styles from "../styles/plantList.module.css";
import { useObserver, useLocalStore } from "mobx-react";
import { plantListStore } from "../store/plantList";
import { Cookies, withCookies } from "react-cookie";
import Content from "../components/contents";

const PlantList = ({ cookies }) => {
  const [lists, setLists] = useState([]);

  const state = useLocalStore(() => ({
    level: "",
    season: "",

    onChangeLevel(e) {
      this.level = e.target.value;
    },
    onChangeSeason(e) {
      this.season = e.target.value;
    },
  }));

  const getAllContent = () => {
    axios
      .get("https://greeneachdomain.tk/content/allContent", {
        headers: {
          token: cookies.get("userInfo"),
        },
      })
      .then((response) => {
        setLists(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SpecificContent = async () => {
    const result = await axios.post(
      "https://greeneachdomain.tk/content/specific",
      { ...state },
      { headers: { token: cookies.get("userInfo") } }
    );
    setLists(result.data);
  };

  const contentMap = lists.reverse().map((list) => {
    return (
      <Link href="/plant" key={list.id}>
        <Content className={styles.lists} list={list} key={list.id}></Content>
      </Link>
    );
  });

  const setItemHandler = (e) => {
    plantListStore.setId(e.target.getAttribute("value"));
  };

  useEffect(() => {
    getAllContent();
  }, []);

  return useObserver(() => {
    return (
      <div>
        <div className={styles.selectBar}>
          <div className={styles.choiceAndCreate}>
            <div className={styles.newContentText}>
              나에게 맞는 식물을 검색해보세요!
            </div>
            <div className={styles.selectAndBtn}>
              <select
                className={styles.selectBox}
                onChange={state.onChangeLevel}
              >
                <option value="none">난이도 검색</option>
                <option value="easy">초보자</option>
                <option value="normal">경험자</option>
                <option value="hard">숙련자</option>
              </select>
              <select
                className={styles.selectBox}
                onChange={state.onChangeSeason}
              >
                <option value="any">계절 검색</option>
                <option value="spring">봄</option>
                <option value="summer">여름</option>
                <option value="fall">가을</option>
                <option value="winter">겨울</option>
              </select>
              <button
                className={styles.create__button}
                onClick={() => SpecificContent()}
              >
                search
              </button>
            </div>
          </div>
          <div className={styles.choiceAndCreate}>
            <div className={styles.newContentText}>
              새로운 글을 등록하고 싶으신가요?
            </div>
            <div className={styles.button}>
              <Link href="/plantAdd">
                <button className={styles.create__button}>Create</button>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.lists}>{contentMap}</div>
      </div>
    );
  });
};

export default withCookies(PlantList);
