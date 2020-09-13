import React from "react";
import styles from "../styles/startPage.module.css";
import Nav from "../components/nav";
import Link from "next/link";

const start = () => {
  //   const eventOnChangeCombobox = () => {
  //     const select1 = document.getElementById("select1");
  //     let tempArr = [];
  //     let count;
  //     if (select1.value !== "선택해주세요") {
  //       //선택창이 1이면 카운트의 값은 1
  //       count = 3;
  //     }
  //     for (let i = 1; i < count; i++) {
  //       tempArr.push(<Select2></Select2>);
  //     }

  //   };

  return (
    <div>
      <div className={styles.container}>
        <select className={styles.flex_select1}>
          {/*onChange={eventOnChangeCombobox*/}
          <option value="none">선택해주세요</option>
          <option value="초보자">초보자</option>
          <option value="경험자">경험자</option>
          <option value="숙련자">숙련자</option>
        </select>
        <select className={styles.flex_select2}>
          <option value="none">선택해주세요</option>
          <option value="봄">봄</option>
          <option value="여름">여름</option>
          <option value="가을">가을</option>
          <option value="겨울">겨울</option>
        </select>
        <select className={styles.flex_select3}>
          <option value="none">선택해주세요</option>
          <option value="채소">깻잎</option>
          <option value="채소">상추</option>
          <option value="채소">양배추</option>
        </select>
        <input type="checkbox"></input>
        <Link href="/plantAdd">
          <button>새글작성</button>
       </Link>
      </div>
      

      <div className={styles.container}>
        <img src="https://i.pinimg.com/originals/22/bb/5f/22bb5f6e25c72c11db39805137df814f.png" />
        <img src="https://cdn.crowdpic.net/detail-thumb/thumb_d_5D88C4D76A6DC4C470D37780304C1F6C.jpg" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjUfUYKV-3jOUVpm9zmTWdGbChtgF4BJAEOA&usqp=CAU" />
        <img src="https://cdn.pixabay.com/photo/2018/10/16/02/27/blue-flower-dan-3750487_960_720.jpg" />
        
      </div>
      <button>more pics</button>
    </div>
  );
};

export default start;
