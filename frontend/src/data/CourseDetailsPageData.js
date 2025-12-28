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

export const COURSE_LIST = [
  {
    slug: "network-analysis-circuit-theory",
    hero: {
      badge: "A Course You'll Actually Finish",
      titlePrefix: "Master",
      titleHighlight: "Network Analysis",
      titleSuffix: "& Circuit Theory",
      description:
        "Stop struggling with dry textbook math. Learn to analyze, simulate, and design real-world circuits with intuition and confidence.",
      stats: [
        { value: "Intermediate", label: "Level" },
        { value: "15 Hours", label: "Content" },
        { value: "140 Lessons", label: "Bite-sized" },
        { value: "Lifetime", label: "Access" },
      ],
      buttons: {
        primary: "Enroll Now",
        secondary: "View Curriculum",
      },
    },
    problemSolution: {
      title:
        "Circuit Theory is everywhere — but do you actually understand it?",
      paragraphs: [
        "Most engineering students can solve a KVL equation on a blackboard. But ask them to look at a schematic and explain how the current flows, or why a capacitor is placed there, and they freeze.",
        "Maybe you've copied schematics from the internet for your Arduino projects. Maybe you passed your university exams but still feel like an imposter when looking at a real PCB.",
        "That's exactly what this course is about.",
        "In Network Analysis & Circuit Theory, I'll walk you step-by-step through the theorems, analysis techniques, and practical simulations you need to design real electronics. No confusing academic fluff—just clear, intuitive explanations.",
      ],
    },
    learningPoints: [
      {
        icon: Activity,
        colorClass: "text-blue-400 bg-blue-500/20",
        title: "Transient Analysis",
        desc: "Understand exactly what happens in RC, RL, and RLC circuits during switching events. No more guessing.",
      },
      {
        icon: Cpu,
        colorClass: "text-green-400 bg-green-500/20",
        title: "Circuit Simulation",
        desc: "Master LTSpice. Verify your hand calculations with industry-standard simulation software.",
      },
      {
        icon: Share2,
        colorClass: "text-purple-400 bg-purple-500/20",
        title: "Nodal & Mesh Analysis",
        desc: "Learn the systematic methods to solve any circuit, no matter how complex the loops are.",
      },
      {
        icon: InfinityIcon,
        colorClass: "text-blue-400 bg-blue-500/20",
        title: "Thevenin's Theorem",
        desc: "The most important concept in electronics. Simplify complex networks into a single source and resistor.",
      },
      {
        icon: Zap,
        colorClass: "text-yellow-400 bg-yellow-500/20",
        title: "AC Steady State",
        desc: "Master Phasors, Impedance, and Complex Power. Design circuits that handle AC signals.",
      },
      {
        icon: TrendingUp,
        colorClass: "text-red-400 bg-red-500/20",
        title: "Frequency Response",
        desc: "Plot and interpret Bode Plots for filters. Understand bandwidth, cutoff frequencies, and resonance.",
      },
    ],
    projects: [
      {
        id: "Project 1",
        title: "3-Band Audio Equalizer",
        desc: "You'll design a passive filter network to control bass, mid, and treble frequencies. We will calculate component values for specific cutoff frequencies and verify the Bode plot in LTSpice.",
        image:
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        checkpoints: [
          "Filter Design (Low/High/Band Pass)",
          "Bode Plot Analysis",
          "Resonance Calculations",
        ],
        gradient: "from-blue-900/40",
      },
      {
        id: "Project 2",
        title: "Power Supply Protection Unit",
        desc: "Apply transient analysis to design a protection circuit that handles voltage spikes. You'll use inductors and capacitors to smooth out switching noise and protect sensitive loads.",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        checkpoints: [
          "RLC Transient Response",
          "Damping Ratios",
          "Step Response Simulation",
        ],
        gradient: "from-purple-900/40",
      },
    ],
    curriculum: {
      summary: "10 Sections • 140 Lessons • 15h 30m Total Length",
      sections: [
        {
          number: 1,
          title: "Getting Started",
          duration: "20m",
          lessons: [
            { title: "Welcome & Course Overview", time: "3m" },
            { title: "What is a 'Network'?", time: "5m" },
            { title: "Active vs. Passive Components", time: "7m" },
            { title: "Setting Up LTSpice (Free Tool)", time: "5m" },
          ],
        },
        {
          number: 2,
          title: "Fundamentals & Circuit Laws",
          duration: "1h 30m",
          lessons: [
            { title: "Voltage, Current, and Power", time: "10m" },
            { title: "Independent vs Dependent Sources", time: "15m" },
            { title: "KCL Visualized (Water Analogy)", time: "12m" },
            { title: "KVL Visualized (Hiking Analogy)", time: "15m" },
          ],
        },
        {
          number: 3,
          title: "Methods of Analysis",
          duration: "2h 05m",
          lessons: [
            { title: "Nodal Analysis: The Universal Method", time: "25m" },
            { title: "Mesh Analysis: When to use it?", time: "20m" },
            { title: "Supernodes and Supermeshes", time: "30m" },
            { title: "Project: Multi-Loop Bridge Circuit", time: "45m" },
          ],
        },
        {
          number: 4,
          title: "Circuit Theorems",
          duration: "2h 10m",
          lessons: [
            { title: "Superposition Principle", time: "20m" },
            { title: "Thevenin's Theorem (Theory)", time: "30m" },
            {
              title: "Thevenin's Theorem (Practical Application)",
              time: "25m",
            },
            { title: "Maximum Power Transfer", time: "15m" },
          ],
        },
        {
          number: 5,
          title: "AC Analysis & Frequency Response",
          duration: "3h 45m",
          lessons: [
            { title: "Intro to Phasors", time: "25m" },
            { title: "Impedance & Admittance", time: "30m" },
            { title: "Bode Plots: Magnitude", time: "40m" },
            { title: "Designing Passive Filters", time: "50m" },
          ],
        },
      ],
    },
    reviews: [
      {
        name: "Sarah Jenkins",
        role: "EE Student",
        text: "I failed Circuit Theory I twice in college. This course explained Thevenin's theorem in 20 minutes better than my professor did in a whole semester. I finally get it.",
      },
      {
        name: "David Chen",
        role: "Hobbyist & Maker",
        text: "As a self-taught maker, I could always copy schematics but never design them. This course bridged the gap between Arduino tinkering and real engineering.",
      },
      {
        name: "Marcus Thorne",
        role: "Junior Hardware Engineer",
        text: "The transient analysis section is gold. I use the protection circuit design techniques I learned here in my actual job designing industrial controllers.",
      },
    ],
  },
];
