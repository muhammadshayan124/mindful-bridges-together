
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 font-quicksand">
      <ChildNavbar />
      <div className="pt-20 px-4 pb-6">
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
