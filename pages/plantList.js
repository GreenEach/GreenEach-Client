import React, { useEffect, useCallback, useState } from "react";
import Link from "next/link";
import Nav from '../components/nav'
import axios from 'axios';
import styled from "styled-components";
import styles from '../styles/plantList.module.css';
import { useObserver } from 'mobx-react'
import { plantListStore } from '../store/plantList'
import { Cookies, withCookies } from "react-cookie";

const state = {
    level: 'normal',
    season: 'summer',
    category: 'flower'
}

const PlantList = ({ cookies }) => {
    const [lists, setLists] = useState([])

    const SpecificContent = async () => {
        const result = await axios.post('http://18.191.16.175:3000/content/specific', { ...state }, { headers: { token: cookies.get('userInfo') } })
        setLists(result.data)
    }

    useEffect(() => {
        SpecificContent()
    }, [])

    const setItemHandler = (e) => {
        plantListStore.setId(e.target.getAttribute('value'))
    }

    return useObserver(() => {
        return (
            <div>
                <div className={styles.button}>
                    <Link href="/plantAdd">
                        <button className={styles.create__button}>Create</button>
                    </Link>
                </div>
                <div className={styles.lists}>
                    {lists.map((list, id) =>
                        <Link href={`/plant?id=${list.id}`} key={id} >
                            <div  >
                                <div className={styles.list}  >
                                    <img className={styles.list__photo} width="250px" height="250px" src={JSON.parse(list.photoUrl)[0]} ></img >
                                    <div className={styles.list__description} value={list.id} onClick={setItemHandler}  >
                                        {list.id}
                                        <h3 value={list.id} onClick={setItemHandler}>{list.title}</h3>
                                        <span >{list.content}</span>

                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        )
    })

}

export default withCookies(PlantList);