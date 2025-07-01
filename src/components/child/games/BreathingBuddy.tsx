
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Play, Pause, RotateCcw, Sparkles } from "lucide-react";

const BreathingBuddy = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timer, setTimer] = useState(0);
  const [cycle, setCycle] = useState(0);

  const phases = {
    inhale: { 
      duration: 4, 
      instruction: "Breathe in slowly... 🌸", 
      color: "from-mint-400 via-calm-300 to-mint-500",
      bgColor: "from-mint-50 to-calm-50 dark:from-mint-900/20 dark:to-calm-900/20",
      particles: "💫"
    },
    hold: { 
      duration: 2, 
      instruction: "Hold your breath... ✨", 
      color: "from-lavender-400 via-peach-300 to-lavender-500",
      bgColor: "from-lavender-50 to-peach-50 dark:from-lavender-900/20 dark:to-peach-900/20",
      particles: "⭐"
    },
    exhale: { 
      duration: 6, 
      instruction: "Breathe out gently... 🍃", 
      color: "from-peach-400 via-mint-300 to-calm-400",
      bgColor: "from-peach-50 to-mint-50 dark:from-peach-900/20 dark:to-mint-900/20",
      particles: "🌙"
    }
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
  const scale = phase === 'inhale' ? 1 + (progress / 150) : phase === 'exhale' ? 1.7 - (progress / 150) : 1.7;

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <Card className={`bg-gradient-to-br ${currentPhase.bgColor} backdrop-blur-sm border-2 border-calm-200 dark:border-serenity-600 rounded-3xl shadow-2xl transition-all duration-1000`}>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-calm-600 via-lavender-600 to-mint-600 dark:from-calm-400 dark:via-lavender-400 dark:to-mint-400 bg-clip-text text-transparent flex items-center justify-center gap-3">
            <Heart className="w-8 h-8 text-peach-500 animate-pulse" />
            Breathing Buddy
            <Sparkles className="w-8 h-8 text-mint-500 sparkle-animation" />
          </CardTitle>
          <p className="text-lg text-serenity-600 dark:text-serenity-300 font-medium">
            Follow your breathing buddy to feel calm and relaxed 🧘‍♀️
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Breathing Circle */}
          <div className="flex flex-col items-center space-y-8">
            <div className="relative">
              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-2xl animate-float"
                    style={{
                      left: `${20 + i * 60}%`,
                      top: `${20 + (i % 2) * 60}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${3 + i * 0.5}s`
                    }}
                  >
                    {currentPhase.particles}
                  </div>
                ))}
              </div>
              
              <div 
                className={`w-60 h-60 rounded-full bg-gradient-to-r ${currentPhase.color} flex items-center justify-center transition-all duration-300 shadow-2xl relative overflow-hidden`}
                style={{ 
                  transform: `scale(${scale})`,
                  boxShadow: isActive ? '0 0 60px rgba(56, 189, 248, 0.4)' : '0 0 30px rgba(56, 189, 248, 0.2)'
                }}
              >
                {/* Inner glow effect */}
                <div className="absolute inset-4 rounded-full bg-white/20 blur-xl"></div>
                <Heart className="w-20 h-20 text-white drop-shadow-2xl animate-pulse z-10" />
                
                {/* Ripple effect */}
                {isActive && (
                  <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping"></div>
                )}
              </div>
            </div>
            
            <div className="text-center space-y-4 bg-white/50 dark:bg-serenity-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-serenity-800 dark:text-serenity-100 font-poppins">
                {currentPhase.instruction}
              </h3>
              <div className="w-80 h-4 bg-serenity-200 dark:bg-serenity-700 rounded-full overflow-hidden shadow-inner">
                <div 
                  className={`h-full bg-gradient-to-r ${currentPhase.color} transition-all duration-100 rounded-full shadow-lg`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-center gap-8 text-sm font-semibold">
                <div className="text-center">
                  <p className="text-serenity-600 dark:text-serenity-300">Breathing Cycles</p>
                  <p className="text-2xl font-bold text-calm-600 dark:text-calm-400">{cycle}</p>
                </div>
                <div className="text-center">
                  <p className="text-serenity-600 dark:text-serenity-300">Current Phase</p>
                  <p className="text-2xl font-bold text-lavender-600 dark:text-lavender-400 capitalize">
                    {phase}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setIsActive(!isActive)}
              className={`interactive-button bg-gradient-to-r ${currentPhase.color} hover:shadow-xl text-white rounded-2xl px-8 py-4 text-lg font-bold transition-all duration-300`}
              size="lg"
            >
              {isActive ? <Pause className="w-6 h-6 mr-3" /> : <Play className="w-6 h-6 mr-3" />}
              {isActive ? 'Pause' : 'Start Breathing'}
            </Button>
            <Button
              onClick={resetGame}
              variant="outline"
              className="interactive-button border-2 border-calm-400 dark:border-calm-500 text-calm-700 dark:text-calm-300 bg-white/80 dark:bg-serenity-800/80 backdrop-blur-sm rounded-2xl px-6 py-4 font-semibold hover:bg-calm-50 dark:hover:bg-serenity-700"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>

          {/* Enhanced Instructions */}
          <Card className="bg-white/70 dark:bg-serenity-800/70 backdrop-blur-sm border-2 border-calm-200 dark:border-serenity-600 rounded-2xl">
            <CardContent className="p-6">
              <h4 className="font-bold text-lg text-calm-700 dark:text-calm-300 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                How to play:
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3 text-sm text-serenity-600 dark:text-serenity-300 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-mint-500">🌸</span>
                    <span>Watch the breathing buddy circle grow and shrink</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-calm-500">💨</span>
                    <span>Breathe in when it grows (4 seconds)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lavender-500">✨</span>
                    <span>Hold your breath when it pauses (2 seconds)</span>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-serenity-600 dark:text-serenity-300 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-peach-500">🍃</span>
                    <span>Breathe out when it shrinks (6 seconds)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-mint-500">🎯</span>
                    <span>Try to complete 5 breathing cycles!</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-calm-500">🧘‍♀️</span>
                    <span>Focus on the peaceful floating elements</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default BreathingBuddy;
