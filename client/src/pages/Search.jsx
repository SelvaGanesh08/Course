import React, { useEffect, useState,useContext } from "react";
import CourseCard from "../components/CourseCard";
import { Link } from "react-router-dom";
import Preloader from "../components/Preloader";
import NavBar from "../components/NavBar";
import axios from "axios";
import i from "../img/1.jpg";
import { AuthContext } from "../components/Auth";

function Search() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const { isAuthenticated,userData } = useContext(AuthContext);
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      await axios
        .get(`https://selvaganesh0809.pythonanywhere.com/api/v2/search/?q=${query}`)
        .then((data) => {
          setLoading(false);
      
          setData(data.data.courses);
        });
    };
    const fetchAuthdata = async () => {
      setLoading(true);
      await axios
        .get(`https://selvaganesh0809.pythonanywhere.com/api/v2/search/?q=${query}&user_id=${userData.user_id}`)
        .then((data) => {
          setLoading(false);
          
          setData(data.data.courses);
        });
    };
    if(isAuthenticated){
      fetchAuthdata();
    }else{
      fetchdata();
    }
    
  }, [query,isAuthenticated]);

  const handleSearch = (event) => {
    event.preventDefault();
    setQuery(event.target.search.value);
  };

  return (
    <>
      <NavBar />
      <div
        className="page-info-section set-bg"
        style={{ backgroundImage: `url(${i})` }}
      >
        <div className="container">
          <div className="site-breadcrumb">
            <Link to="/home" className="site-breadcrumb-item">
              {" "}
              Home
            </Link>
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
      {loading ? <Preloader /> : <CourseCard data={data} />}
    </>
  );
}

export default Search;
