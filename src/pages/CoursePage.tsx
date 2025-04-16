// CoursePage.tsx
import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { GolfCourse } from "../types/course";
import { useWeather } from "../hooks/useWeather";
import "../styles/CoursePage.css";
import FavoriteButton from "../components/FavoriteButton";
import GolfMap from '../components/GolfMap';

const API_KEY = process.env.REACT_APP_GOLF_API_KEY;
const BASE_URL = "https://api.golfcourseapi.com/v1";

interface Hole {
  par: number;
  yardage: number;
  handicap: number;
}

interface Tee {
  tee_name: string;
  course_rating?: number;
  slope_rating?: number;
  total_yards: number;
  total_meters?: number;
  number_of_holes?: number;
  par_total: number;
  front_course_rating?: number;
  front_slope_rating?: number;
  back_course_rating?: number;
  back_slope_rating?: number;
  holes?: Hole[];
}

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [course, setCourse] = useState<GolfCourse | null>((location.state as any)?.course || null);
  const [loading, setLoading] = useState(!course);
  const [error, setError] = useState<string | null>(null);
  const [showAllHoles, setShowAllHoles] = useState(false);
  const [selectedTees, setSelectedTees] = useState<"male" | "female">("male");

  const { weather, loading: weatherLoading } = useWeather(
    course?.location?.latitude ?? 0,
    course?.location?.longitude ?? 0
  );

  useEffect(() => {
    if (course) return;

    const fetchCourse = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/courses/${id}`, {
          headers: { "Authorization": `Key ${API_KEY}` },
        });
        const courseData = response.data.course || response.data;
        if (!courseData.id) throw new Error("Invalid course data");
        setCourse(courseData);
      } catch (err) {
        setError("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, course]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="golf-spinner"></div>
    </div>
  );

  if (error || !course) return (
    <div className="container mx-auto p-6 text-center min-h-screen bg-gray-100">
      <div className="golf-card">
        <p className="text-flagstick-red text-2xl mb-4">{error || "Course not found"}</p>
        <Link to="/" className="golf-btn">Return to Search</Link>
      </div>
    </div>
  );

  const tees: Tee = course.tees?.[selectedTees]?.[0] ?? {
    tee_name: "N/A",
    total_yards: 0,
    total_meters: 0,
    par_total: 0,
    course_rating: 0,
    slope_rating: 0,
    front_course_rating: 0,
    front_slope_rating: 0,
    back_course_rating: 0,
    back_slope_rating: 0,
    number_of_holes: 0,
    holes: []
  };
  const holes = tees.holes || [];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-6 py-12">
        <Link to="/" className="golf-btn mb-8 inline-flex items-center">
          <span className="mr-2">⛳</span> Back to Search
        </Link>

        <div className="golf-card animate-fade-in">
          {/* Header */}
          <div className="relative rounded-t-xl overflow-hidden">
            <div className="bg-fairway-green absolute top-0 left-0 w-full h-full opacity-90 rounded-t-xl"></div>
            <div className="relative p-6 sm:p-8 text-white">
              <h1 className="text-2xl sm:text-4xl font-golf-heading flex items-start break-words">
                <span className="mr-3 mt-1">⛳</span>
                <span className="flex-1">{course.course_name}</span>
              </h1>
              <p className="mt-2 opacity-90 break-words">{course.club_name}</p>
              <p className="mt-1 text-sm break-words">{course.location?.address}</p>
            </div>
          </div>

          <div className="p-4 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {/* Course Details */}
            <div className="md:col-span-2 space-y-4 sm:space-y-6">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                  <h2 className="text-xl sm:text-2xl font-golf-heading text-golf-green">Course Statistics</h2>
                  <div className="flex gap-2">
                    <button
                      className={`px-3 py-1 rounded-lg text-sm sm:text-base ${selectedTees === "male" ? "bg-golf-green text-white" : "bg-gray-200"}`}
                      onClick={() => setSelectedTees("male")}
                    >
                      Mens
                    </button>
                    <button
                      className={`px-3 py-1 rounded-lg text-sm sm:text-base ${selectedTees === "female" ? "bg-golf-green text-white" : "bg-gray-200"}`}
                      onClick={() => setSelectedTees("female")}
                    >
                      Womens
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="px-4 sm:px-0">
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 min-w-[500px]">
                      <div>
                        <p className="text-sm sm:text-base text-clubhouse-gray">Total Distance</p>
                        <p className="text-lg sm:text-xl font-medium">
                          {tees.total_yards} yds / {tees.total_meters} m
                        </p>
                      </div>
                      <div>
                        <p className="text-sm sm:text-base text-clubhouse-gray">Par</p>
                        <p className="text-lg sm:text-xl font-medium">{tees.par_total}</p>
                      </div>
                      <div>
                        <p className="text-sm sm:text-base text-clubhouse-gray">Course Rating</p>
                        <p className="text-lg sm:text-xl font-medium">{tees.course_rating}</p>
                      </div>
                      <div>
                        <p className="text-sm sm:text-base text-clubhouse-gray">Slope Rating</p>
                        <p className="text-lg sm:text-xl font-medium">{tees.slope_rating}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {holes.length > 0 && (
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                  <h3 className="text-lg sm:text-xl font-golf-heading text-golf-green mb-4">Scorecard</h3>
                  <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <div className="px-4 sm:px-0 min-w-[600px]">
                      <div className="scorecard-header grid grid-cols-5 gap-2 sm:gap-4 rounded-t-xl">
                        <div className="font-medium">Hole</div>
                        <div className="font-medium">Par</div>
                        <div className="font-medium">Yards</div>
                        <div className="font-medium">HCP</div>
                        <div className="font-medium">Notes</div>
                      </div>
                      <div className="mt-2 space-y-1">
                        {(showAllHoles ? holes : holes.slice(0, 3)).map((hole: Hole, index: number) => (
                          <div key={index} className="grid grid-cols-5 gap-2 sm:gap-4 p-2 hover:bg-gray-50 rounded items-center">
                            <div className="font-medium">#{index + 1}</div>
                            <div>{hole.par}</div>
                            <div>{hole.yardage}</div>
                            <div>{hole.handicap}</div>
                            <div className="text-xs sm:text-sm text-golf-green">
                              {index === 8 && "Front 9"} {index === 17 && "Back 9"}
                            </div>
                          </div>
                        ))}
                      </div>
                      {holes.length > 3 && (
                        <button
                          className="toggle-holes-btn w-full mt-4 text-sm sm:text-base"
                          onClick={() => setShowAllHoles(!showAllHoles)}
                        >
                          {showAllHoles ? "Show Less" : `Show All ${holes.length} Holes`}
                        </button>
                      )}
                    </div>
                  </div>
                  {showAllHoles && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p>Front 9 Rating: {tees.front_course_rating}/{tees.front_slope_rating}</p>
                        <p>Back 9 Rating: {tees.back_course_rating}/{tees.back_slope_rating}</p>
                      </div>
                      <div>
                        <p>Total Par: {tees.par_total}</p>
                        <p>Holes: {tees.number_of_holes}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Weather and Location */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-water-texture p-4 sm:p-6 rounded-xl">
                <h2 className="text-lg sm:text-xl font-golf-heading text-golf-green mb-4">Current Conditions</h2>
                {weatherLoading && <div className="golf-spinner mx-auto"></div>}
                {weather && (
                  <div className="space-y-4">
                    <div className="bg-white bg-opacity-20 p-3 sm:p-4 rounded-lg flex justify-between">
                      <div>
                        <p className="text-sm sm:text-base text-clubhouse-gray">Temperature</p>
                        <p className="text-xl sm:text-2xl font-medium">{weather.temp}°F</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm sm:text-base text-clubhouse-gray">Wind</p>
                        <p className="text-xl sm:text-2xl font-medium">{weather.windSpeed} mph</p>
                      </div>
                    </div>
                    <div className="bg-white bg-opacity-20 p-3 sm:p-4 rounded-lg flex items-center">
                      <span className="text-xl sm:text-2xl mr-2">
                        {weather.description.toLowerCase().includes("rain") ? "🌧️" : 
                         weather.description.toLowerCase().includes("cloud") ? "☁️" : "☀️"}
                      </span>
                      <span className="text-sm sm:text-base">{weather.description}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
                <h3 className="text-lg sm:text-xl font-golf-heading text-golf-green mb-4 break-words">Location</h3>
                <p className="text-sm sm:text-base text-clubhouse-gray mb-4 break-words">{course.location?.address}</p>
                {course.location?.latitude && course.location?.longitude ? (
                  <GolfMap
                    latitude={course.location.latitude}
                    longitude={course.location.longitude}
                    className="h-32 sm:h-48 w-full"
                  />
                ) : (
                  <div className="h-32 sm:h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-sm sm:text-base text-clubhouse-gray break-words">
                      Location coordinates not available
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-8 pt-0 flex justify-center">
            <FavoriteButton course={course} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;