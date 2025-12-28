import React from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { stats } from "../../data/HomePageData";
import { Link } from "react-router-dom";
export default function HeroSection() {
  return (
    <>
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
                <Link to="/courses">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-transform transform active:scale-95 shadow-lg shadow-blue-900/20">
                    Explore Courses
                  </button>
                </Link>
                <button
                  onClick={() =>
                    window.open(
                      "https://468qxqhxut.ufs.sh/f/S685lnG2lK86B9r8Vh535loyaRNCcj2uWM9gJAi7dHQweKvm"
                    )
                  }
                  className="bg-[#2a2a2a] hover:bg-[#333] text-white px-8 py-4 rounded-full text-lg font-bold transition-all border border-gray-700"
                >
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
    </>
  );
}
