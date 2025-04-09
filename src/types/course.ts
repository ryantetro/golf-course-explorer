export interface GolfCourse {
    id: number; // Matches the numeric IDs like 4609
    course_name: string;
    club_name: string;
    location?: {
      address?: string;
      city?: string;
      state?: string;
      country?: string;
      latitude?: number;
      longitude?: number;
    };
    tees: {
      male: {
        par_total: number;
        total_yards: number;
        tee_name: string;
      }[];
      female?: {
        par_total: number;
        total_yards: number;
        tee_name: string;
      }[];
    };
  }