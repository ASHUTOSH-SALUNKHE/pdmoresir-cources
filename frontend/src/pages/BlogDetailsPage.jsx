import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, User, Calendar, ChevronLeft, Loader2 } from "lucide-react";
import { useBlogStore } from "../store/useBlogStore";
import { useBlogInfoStore } from "../store/useBlogInfoStore";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { blogs, fetchAllBlogs } = useBlogStore();
  const { blogDetails, fetchBlogDetails, infoLoading, infoError } =
    useBlogInfoStore();

  // Load blogs if not already available
  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      fetchAllBlogs();
    }
  }, []);

  // Load content based on slug
  useEffect(() => {
    fetchBlogDetails(slug);
  }, [slug]);

  const blogMeta = blogs?.find((b) => b.slug === slug);
  const content = blogDetails[slug]?.content;

  if (!blogMeta) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/blogs")}
          className="flex items-center text-gray-400 hover:text-blue-400 mb-8"
        >
          <ChevronLeft size={20} className="mr-1" /> Back to Blog
        </button>

        {/* Image */}
        <div className="h-64 sm:h-96 rounded-2xl overflow-hidden mb-8 border border-gray-800">
          <img
            src={blogMeta.image}
            alt={blogMeta.title}
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
          <span className="px-3 py-1 bg-blue-900/30 text-blue-300 border border-blue-800 rounded-full">
            {blogMeta.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={14} /> {blogMeta.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> {blogMeta.readTime}
          </span>
          <span className="flex items-center gap-1">
            <User size={14} /> {blogMeta.author}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-white">{blogMeta.title}</h1>

        {/* Content */}
        {infoLoading ? (
          <div className="flex items-center gap-3 text-gray-400">
            <Loader2 className="animate-spin" size={20} />
            Loading content…
          </div>
        ) : infoError ? (
          <p className="text-red-400">{infoError}</p>
        ) : (
          <div className="prose prose-invert whitespace-pre-line leading-relaxed">
            {content}
          </div>
        )}
      </div>
    </div>
  );
}
