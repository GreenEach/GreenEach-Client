import React, { useEffect, useCallback, useState } from 'react';
import Link from 'next/link';
import Nav from '../components/nav';
import axios from 'axios';
import styled from 'styled-components';
import styles from '../styles/plantList.module.css';
import { useObserver, useLocalStore } from 'mobx-react';
import { plantListStore } from '../store/plantList';
import { Cookies, withCookies } from 'react-cookie';
import Content from '../components/contents';

const PlantList = ({ cookies }) => {
  const [lists, setLists] = useState([]);

  const state = useLocalStore(() => ({
    level: 'hard',
    season: 'winter',

    onChangeLevel(e) {
      this.level = e.target.value;
    },
    onChangeSeason(e) {
      this.season = e.target.value;
    },
  }));

  const SpecificContent = async () => {
    const result = await axios.post(
      'http://greeneachdomain.tk:3000/content/specific',
      { ...state },
      { headers: { token: cookies.get('userInfo') } }
    );
    setLists(result.data);
  };

  const contentMap = lists.reverse().map((list) => {
    return (
      <Link href='/plant' key={list.id}>
        <Content className={styles.lists} list={list} key={list.id}></Content>
      </Link>
    );
  });

  const setItemHandler = (e) => {
    plantListStore.setId(e.target.getAttribute('value'));
  };

  useEffect(() => {
    SpecificContent();
  }, []);

  return useObserver(() => {
    return (
      <div>
        <div>
          <select onChange={state.onChangeLevel}>
            <option value='none'>선택해주세요</option>
            <option value='easy'>초보자</option>
            <option value='normal'>경험자</option>
            <option value='hard'>숙련자</option>
          </select>
          <select onChange={state.onChangeSeason}>
            <option value='any'>선택해주세요</option>
            <option value='spring'>봄</option>
            <option value='summer'>여름</option>
            <option value='fall'>가을</option>
            <option value='winter'>겨울</option>
          </select>
          <button
            className={styles.create__button}
            onClick={() => SpecificContent()}
          >
            search
          </button>
        </div>
        <div className={styles.button}>
          <Link href='/plantAdd'>
            <button className={styles.create__button}>Create</button>
          </Link>
        </div>
        <div className={styles.lists}>
          {contentMap}
          {/* {lists.map((list, id) => (
            <Link href={`/plant?id=${list.id}`} key={id}>
              <div>
                <div className={styles.list}>
                  <img
                    className={styles.list__photo}
                    width='250px'
                    height='250px'
                    src={JSON.parse(list.photoUrl)[0]} // 한 게시글의 첫 번째 사진
                  ></img>
                  <div
                    className={styles.list__description}
                    value={list.id} // 한 게시글의 id번호
                    onClick={setItemHandler}
                  >
                    {list.id}
                    <h3 value={list.id} onClick={setItemHandler}>
                      {list.title}
                    </h3>
                    <span value={list.id} onClick={setItemHandler}>
                      {list.content}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))} */}
        </div>
      </div>
    );
  });
};

export default withCookies(PlantList);
