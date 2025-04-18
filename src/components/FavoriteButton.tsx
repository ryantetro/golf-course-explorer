import { useState, useEffect } from "react";
import { GolfCourse } from "../types/course";

// FavoriteButton component
const FavoriteButton: React.FC<{ course: GolfCourse }> = ({ course }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Effect to check if the course is in favorites
  useEffect(() => {
    const favorites: GolfCourse[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((fav) => fav.id === course.id));
  }, [course.id]);

  // Toggle favorite status
  const toggleFavorite = () => {
    const favorites: GolfCourse[] = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      const updated = favorites.filter((fav) => fav.id !== course.id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(course);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  // Return the FavoriteButton component
  return (
    <button
      onClick={toggleFavorite}
      className={`golf-btn p-2 rounded-golf flex items-center transition-colors duration-300 ${
        isFavorite ? "text-flagstick-red" : "text-clubhouse-gray"
      } animate-putt`}
    >
      {isFavorite ? "❤️ Remove" : "⛳ Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;