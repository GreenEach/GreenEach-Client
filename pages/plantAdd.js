import React, { useCallback, useState } from "react";
import Nav from "../components/nav";
import styled from "styled-components";
import axios from "axios";
import { observer, useObserver, useLocalStore } from "mobx-react";
import FormData from "form-data";
// import { handlePost } from "../store/upload";

const Container = styled.div`
  position: absolute;
  width: 745px;
  height: 836px;
  left: 579px;
  top: 114px;
  background-color: #c4c4c4;
`;
const File = styled.input`
  position: absolute;
  width: 500px;
  height: 34px;
  left: 600px;
  top: 132px;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const Button = styled.button`
  position: absolute;
  width: 100px;
  height: 34px;
  left: 600px;
  top: 232px;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const List = styled.div`
  position: absolute;
  width: 500px;
  height: 108px;
  left: 600px;
  top: 172px;

  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const Select1 = styled.select`
  min-width: 200px;
  border: none;
  font-size: 20px;
  padding: 7px 10px;
  margin: 10px;
  position: absolute;
  width: 206px;
  height: 50px;
  left: 593px;
  top: 294px;
`;
const Select2 = styled.select`
  min-width: 200px;
  border: none;
  font-size: 20px;
  padding: 7px 10px;
  margin: 10px;
  position: absolute;
  width: 206px;
  height: 50px;
  left: 813px;
  top: 294px;
`;
const Title = styled.textarea`
  position: absolute;
  width: 721px;
  height: 37px;
  left: 591px;
  top: 375px;
  resize: none;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const Content = styled.textarea`
  position: absolute;
  width: 719px;
  height: 399px;
  left: 593px;
  top: 445px;
  resize: none;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;
const Send = styled.button`
  position: absolute;
  width: 164px;
  height: 57px;
  left: 879px;
  top: 877px;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
`;

const BASE_URL = "http://localhost:3000/plantAdd";

const start = () => {
  const state = useLocalStore(() => ({
    img: null,
    title: "",
    content: "",
    level: "",
    season: "",
    category: "",
    onAddedImg(e) {
      this.img = e.target.value;
    },
    onChangeTitle(e) {
      this.title = e.target.value;
    },
    onChangeContent(e) {
      this.content = e.target.value;
    },
    onChangeLevel(e) {
      this.level = e.target.value;
    },
    onChangeSeason(e) {
      this.season = e.target.value;
    },
    onChangeCategory(e) {
      this.category = e.target.value;
    },
  }));

  const onChange = (e) => {
    setContent(e.target.files[0]);
  };

  const onClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", state.img);
    formData.append("content", state.content);
    formData.append("title", state.title);
    formData.append("level", state.level);
    formData.append("season", state.season);
    axios
      .post("http://localhost:3000/content", formData)
      .then((res) => {
        const { img, title, content, level, season, category } = res.data;
        console.log(img, title, content, level, season, category);
        onChangeTitle({ title });
        onChangeContent({ content });
        onChangeLevel({ level });
        onChangeSeason({ season });
        onChangeCategory({ category });
        onAddedImg({
          img: `${BASE_URL}/img/${fileName}`,
        });
        alert("컨텐츠가 업로드 되었습니다.");
      })
      .catch((err) => {
        alert("컨텐츠 업로드에 실패했습니다.");
      });
  };
  return useObserver(() => {
    return (
      <div>
        <Nav></Nav>
        <Container> </Container>
        <form>
          <File type="file" name="file" onChange={state.onAddedImg}></File>
          <List />
          <Select1 onChange={state.onChangeLevel}>
            <option value="none">선택해주세요</option>
            <option value="초보자">초보자</option>
            <option value="경험자">경험자</option>
            <option value="숙련자">숙련자</option>
          </Select1>
          <Select2 onChange={state.onChangeSeason}>
            <option value="none">선택해주세요</option>
            <option value="봄">봄</option>
            <option value="여름">여름</option>
            <option value="가을">가을</option>
            <option value="겨울">겨울</option>
          </Select2>
          <Title onChange={state.onChangeTitle}></Title>
          <Content onChange={state.onChangeContent}></Content>
          {/* {onAddedImg ? (
            <>
              <img src={onAddedImg.img} alt="" />
            </>
          ) : (
            "Cant resolve"
          )} */}
          <Send type="submit" onClick={onClick}>
            POST!
          </Send>
        </form>
      </div>
    );
  });
};

export default start;
