
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const moodEmojis = [
  { emoji: "😢", label: "Very Sad", value: 1, color: "from-red-400 to-red-500", bgColor: "bg-red-50 hover:bg-red-100" },
  { emoji: "🙁", label: "Sad", value: 2, color: "from-orange-400 to-orange-500", bgColor: "bg-orange-50 hover:bg-orange-100" },
  { emoji: "😐", label: "Okay", value: 3, color: "from-yellow-400 to-yellow-500", bgColor: "bg-yellow-50 hover:bg-yellow-100" },
  { emoji: "🙂", label: "Happy", value: 4, color: "from-emerald-400 to-emerald-500", bgColor: "bg-emerald-50 hover:bg-emerald-100" },
  { emoji: "😄", label: "Very Happy", value: 5, color: "from-blue-400 to-blue-500", bgColor: "bg-blue-50 hover:bg-blue-100" },
];

const recentMoods = [
  { date: "Today", mood: 4, emoji: "🙂", intensity: 8 },
  { date: "Yesterday", mood: 3, emoji: "😐", intensity: 5 },
  { date: "2 days ago", mood: 5, emoji: "😄", intensity: 9 },
  { date: "3 days ago", mood: 2, emoji: "🙁", intensity: 3 },
  { date: "4 days ago", mood: 4, emoji: "🙂", intensity: 7 },
];

const ChildMood = () => {
  const [selectedMood, setSelectedMood] = useState(3);
  const [moodIntensity, setMoodIntensity] = useState([6]);
  const [isAnimating, setIsAnimating] = useState(false);

  const selectedMoodData = moodEmojis.find(mood => mood.value === selectedMood);

  const handleMoodSelect = (moodValue: number) => {
    setSelectedMood(moodValue);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleMoodSubmit = () => {
    console.log("Mood submitted:", { mood: selectedMood, intensity: moodIntensity[0] });
    // Here you would save the mood data
  };

  const getIntensityLabel = (intensity: number) => {
    if (intensity <= 3) return "Low";
    if (intensity <= 6) return "Medium";
    return "High";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-quicksand">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-3 font-poppins">
          How Are You Feeling? 🌟
        </h1>
        <p className="text-lg text-blue-600 font-medium">
          Take a moment to check in with yourself today
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Mood Selection Card */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 backdrop-blur-sm border-2 border-blue-200 rounded-3xl shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-blue-700 font-poppins">
              Pick Your Mood
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Emoji Selector */}
            <div className="grid grid-cols-5 gap-3">
              {moodEmojis.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => handleMoodSelect(mood.value)}
                  className={`p-4 rounded-3xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                    selectedMood === mood.value
                      ? `${mood.bgColor} shadow-lg scale-110 ring-4 ring-blue-300 ring-opacity-50`
                      : `bg-white/70 hover:bg-white/90 ${mood.bgColor.split(' ')[1]}`
                  }`}
                >
                  <div className={`text-4xl mb-2 ${isAnimating && selectedMood === mood.value ? 'bounce-animation' : ''}`}>
                    {mood.emoji}
                  </div>
                  <div className="text-xs font-semibold text-gray-700">
                    {mood.label}
                  </div>
                </button>
              ))}
            </div>

            {/* Mood Intensity Slider */}
            <div className="space-y-4 bg-white/60 p-6 rounded-2xl">
              <label className="text-lg font-semibold text-blue-700 font-poppins">
                How strong is this feeling?
              </label>
              <div className="space-y-3">
                <Slider
                  value={moodIntensity}
                  onValueChange={setMoodIntensity}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 font-medium">
                  <span>😴 Mild</span>
                  <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {moodIntensity[0]} - {getIntensityLabel(moodIntensity[0])}
                  </span>
                  <span>⚡ Strong</span>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleMoodSubmit} 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-4 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Save My Mood 💝
            </Button>
          </CardContent>
        </Card>

        {/* Live Preview Card */}
        <Card className="bg-gradient-to-br from-white to-blue-50 border-2 border-green-200 rounded-3xl shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-green-700 font-poppins">
              Your Mood Right Now
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className={`text-8xl ${isAnimating ? 'bounce-animation' : ''}`}>
              {selectedMoodData?.emoji}
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-800 font-poppins">
                {selectedMoodData?.label}
              </h3>
              <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${selectedMoodData?.color} text-white font-semibold`}>
                Intensity: {moodIntensity[0]}/10
              </div>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${selectedMoodData?.color} transition-all duration-500 ease-out`}
                style={{ width: `${(moodIntensity[0] / 10) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mood Journey Card */}
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-3xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-green-700 text-center font-poppins">
            Your Mood Journey 📈
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMoods.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white/70 rounded-2xl hover:bg-white/90 transition-all duration-200 transform hover:scale-102"
              >
                <span className="text-lg font-semibold text-gray-700">
                  {entry.date}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{entry.emoji}</span>
                  <div className="flex flex-col items-end">
                    <div className="w-20 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full transition-all duration-300"
                        style={{ width: `${(entry.intensity / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 mt-1 font-medium">
                      {entry.intensity}/10
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildMood;
