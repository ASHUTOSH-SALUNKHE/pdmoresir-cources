// src/store/useBlogStore.js

import { create } from "zustand";
import { supabase } from "../supabase";

export const useBlogStore = create((set, get) => ({
  blogs: [],
  loading: false,
  error: null,
  fetched: false,

  // 👉 Fetch all blogs (only once unless forced)
  fetchAllBlogs: async () => {
    const { fetched } = get();
    if (fetched) return;

    set({ loading: true, error: null });

    try {
      const { data, error } = await supabase.from('blogs').select('*');

      if (error) throw error;

      set({
        blogs: data,
        loading: false,
        fetched: true,
      });
    } catch (err) {
      set({
        loading: false,
        error: err.message || "Failed to fetch blogs",
      });
    }
  },

  deleteBlog: async (id) => {
    try {
      const { error } = await supabase.from('blogs').delete().eq('id', id);

      if (error) throw error;

      set((state) => ({
        blogs: state.blogs.filter((b) => b.id !== id),
      }));
      return true;
    } catch (err) {
      console.error("Delete failed", err);
      return false;
    }
  },

  refreshBlogs: async () => {
    set({ fetched: false });
    await get().fetchAllBlogs();
  },
}));
