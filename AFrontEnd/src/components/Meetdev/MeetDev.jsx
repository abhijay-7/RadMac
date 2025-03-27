import React from 'react';
import { useParams } from 'react-router';

const MeetTheDeveloper = () => {
  // Developer data
  const anish = {
    name: "Anish Raja",
    role: "Developer",
    bio: "Building seamless music experiences with React and Node.js. Passionate about UI/UX design and audio engineering.",
    stats: [
      { label: "Projects", value: "18" },       
       { label: "Git Commits", value: "2.4k" },
      { label: "Coffee Cups", value: "∞" },
      
    ],
    links: [
      { name: "GitHub", icon: "💻", url: "#" },
      { name: "Twitter", icon: "🐦", url: "#" },
      { name: "LinkedIn", icon: "🔗", url: "#" }
    ],
    techStack: ["React","MERN", "JAVA" ,"DSA", "Express", "Tailwind", "JavaScript"],
  };
  const abhijay =
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
const {id} = useParams();
console.log(id);

const developer = id == 1?anish:  abhijay
  return (
    <div className="h-screen bg-black text-white p-6 overflow-y-auto pb-20">
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="bg-gradient-to-br from-purple-600 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center text-4xl mr-4">
          {developer.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{developer.name}</h1>
          <p className="text-gray-400">{developer.role}</p>
        </div>
      </div>

      {/* Bio */}
      <div className="bg-gray-800 rounded-xl p-5 mb-6">
        <p className="text-gray-300">{developer.bio}</p>
      </div>

      {/* Stats */}
      <h2 className="text-xl font-semibold mb-4">Dev Stats</h2>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {developer.stats.map((stat, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-500">{stat.value}</p>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tech Stack */}
      <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
      <div className="flex flex-wrap gap-3 mb-8">
        {developer.techStack.map((tech, index) => (
          <span 
            key={index} 
            className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <h2 className="text-xl font-semibold mb-4">Connect</h2>
      <div className="space-y-3 mb-12">
        {developer.links.map((link, index) => (
          <a 
            key={index} 
            href={link.url} 
            className="flex items-center bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition-colors"
          >
            <span className="text-xl mr-3">{link.icon}</span>
            <span className="font-medium">{link.name}</span>
            <span className="ml-auto text-gray-400">→</span>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm">
        <p>Made with ♥ using React & Tailwind CSS</p>
        <p className="mt-1">© {new Date().getFullYear()} All rights reserved</p>
      </div>

      {/* Bottom Navigation (same as music player) */}
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

export default MeetTheDeveloper;