
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Puzzle, CheckCircle, XCircle, RefreshCw } from "lucide-react";

interface Scenario {
  id: number;
  situation: string;
  image: string;
  emotion: string;
  options: string[];
  explanation: string;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    situation: "Alex's best friend moved to a different city and they won't see each other every day anymore.",
    image: "😢",
    emotion: "sad",
    options: ["Happy", "Angry", "Sad", "Excited"],
    explanation: "Alex feels sad because they will miss their best friend. It's normal to feel sad when we lose someone important to us."
  },
  {
    id: 2,
    situation: "Maya got a perfect score on her math test that she studied really hard for.",
    image: "😊",
    emotion: "proud",
    options: ["Proud", "Worried", "Angry", "Scared"],
    explanation: "Maya feels proud because her hard work paid off. Pride is what we feel when we accomplish something difficult."
  },
  {
    id: 3,
    situation: "Sam heard a loud thunder during a storm and hid under the blanket.",
    image: "😰",
    emotion: "scared",
    options: ["Happy", "Scared", "Bored", "Silly"],
    explanation: "Sam feels scared because loud noises can be frightening. It's okay to feel scared sometimes - it keeps us safe."
  },
  {
    id: 4,
    situation: "Riley's little brother broke their favorite toy without asking to borrow it.",
    image: "😡",
    emotion: "angry",
    options: ["Grateful", "Angry", "Sleepy", "Confused"],
    explanation: "Riley feels angry because something important to them was broken. It's normal to feel angry, but we can learn to express it in healthy ways."
  },
  {
    id: 5,
    situation: "Jordan is starting at a new school tomorrow and doesn't know anyone there.",
    image: "😟",
    emotion: "nervous",
    options: ["Nervous", "Bored", "Angry", "Sleepy"],
    explanation: "Jordan feels nervous about the unknown. New situations can make us feel nervous, but they can also lead to exciting opportunities!"
  }
];

const EmotionDetective = () => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const scenario = scenarios[currentScenario];
  const isCorrect = selectedAnswer?.toLowerCase() === scenario.emotion;

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer.toLowerCase() === scenario.emotion) {
      setScore(prev => prev + 1);
    }
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setCurrentScenario(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setGameComplete(false);
  };

  if (gameComplete) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-3xl">
          <CardContent className="p-8 text-center space-y-6">
            <div className="text-6xl">🎉</div>
            <h2 className="text-2xl font-bold text-purple-700">Great Detective Work!</h2>
            <p className="text-lg text-purple-600">
              You scored {score} out of {scenarios.length}!
            </p>
            <div className="space-y-2">
              {score === scenarios.length && (
                <p className="text-green-600 font-semibold">Perfect score! You're an emotion expert! 🌟</p>
              )}
              {score >= scenarios.length * 0.7 && score < scenarios.length && (
                <p className="text-blue-600 font-semibold">Excellent work! You understand emotions really well! 👏</p>
              )}
              {score < scenarios.length * 0.7 && (
                <p className="text-orange-600 font-semibold">Good effort! Keep practicing to become an emotion detective! 💪</p>
              )}
            </div>
            <Button
              onClick={resetGame}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl"
              size="lg"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Play Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-purple-700 flex items-center justify-center gap-2">
            <Puzzle className="w-8 h-8 text-blue-500" />
            Emotion Detective
          </CardTitle>
          <p className="text-purple-600">Help characters identify their feelings in different situations</p>
          <div className="flex justify-center items-center gap-4 mt-2">
            <span className="text-sm text-gray-600">
              Question {currentScenario + 1} of {scenarios.length}
            </span>
            <span className="text-sm text-gray-600">Score: {score}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scenario */}
          <Card className="bg-white/70 border border-purple-200 rounded-2xl">
            <CardContent className="p-6 text-center space-y-4">
              <div className="text-8xl">{scenario.image}</div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {scenario.situation}
              </p>
              <h3 className="text-xl font-semibold text-purple-700">
                How do you think they feel?
              </h3>
            </CardContent>
          </Card>

          {/* Answer Options */}
          {!showResult ? (
            <div className="grid grid-cols-2 gap-4">
              {scenario.options.map((option) => (
                <Button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="h-16 text-lg bg-white hover:bg-purple-100 text-purple-700 border-2 border-purple-200 rounded-xl transition-all duration-200 hover:scale-105"
                  variant="outline"
                >
                  {option}
                </Button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Result */}
              <Card className={`border-2 rounded-2xl ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    {isCorrect ? (
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-500" />
                    )}
                    <h3 className={`text-xl font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {isCorrect ? 'Correct!' : 'Not quite right'}
                    </h3>
                  </div>
                  <p className="text-gray-700">{scenario.explanation}</p>
                  {!isCorrect && (
                    <p className="text-sm text-gray-600">
                      The correct answer was: <strong>{scenario.emotion.charAt(0).toUpperCase() + scenario.emotion.slice(1)}</strong>
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Next Button */}
              <div className="text-center">
                <Button
                  onClick={nextScenario}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl"
                  size="lg"
                >
                  {currentScenario < scenarios.length - 1 ? 'Next Scenario' : 'See Results'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionDetective;
