
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const moodEmojis = [
  { emoji: "😢", label: "Very Sad", value: 1, color: "text-red-500" },
  { emoji: "😞", label: "Sad", value: 2, color: "text-orange-500" },
  { emoji: "😐", label: "Okay", value: 3, color: "text-yellow-500" },
  { emoji: "😊", label: "Happy", value: 4, color: "text-green-500" },
  { emoji: "😄", label: "Very Happy", value: 5, color: "text-blue-500" },
];

const recentMoods = [
  { date: "Today", mood: 4, emoji: "😊" },
  { date: "Yesterday", mood: 3, emoji: "😐" },
  { date: "2 days ago", mood: 5, emoji: "😄" },
  { date: "3 days ago", mood: 2, emoji: "😞" },
  { date: "4 days ago", mood: 4, emoji: "😊" },
];

const ChildMood = () => {
  const [selectedMood, setSelectedMood] = useState(3);
  const [energyLevel, setEnergyLevel] = useState([50]);

  const handleMoodSubmit = () => {
    console.log("Mood submitted:", { mood: selectedMood, energy: energyLevel[0] });
    // Here you would save the mood data
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">How Are You Feeling? 😊</h1>
        <p className="text-blue-600">Track your mood and energy to help us understand you better</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/70 backdrop-blur-sm border-2 border-blue-200 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl text-blue-700 text-center">Today's Mood</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-5 gap-2">
              {moodEmojis.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`p-4 rounded-2xl transition-all duration-200 transform hover:scale-110 ${
                    selectedMood === mood.value
                      ? "bg-blue-500 text-white shadow-lg scale-110"
                      : "bg-gray-100 hover:bg-blue-100"
                  }`}
                >
                  <div className="text-3xl mb-1">{mood.emoji}</div>
                  <div className="text-xs font-medium">{mood.label}</div>
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-blue-700">Energy Level:</label>
              <Slider
                value={energyLevel}
                onValueChange={setEnergyLevel}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>😴 Sleepy</span>
                <span className="font-medium">{energyLevel[0]}%</span>
                <span>⚡ Energetic</span>
              </div>
            </div>

            <Button onClick={handleMoodSubmit} className="w-full bg-blue-500 hover:bg-blue-600 rounded-xl">
              Save My Mood 💾
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-2 border-green-200 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl text-green-700 text-center">Your Mood Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentMoods.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white/50 rounded-xl"
                >
                  <span className="text-sm font-medium text-gray-700">{entry.date}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{entry.emoji}</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-gradient-to-r from-red-400 to-blue-400 rounded-full"
                        style={{ width: `${(entry.mood / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChildMood;
