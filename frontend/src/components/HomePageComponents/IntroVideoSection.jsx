import React from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import { PlayCircle } from "lucide-react";
import { useState } from "react";

function IntroVideoSection() {
  const [videoPlaying, setVideoPlaying] = useState(false);
  return (
    <div>
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
    </div>
  );
}

export default IntroVideoSection;
