
import { Link, useLocation } from "react-router-dom";
import { Heart, MessageCircle, Smile, BookOpen, Gamepad2, Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
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
  const { signOut, profile } = useAuth();
  
  const navItems = [
    { path: "/child/chat", label: "Chat", icon: MessageCircle },
    { path: "/child/mood", label: "Mood", icon: Smile },
    { path: "/child/journal", label: "Journal", icon: BookOpen },
    { path: "/child/games", label: "Games", icon: Gamepad2 },
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

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
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 font-semibold group mindful-button ${
              isActive
                ? "bg-gradient-to-r from-mindful-accent via-mindful-send-button to-mindful-mint text-white shadow-xl transform scale-105 animate-gentle-pulse"
                : "text-purple-700 dark:text-purple-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30 hover:text-purple-800 dark:hover:text-purple-200 hover:shadow-lg"
            }`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${isActive ? 'animate-gentle-pulse' : 'group-hover:scale-110'}`} />
            <span className="font-medium whitespace-nowrap font-quicksand">{item.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-xl z-50 border-b-2 border-gradient-to-r from-mindful-accent/20 via-mindful-send-button/20 to-mindful-mint/20 font-quicksand">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group hover:scale-105 transition-all duration-300">
            <Heart className="w-10 h-10 text-pink-500 flex-shrink-0 group-hover:text-pink-600 transition-colors animate-gentle-pulse" />
            <div className="min-w-0">
              <span className="text-3xl font-bold bg-gradient-to-r from-mindful-accent via-mindful-send-button to-mindful-mint bg-clip-text text-transparent font-quicksand">
                MindfulBuddy
              </span>
              {profile && (
                <p className="text-sm text-purple-500 dark:text-purple-400 font-quicksand truncate">
                  Hi, {profile.full_name}! ✨
                </p>
              )}
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          {isMobile ? (
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button className="p-3 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-110 mindful-button">
                    <Menu className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-l-2 border-purple-200 dark:border-purple-700">
                  <SheetHeader>
                    <SheetTitle className="text-left font-quicksand bg-gradient-to-r from-mindful-accent to-mindful-send-button bg-clip-text text-transparent text-xl">
                      Navigation ✨
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-8">
                    <NavItems onItemClick={() => setIsOpen(false)} />
                    <Button 
                      onClick={handleSignOut}
                      variant="outline"
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800 transition-all duration-300 hover:scale-105 font-quicksand"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavItems />
              <ThemeToggle />
              <Button 
                onClick={handleSignOut}
                variant="ghost"
                size="sm"
                className="ml-4 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:scale-105 font-quicksand"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ChildNavbar;
