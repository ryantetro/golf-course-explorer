// FavoritesPage.tsx
import { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import { GolfCourse } from "../types/course";
import "../styles/FavoritesPage.css";

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<GolfCourse[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-6 py-12">
        <div className="relative rounded-t-xl overflow-hidden mb-12">
          <div className="bg-fairway-green absolute top-0 left-0 w-full h-full opacity-90"></div>
          <div className="relative p-6 sm:p-8 text-white text-center">
            <h1 className="text-2xl sm:text-4xl font-golf-heading flex items-start justify-center break-words">
              <span className="mr-3 mt-1">⭐</span>
              <span>Favorite Golf Courses</span>
            </h1>
            <p className="mt-2 opacity-90 break-words">Your personal collection of top courses</p>
          </div>
        </div>

        <div className="golf-card animate-fade-in p-8">
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-6 text-golf-green">⛳</div>
              <p className="text-clubhouse-gray text-xl mb-4">
                No favorites yet
              </p>
              <p className="text-clubhouse-gray">
                Head to a course page to start adding your favorites!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;