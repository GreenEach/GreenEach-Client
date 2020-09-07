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

//1.파일선택 버튼을 누르고 파일선택 v
//2.업로드 버튼을 누르면 선택된 파일의 이름이 List에 표출 v
//3.업로드 버튼을 누르면 선택된 파일이 Content에 표출
//4.Axios를 사용하여 서버DB로 보낸다 1)POST를 눌렀을때 제목과 콘텐츠와 함께 한번에 보낸다
//                                 2)Upload를 눌렀을 때, 사진을 우선 보내고 난 후에 POST를 누르면 제목과 콘텐츠가 보내진다
//                                 (두 번 보낼 필요가 없으니, 전자?)
// const BASE_URL = "http://localhost:3000/plantAdd";

const start = () => {
  const [contents, setContent] = useState("");
  const [uploadedImg, setUploadedImg] = useState({
    fileName: "",
    img: "",
  });
  const [uploadedText, setUploadedText] = useState({
    img: null,
    title: "",
    content: "",
    level: "",
    season: "",
    category: "",
    onAddedImg(e) {
      img = e.target.value;
    },
    onChangeTitle(e) {
      title = e.target.value;
    },
    onChangeContent(e) {
      content = e.target.value;
    },
    onChangeLevel(e) {
      level = e.target.value;
    },
    onChangeSeason(e) {
      season = e.target.value;
    },
    onChangeCategory(e) {
      category = e.target.value;
    },
  });
  // img title content level season category
  const onChange = (e) => {
    setContent(e.target.files[0]);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", contents);
    formData.append("text", contents);
    formData.append("text", contents);
    axios
      .post("http://localhost:3000/content", formData)
      .then((res) => {
        const { fileName, title, content } = res.data;
        console.log(fileName, title, content);
        setUploadedText({
          title,
          content,
        });
        setUploadedImg({
          fileName,
          img: `${BASE_URL}/img/${fileName}`,
        });
        alert("컨텐츠가 업로드 되었습니다.");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <Nav></Nav>
      <Container> </Container>
      <form onSubmit={onSubmit}>
        <File type="file" name="file" onChange={onChange}></File>
        <List />
        <Select1 onChange={onChange}>
          <option value="none">선택해주세요</option>
          <option value="초보자">초보자</option>
          {/* onChange state 값을 .... */}
          <option value="경험자">경험자</option>
          <option value="숙련자">숙련자</option>
        </Select1>
        <Select2 onChange={onChange}>
          <option value="none">선택해주세요</option>
          <option value="봄">봄</option>
          <option value="여름">여름</option>
          <option value="가을">가을</option>
          <option value="겨울">겨울</option>
        </Select2>
        <Title onSubmit={onChange}></Title>
        <Content onSubmit={onChange}></Content>
        {uploadedImg ? (
          <>
            <img src={uploadedImg.img} alt="" />
            <h3>{uploadedImg.fileName}</h3>
          </>
        ) : (
          "Cant resolve"
        )}
        <Send type="submit">POST!</Send>
      </form>
    </div>
  );
};

export default start;

// const start = () => {
//   const state = useLocalStore(() => ({
//     selectedFile: null,
//     title: "",
//     content: "",
//     img: null,
//   }));

//   const handleFileInput = (e) => {
//     state.selectedFile = e.target.files[0];
//   };

//   const handlePost = async () => {
//     const formData = new FormData();
//     formData.append("file", formData);
//     await axios.post("http://121.137.150.214:3000/", formData);
//   };
//   return (
//     <div>
//       <Nav></Nav>
//       <Container> </Container>
//       <File
//         type="file"
//         name="file"
//         onChange=""
//         onClick={handleFileInput}
//       ></File>

//       <List />
//       <Select1>
//         <option value="none">선택해주세요</option>
//         <option value="초보자">초보자</option>
//         <option value="경험자">경험자</option>
//         <option value="숙련자">숙련자</option>
//       </Select1>
//       <Select2>
//         <option value="none">선택해주세요</option>
//         <option value="봄">봄</option>
//         <option value="여름">여름</option>
//         <option value="가을">가을</option>
//         <option value="겨울">겨울</option>
//       </Select2>
//       <Title></Title>
//       <Content></Content>
//       <Send onClick={handlePost}>POST!</Send>
//     </div>
//   );
// };

// export default start;
