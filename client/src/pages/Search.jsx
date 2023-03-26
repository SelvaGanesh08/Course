import React, { useEffect,useState } from 'react'
import CourseCard from '../components/CourseCard'
import { Link } from 'react-router-dom'
import Preloader from '../components/Preloader'
import NavBar from '../components/NavBar'
import FooterBar from '../components/FooterBar'



function Search() {
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchuser = async () => {
            // setLoading(true)
            await axios.get(`http://127.0.0.1:8000/?q=${query}`)
                .then((res) => res.json())
                .then((data) => {
                    setLoading(false);
                    setData(data);
                });
        }
        fetchuser()
    }, [query])

    return (
        <>
            <NavBar />
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
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1">
                                {/* search form */}
                                <form className="course-search-form">
                                    <input type="text" placeholder="Course" />
                                    {/* <input type="text" className="last-m" placeholder="Category" /> */}
                                    <button className="site-btn btn-dark" onClick={(e) => setQuery(e.target.value)}>Search Couse</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {loading ? <Preloader /> : <CourseCard props={data}/>}
            <FooterBar />
        </>

    )
}

export default Search