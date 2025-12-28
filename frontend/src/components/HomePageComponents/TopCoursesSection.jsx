import React, { useEffect } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { ArrowRight, Star } from "lucide-react";
import { useCourseStore } from "../../store/useCourseStore";
import { useNavigate } from "react-router-dom";

function TopCoursesSection() {
  const { fetchCourses, courses } = useCourseStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Display only the first 6 courses
  const displayCourses = courses.slice(0, 6);

  return (
    <div>
      {/* Courses Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Featured Subjects
            </h2>
            <p className="text-gray-400">
              Master the core subjects of Electrical Engineering.
            </p>
          </div>
          <button
            onClick={() => navigate("/courses")}
            className="text-blue-500 font-semibold hover:text-blue-400 flex items-center gap-1 group"
          >
            View all subjects{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCourses.map((course) => (
            <RevealOnScroll
              key={course._id || course.id}
              className="group bg-[#202020] rounded-2xl overflow-hidden border border-gray-800 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card Image */}
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
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
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
                  <span className="text-xl font-bold text-white">
                    {course.price}
                  </span>
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
      </section>
    </div>
  );
}

export default TopCoursesSection;
