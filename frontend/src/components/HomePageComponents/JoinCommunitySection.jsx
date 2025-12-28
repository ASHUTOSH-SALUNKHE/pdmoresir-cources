import React from "react";
import { RevealOnScroll } from "../RevealOnScroll";

function JoinCommunitySection() {
  return (
    <div>
      {/* Newsletter / CTA */}
      <section className="bg-gradient-to-br from-blue-900 via-[#1a1a1a] to-[#151515] py-24">
        <RevealOnScroll className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join the Community
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Get free notes, important formulas, and exam tips delivered straight
            to you. Join our WhatsApp community now!
          </p>
          <div className="flex justify-center">
            <a
              href="https://chat.whatsapp.com/JE9w4XLidsHHmCVZg1NkB9"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg flex items-center gap-2"
            >
              <span>Join WhatsApp Community</span>
            </a>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}

export default JoinCommunitySection;
