import React, { useEffect, useCallback } from "react";
import Link from "next/link";
import Nav from '../components/nav'
import { plantListStore, photoStore } from '../store/plantList.js'
import axios from 'axios';
import styled from "styled-components";
import { useObserver, useLocalStore } from 'mobx-react'
import { runInAction, action } from 'mobx';

const expectedRes = [
    {
        "id": 3,
        "title": "title is...",
        "content": "content is...",
        "level": "normal",
        "season": "summer",
        "category": "flower",
        "photoUrl": "[\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293730105.JPG\",\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293731266.JPG\",\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293732322.jpg\"]",
        "userId": 1,
        "createdAt": "2020-09-05T08:15:34.000Z",
        "updatedAt": "2020-09-05T08:15:34.000Z",
        "UserId": 1
    },
    {
        "id": 4,
        "title": "title is...",
        "content": "content is...",
        "level": "normal",
        "season": "summer",
        "category": "flower",
        "photoUrl": "[\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293761946.JPG\",\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293763071.JPG\",\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293767487.jpg\"]",
        "userId": 1,
        "createdAt": "2020-09-05T08:16:09.000Z",
        "updatedAt": "2020-09-05T08:16:09.000Z",
        "UserId": 1
    },
    {
        "id": 5,
        "title": "title is...",
        "content": "content is...",
        "level": "normal",
        "season": "summer",
        "category": "flower",
        "photoUrl": "[\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293791007.JPG\",\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293792174.JPG\",\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293793449.jpg\"]",
        "userId": 1,
        "createdAt": "2020-09-05T08:16:35.000Z",
        "updatedAt": "2020-09-05T08:16:35.000Z",
        "UserId": 1
    },
    {
        "id": 6,
        "title": "title is...",
        "content": "content is...",
        "level": "normal",
        "season": "summer",
        "category": "flower",
        "photoUrl": "[\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293796707.JPG\",\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293797696.JPG\",\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293798592.jpg\"]",
        "userId": 1,
        "createdAt": "2020-09-05T08:16:40.000Z",
        "updatedAt": "2020-09-05T08:16:40.000Z",
        "UserId": 1
    },
    {
        "id": 7,
        "title": "title is...",
        "content": "content is...",
        "level": "normal",
        "season": "summer",
        "category": "flower",
        "photoUrl": "[\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293796707.JPG\",\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293797696.JPG\",\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293798592.jpg\"]",
        "userId": 1,
        "createdAt": "2020-09-05T08:16:40.000Z",
        "updatedAt": "2020-09-05T08:16:40.000Z",
        "UserId": 1
    },
    {
        "id": 8,
        "title": "title is...",
        "content": "content is...",
        "level": "normal",
        "season": "summer",
        "category": "flower",
        "photoUrl": "[\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293796707.JPG\",\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293797696.JPG\",\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293798592.jpg\"]",
        "userId": 1,
        "createdAt": "2020-09-05T08:16:40.000Z",
        "updatedAt": "2020-09-05T08:16:40.000Z",
        "UserId": 1
    },
    {
        "id": 9,
        "title": "title is...",
        "content": "content is...",
        "level": "normal",
        "season": "summer",
        "category": "flower",
        "photoUrl": "[\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293796707.JPG\",\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293797696.JPG\",\"https://greeneach.s3.ap-northeast-2.amazonaws.com/1599293798592.jpg\"]",
        "userId": 1,
        "createdAt": "2020-09-05T08:16:40.000Z",
        "updatedAt": "2020-09-05T08:16:40.000Z",
        "UserId": 1
    }
]

const state = {
    level: 'normal',
    season: 'summer',
    category: 'flower'
}
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWNvbmZpQGdtYWlsLmNvbSIsImlkIjozLCJpYXQiOjE1OTkzOTU3NDJ9.RviXSvWRNx_52lkLyZXnBCYl8LTylpGSIRKxcXSSL9Y"

const PlantList = () => {

    const SpecificContent = async () => {
        const result = await axios.post('http://18.191.16.175:3000/content/specific', { ...state }, { headers: { token: token } })
        console.log('result', result.data);
        plantListStore.listData = result.data
        await action(() => {
            plantListStore.listData = result.data
        })
    }

    useEffect(() => {
        console.log('useEffectTest');
        SpecificContent()
    }, [])

    console.log(plantListStore.listData)
    const mappedImg = expectedRes.map((list, id) =>
        <Link href='plant' key={id}>
            <div className="list" >
                <img className="list__photo" width="250px" height="250px" src={JSON.parse(list.photoUrl)[0]}   ></img >
                <div className="list__description" >
                    <h3 >{list.title}</h3>
                    <span >{list.content}</span>
                </div>
            </div>
        </Link>
    );

    return useObserver(() => {
        return (
            <div>
                <Nav />
                <div className="button">
                    <Link href="/plantAdd">
                        <button className="create__button">Create</button>
                    </Link>
                </div>
                <div className="lists">
                    {mappedImg}
                </div>
                <style jsx="true">{`
      .lists{
      display: flex;
      flex-wrap:wrap;
      justify-content: center;
      }
      .list{
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 280px;
      height:250px;
      margin: 4px;
      margin-bottom: 10px;
      cursor: pointer;
      }
      .list__photo{
      max-width: 100%;
      max-height: 100%;
      }
      .list__description{
      align-items: center;
      position:absolute ;
      background-color: black;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      transform: translateY(10px);
      transition: all 300ms ease-in;
      }
      .list:hover .list__description{
      opacity: 0.8;
      transform: translateY(0px);
      }
      .list__description h3{
      color: white;
      }
      .list__description h3:after{
      content: '';
      display: block;
      position: relative;
      left: 50%;
      margin-left: -12px;
      margin-top: 8px;
      width: 25px;
      height: 2px;
      background-color: var(--color-dark-white);
      }
      button{
          background-color: transparent;
          cursor: pointer;
          border: none;
          outline: none;
          ;
          }
      .button{
              text-align:center;
              }
      .create__button {
              color : black;
              font-size: 25px;
              font-weight: 700;
              margin : 34px;
              padding : 15px 20px;
              border: 3px solid grey;
              border-radius: 10px;
              }
            `}
                </style>
            </div>
        )
    })

}

export default PlantList;