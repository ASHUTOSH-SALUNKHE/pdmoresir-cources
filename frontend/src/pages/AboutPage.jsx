import React, { useEffect, useRef } from "react";
import { RevealOnScroll } from "../components/RevealOnScroll";
import {
    Award,
    BookOpen,
    Users,
    Target,
    Clock,
    Briefcase,
    ChevronRight,
    GraduationCap,
    Lightbulb,
} from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#151515] text-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-full bg-purple-600/5 blur-3xl -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <RevealOnScroll className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                            Empowering the Next Generation of
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                Electrical Engineers
                            </span>
                        </h1>
                        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                            We bridge the gap between academic theory and practical industry
                            application. Our mission is to provide intuitive, high-quality
                            education that turns students into skilled professionals.
                        </p>
                    </RevealOnScroll>
                </div>
            </section>

            {/* Story / Mission Section */}
            <section className="py-20 bg-[#1a1a1a]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <RevealOnScroll>
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-600/20 blur-2xl -z-10 rounded-full"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Engineering Workshop"
                                    className="rounded-2xl shadow-2xl border border-gray-800 w-full"
                                />
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Lightbulb className="text-yellow-500" />
                                Our Story
                            </h2>
                            <div className="space-y-4 text-gray-400 leading-relaxed">
                                <p>
                                    It started with a simple observation: Engineering concepts were
                                    often taught in abstract, confusing ways that left students
                                    struggling to connect the dots.
                                </p>
                                <p>
                                    P D More Sir, with over 12 years of teaching experience, decided
                                    to change that. He began creating content that visualized
                                    invisble concepts—making voltage, current, and flux tangible and
                                    easy to understand.
                                </p>
                                <p>
                                    What started as a small YouTube channel has now grown into a
                                    comprehensive learning platform trusted by thousands of students
                                    across the country. Only specific, high-outcome courses are
                                    crafted to ensure maximum impact on your career.
                                </p>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-y border-gray-800 bg-[#151515]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <StatCard
                            icon={Users}
                            value="50k+"
                            label="Students Mentored"
                            color="text-blue-500"
                        />
                        <StatCard
                            icon={BookOpen}
                            value="15+"
                            label="Specialized Courses"
                            color="text-purple-500"
                        />
                        <StatCard
                            icon={Clock}
                            value="12+"
                            label="Years Experience"
                            color="text-green-500"
                        />
                        <StatCard
                            icon={Award}
                            value="100%"
                            label="Quality Content"
                            color="text-yellow-500"
                        />
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-24 bg-[#1a1a1a] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <RevealOnScroll className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why We Are Different</h2>
                        <p className="text-gray-400">
                            We don't just teach for exams. We teach for careers.
                        </p>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Target}
                            title="Concept Clarity"
                            desc="We break down complex topics into simple, digestible pieces using analogies and animations."
                        />
                        <FeatureCard
                            icon={Briefcase}
                            title="Industry Relevant"
                            desc="Our curriculum is updated regularly to match the latest industry standards and requirements."
                        />
                        <FeatureCard
                            icon={GraduationCap}
                            title="Career Guidance"
                            desc="Beyond subjects, we provide mentorship on career paths, interviews, and higher studies."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <RevealOnScroll>
                        <h2 className="text-4xl font-bold mb-6">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-xl text-gray-400 mb-10">
                            Join thousands of other engineers who have transformed their careers with us.
                        </p>
                        <a
                            href="/courses"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-blue-900/20"
                        >
                            Explore Courses <ChevronRight size={20} />
                        </a>
                    </RevealOnScroll>
                </div>
            </section>
        </div>
    );
}

function StatCard({ icon: Icon, value, label, color }) {
    return (
        <RevealOnScroll className="text-center p-6 bg-[#202020] rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
            <Icon className={`w-8 h-8 mx-auto mb-4 ${color}`} />
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
        </RevealOnScroll>
    );
}

function FeatureCard({ icon: Icon, title, desc }) {
    return (
        <RevealOnScroll className="p-8 bg-[#202020] rounded-2xl border border-gray-800 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-white">
                <Icon size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{desc}</p>
        </RevealOnScroll>
    );
}
