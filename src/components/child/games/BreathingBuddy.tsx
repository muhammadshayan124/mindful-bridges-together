
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Play, Pause, RotateCcw } from "lucide-react";

const BreathingBuddy = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timer, setTimer] = useState(0);
  const [cycle, setCycle] = useState(0);

  const phases = {
    inhale: { duration: 4, instruction: "Breathe in slowly...", color: "from-blue-400 to-cyan-400" },
    hold: { duration: 2, instruction: "Hold your breath...", color: "from-purple-400 to-blue-400" },
    exhale: { duration: 6, instruction: "Breathe out gently...", color: "from-green-400 to-blue-400" }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => {
          const currentPhase = phases[phase];
          if (prev >= currentPhase.duration) {
            // Move to next phase
            if (phase === 'inhale') {
              setPhase('hold');
            } else if (phase === 'hold') {
              setPhase('exhale');
            } else {
              setPhase('inhale');
              setCycle(c => c + 1);
            }
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isActive, phase]);

  const resetGame = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimer(0);
    setCycle(0);
  };

  const currentPhase = phases[phase];
  const progress = (timer / currentPhase.duration) * 100;
  const scale = phase === 'inhale' ? 1 + (progress / 200) : phase === 'exhale' ? 1.5 - (progress / 200) : 1.5;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-blue-700 flex items-center justify-center gap-2">
            <Heart className="w-8 h-8 text-pink-500" />
            Breathing Buddy
          </CardTitle>
          <p className="text-blue-600">Follow your breathing buddy to feel calm and relaxed</p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Breathing Circle */}
          <div className="flex flex-col items-center space-y-6">
            <div 
              className={`w-48 h-48 rounded-full bg-gradient-to-r ${currentPhase.color} flex items-center justify-center transition-transform duration-300 shadow-lg`}
              style={{ transform: `scale(${scale})` }}
            >
              <Heart className="w-16 h-16 text-white animate-pulse" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">{currentPhase.instruction}</h3>
              <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                Breathing cycle: {cycle} | Phase: {phase.charAt(0).toUpperCase() + phase.slice(1)}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setIsActive(!isActive)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl"
              size="lg"
            >
              {isActive ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
              {isActive ? 'Pause' : 'Start'}
            </Button>
            <Button
              onClick={resetGame}
              variant="outline"
              className="border-2 border-blue-300 text-blue-600 rounded-xl"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>

          {/* Instructions */}
          <Card className="bg-white/50 border border-blue-200 rounded-2xl">
            <CardContent className="p-4">
              <h4 className="font-semibold text-blue-700 mb-2">How to play:</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Watch the breathing buddy circle grow and shrink</li>
                <li>• Breathe in when it grows (4 seconds)</li>
                <li>• Hold your breath when it pauses (2 seconds)</li>
                <li>• Breathe out when it shrinks (6 seconds)</li>
                <li>• Try to complete 5 breathing cycles!</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreathingBuddy;
