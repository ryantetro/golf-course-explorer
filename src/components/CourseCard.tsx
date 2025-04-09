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
    <div className="golf-card animate-fade-in hover:shadow-xl transition-all duration-300">
      <div className="relative">
        {/* Golf ball texture overlay */}
        <div className="golf-ball-overlay"></div>
        
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-golf-heading text-golf-green flex items-center">
              <span className="text-3xl mr-3">⛳</span>
              {course.course_name}
            </h2>
          </div>

          <div className="space-y-3">
            <p className="text-clubhouse-gray flex items-center">
              <span className="text-golf-gold mr-2">🏢</span>
              <span className="truncate">{course.club_name}</span>
            </p>
            <p className="text-clubhouse-gray flex items-center">
              <span className="text-golf-gold mr-2">🏆</span>
              <span>Par: {parTotal}</span>
            </p>
            <p className="text-clubhouse-gray flex items-center truncate">
              <span className="text-golf-gold mr-2">📍</span>
              <span>{locationString}</span>
            </p>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <Link
              to={`/course/${course.id}`}
              className="golf-btn flex items-center"
            >
              <span className="mr-2">🏌️‍♂️</span>
              View Details
            </Link>
            <FavoriteButton course={course} />
          </div>
        </div>

        {/* Golf flag decoration
        <div className="golf-flag">
          <div className="flag-pole"></div>
          <div className="flag-cloth"></div>
        </div> */}
      </div>
    </div>
  );
};

export default CourseCard;