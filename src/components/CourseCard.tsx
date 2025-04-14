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

        <div className="relative p-2.5 sm:p-4 md:p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <h2 className="text-base sm:text-lg md:text-2xl font-golf-heading text-golf-green flex items-center min-w-0">
              <span className="text-lg sm:text-xl md:text-3xl mr-1.5 sm:mr-3 flex-shrink-0">⛳</span>
              <span className="truncate">{course.course_name}</span>
            </h2>
          </div>

          <div className="space-y-1.5 sm:space-y-3 flex-grow">
            <p className="text-clubhouse-gray flex items-center text-xs sm:text-sm md:text-base min-w-0">
              <span className="text-golf-gold mr-1.5 sm:mr-2 flex-shrink-0">🏢</span>
              <span className="truncate">{course.club_name}</span>
            </p>
            <p className="text-clubhouse-gray flex items-center text-xs sm:text-sm md:text-base">
              <span className="text-golf-gold mr-1.5 sm:mr-2">🏆</span>
              <span>Par: {parTotal}</span>
            </p>
            <p className="text-clubhouse-gray flex items-center text-xs sm:text-sm md:text-base min-w-0">
              <span className="text-golf-gold mr-1.5 sm:mr-2 flex-shrink-0">📍</span>
              <span className="truncate">{locationString}</span>
            </p>
          </div>

          <div className="mt-2 sm:mt-4 md:mt-6 flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-3">
            <Link
              to={`/course/${course.id}`}
              className="golf-btn golf-btn-primary flex items-center w-full sm:w-auto text-xs sm:text-sm md:text-base py-1.5 sm:py-2"
            >
              <span className="mr-1.5 sm:mr-2">🏌️‍♂️</span>
              View Details
              <span className="golf-btn-icon ml-1.5 sm:ml-2">→</span>
            </Link>
            <div className="w-full sm:w-auto mt-1.5 sm:mt-0">
              <FavoriteButton course={course} />
            </div>
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