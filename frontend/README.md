import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Star,
  Zap,
  Cpu,
  Activity,
  MessageCircleQuestion,
  UserCheck,
  Wallet,
  ArrowRight,
  PlayCircle,
  Quote,
  GraduationCap,
  Briefcase,
} from "lucide-react";

// --- Components ---

// Scroll Animation Component
const RevealOnScroll = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const scrollObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          scrollObserver.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (ref.current) {
      scrollObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        scrollObserver.unobserve(ref.current);
      }
    };
  }, []);

  const baseClasses = `transition-all duration-1000 transform ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  }`;

  return (
    <div ref={ref} className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
};

const testimonials = [
  {
    id: 1,
    name: "Aditya Sharma",
    role: "GATE AIR 42",
    type: "student",
    content:
      "Sir's way of explaining Power Systems is unmatched. I used to fear stability problems, but now they are my strongest area. The visualization techniques helped me crack GATE with a top rank.",
    image: "https://placehold.co/100x100/3b82f6/white?text=AS",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Junior Engineer, MSEB",
    type: "professional",
    content:
      "I returned to studies after 3 years of gap for the JE exam. The 'Basics to Advanced' approach was exactly what I needed. The practical examples of transformers helped me in my interview as well.",
    image: "https://placehold.co/100x100/ec4899/white?text=PP",
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "B.Tech Student, NIT",
    type: "student",
    content:
      "College lectures were confusing, but PD More Sir's videos cleared everything in minutes. The notes are concise and perfect for last-minute revision before semester exams.",
    image: "https://placehold.co/100x100/10b981/white?text=RV",
  },
];

const courses = [
  {
    id: 1,
    title: "Power Systems Protection & Switchgear",
    category: "Core Core",
    level: "Advanced",
    image: "https://placehold.co/600x340/252525/e11d48?text=Power+Systems",
    price: "₹1,499",
    rating: 4.9,
  },
  {
    id: 2,
    title: "Electrical Machines: Transformers & Induction",
    category: "Machines",
    level: "Intermediate",
    image: "https://placehold.co/600x340/252525/f59e0b?text=Machines",
    price: "₹1,999",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Network Analysis & Circuit Theory",
    category: "Fundamentals",
    level: "Beginner",
    image: "https://placehold.co/600x340/252525/3b82f6?text=Circuit+Theory",
    price: "₹999",
    rating: 4.9,
  },
  {
    id: 4,
    title: "Control Systems Engineering",
    category: "Analysis",
    level: "Advanced",
    image: "https://placehold.co/600x340/252525/10b981?text=Control+Systems",
    price: "₹2,499",
    rating: 5.0,
  },
  {
    id: 5,
    title: "Analog & Digital Electronics",
    category: "Electronics",
    level: "Intermediate",
    image: "https://placehold.co/600x340/252525/8b5cf6?text=Electronics",
    price: "₹1,299",
    rating: 4.7,
  },
  {
    id: 6,
    title: "Power Electronics & Drives",
    category: "Industrial",
    level: "Advanced",
    image: "https://placehold.co/600x340/252525/ec4899?text=Power+Elec",
    price: "₹1,899",
    rating: 4.9,
  },
];

const stats = [
  {
    label: "Students mentored",
    value: "50k+",
    gradient: "from-[#8b5cf6] to-[#a78bfa]", // Purple gradient
    border: "from-[#8b5cf6] via-[#8b5cf6] to-[#a78bfa]",
  },
  {
    label: "YouTube family",
    value: "200k+",
    gradient: "from-[#14b8a6] to-[#5eead4]", // Teal gradient
    border: "from-[#14b8a6] via-[#14b8a6] to-[#5eead4]",
  },
  {
    label: "Years Experience",
    value: "12+",
    gradient: "from-[#ec4899] to-[#f472b6]", // Pink gradient
    border: "from-[#ec4899] via-[#ec4899] to-[#f472b6]",
  },
  {
    label: "Engineering Subjects",
    value: "15+",
    gradient: "from-[#f97316] to-[#fb923c]", // Orange gradient
    border: "from-[#f97316] via-[#f97316] to-[#fb923c]",
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-[#151515] text-gray-200 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Banner */}
      <div className="bg-blue-600 text-white text-xs sm:text-sm py-2 px-4 text-center font-medium">
        <span>Get the Complete Electrical Engineering Bundle. </span>
        <a href="#" className="underline hover:text-blue-100 ml-1">
          Enroll Now
        </a>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#151515]/90 backdrop-blur-md border-b border-gray-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xl">
                /:\
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                P D More
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-sm font-medium hover:text-white transition-colors"
              >
                Courses
              </a>
              <a
                href="#"
                className="text-sm font-medium hover:text-white transition-colors"
              >
                Exam Prep
              </a>
              <a
                href="#"
                className="text-sm font-medium hover:text-white transition-colors"
              >
                Blogs
              </a>
              <a
                href="#"
                className="text-sm font-medium hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1a1a1a] border-b border-gray-800">
            <div className="px-4 pt-2 pb-6 space-y-4">
              <a
                href="#"
                className="block py-2 text-base font-medium text-gray-300 hover:text-white"
              >
                Courses
              </a>
              <a
                href="#"
                className="block py-2 text-base font-medium text-gray-300 hover:text-white"
              >
                Exam Prep
              </a>
              <a
                href="#"
                className="block py-2 text-base font-medium text-gray-300 hover:text-white"
              >
                Notes
              </a>
              <a
                href="#"
                className="block py-2 text-base font-medium text-gray-300 hover:text-white"
              >
                Contact
              </a>
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg text-base font-semibold">
                Student Login
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ">
            {/* Hero Content */}
            <RevealOnScroll className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
                Master{" "}
                <span className="text-blue-500">Electrical Engineering</span>{" "}
                with crystal clear concepts
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                From Circuit Theory to Power Systems, get the knowledge you need
                to crack GATE, ESE, and university exams with PD More Sir.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-transform transform active:scale-95 shadow-lg shadow-blue-900/20">
                  Explore Cources
                </button>
                <button className="bg-[#2a2a2a] hover:bg-[#333] text-white px-8 py-4 rounded-full text-lg font-bold transition-all border border-gray-700">
                  Free Demo
                </button>
              </div>
            </RevealOnScroll>

            {/* Hero Image / Illustration */}
            <RevealOnScroll className="flex-1 relative">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Abstract decorative elements */}
                <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 -right-4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>

                {/* Mockup Container */}
                <div className="relative bg-[#202020] border border-gray-700 rounded-2xl p-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-auto text-xs text-gray-500 font-mono">
                      Circuit_Analysis.m
                    </div>
                  </div>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex gap-2">
                      <span className="text-purple-400">const</span>
                      <span className="text-yellow-200">Transformer</span>
                      <span className="text-white">=</span>
                      <span className="text-white">{`{`}</span>
                    </div>
                    <div className="pl-6 flex gap-2">
                      <span className="text-blue-300">primaryV:</span>
                      <span className="text-green-300">"11kV"</span>
                      <span className="text-white">,</span>
                    </div>
                    <div className="pl-6 flex gap-2">
                      <span className="text-blue-300">secondaryV:</span>
                      <span className="text-green-300">"440V"</span>
                      <span className="text-white">,</span>
                    </div>
                    <div className="pl-6 flex gap-2">
                      <span className="text-blue-300">efficiency:</span>
                      <span className="text-blue-400">0.98</span>
                    </div>
                    <div className="text-white">{`}`}</div>
                    <div className="h-4"></div>
                    <div className="text-gray-500">
                      {"// Calculating Load Current..."}
                    </div>
                    <div className="flex gap-2">
                      <span className="text-purple-400">let</span>
                      <span className="text-blue-400">I_load</span>
                      <span className="text-white">=</span>
                      <span className="text-yellow-200">Power</span>
                      <span className="text-white">/</span>
                      <span className="text-white">(</span>
                      <span className="text-yellow-200">V</span>
                      <span className="text-white">*</span>
                      <span className="text-yellow-200">pf</span>
                      <span className="text-white">);</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Stats Section - Increased Padding & Vibrant Colors */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-8">
            {stats.map((stat, index) => (
              <RevealOnScroll
                key={index}
                className="relative bg-[#1a1a1a] border border-gray-800/60 rounded-xl p-6 flex flex-col items-center justify-center overflow-hidden group hover:border-gray-700 transition-colors shadow-lg"
              >
                {/* Top Border Gradient */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${stat.border}`}
                ></div>

                {/* Number with Gradient Text */}
                <p
                  className={`text-3xl lg:text-4xl font-extrabold mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}
                >
                  {stat.value}
                </p>
                {/* Label */}
                <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest font-semibold text-center">
                  {stat.label}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Introductory Video Section */}
      <section className="py-20 bg-[#151515] border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold text-white mb-8">
              Meet Your Mentor: PD More Sir
            </h2>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
              {!videoPlaying ? (
                <div
                  className="relative w-full h-full cursor-pointer group"
                  onClick={() => setVideoPlaying(true)}
                >
                  <img
                    src="https://placehold.co/1280x720/1a1a1a/3b82f6?text=Watch+Introductory+Video"
                    alt="Introductory Video"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group hover:bg-black/50 transition-colors">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center pl-1 shadow-lg group-hover:scale-110 transition-transform">
                      <PlayCircle
                        size={40}
                        className="text-white"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/QARI-7_J9bI?autoplay=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Value Props */}
      <section className="bg-[#1a1a1a] py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why learn with PD More Sir?
            </h2>
            <p className="text-gray-400 text-lg">
              A comprehensive learning experience designed to take you from
              basics to mastery.
            </p>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Point 1: Concept Clarity */}
            <RevealOnScroll className="bg-[#202020] p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 bg-blue-900/30 text-blue-400 rounded-lg flex items-center justify-center mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Concept Clarity
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Understand the "Why" and "How" behind every theorem. No rote
                memorization, just pure engineering logic.
              </p>
            </RevealOnScroll>
            {/* Point 2: Exam Oriented */}
            <RevealOnScroll className="bg-[#202020] p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 bg-blue-900/30 text-blue-400 rounded-lg flex items-center justify-center mb-6">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Exam Oriented
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Courses designed specifically to help you ace University exams,
                GATE, and competitive Technical exams.
              </p>
            </RevealOnScroll>
            {/* Point 3: Practical Application */}
            <RevealOnScroll className="bg-[#202020] p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 bg-blue-900/30 text-blue-400 rounded-lg flex items-center justify-center mb-6">
                <Cpu size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Practical Application
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Bridge the gap between theory and industry. Learn how these
                machines and circuits work in the real world.
              </p>
            </RevealOnScroll>

            {/* New Points */}
            {/* Point 4: Doubt Solving */}
            <RevealOnScroll className="bg-[#202020] p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 bg-blue-900/30 text-blue-400 rounded-lg flex items-center justify-center mb-6">
                <MessageCircleQuestion size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Dedicated Doubt Solving
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Never get stuck. Get your queries resolved quickly through our
                dedicated support channels and community forums.
              </p>
            </RevealOnScroll>
            {/* Point 5: Mentorship */}
            <RevealOnScroll className="bg-[#202020] p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 bg-blue-900/30 text-blue-400 rounded-lg flex items-center justify-center mb-6">
                <UserCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Personalized Mentorship
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Guidance beyond the syllabus. Get career advice, preparation
                strategies, and motivation directly from the expert.
              </p>
            </RevealOnScroll>
            {/* Point 6: Affordable Learning */}
            <RevealOnScroll className="bg-[#202020] p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 bg-blue-900/30 text-blue-400 rounded-lg flex items-center justify-center mb-6">
                <Wallet size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Affordable & Accessible
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Quality education shouldn't be expensive. Get premium content at
                student-friendly prices with lifetime access.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </section>

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
          <button className="text-blue-500 font-semibold hover:text-blue-400 flex items-center gap-1 group">
            View all subjects{" "}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </RevealOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <RevealOnScroll
              key={course.id}
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
                  <button className="text-sm font-semibold bg-[#2a2a2a] hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg transition-all border border-gray-700">
                    View Details
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[#1a1a1a] border-t border-gray-800 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Student Success Stories
            </h2>
            <p className="text-gray-400 text-lg">
              Hear from students who transformed their careers with our courses.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <RevealOnScroll
                key={testimonial.id}
                className="bg-[#202020] rounded-2xl p-8 border border-gray-800 relative flex flex-col"
              >
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
                    <h4 className="font-bold text-white text-sm">
                      {testimonial.name}
                    </h4>
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
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter / CTA */}
      <section className="bg-gradient-to-br from-blue-900 via-[#1a1a1a] to-[#151515] py-24">
        <RevealOnScroll className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join the Community
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Get free notes, important formulas, and exam tips delivered straight
            to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email..."
              className="bg-white/10 border border-white/20 text-white placeholder-gray-400 px-5 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </RevealOnScroll>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] border-t border-gray-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-bold mb-4">PD More Sir</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Courses
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Students</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Login
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Social</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Telegram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Top Subjects</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Machines",
                  "Power Systems",
                  "Control",
                  "Signals",
                  "Analog",
                  "Digital",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-[#222] text-gray-400 px-2 py-1 rounded border border-gray-800 hover:border-gray-600 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>&copy; 2025 PD More Sir Classes. All rights reserved.</p>
            <p>Empowering Engineers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}