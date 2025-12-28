import { create } from "zustand";
import { supabase } from "../supabase";

export const useCourseInfoStore = create((set, get) => ({
  details: {}, // stores detail data per slug
  loading: false,
  error: null,

  // 👉 Fetch details for a single course by slug
  fetchCourseDetails: async (slug) => {
    if (!slug) return;

    const { details } = get();

    // 🛑 If already loaded, do NOT fetch again
    if (details[slug]) return;

    set({ loading: true, error: null });

    try {
      const { data, error } = await supabase
        .from('course_infos')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;

      set((state) => ({
        details: {
          ...state.details,
          [slug]: data, // cache by slug
        },
        loading: false,
      }));
    } catch (err) {
      console.error(err);
      set({
        loading: false,
        error: err.message || "Failed to fetch course details",
      });
    }
  },
}));
