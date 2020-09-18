import React, { useCallback, useEffect, useState } from 'react';
import Nav from '../components/nav';
import styled from 'styled-components';
import axios from 'axios';
import { observer, useObserver, useLocalStore } from 'mobx-react';
import FormData from 'form-data';
import { Cookies, withCookies } from 'react-cookie';
import { plantListStore } from '../store/plantList';
import Link from 'next/link';

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
const Delete = styled.a`
  display: none;
`;
const Thumb = styled.img`
  display: none;
`;

const start = ({ cookies }) => {
  const [photoArr, setPhotoArr] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  //내용 불러오는 요청
  const fetchContentDetail = async () => {
    let id = plantListStore.listId;
    const result = await axios.post(
      'https://greeneachdomain.tk/content/detail',
      { contentId: Number(id) },
      { headers: { token: cookies.get('userInfo') } }
    );

    setTitle(result.data.contentInfo[0].title);
    setContent(result.data.contentInfo[0].content);
  };

  // 수정하는 요청
  const fetchContentUpdate = async () => {
    let id = plantListStore.listId;
    const result = await axios.patch(
      'https://greeneachdomain.tk/content',
      { contentId: Number(id) },
      { headers: { token: cookies.get('userInfo') } }
    );
    setTitle(result.data.contentInfo[0].title);
    setContent(result.data.contentInfo[0].content);
    setPhotoArr(JSON.parse(result.data.contentInfo[0].photoUrl));
  };

  useEffect(() => {
    fetchContentDetail();
  }, []);

  const state = useLocalStore(() => ({
    img: null,
    title: '',
    content: '',
    level: '',
    season: '',

    onAddedImg(e) {
      this.img = e.target.files;
      thumbnail(e);
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
  }));

  const onClick = (e) => {
    e.preventDefault();
    let id = plantListStore.listId;
    const Data = new FormData();

    for (let i = 0; i < state.img.length; i++) {
      Data.append('img', state.img[i]);
    }
    Data.append('content', content);
    Data.append('title', title);
    Data.append('level', state.level);
    Data.append('season', state.season);
    Data.append('contentId', Number(id));
    console.log(Data.get('img'));
    console.log(Data.get('content'));
    console.log(Data.get('title'));
    console.log(Data.get('level'));
    console.log(Data.get('season'));

    axios
      .patch('https://greeneachdomain.tk/content', Data, {
        headers: { token: cookies.get('userInfo') },
      })
      .then((res) => {
        if (res.status === 200) {
          // alert('컨텐츠가 업로드 되었습니다.');
          window.location = '/plantList';
        }
      })
      .catch((err) => {
        console.log(err);
        alert('컨텐츠 업로드에 실패했습니다.');
      });
  };

  const deleteContentHandler = () => {
    axios({
      url: 'https://greeneachdomain.tk/content',
      method: 'delete',
      data: { contentId: Number(id) },
      headers: { token: cookies.get('userInfo') },
    });
  };

  const thumbnail = (e) => {
    let thumbImg = document.querySelector('.thumbImg');
    thumbImg.src = URL.createObjectURL(e.target.files[0]); //이미지의 url생성
    thumbImg.height = 150;
    thumbImg.width = 150;
    thumbImg.style.display = 'block';
    thumbImg.onload = function () {
      URL.revokeObjectURL(document.querySelector('.thumbImg').src); //썸네일이 출력되면 생성된 url삭제
    };
    document.querySelector('.delButton').style.display = 'block';
  };

  const thumbDel = (e) => {
    let thumbImg = e.target.previousElementSibling; //직전요소의 이벤트 객체 = 생성된 썸네일
    thumbImg.src = '';
    document.querySelector('.delButton').style.display = 'none';
    document.querySelector('.thumbImg').style.display = 'none';
  };

  return useObserver(() => {
    return (
      <div>

        <form enctype='multipart/form-data'>
          <input
            accept='image/jpeg, image/jpg, image/png'
            type='file'
            name='file'
            className='IMG'
            onChange={state.onAddedImg}
            multiple
          ></input>

          <div>
            <img src='' className='thumbImg' />
            사진을 새로 올려주세요
          </div>
          <a className='delButton' onClick={thumbDel}>
            썸네일삭제
          </a>

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

          <textarea
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          ></textarea>

          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
          <button type='submit' onClick={onClick}>
            Update
          </button>
        </form>
      </div>
    );
  });
};
export default withCookies(start);