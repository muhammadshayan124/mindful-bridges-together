import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ChildNavbar from "@/components/child/ChildNavbar";
import ChildChat from "@/components/child/ChildChat";
import ChildMood from "@/components/child/ChildMood";
import ChildJournal from "@/components/child/ChildJournal";
import ChildGames from "@/components/child/ChildGames";
import ChildLinking from "@/components/child/ChildLinking";
import ChatbotPanel from "@/components/child/ChatbotPanel";
import BreathingBuddy from "@/components/child/games/BreathingBuddy";
import EmotionDetective from "@/components/child/games/EmotionDetective";
import MindfulMaze from "@/components/child/games/MindfulMaze";
import WorryWarriors from "@/components/child/games/WorryWarriors";
import GratitudeGarden from "@/components/child/games/GratitudeGarden";
import CopingCastle from "@/components/child/games/CopingCastle";
import { useChild } from "@/contexts/ChildContext";

const ChildInterface = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { isLinked, loading } = useChild();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-child-primary/5 via-child-background to-child-secondary/5">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-child-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-child-primary font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLinked) {
    return <ChildLinking />;
  }

  return (
    <div className="min-h-screen child-interface font-quicksand animate-fade-in-up">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-mindful-accent/10 to-mindful-send-button/10 rounded-full blur-3xl animate-gentle-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-mindful-mint/10 to-emerald-400/10 rounded-full blur-3xl animate-gentle-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-gradient-to-r from-mindful-send-button/10 to-mindful-mint/10 rounded-full blur-3xl animate-gentle-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-pink-300/20 to-purple-300/20 rounded-full blur-2xl animate-gentle-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-300/20 to-green-300/20 rounded-full blur-2xl animate-gentle-pulse" style={{animationDelay: '3s'}}></div>
      </div>
      
      <ChildNavbar />
      <div className="pt-24 px-4 pb-8 relative z-10">
        <Routes>
          <Route path="/" element={<Navigate to="/child/mood" replace />} />
          <Route path="/chat" element={<ChildChat />} />
          <Route path="/mood" element={<ChildMood />} />
          <Route path="/journal" element={<ChildJournal />} />
          <Route path="/games" element={<ChildGames />} />
          <Route path="/games/breathing-buddy" element={<BreathingBuddy />} />
          <Route path="/games/emotion-detective" element={<EmotionDetective />} />
          <Route path="/games/mindful-maze" element={<MindfulMaze />} />
          <Route path="/games/worry-warriors" element={<WorryWarriors />} />
          <Route path="/games/gratitude-garden" element={<GratitudeGarden />} />
          <Route path="/games/coping-castle" element={<CopingCastle />} />
        </Routes>
      </div>

      <ChatbotPanel 
        isOpen={isChatbotOpen} 
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)} 
      />
    </div>
  );
};

export default ChildInterface;