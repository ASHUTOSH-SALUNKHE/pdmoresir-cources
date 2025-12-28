import React, { useState, useEffect, useMemo } from "react";
import { Clock, User, Calendar, Search, X, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogStore } from "../store/useBlogStore";
import { supabase } from "../supabase";
import BlogForm from "../components/AdminPageComponents/BlogForm";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

  const { blogs, fetchAllBlogs, deleteBlog, refreshBlogs, loading, error } = useBlogStore();

  useEffect(() => {
    fetchAllBlogs();

    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, [fetchAllBlogs]);

  // Categories from database
  const categories = useMemo(() => {
    if (!blogs || blogs.length === 0) return ["All"];
    const unique = [...new Set(blogs.map((b) => b.category))];
    return ["All", ...unique.sort()];
  }, [blogs]);

  const isFiltering = searchQuery.length > 0 || selectedCategory !== "All";

  const filteredPosts = (blogs || []).filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Find featured posts
  const featuredPosts = useMemo(() => {
    if (!blogs || blogs.length === 0) return [];

    // Get all featured posts provided by DB
    const explicitFeatured = blogs.filter((blog) => blog.featured);

    // Sort by date (assuming id is proxy for date/time or date string ISO)
    // Here we'll just respect the order they came in (usually sorted by controller)

    if (explicitFeatured.length > 0) {
      return explicitFeatured;
    }

    // Fallback: use the latest one if no featured posts are marked
    return [blogs[0]];
  }, [blogs]);

  // Handle Carousel Navigation
  const nextFeatured = () => {
    setCurrentFeaturedIndex((prev) =>
      prev === featuredPosts.length - 1 ? 0 : prev + 1
    );
  };

  const prevFeatured = () => {
    setCurrentFeaturedIndex((prev) =>
      prev === 0 ? featuredPosts.length - 1 : prev - 1
    );
  };

  // Exclude ALL featured posts from the grid list unless filtering
  const featuredIds = new Set(featuredPosts.map(p => p.id));
  const postsToDisplay = isFiltering
    ? filteredPosts
    : (blogs || []).filter((b) => !featuredIds.has(b.id));

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  const handleDelete = async (e, id) => {
    e.preventDefault(); // Prevent navigation
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await deleteBlog(id);
    }
  };

  const handleEdit = (e, post) => {
    e.preventDefault(); // Prevent navigation
    setEditingBlog(post);
    setShowEditModal(true);
  };

  const handleEditSuccess = async () => {
    setShowEditModal(false);
    setEditingBlog(null);
    await refreshBlogs();
  };

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading blog posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 relative">
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-gray-900 rounded-xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 text-white z-10 p-2 hover:bg-gray-800 rounded-full"
            >
              <X size={24} />
            </button>
            <div className="p-2">
              <BlogForm
                initialData={editingBlog}
                isEditing={true}
                onSuccess={handleEditSuccess}
              />
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Featured Post */}
        {!isFiltering && featuredPosts.length > 0 && (
          <section className="mb-16 relative group">
            <div className="relative aspect-[4/5] md:aspect-auto md:h-[450px] rounded-2xl overflow-hidden border border-gray-800 bg-gray-900">
              <Link to={`/b/${featuredPosts[currentFeaturedIndex].slug}`}>
                <img
                  src={featuredPosts[currentFeaturedIndex].image}
                  alt={featuredPosts[currentFeaturedIndex].title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-500"
                />

                <div className="absolute bottom-0 p-6 md:p-10 w-full">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold shadow-lg shadow-blue-900/40">
                      {featuredPosts[currentFeaturedIndex].category}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-bold mt-2 text-white leading-tight">
                    {featuredPosts[currentFeaturedIndex].title}
                  </h2>

                  <p className="text-gray-300 mt-2 line-clamp-2 max-w-2xl text-sm md:text-base">
                    {featuredPosts[currentFeaturedIndex].excerpt}
                  </p>

                  <div className="mt-4 text-blue-400 flex items-center gap-2 font-semibold text-sm md:text-base group-hover:translate-x-1 transition-transform">
                    Read Article →
                  </div>
                </div>
              </Link>
              {featuredPosts.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      prevFeatured();
                    }}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/40 hover:bg-blue-600 backdrop-blur-md border border-white/10 text-white transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 active:scale-95 md:hover:scale-110 shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      nextFeatured();
                    }}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/40 hover:bg-blue-600 backdrop-blur-md border border-white/10 text-white transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 active:scale-95 md:hover:scale-110 shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                </>
              )}
            </div>
            {isAdmin && (
              <div className="absolute top-4 right-4 flex gap-2 z-20">
                <button
                  onClick={(e) => handleEdit(e, featuredPosts[currentFeaturedIndex])}
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-lg"
                  title="Edit"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={(e) => handleDelete(e, featuredPosts[currentFeaturedIndex].id)}
                  className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-lg"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </section>
        )}

        {/* Search + Category */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold uppercase tracking-wider">
              {isFiltering ? "Search Results" : "Recent Blogs"}
            </h2>

            {/* Search bar */}
            <div className="relative w-full md:w-96">
              <Search
                className="absolute left-3 top-3 text-gray-500"
                size={18}
              />

              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-10 pr-10 py-2 text-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-gray-500 hover:text-white"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Category buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs border transition-all ${selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-500"
                  : "bg-gray-900 text-gray-400 border-gray-700 hover:border-gray-500"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Grid */}
        {postsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsToDisplay.map((post) => (
              <div key={post.id} className="relative group">
                <Link
                  to={`/b/${post.slug}`}
                  className="block bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-blue-500 transition-all h-full"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-all"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-xs text-gray-500 mb-2 gap-2">
                      <Calendar size={12} />
                      <span>{post.date}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>

                    <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs mt-auto">
                      <span className="flex items-center gap-1">
                        <User size={12} /> {post.author}
                      </span>
                      <span className="text-blue-400 flex items-center gap-1">
                        Read now →
                      </span>
                    </div>
                  </div>
                </Link>
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleEdit(e, post)}
                      className="p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-lg"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, post.id)}
                      className="p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-lg"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-20">
            No matching results.
            <br />
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
