
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
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-300 font-semibold group ${
              isActive
                ? "bg-gradient-to-r from-calm-500 via-lavender-500 to-mint-500 text-white shadow-xl transform scale-105 animate-pulse-glow"
                : "text-serenity-700 dark:text-serenity-300 hover:bg-gradient-to-r hover:from-calm-100 hover:to-mint-100 dark:hover:from-serenity-700 dark:hover:to-serenity-600 hover:text-calm-700 dark:hover:text-calm-300 transform hover:scale-105 hover:shadow-lg"
            }`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${isActive ? 'animate-bounce' : 'group-hover:scale-110'}`} />
            <span className="font-medium whitespace-nowrap">{item.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 child-navbar shadow-xl z-50 border-b-2 border-gradient-to-r from-calm-200 via-lavender-200 to-mint-200 dark:from-serenity-600 dark:via-serenity-500 dark:to-serenity-600 font-quicksand">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group hover:scale-105 transition-all duration-300">
            <Heart className="w-8 h-8 text-pink-500 flex-shrink-0 group-hover:text-pink-600 transition-colors animate-pulse" />
            <div className="min-w-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-calm-600 via-lavender-600 to-mint-600 dark:from-calm-400 dark:via-lavender-400 dark:to-mint-400 bg-clip-text text-transparent font-poppins animate-gradient-x">
                MindfulBuddy
              </span>
              {profile && (
                <p className="text-xs text-serenity-500 dark:text-serenity-400 font-quicksand truncate">
                  Hi, {profile.full_name}! ✨
                </p>
              )}
            </div>
          </Link>
          
          {isMobile ? (
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 rounded-xl hover:bg-calm-100 dark:hover:bg-serenity-700 transition-all duration-300 hover:scale-110">
                    <Menu className="w-6 h-6 text-serenity-600 dark:text-serenity-300" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-gradient-to-br from-white/95 via-calm-50/90 to-lavender-50/90 dark:from-serenity-900/95 dark:via-serenity-800/90 dark:to-serenity-900/90 backdrop-blur-xl border-l-2 border-calm-200 dark:border-serenity-600">
                  <SheetHeader>
                    <SheetTitle className="text-left font-poppins bg-gradient-to-r from-calm-600 to-lavender-600 dark:from-calm-400 dark:to-lavender-400 bg-clip-text text-transparent">
                      Navigation ✨
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 mt-6">
                    <NavItems onItemClick={() => setIsOpen(false)} />
                    <Button 
                      onClick={handleSignOut}
                      variant="outline"
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800 transition-all duration-300 hover:scale-105"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavItems />
              <ThemeToggle />
              <Button 
                onClick={handleSignOut}
                variant="ghost"
                size="sm"
                className="ml-4 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:scale-105"
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
