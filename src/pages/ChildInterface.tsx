
import { Routes, Route, Navigate } from "react-router-dom";
import ChildNavbar from "@/components/child/ChildNavbar";
import ChildChat from "@/components/child/ChildChat";
import ChildMood from "@/components/child/ChildMood";
import ChildJournal from "@/components/child/ChildJournal";
import ChildGames from "@/components/child/ChildGames";

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
        </Routes>
      </div>
    </div>
  );
};

export default ChildInterface;
