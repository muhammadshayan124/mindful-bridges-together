
import { Link, useLocation } from "react-router-dom";
import { Heart, MessageCircle, Smile, BookOpen, Gamepad2, Menu } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ChildNavbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { path: "/child/chat", label: "Chat", icon: MessageCircle },
    { path: "/child/mood", label: "Mood", icon: Smile },
    { path: "/child/journal", label: "Journal", icon: BookOpen },
    { path: "/child/games", label: "Games", icon: Gamepad2 },
  ];

  const NavItems = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-300 font-semibold ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105"
                : "text-gray-600 hover:bg-blue-100 hover:text-blue-600 transform hover:scale-105"
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium whitespace-nowrap">{item.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg z-50 border-b-4 border-blue-200 font-quicksand">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-pink-500 flex-shrink-0" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent font-poppins">
              MindfulBuddy
            </span>
          </Link>
          
          {isMobile ? (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 rounded-lg hover:bg-blue-100 transition-colors">
                  <Menu className="w-6 h-6 text-gray-600" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left font-poppins">Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  <NavItems onItemClick={() => setIsOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="flex items-center gap-2">
              <NavItems />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ChildNavbar;
