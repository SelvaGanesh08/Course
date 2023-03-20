import React, { useState, createContext } from 'react'
import Search from '../pages/Search';

export const GetCourseList = createContext()

export const GetLoadingInfo = createContext()

function Api() {
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState({});

    const getData = () => {
        setLoading(true);
        fetch('https://api.quotable.io/random')
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                setCourse(data);
            });
    };


    return (

        <>
            <GetLoadingInfo.Provider value={{loading}}>
                <Search />
            </GetLoadingInfo.Provider>

            <GetCourseList.Provider value={{course, getData}}>
                <Search />
            </GetCourseList.Provider>

        </>

    )
}

export default Api