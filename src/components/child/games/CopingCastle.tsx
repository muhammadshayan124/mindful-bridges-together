
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Award, RotateCcw } from "lucide-react";

interface CopingStrategy {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: 'emotional' | 'physical' | 'mental' | 'social';
  unlocked: boolean;
}

interface Challenge {
  id: number;
  situation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  correctStrategies: number[];
  completed: boolean;
}

const copingStrategies: CopingStrategy[] = [
  { id: 1, name: "Deep Breathing", description: "Take slow, deep breaths", icon: "🫁", category: 'physical', unlocked: true },
  { id: 2, name: "Count to Ten", description: "Count slowly to calm down", icon: "🔢", category: 'mental', unlocked: true },
  { id: 3, name: "Talk to Someone", description: "Share your feelings with a trusted person", icon: "💬", category: 'social', unlocked: false },
  { id: 4, name: "Happy Thoughts", description: "Think of something that makes you smile", icon: "😊", category: 'mental', unlocked: false },
  { id: 5, name: "Exercise", description: "Move your body to release tension", icon: "🏃‍♀️", category: 'physical', unlocked: false },
  { id: 6, name: "Art & Creativity", description: "Draw, paint, or create something", icon: "🎨", category: 'emotional', unlocked: false },
  { id: 7, name: "Listen to Music", description: "Play calming or uplifting music", icon: "🎵", category: 'emotional', unlocked: false },
  { id: 8, name: "Take a Break", description: "Step away and give yourself space", icon: "⏸️", category: 'physical', unlocked: false },
];

const challenges: Challenge[] = [
  {
    id: 1,
    situation: "You're feeling nervous before a big test at school.",
    difficulty: 'easy',
    correctStrategies: [1, 2, 4],
    completed: false
  },
  {
    id: 2,
    situation: "Your friend said something that hurt your feelings.",
    difficulty: 'medium',
    correctStrategies: [3, 6, 4],
    completed: false
  },
  {
    id: 3,
    situation: "You feel overwhelmed with too much homework.",
    difficulty: 'medium',
    correctStrategies: [8, 1, 5],
    completed: false
  },
  {
    id: 4,
    situation: "You had a nightmare and can't fall back asleep.",
    difficulty: 'easy',
    correctStrategies: [1, 4, 7],
    completed: false
  },
  {
    id: 5,
    situation: "You're angry because your plans got cancelled.",
    difficulty: 'hard',
    correctStrategies: [1, 5, 8, 3],
    completed: false
  },
];

const CopingCastle = () => {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [selectedStrategies, setSelectedStrategies] = useState<number[]>([]);
  const [strategies, setStrategies] = useState<CopingStrategy[]>(copingStrategies);
  const [challengesList, setChallengesList] = useState<Challenge[]>(challenges);
  const [showResult, setShowResult] = useState(false);
  const [castleLevel, setCastleLevel] = useState(1);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'emotional': return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'physical': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'mental': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'social': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const selectChallenge = (challenge: Challenge) => {
    setCurrentChallenge(challenge);
    setSelectedStrategies([]);
    setShowResult(false);
  };

  const toggleStrategy = (strategyId: number) => {
    const strategy = strategies.find(s => s.id === strategyId);
    if (!strategy?.unlocked) return;

    setSelectedStrategies(prev => 
      prev.includes(strategyId)
        ? prev.filter(id => id !== strategyId)
        : [...prev, strategyId]
    );
  };

  const submitSolution = () => {
    if (!currentChallenge) return;

    const correctCount = selectedStrategies.filter(id => 
      currentChallenge.correctStrategies.includes(id)
    ).length;

    const isSuccessful = correctCount >= Math.ceil(currentChallenge.correctStrategies.length * 0.6);

    if (isSuccessful) {
      // Mark challenge as completed
      setChallengesList(prev => prev.map(c => 
        c.id === currentChallenge.id ? { ...c, completed: true } : c
      ));

      // Unlock new strategies
      const newUnlocks = currentChallenge.correctStrategies.filter(id => 
        !strategies.find(s => s.id === id)?.unlocked
      );

      if (newUnlocks.length > 0) {
        setStrategies(prev => prev.map(s => 
          newUnlocks.includes(s.id) ? { ...s, unlocked: true } : s
        ));
      }

      // Increase castle level
      const completedChallenges = challengesList.filter(c => c.completed).length + 1;
      setCastleLevel(Math.floor(completedChallenges / 2) + 1);
    }

    setShowResult(true);
  };

  const resetGame = () => {
    setCurrentChallenge(null);
    setSelectedStrategies([]);
    setStrategies(copingStrategies);
    setChallengesList(challenges.map(c => ({ ...c, completed: false })));
    setShowResult(false);
    setCastleLevel(1);
  };

  const completedChallenges = challengesList.filter(c => c.completed).length;
  const unlockedStrategies = strategies.filter(s => s.unlocked).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-purple-700 flex items-center justify-center gap-2">
            <Star className="w-8 h-8 text-yellow-500" />
            Coping Castle - Level {castleLevel}
          </CardTitle>
          <p className="text-purple-600">Build your fortress of coping strategies to handle tough situations</p>
          <div className="flex justify-center items-center gap-4 mt-2">
            <Badge variant="outline" className="text-purple-600">
              <Shield className="w-4 h-4 mr-1" />
              Strategies: {unlockedStrategies}/8
            </Badge>
            <Badge variant="outline" className="text-purple-600">
              <Award className="w-4 h-4 mr-1" />
              Challenges: {completedChallenges}/5
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!currentChallenge ? (
            <>
              {/* Castle Progress */}
              <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">🏰</div>
                  <h3 className="text-xl font-bold text-yellow-700 mb-2">
                    Castle Level {castleLevel}
                  </h3>
                  <p className="text-yellow-600">
                    {completedChallenges === 0 && "Welcome to your coping castle! Complete challenges to strengthen your fortress."}
                    {completedChallenges === 1 && "Your castle foundations are strong! Keep building!"}
                    {completedChallenges === 2 && "Your castle walls are rising! Great progress!"}
                    {completedChallenges === 3 && "Your castle is getting mighty! You're becoming stronger!"}
                    {completedChallenges === 4 && "Your castle is nearly complete! One more challenge to go!"}
                    {completedChallenges === 5 && "Your castle is magnificent! You're a coping champion! 👑"}
                  </p>
                </CardContent>
              </Card>

              {/* Challenges List */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="bg-white/70 border border-blue-200 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700">Available Challenges</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {challengesList.filter(c => !c.completed).map((challenge) => (
                      <div
                        key={challenge.id}
                        className="p-3 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all"
                        onClick={() => selectChallenge(challenge)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getDifficultyColor(challenge.difficulty)}>
                            {challenge.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700">{challenge.situation}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Unlocked Strategies */}
                <Card className="bg-white/70 border border-green-200 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-700">Your Coping Tools</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {strategies.map((strategy) => (
                      <div
                        key={strategy.id}
                        className={`p-2 rounded-lg border ${
                          strategy.unlocked 
                            ? 'border-green-200 bg-green-50' 
                            : 'border-gray-200 bg-gray-100 opacity-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{strategy.icon}</span>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-800">
                              {strategy.unlocked ? strategy.name : '???'}
                            </h4>
                            <Badge className={`text-xs ${getCategoryColor(strategy.category)}`}>
                              {strategy.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <>
              {/* Current Challenge */}
              <Card className="bg-white/70 border-2 border-blue-200 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-700 flex items-center justify-between">
                    Challenge Situation
                    <Badge className={getDifficultyColor(currentChallenge.difficulty)}>
                      {currentChallenge.difficulty}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-lg mb-4">{currentChallenge.situation}</p>
                  <p className="text-blue-600 font-semibold">
                    Select the coping strategies that would help in this situation:
                  </p>
                </CardContent>
              </Card>

              {/* Strategy Selection */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {strategies.filter(s => s.unlocked).map((strategy) => (
                  <div
                    key={strategy.id}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedStrategies.includes(strategy.id)
                        ? 'border-purple-400 bg-purple-50 transform scale-105'
                        : 'border-gray-200 hover:border-purple-200 hover:bg-purple-25'
                    }`}
                    onClick={() => toggleStrategy(strategy.id)}
                  >
                    <div className="text-center space-y-2">
                      <span className="text-3xl">{strategy.icon}</span>
                      <h4 className="font-semibold text-gray-800">{strategy.name}</h4>
                      <p className="text-xs text-gray-600">{strategy.description}</p>
                      <Badge className={`${getCategoryColor(strategy.category)}`}>
                        {strategy.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit/Result */}
              {!showResult ? (
                <div className="text-center space-y-4">
                  <Button
                    onClick={submitSolution}
                    disabled={selectedStrategies.length === 0}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl"
                    size="lg"
                  >
                    <Shield className="w-5 h-5 mr-2" />
                    Test Your Solution
                  </Button>
                </div>
              ) : (
                <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="text-4xl">
                      {selectedStrategies.filter(id => currentChallenge.correctStrategies.includes(id)).length >= Math.ceil(currentChallenge.correctStrategies.length * 0.6) ? '🎉' : '💪'}
                    </div>
                    <h3 className="text-xl font-bold text-green-700">
                      {selectedStrategies.filter(id => currentChallenge.correctStrategies.includes(id)).length >= Math.ceil(currentChallenge.correctStrategies.length * 0.6) 
                        ? 'Challenge Completed!' 
                        : 'Good Effort!'}
                    </h3>
                    <p className="text-green-600">
                      You selected {selectedStrategies.filter(id => currentChallenge.correctStrategies.includes(id)).length} effective strategies!
                    </p>
                    <Button
                      onClick={() => setCurrentChallenge(null)}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl"
                    >
                      Back to Castle
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          <div className="text-center">
            <Button
              onClick={resetGame}
              variant="outline"
              className="border-2 border-purple-300 text-purple-600 rounded-xl"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset Castle
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CopingCastle;
