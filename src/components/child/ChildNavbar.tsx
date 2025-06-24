
import { Link, useLocation } from "react-router-dom";
import { Heart, MessageCircle, Smile, BookOpen, Gamepad2 } from "lucide-react";

const ChildNavbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/child/chat", label: "Chat", icon: MessageCircle },
    { path: "/child/mood", label: "Mood", icon: Smile },
    { path: "/child/journal", label: "Journal", icon: BookOpen },
    { path: "/child/games", label: "Games", icon: Gamepad2 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg z-50 border-b-4 border-blue-200 font-quicksand">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-pink-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent font-poppins">
              MindfulBuddy
            </span>
          </Link>
          
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-300 font-semibold ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105"
                      : "text-gray-600 hover:bg-blue-100 hover:text-blue-600 transform hover:scale-105"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ChildNavbar;
