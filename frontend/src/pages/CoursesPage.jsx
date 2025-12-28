import React, { useEffect, useState, useMemo } from "react";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import { RevealOnScroll } from "../components/RevealOnScroll";
import { useCourseStore } from "../store/useCourseStore";
import { useNavigate } from "react-router-dom";

function AllCourses() {
  const navigate = useNavigate();

  const { fetchCourses, courses, loading, error } = useCourseStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch from DB on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    if (!courses) return ["All"];
    return ["All", ...new Set(courses.map((course) => course.category))];
  }, [courses]);

  // Filter logic
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [courses, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#1a1a1a] pt-32 pb-12 border-b border-gray-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Explore Our Courses
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Master new skills with our comprehensive curriculum designed for
              modern engineering.
            </p>

            {/* Search + Filters */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#202020] border border-gray-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-500"
                />
              </div>

              <div className="relative">
                <SlidersHorizontal
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full md:w-48 bg-[#202020] border border-gray-800 text-white pl-12 pr-8 py-3 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer transition-all"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* Courses Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading State */}
        {loading && (
          <div className="text-center text-gray-400 py-20 text-lg">
            Loading courses...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-400 py-20 text-lg">{error}</div>
        )}

        {/* Course Grid */}
        {!loading && !error && filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <RevealOnScroll
                key={course.id}
                className="group bg-[#202020] rounded-2xl overflow-hidden border border-gray-800 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#202020] to-transparent opacity-60"></div>
                  <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/10">
                    {course.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-white font-medium">
                        {course.rating}
                      </span>
                    </div>
                    <span>•</span>
                    <span>{course.level}</span>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold">{course.price}</span>

                    <button
                      onClick={() => navigate(`/c/${course.slug}`)}
                      className="text-sm font-semibold bg-[#2a2a2a] hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg transition-all border border-gray-700"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        ) : (
          /* Empty State */
          !loading &&
          !error && (
            <div className="text-center py-20">
              <div className="text-gray-500 text-lg mb-4">
                No courses found matching your criteria.
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Clear filters
              </button>
            </div>
          )
        )}
      </section>
    </div>
  );
}

export default AllCourses;
