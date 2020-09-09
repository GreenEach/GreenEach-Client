import React, { useEffect, useCallback, useState } from "react";
import Link from "next/link";
import Nav from '../components/nav'
import axios from 'axios';
import styled from "styled-components";
import styles from '../styles/plantList.module.css';
import { useObserver } from 'mobx-react'

const state = {
    level: 'normal',
    season: 'summer',
    category: 'flower'
}
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWNvbmZpQGdtYWlsLmNvbSIsImlkIjozLCJpYXQiOjE1OTkzOTU3NDJ9.RviXSvWRNx_52lkLyZXnBCYl8LTylpGSIRKxcXSSL9Y"

const PlantList = () => {
    const [lists, setLists] = useState([])
    const SpecificContent = async () => {
        const result = await axios.post('http://18.191.16.175:3000/content/specific', { ...state }, { headers: { token: token } })
        setLists(result.data)

    }
    useEffect(() => {
        console.log('useEffectTest');
        SpecificContent()
    }, [])

    console.log(lists)
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
                        <Link href='plant' key={id}>
                            <div className={styles.list} >
                                <img className={styles.list__photo} width="250px" height="250px" src={JSON.parse(list.photoUrl)[0]}   ></img >
                                <div className={styles.list__description} >
                                    <h3 >{list.title}</h3>
                                    <span >{list.content}</span>
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        )
    })

}

export default PlantList;