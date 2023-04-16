import React, { useEffect, useState, useContext } from "react";
import FooterBar from "../components/FooterBar";
import NavBar from "../components/NavBar";
import CourseCard from "../components/CourseCard";
import Preloader from "../components/Preloader";
import axios from "axios";
import { AuthContext } from "../components/Auth";
import i from "../img/2.jpg";
import { Link } from "react-router-dom";
function Favourites() {
  const [loading, setLoading] = useState(false);
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    const fetchFavoriteCourses = async () => {
      setLoading(true);
      try {
        // Make API request to get favorite courses for user
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v2/favorite-courses/?user_id=${userData.user_id}`
        );
        // Update state with fetched favorite courses data
        setLoading(false);
        setFavoriteCourses(response.data.favorite_courses);
        
      } catch (error) {
        // Handle error and show error message
        console.error("Failed to fetch favorite courses:", error);
      }
    };

    fetchFavoriteCourses();
  }, [userData.user_id]);

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
            <span>Favorites</span>
          </div>
        </div>
      </div>
      {loading ? <Preloader /> : <CourseCard data={favoriteCourses} />}
      <FooterBar />
    </>
  );
}

export default Favourites;
