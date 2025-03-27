import React from 'react';
import { Link } from 'react-router';

const Team = () => {
  // Developers data
  const developers = [
    {
      id: 1,
      name: "Anish",
      role: "Full Stack dev",
      bio: "Crafting beautiful interfaces with React and Tailwind CSS. Passionate about UX design and performance optimization.",
      initials: "AN",
      stats: [
        { label: "Projects", value: "18" },       
        { label: "Git Commits", value: "2.4k" },
       { label: "Coffee Cups", value: "∞" },
      ],
      links: [
        { name: "GitHub", icon: "💻", url: "#" },
        { name: "Twitter", icon: "🐦", url: "#" }
      ],
      techStack: ["React", "Tailwind", "JavaScript", "Figma"],
      color: "from-purple-600 to-blue-500"
    },
    {
      id: 2,
      name: "Abhijay",
      role: "Full Stack Developer",
      bio: "Building robust backends and seamless APIs. Focused on scalable architecture and database design.",
      initials: "AB",
      stats: [
        { label: "Projects", value: "22" },
        { label: "APIs Built", value: "15+" },
        { label: "Bugs Fixed", value: "∞" }
      ],
      links: [
        { name: "GitHub", icon: "💻", url: "#" },
        { name: "LinkedIn", icon: "🔗", url: "#" }
      ],
      techStack: ["Node.js", "Express", "MongoDB", "Firebase"],
      color: "from-orange-500 to-pink-600"
    }
  ];

  return (
    <div className="h-screen bg-black text-white p-6 overflow-y-auto pb-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Meet the Developers</h1>
        <p className="text-gray-400">The team behind the music experience</p>
      </div>

      {/* Developers List */}
      <div className="space-y-8">
        {developers.map(dev => (
            <Link to={`/team/${dev.id}`}>
          <div key={dev.id} className="bg-gray-800 rounded-xl mb-4 p-5">
            {/* Developer Header */}
            <div className="flex items-center mb-5">
              <div className={`bg-gradient-to-br ${dev.color} w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mr-4`}>
                {dev.initials}
              </div>
              <div>
                <h2 className="text-xl font-bold">{dev.name}</h2>
                <p className="text-gray-400">{dev.role}</p>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-300 mb-5">{dev.bio}</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {dev.stats.map((stat, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-green-400">{stat.value}</p>
                  <p className="text-gray-400 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">TECH STACK</h3>
              <div className="flex flex-wrap gap-2">
                {dev.techStack.map((tech, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex space-x-3">
              {dev.links.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url} 
                  className="flex items-center bg-gray-700 hover:bg-gray-600 rounded-full px-4 py-2 transition-colors"
                >
                  <span className="mr-2">{link.icon}</span>
                  <span className="text-sm">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
          </Link>

        ))}
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-8">
        <p>Made with ♥ by Anish & Abhijay</p>
        <p className="mt-1">© {new Date().getFullYear()} All rights reserved</p>
      </div>

      {/* Bottom Navigation */}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-gray-900 flex justify-around py-3 border-t border-gray-800">
        <button className="text-gray-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <button className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
        <button className="text-gray-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div> */}
    </div>
  );
};

export default Team;