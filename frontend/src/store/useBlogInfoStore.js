import { create } from "zustand";
import { supabase } from "../supabase";

export const useBlogInfoStore = create((set, get) => ({
  blogDetails: {}, // { slug: blogData }
  loading: false,
  error: null,

  // 👉 Fetch single blog by slug
  fetchBlogDetails: async (slug) => {
    if (!slug) return;

    const { blogDetails } = get();

    // 🛑 Already loaded → no need to refetch
    if (blogDetails[slug]) return;

    set({ loading: true, error: null });

    try {
      const { data, error } = await supabase
        .from('blog_infos')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;

      set((state) => ({
        blogDetails: {
          ...state.blogDetails,
          [slug]: data, // store cached data
        },
        loading: false,
      }));
    } catch (err) {
      set({
        loading: false,
        error: err.message || "Failed to fetch blog details",
      });
    }
  },

  // 👉 Clear old errors when navigating between blogs
  clearError: () => set({ error: null }),
}));
