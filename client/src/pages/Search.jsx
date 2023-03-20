import React, { useContext } from 'react'
import SearchBar from '../components/SearchBar'
import CourseCard from '../components/CourseCard'
import { Link } from 'react-router-dom'
import Preloader from '../components/Preloader'

import {GetLoadingInfo} from '../api/Api'



function Search() {
    
    const   loading  =useContext(GetLoadingInfo)
    return (

        loading ?  <Preloader/> :( 
            <>
                <div className="page-info-section set-bg" data-setbg="img/page-bg/1.jpg">
                    <div className="container">
                        <div className="site-breadcrumb">
                            <Link to='/home' className='site-breadcrumb-item'> Home</Link>
                            <span>Courses</span>
                        </div>
                    </div>
                </div>
                <section className="search-section ss-other-page">
                    <div className="container">
                        <div className="search-warp">
                            <div className="section-title text-white">
                                <h2>
                                    <span>Search your course</span>
                                </h2>
                            </div>
                            <SearchBar />
                        </div>
                    </div>
                </section>


                <CourseCard />
            </>
        )   

    )
}

export default Search