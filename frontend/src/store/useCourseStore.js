import { create } from "zustand";
import { supabase } from "../supabase";


export const useCourseStore = create((set, get) => ({
  courses: [],
  hasFetchedAllCourses: false,
  loading: false,
  error: null,

  // 👉 Fetch all courses
  fetchCourses: async () => {
    const { hasFetchedAllCourses, courses } = get();

    if (hasFetchedAllCourses && courses.length > 0) return;

    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.from('courses').select('*');

      if (error) throw error;

      set({
        courses: data,
        loading: false,
        hasFetchedAllCourses: true,
      });
    } catch (err) {
      set({
        loading: false,
        error: err.message || "Failed to fetch courses",
        hasFetchedAllCourses: false,
      });
      console.error("Fetch Courses Error:", err);
    }
  },

  // 👉 Add a new course
  addCourse: async (courseData) => {
    set({ loading: true, error: null });
    try {
      // Note: MongoDB ID (if strictly required by UI) might need handling, 
      // but Supabase returns 'id'. Ensure UI handles numeric ID vs Mongo ObjectId if relevant.
      const { data, error } = await supabase
        .from('courses')
        .insert(courseData)
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        courses: [...state.courses, data],
        loading: false,
      }));

      return { success: true };
    } catch (err) {
      set({
        loading: false,
        error: err.message || "Failed to add course",
      });

      return {
        success: false,
        message: err.message || "Something went wrong",
      };
    }
  },
}));
