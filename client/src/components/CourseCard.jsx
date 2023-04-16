import React, { useContext } from "react";
import FavoritesButton from "./FavoriteButton";
import { AuthContext } from "./Auth";
function CourseCard({ data }) {
  const { isAuthenticated, userData } = useContext(AuthContext);

  return (
    <div className=" course-items-area">
      {data.map((item) => (
        // <div className="mix col-lg-3 col-md-4 col-sm-6 design">
        <div className="course-item" key={item.id}>
          <div className="price">{item.title}</div>
          <div className="course-info">
          {isAuthenticated && (
                <FavoritesButton
                  courseId={item.id}
                  userId={userData.user_id}
                  fav={item.is_favorited}
                />
              )}
            <div className="course-text">
              <h5>Rating: {item.rating}</h5>

              <div className="students">Reviews: {item.reviews}</div>
              <span className="course-author">
                <a href={item.url}>Vist</a>
              </span>
            </div>
           
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseCard;
