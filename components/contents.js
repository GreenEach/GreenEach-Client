import React, { useCallback, useEffect, useState } from 'react';
import styles from '../styles/plantList.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { plantListStore } from '../store/plantList';

const Content = ({ list, href }) => {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  const listToPass = JSON.stringify(list);

  const setItemHandler = (e) => {
    plantListStore.setId(e.target.getAttribute('value'));
  };

  return (
    <Link href={`/plant?id=${listToPass}`} as='/plant' key={list.id}>
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
              {list.title}{' '}
            </h3>
            <span value={list.id} onClick={setItemHandler}>
              {list.content}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Content;
