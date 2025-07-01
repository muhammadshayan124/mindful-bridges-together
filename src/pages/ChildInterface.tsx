
import { Routes, Route, Navigate } from "react-router-dom";
import ChildNavbar from "@/components/child/ChildNavbar";
import ChildChat from "@/components/child/ChildChat";
import ChildMood from "@/components/child/ChildMood";
import ChildJournal from "@/components/child/ChildJournal";
import ChildGames from "@/components/child/ChildGames";
import BreathingBuddy from "@/components/child/games/BreathingBuddy";
import EmotionDetective from "@/components/child/games/EmotionDetective";
import MindfulMaze from "@/components/child/games/MindfulMaze";
import WorryWarriors from "@/components/child/games/WorryWarriors";
import GratitudeGarden from "@/components/child/games/GratitudeGarden";
import CopingCastle from "@/components/child/games/CopingCastle";

const ChildInterface = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-calm-50/80 via-lavender-50/60 to-mint-50/80 dark:from-serenity-900/90 dark:via-serenity-800/80 dark:to-serenity-900/90 font-quicksand animate-gradient-y">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-calm-200/20 to-lavender-200/20 dark:from-calm-700/10 dark:to-lavender-700/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-mint-200/20 to-peach-200/20 dark:from-mint-700/10 dark:to-peach-700/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-lavender-200/20 to-mint-200/20 dark:from-lavender-700/10 dark:to-mint-700/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <ChildNavbar />
      <div className="pt-20 px-4 pb-6 relative z-10">
        <Routes>
          <Route path="/" element={<Navigate to="/child/chat" replace />} />
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
    </div>
  );
};

export default ChildInterface;
