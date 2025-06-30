
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Zap, Shield, RefreshCw } from "lucide-react";

interface Worry {
  id: number;
  text: string;
  intensity: 'low' | 'medium' | 'high';
  defeated: boolean;
}

interface SuperPower {
  id: number;
  name: string;
  description: string;
  icon: string;
  worryTypes: string[];
}

const initialWorries: Worry[] = [
  { id: 1, text: "What if I fail my test tomorrow?", intensity: 'high', defeated: false },
  { id: 2, text: "My friends might not like me", intensity: 'medium', defeated: false },
  { id: 3, text: "I'm scared of the dark", intensity: 'low', defeated: false },
  { id: 4, text: "What if I get lost?", intensity: 'medium', defeated: false },
  { id: 5, text: "I might embarrass myself", intensity: 'high', defeated: false },
];

const superPowers: SuperPower[] = [
  {
    id: 1,
    name: "Preparation Power",
    description: "Study hard and prepare well",
    icon: "📚",
    worryTypes: ["test", "fail", "homework"]
  },
  {
    id: 2,
    name: "Friendship Force",
    description: "Be kind and genuine to others",
    icon: "🤝",
    worryTypes: ["friends", "like", "social"]
  },
  {
    id: 3,
    name: "Courage Beam",
    description: "Face fears with bravery",
    icon: "💪",
    worryTypes: ["scared", "dark", "afraid"]
  },
  {
    id: 4,
    name: "Navigation Shield",
    description: "Ask for help and make a plan",
    icon: "🗺️",
    worryTypes: ["lost", "direction", "way"]
  },
  {
    id: 5,
    name: "Confidence Cloak",
    description: "Remember that everyone makes mistakes",
    icon: "⭐",
    worryTypes: ["embarrass", "mistake", "fail"]
  }
];

const WorryWarriors = () => {
  const [worries, setWorries] = useState<Worry[]>(initialWorries);
  const [selectedWorry, setSelectedWorry] = useState<Worry | null>(null);
  const [selectedPower, setSelectedPower] = useState<SuperPower | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isPowerEffective = (worry: Worry, power: SuperPower) => {
    return power.worryTypes.some(type => 
      worry.text.toLowerCase().includes(type.toLowerCase())
    );
  };

  const defeatWorry = () => {
    if (!selectedWorry || !selectedPower) return;

    const isEffective = isPowerEffective(selectedWorry, selectedPower);
    const points = isEffective ? 10 : 5;

    setWorries(prev => prev.map(w => 
      w.id === selectedWorry.id ? { ...w, defeated: true } : w
    ));
    
    setScore(prev => prev + points);
    setSelectedWorry(null);
    setSelectedPower(null);

    // Check if all worries are defeated
    const updatedWorries = worries.map(w => 
      w.id === selectedWorry.id ? { ...w, defeated: true } : w
    );
    
    if (updatedWorries.every(w => w.defeated)) {
      setTimeout(() => setGameComplete(true), 500);
    }
  };

  const resetGame = () => {
    setWorries(initialWorries.map(w => ({ ...w, defeated: false })));
    setSelectedWorry(null);
    setSelectedPower(null);
    setGameComplete(false);
    setScore(0);
  };

  if (gameComplete) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gradient-to-br from-purple-50 to-yellow-50 border-2 border-purple-200 rounded-3xl">
          <CardContent className="p-8 text-center space-y-6">
            <div className="text-6xl">🦸‍♀️</div>
            <h2 className="text-2xl font-bold text-purple-700">All Worries Defeated!</h2>
            <p className="text-lg text-purple-600">
              Final Score: {score} Warrior Points!
            </p>
            <div className="space-y-2">
              <p className="text-green-600 font-semibold">
                You're now a certified Worry Warrior! 🏆
              </p>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Remember: Every worry can be transformed into a positive action. 
                You have the power to turn anxiety into strength!
              </p>
            </div>
            <Button
              onClick={resetGame}
              className="bg-gradient-to-r from-purple-500 to-yellow-500 hover:from-purple-600 hover:to-yellow-600 text-white rounded-xl"
              size="lg"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              New Mission
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-purple-50 to-yellow-50 border-2 border-purple-200 rounded-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-purple-700 flex items-center justify-center gap-2">
            <Gamepad2 className="w-8 h-8 text-yellow-500" />
            Worry Warriors
          </CardTitle>
          <p className="text-purple-600">Transform your worries into positive thoughts with superhero powers!</p>
          <div className="flex justify-center items-center gap-4 mt-2">
            <Badge variant="outline" className="text-purple-600">
              <Shield className="w-4 h-4 mr-1" />
              Score: {score}
            </Badge>
            <Badge variant="outline" className="text-purple-600">
              Worries Defeated: {worries.filter(w => w.defeated).length}/{worries.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Worries Section */}
            <Card className="bg-white/70 border border-red-200 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-red-700 flex items-center gap-2">
                  🌩️ Active Worries
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {worries.filter(w => !w.defeated).map((worry) => (
                  <div
                    key={worry.id}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedWorry?.id === worry.id 
                        ? 'border-purple-400 bg-purple-50 transform scale-105' 
                        : 'border-gray-200 hover:border-purple-200 hover:bg-purple-25'
                    }`}
                    onClick={() => setSelectedWorry(worry)}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-700 flex-1">{worry.text}</p>
                      <Badge className={`ml-2 ${getIntensityColor(worry.intensity)}`}>
                        {worry.intensity}
                      </Badge>
                    </div>
                  </div>
                ))}
                {worries.every(w => w.defeated) && (
                  <p className="text-center text-green-600 font-semibold py-4">
                    All worries defeated! 🎉
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Super Powers Section */}
            <Card className="bg-white/70 border border-blue-200 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-blue-700 flex items-center gap-2">
                  ⚡ Super Powers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {superPowers.map((power) => (
                  <div
                    key={power.id}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPower?.id === power.id 
                        ? 'border-blue-400 bg-blue-50 transform scale-105' 
                        : 'border-gray-200 hover:border-blue-200 hover:bg-blue-25'
                    }`}
                    onClick={() => setSelectedPower(power)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{power.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{power.name}</h4>
                        <p className="text-xs text-gray-600">{power.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Battle Section */}
          {selectedWorry && selectedPower && (
            <Card className="bg-gradient-to-r from-yellow-50 to-purple-50 border-2 border-yellow-300 rounded-2xl">
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="text-lg font-bold text-purple-700 flex items-center justify-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  Ready for Battle!
                </h3>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="bg-red-100 px-3 py-2 rounded-lg border border-red-200">
                    <strong>Worry:</strong> {selectedWorry.text}
                  </div>
                  <span className="text-2xl">⚔️</span>
                  <div className="bg-blue-100 px-3 py-2 rounded-lg border border-blue-200">
                    <strong>Power:</strong> {selectedPower.name}
                  </div>
                </div>
                <Button
                  onClick={defeatWorry}
                  className="bg-gradient-to-r from-yellow-500 to-purple-500 hover:from-yellow-600 hover:to-purple-600 text-white rounded-xl"
                  size="lg"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Use Super Power!
                </Button>
                <p className="text-xs text-gray-600">
                  {isPowerEffective(selectedWorry, selectedPower) 
                    ? "Perfect match! +10 points" 
                    : "Good effort! +5 points"
                  }
                </p>
              </CardContent>
            </Card>
          )}

          {/* Instructions */}
          <Card className="bg-white/50 border border-purple-200 rounded-2xl">
            <CardContent className="p-4">
              <h4 className="font-semibold text-purple-700 mb-2">How to play:</h4>
              <ul className="text-sm text-purple-600 space-y-1">
                <li>1️⃣ Select a worry from the left panel</li>
                <li>2️⃣ Choose a super power from the right panel</li>
                <li>3️⃣ Use your power to transform the worry!</li>
                <li>4️⃣ Match powers wisely for bonus points</li>
                <li>🎯 Goal: Defeat all worries and become a Worry Warrior!</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorryWarriors;
