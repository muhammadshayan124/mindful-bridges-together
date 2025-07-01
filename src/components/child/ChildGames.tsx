
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Puzzle, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../ThemeToggle";

const games = [
  {
    id: 1,
    title: "Breathing Buddy",
    description: "Learn calming breathing exercises with your friendly guide",
    icon: Heart,
    color: "from-peach-400 via-peach-300 to-mint-400",
    borderColor: "border-peach-200 dark:border-peach-700",
    difficulty: "Easy",
    time: "5 min",
    route: "/child/games/breathing-buddy",
    emoji: "💨"
  },
  {
    id: 2,
    title: "Emotion Detective",
    description: "Help characters identify their feelings in different situations",
    icon: Puzzle,
    color: "from-calm-400 via-lavender-300 to-calm-500",
    borderColor: "border-calm-200 dark:border-calm-700",
    difficulty: "Medium",
    time: "10 min",
    route: "/child/games/emotion-detective",
    emoji: "🕵️"
  },
  {
    id: 3,
    title: "Mindful Maze",
    description: "Navigate through peaceful mazes while practicing mindfulness",
    icon: Star,
    color: "from-mint-400 via-calm-300 to-mint-500",
    borderColor: "border-mint-200 dark:border-mint-700",
    difficulty: "Easy",
    time: "8 min",
    route: "/child/games/mindful-maze",
    emoji: "🧘‍♀️"
  },
  {
    id: 4,
    title: "Worry Warriors",
    description: "Transform your worries into positive thoughts with superhero friends",
    icon: Gamepad2,
    color: "from-peach-400 via-peach-300 to-lavender-400",
    borderColor: "border-peach-200 dark:border-peach-700",
    difficulty: "Medium",
    time: "15 min",
    route: "/child/games/worry-warriors",
    emoji: "🦸‍♂️"
  },
  {
    id: 5,
    title: "Gratitude Garden",
    description: "Plant and grow beautiful flowers by sharing things you're grateful for",
    icon: Heart,
    color: "from-mint-400 via-mint-300 to-calm-400",
    borderColor: "border-mint-200 dark:border-mint-700",
    difficulty: "Easy",
    time: "7 min",
    route: "/child/games/gratitude-garden",
    emoji: "🌸"
  },
  {
    id: 6,
    title: "Coping Castle",
    description: "Build your fortress of coping strategies to handle tough situations",
    icon: Star,
    color: "from-lavender-400 via-lavender-300 to-peach-400",
    borderColor: "border-lavender-200 dark:border-lavender-700",
    difficulty: "Hard",
    time: "20 min",
    route: "/child/games/coping-castle",
    emoji: "🏰"
  }
];

const ChildGames = () => {
  const navigate = useNavigate();

  const handlePlayGame = (route: string) => {
    navigate(route);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="text-center flex-1">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-calm-600 via-lavender-600 to-mint-600 dark:from-calm-400 dark:via-lavender-400 dark:to-mint-400 bg-clip-text text-transparent mb-3 animate-float">
            Fun & Mindful Games 🎮
          </h1>
          <p className="text-lg text-serenity-600 dark:text-serenity-300 font-medium">
            Play games that help you learn about emotions and stay calm ✨
          </p>
        </div>
        <ThemeToggle />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, index) => {
          const Icon = game.icon;
          return (
            <Card
              key={game.id}
              className={`game-card relative bg-white/90 dark:bg-serenity-800/90 backdrop-blur-sm border-2 ${game.borderColor} rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-in fade-in slide-in-from-bottom-4`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="text-center pb-4 relative overflow-hidden">
                <div className={`w-20 h-20 bg-gradient-to-r ${game.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse-glow relative`}>
                  <Icon className="w-10 h-10 text-white drop-shadow-lg" />
                  <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
                    {game.emoji}
                  </div>
                </div>
                <CardTitle className="text-xl text-serenity-800 dark:text-serenity-100 mb-3 font-poppins">
                  {game.title}
                </CardTitle>
                <div className="flex justify-center gap-3 text-xs">
                  <span className="px-3 py-1 bg-calm-100 dark:bg-calm-800 text-calm-700 dark:text-calm-300 rounded-full font-semibold">
                    {game.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-mint-100 dark:bg-mint-800 text-mint-700 dark:text-mint-300 rounded-full font-semibold">
                    {game.time}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-sm text-serenity-600 dark:text-serenity-300 leading-relaxed font-medium">
                  {game.description}
                </p>
                <Button
                  onClick={() => handlePlayGame(game.route)}
                  className={`w-full interactive-button bg-gradient-to-r ${game.color} hover:shadow-lg text-white rounded-2xl font-bold py-3 text-base transition-all duration-300 transform hover:scale-105 active:scale-95`}
                >
                  Play Now! 🚀
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-calm-100/80 via-lavender-100/80 to-mint-100/80 dark:from-serenity-800/80 dark:via-serenity-700/80 dark:to-serenity-800/80 backdrop-blur-sm border-2 border-calm-200 dark:border-serenity-600 rounded-3xl animate-shimmer">
        <CardContent className="p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-shimmer opacity-20 animate-shimmer"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-calm-700 dark:text-calm-300 mb-3 flex items-center justify-center gap-2">
              Coming Soon! 
              <span className="sparkle-animation text-3xl">🌟</span>
            </h3>
            <p className="text-calm-600 dark:text-calm-400 mb-6 text-lg font-medium">
              More exciting games are on their way! Tell us what kind of games you'd like to play.
            </p>
            <Button 
              variant="outline" 
              className="interactive-button border-2 border-calm-400 dark:border-calm-500 text-calm-700 dark:text-calm-300 bg-white/50 dark:bg-serenity-800/50 backdrop-blur-sm rounded-2xl px-6 py-3 font-semibold hover:bg-calm-50 dark:hover:bg-serenity-700"
            >
              Suggest a Game 💡
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildGames;
