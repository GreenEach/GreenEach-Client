import React from "react";
import styled from "styled-components";
import Nav from "../components/nav";
import Link from "next/link";
const Select1 = styled.select`
  min-width: 200px;
  border: none;
  font-size: 25px;
  padding: 7px 10px;
  margin: 10px;
  position: absolute;
  width: 306px;
  height: 88px;
  left: 77px;
  top: 156px;
`;
const Select2 = styled.select`
  min-width: 200px;
  border: none;
  font-size: 25px;
  padding: 7px 10px;
  margin: 10px;
  position: absolute;
  width: 306px;
  height: 88px;
  left: 443px;
  top: 156px;
`;
const Select3 = styled.select`
  min-width: 200px;
  border: none;
  font-size: 25px;
  padding: 7px 10px;
  margin: 10px;
  position: absolute;
  width: 306px;
  height: 88px;
  left: 825px;
  top: 156px;
`;
const Checker = styled.input`
  position: absolute;
  width: 49px;
  height: 40px;
  left: 1178px;
  top: 204px;
`;
const Button1 = styled.button`
  font-size: 30px;
  position: absolute;
  width: 181px;
  height: 87px;
  left: 1316px;
  top: 165px;
`;
const Imgcont1 = styled.img`
  position: absolute;
  width: 759px;
  height: 477px;
  left: 94px;
  top: 315px;
`;
const Imgcont2 = styled.img`
  position: absolute;
  width: 609px;
  height: 289px;
  left: 912px;
  top: 315px;
`;
const Imgcont3 = styled.img`
  position: absolute;
  width: 286px;
  height: 166px;
  left: 915px;
  top: 624px;
`;
const Imgcont4 = styled.img`
  position: absolute;
  width: 266px;
  height: 166px;
  left: 1255px;
  top: 624px;
`;
const Button2 = styled.button`
  position: absolute;
  width: 301px;
  height: 36px;
  left: 707px;
  top: 826px;
`;

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
      <Nav></Nav>
      <div>
        <Select1 id="select1">
          {" "}
          {/*onChange={eventOnChangeCombobox*/}
          <option value="none">선택해주세요</option>
          <option value="초보자">초보자</option>
          <option value="경험자">경험자</option>
          <option value="숙련자">숙련자</option>
        </Select1>
        <Select2 id="select2">
          <option value="none">선택해주세요</option>
          <option value="봄">봄</option>
          <option value="여름">여름</option>
          <option value="가을">가을</option>
          <option value="겨울">겨울</option>
        </Select2>
        <Select3>
          <option value="none">선택해주세요</option>
          <option value="채소">깻잎</option>
          <option value="채소">상추</option>
          <option value="채소">양배추</option>
        </Select3>
        <Checker type="checkbox"></Checker>
      </div>
      <Link href="/plantAdd">
        <Button1>새글작성</Button1>
      </Link>

      <div>
        <Imgcont1 src="https://i.pinimg.com/originals/22/bb/5f/22bb5f6e25c72c11db39805137df814f.png" />
        <Imgcont2 src="https://cdn.crowdpic.net/detail-thumb/thumb_d_5D88C4D76A6DC4C470D37780304C1F6C.jpg" />
        <Imgcont3 src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjUfUYKV-3jOUVpm9zmTWdGbChtgF4BJAEOA&usqp=CAU" />
        <Imgcont4 src="https://cdn.pixabay.com/photo/2018/10/16/02/27/blue-flower-dan-3750487_960_720.jpg" />
        <Button2>more pics</Button2>
      </div>
    </div>
  );
};

export default start;
