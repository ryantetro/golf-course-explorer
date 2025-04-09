// Home.tsx
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import CourseCard from "../components/CourseCard";
import { useGolfCourseSearch } from "../hooks/useGolfCourseSearch";
import "../styles/Home.css";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { courses, loading, error } = useGolfCourseSearch(searchQuery);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="relative rounded-t-xl overflow-hidden mb-8 sm:mb-12">
          <div className="bg-fairway-green h-32 sm:h-40 w-full absolute top-0 left-0 opacity-90"></div>
          <div className="relative p-6 sm:p-8 text-white text-center">
            <h1 className="text-3xl sm:text-4xl font-golf-heading flex items-center justify-center">
              <span className="mr-3">⛳</span>
              Golf Course Explorer
            </h1>
            <p className="mt-2 opacity-90 text-sm sm:text-base">Find your perfect round</p>
          </div>
        </div>

        <div className="golf-card animate-fade-in p-4 sm:p-8">
          <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
            <SearchBar onSearch={setSearchQuery} />
          </div>

          {loading && (
            <div className="flex justify-center my-8 sm:my-12">
              <div className="golf-spinner"></div>
            </div>
          )}

          {error && (
            <div className="text-center my-8 sm:my-12">
              <p className="text-flagstick-red text-lg sm:text-xl mb-4">{error}</p>
            </div>
          )}

          {courses.length === 0 && !loading && !error && (
            <div className="text-center my-8 sm:my-12">
              <div className="text-5xl sm:text-6xl text-golf-green mb-4 sm:mb-6">⛳</div>
              <p className="text-clubhouse-gray text-lg sm:text-xl mb-4">No courses found</p>
              <p className="text-clubhouse-gray text-sm sm:text-base">Try searching for a course above!</p>
            </div>
          )}

          {courses.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;