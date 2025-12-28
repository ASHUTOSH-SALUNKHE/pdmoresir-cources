import React, { useEffect, useState } from "react";
import {
  Activity,
  Cpu,
  Share2,
  Infinity as InfinityIcon,
  Zap,
  TrendingUp,
  Check,
  PlayCircle,
  ChevronDown,
  Star,
} from "lucide-react";

import { useCourseInfoStore } from "../store/useCourseInfoStore.js";
import { useParams } from "react-router-dom";
import { ICON_MAP } from "../lib/iconMap";
import EnrollmentModal from "../components/EnrollmentModal.jsx";

const CourseDetailsPage = () => {
  const { slug } = useParams();

  const { details, fetchCourseDetails, loading, error } = useCourseInfoStore();
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  const course = details[slug]; // fetch cached course

  useEffect(() => {
    if (slug) {
      fetchCourseDetails(slug);
    }
  }, [slug]);

  // -----------------------------
  // LOADING UI
  // -----------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading course details...
      </div>
    );
  }

  // -----------------------------
  // NO DATA FOUND
  // -----------------------------
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300 text-xl">
        No course found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#15151e] text-[#e2e8f0] font-sans selection:bg-blue-500/30">
      <Hero hero={course.hero} onEnroll={() => setIsEnrollModalOpen(true)} />
      <ProblemSolution problemSolution={course.problemSolution} />
      <LearningPoints learningPoints={course.learningPoints} />
      <Projects projects={course.projects} />
      <Curriculum curriculum={course.curriculum} />
      <Reviews reviews={course.reviews} />

      <EnrollmentModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        courseSlug={slug}
        courseTitle={course.hero.titleHighlight || "Course"}
      />
    </div>
  );
};

const Hero = ({ hero, onEnroll }) => {
  return (
    <header className="pt-20 pb-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-900/20 blur-[120px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6">
          {hero.badge}
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          {hero.titlePrefix}{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            {hero.titleHighlight}
          </span>{" "}
          {hero.titleSuffix}
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          {hero.description}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onEnroll}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 hover:-translate-y-px transition-all duration-300 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-blue-900/50"
          >
            {hero.buttons?.primary || "Enroll Now"}
          </button>
          <a
            href="#curriculum"
            className="flex items-center justify-center px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 font-medium text-lg transition"
          >
            {hero.buttons?.secondary || "View Curriculum"}
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8 max-w-3xl mx-auto text-center">
          {hero.stats.map((stat, idx) => (
            <div key={idx}>
              <div className="text-white font-bold text-xl">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

const ProblemSolution = ({ problemSolution }) => {
  if (!problemSolution) return null;
  return (
    <section className="py-20 bg-[#1e1e2e]">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {problemSolution.title || "Problem & Solution"}
        </h2>
        <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
          {problemSolution.paragraphs?.map((p, index) => (
            <p
              key={index}
              className={index === 2 ? "font-semibold text-white" : ""}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

const LearningPoints = ({ learningPoints }) => {
  if (!learningPoints) return null;
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          What You'll Learn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningPoints.map((item, idx) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#1e1e2e] border border-white/5 hover:border-blue-500/30 transition group"
              >
                <div
                  className={`w-10 h-10 rounded-lg ${item.colorClass} flex items-center justify-center mb-4`}
                >
                  {Icon && <Icon size={20} />}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Projects = ({ projects }) => {
  if (!projects) return null;
  return (
    <section className="py-20 bg-gradient-to-b from-[#1e1e2e] to-[#15151e]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Learn by Doing
          </h2>
          <p className="text-gray-400 text-lg">
            We don't just solve equations. We build and simulate real systems.
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8 items-center bg-[#15151e] border border-white/5 p-8 rounded-3xl`}
              >
                <div className="w-full md:w-1/2 h-64 bg-gray-800 rounded-xl overflow-hidden relative group">
                  {/* Dynamic Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-tr ${project.gradient} to-transparent z-10`}
                  />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <div className="text-sm font-bold text-blue-500 uppercase tracking-wider mb-2">
                    {project.id}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-gray-400 mb-6">{project.desc}</p>
                  <ul className="space-y-2 text-gray-300">
                    {project.checkpoints?.map((cp, cpIdx) => (
                      <li key={cpIdx} className="flex items-center gap-2">
                        <Check size={16} className="text-green-500" />
                        {cp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Curriculum = ({ curriculum }) => {
  // State to manage open accordion items. Default to first item open.
  const [openSection, setOpenSection] = useState(0);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? -1 : index);
  };

  if (!curriculum) return null;

  return (
    <section id="curriculum" className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            A Perfectly Structured Course
          </h2>
          <p className="text-gray-400">{curriculum.summary}</p>
        </div>

        <div className="space-y-4">
          {curriculum.sections?.map((section, idx) => {
            const isOpen = openSection === idx;
            return (
              <div
                key={idx}
                className="bg-[#1e1e2e] rounded-xl overflow-hidden border border-white/5"
              >
                <button
                  onClick={() => toggleSection(idx)}
                  className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-300">
                      {section.number}
                    </div>
                    <div className="text-lg font-semibold">{section.title}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      {section.duration}
                    </span>
                    <ChevronDown
                      className={`text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </div>
                </button>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="px-6 pb-6 pt-2 bg-[#15151e]/50 border-t border-white/5 text-sm text-gray-300 space-y-3">
                    {section.lessons?.map((lesson, lIdx) => (
                      <div
                        key={lIdx}
                        className="flex justify-between hover:text-white transition"
                      >
                        <span className="flex items-center gap-2">
                          <PlayCircle size={16} className="text-gray-500" />
                          {lesson.title}
                        </span>
                        <span className="text-gray-500">{lesson.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Reviews = ({ reviews }) => {
  if (!reviews) return null;
  return (
    <section className="py-20 bg-[#1e1e2e]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          What Students Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-[#15151e] p-8 rounded-2xl border border-white/5 hover:-translate-y-1 transition duration-300"
            >
              <div className="flex text-yellow-400 mb-4 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">"{review.text}"</p>
              <div className="font-bold text-white">{review.name}</div>
              <div className="text-sm text-gray-500">{review.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsPage;
