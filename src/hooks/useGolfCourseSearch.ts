import { useState, useEffect } from "react";
import axios from "axios";
import { GolfCourse } from "../types/course";

// API key and base URL
const API_KEY = process.env.REACT_APP_GOLF_API_KEY;
const BASE_URL = "https://api.golfcourseapi.com/v1";

// Custom hook for golf course search
export const useGolfCourseSearch = (query: string) => {
  const [courses, setCourses] = useState<GolfCourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Effect to fetch courses when the query changes
  useEffect(() => {
    if (!query) {
      setCourses([]); // Clear courses when query is empty
      return;
    }

    // Function to fetch courses
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/search?search_query=${encodeURIComponent(query)}`, {
          headers: { "Authorization": `Key ${API_KEY}` },
        });
        console.log("Search response:", response.data.courses); // Debug
        setCourses(response.data.courses || []);
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to fetch courses. Try again!");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [query]);

  return { courses, loading, error };
};