import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/FavoritesButton.css' // Import the CSS file for styling

const FavoritesButton = ({ courseId, userId, fav }) => {
  const [isFavorite, setIsFavorite] = useState(fav);

  const handleToggleFavorite = async () => {
    try {
      await axios.post('http://coursecuer-env.eba-murye7pz.us-west-2.elasticbeanstalk.com/api/v2/add-to-favorites/', {
        course_id: courseId,
        user_id: userId,
      });
      // Toggle the isFavorite state
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Failed to add/remove course from favorites:', error);
    }
  };

  return (
    <button
      className={`like-button ${isFavorite ? 'liked' : ''}`}
      onClick={handleToggleFavorite}
    >
      {/* {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'} */}
    </button>
  );
};

export default FavoritesButton;
