import React from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { Quote, GraduationCap, Briefcase } from "lucide-react";
import { testimonials } from "../../data/HomePageData";



const TestimonialCard = ({ testimonial }) => (
  // Responsive width: w-[320px] on mobile, w-[450px] on desktop
  <div className="w-[320px] md:w-[450px] flex-shrink-0 mx-4 ">
    <div className="bg-[#202020] rounded-2xl p-8 border border-gray-800 relative flex flex-col h-full hover:border-blue-500/30 transition-colors duration-300">
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 text-blue-900/40">
        <Quote size={48} fill="currentColor" />
      </div>

      {/* Content */}
      <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="mt-auto flex items-center gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/20"
        />
        <div>
          <h4 className="font-bold text-white text-sm">{testimonial.name}</h4>
          <div className="flex items-center gap-1.5 text-xs text-blue-400 mt-0.5">
            {testimonial.type === "student" ? (
              <GraduationCap size={12} />
            ) : (
              <Briefcase size={12} />
            )}
            <span>{testimonial.role}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function Testimonials() {
  return (
    <div className="bg-[#1a1a1a] text-white">
      {/* CSS Styles for Infinite Scroll Animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Testimonials Section */}
      <section className="py-24 bg-[#1a1a1a] border-t border-gray-800 relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10">
          <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16 px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Student Success Stories
            </h2>
            <p className="text-gray-400 text-lg">
              Hear from students who transformed their careers with our courses.
            </p>
          </RevealOnScroll>

          {/* Marquee Container */}
          <div className="relative w-full overflow-hidden py-4">
            {/* Gradient Masks (Fade edges for smooth look) */}
            <div className="absolute top-0 left-0 h-full w-12 md:w-32 bg-gradient-to-r from-[#1a1a1a] to-transparent z-20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-12 md:w-32 bg-gradient-to-l from-[#1a1a1a] to-transparent z-20 pointer-events-none"></div>

            {/* Scrolling Track */}
            <div className="flex animate-scroll w-max hover:cursor-grab active:cursor-grabbing ">
              {/* Original Set */}
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={`original-${testimonial.id}`}
                  testimonial={testimonial}
                />
              ))}
              {/* Duplicate Set (Required for infinite loop) */}
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={`duplicate-${testimonial.id}`}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Testimonials;
