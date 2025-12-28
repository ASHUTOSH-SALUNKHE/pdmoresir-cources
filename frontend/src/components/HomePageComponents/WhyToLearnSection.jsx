import React from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import {
  Zap,
  Activity,
  Cpu,
  MessageCircleQuestion,
  UserCheck,
  Wallet,
} from "lucide-react";

function WhyToLearnSection() {
  return (
    <div>
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
    </div>
  );
}

export default WhyToLearnSection;
