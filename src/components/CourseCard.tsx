// CourseCard.tsx
import { Link } from "react-router-dom";
import { GolfCourse } from "../types/course";
import FavoriteButton from "./FavoriteButton";
import "../styles/CourseCard.css";

const CourseCard: React.FC<{ course: GolfCourse }> = ({ course }) => {
  const parTotal = course.tees?.male?.[0]?.par_total ?? "N/A";
  const locationString = course.location
    ? `${course.location.city ?? "Unknown"}, ${course.location.state ?? ""}, ${course.location.country ?? "Unknown"}`
    : "Location not available";

  return (
    <div className="golf-card animate-fade-in hover:shadow-xl transition-all duration-300 h-full">
      <div className="relative h-full">
        {/* Golf ball texture overlay */}
        <div className="golf-ball-overlay"></div>

        <div className="relative p-3 sm:p-4 md:p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-golf-heading text-golf-green flex items-center min-w-0">
              <span className="text-xl sm:text-2xl md:text-3xl mr-2 sm:mr-3 flex-shrink-0">⛳</span>
              <span className="truncate">{course.course_name}</span>
            </h2>
          </div>

          <div className="space-y-2 sm:space-y-3 flex-grow">
            <p className="text-clubhouse-gray flex items-center text-xs sm:text-sm md:text-base min-w-0">
              <span className="text-golf-gold mr-2 flex-shrink-0">🏢</span>
              <span className="truncate">{course.club_name}</span>
            </p>
            <p className="text-clubhouse-gray flex items-center text-xs sm:text-sm md:text-base">
              <span className="text-golf-gold mr-2">🏆</span>
              <span>Par: {parTotal}</span>
            </p>
            <p className="text-clubhouse-gray flex items-center text-xs sm:text-sm md:text-base min-w-0">
              <span className="text-golf-gold mr-2 flex-shrink-0">📍</span>
              <span className="truncate">{locationString}</span>
            </p>
          </div>

          <div className="mt-3 sm:mt-4 md:mt-6 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3">
            <Link
              to={`/course/${course.id}`}
              className="golf-btn golf-btn-primary flex items-center w-full sm:w-auto text-sm sm:text-base"
            >
              <span className="mr-2">🏌️‍♂️</span>
              View Details
              <span className="golf-btn-icon ml-2">→</span>
            </Link>
            <FavoriteButton course={course} />
          </div>
        </div>

        {/* Golf flag decoration */}
        <div className="golf-flag">
          <div className="flag-pole"></div>
          <div className="flag-cloth"></div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;