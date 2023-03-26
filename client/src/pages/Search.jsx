import React, { useEffect, useState } from 'react'
import CourseCard from '../components/CourseCard'
import { Link } from 'react-router-dom'
import Preloader from '../components/Preloader'
import NavBar from '../components/NavBar'
import axios from 'axios'
import i from '../img/1.jpg'



function Search() {
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [data, setData] = useState([])
    let isfirst=true
    useEffect(() => {
       
        const fetchuser = async () => {
            setLoading(true)
            await axios.get(`http://127.0.0.1:8000/api/v2/search/?q=${query}`).then((data) => {
                setLoading(false);
                console.log(data.data.courses)
                setData(data.data.courses);
            });
        }
        fetchuser()
    
    }, [query])

    const handleSearch =(event)=>{
        event.preventDefault();
        setQuery(event.target.search.value);

    }

    return (
        <>
            <NavBar />
            <div className="page-info-section set-bg" style={{ backgroundImage: `url(${i})` }}>
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

                        <div className="row">
                            <div className="col-lg-10 offset-lg-1">
                                {/* search form */}
                                <form className="course-search-form" onSubmit={handleSearch}>
                                    <input type="text" id="search" placeholder="Course" />
                                    {/* <input type="text" className="last-m" placeholder="Category" /> */}
                                    <input type="submit" className="site-btn btn-dark" />
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {loading ? <Preloader /> :  <CourseCard data={data} />}
        </>

    )
}

export default Search