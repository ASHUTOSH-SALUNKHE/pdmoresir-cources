import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-[#111] border-t border-gray-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-bold mb-4">PD More Sir</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link to="/about" className="hover:text-blue-400">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/courses" className="hover:text-blue-400">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link to="/blogs" className="hover:text-blue-400">
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Students</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link to="/contact" className="hover:text-blue-400">
                    Contact
                  </Link>
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
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Facebook
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

export default Footer