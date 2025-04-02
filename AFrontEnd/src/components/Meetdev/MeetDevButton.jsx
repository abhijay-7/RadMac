import { Link } from 'react-router-dom';

const MeetDevButton = () => {
  return (
    <Link 
      to="/team" 
      className="fixed bottom-24 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-500 w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-110"
      aria-label="Meet the developers"
    >
      <span className="text-2xl">👨‍💻</span>
    </Link>
  );
};

export default MeetDevButton;