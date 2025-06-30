
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Puzzle, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const games = [
  {
    id: 1,
    title: "Breathing Buddy",
    description: "Learn calming breathing exercises with your friendly guide",
    icon: Heart,
    color: "from-pink-400 to-red-400",
    difficulty: "Easy",
    time: "5 min",
    route: "/child/games/breathing-buddy"
  },
  {
    id: 2,
    title: "Emotion Detective",
    description: "Help characters identify their feelings in different situations",
    icon: Puzzle,
    color: "from-blue-400 to-purple-400",
    difficulty: "Medium",
    time: "10 min",
    route: "/child/games/emotion-detective"
  },
  {
    id: 3,
    title: "Mindful Maze",
    description: "Navigate through peaceful mazes while practicing mindfulness",
    icon: Star,
    color: "from-green-400 to-blue-400",
    difficulty: "Easy",
    time: "8 min",
    route: "/child/games/mindful-maze"
  },
  {
    id: 4,
    title: "Worry Warriors",
    description: "Transform your worries into positive thoughts with superhero friends",
    icon: Gamepad2,
    color: "from-yellow-400 to-orange-400",
    difficulty: "Medium",
    time: "15 min",
    route: "/child/games/worry-warriors"
  },
  {
    id: 5,
    title: "Gratitude Garden",
    description: "Plant and grow beautiful flowers by sharing things you're grateful for",
    icon: Heart,
    color: "from-green-400 to-emerald-400",
    difficulty: "Easy",
    time: "7 min",
    route: "/child/games/gratitude-garden"
  },
  {
    id: 6,
    title: "Coping Castle",
    description: "Build your fortress of coping strategies to handle tough situations",
    icon: Star,
    color: "from-purple-400 to-pink-400",
    difficulty: "Hard",
    time: "20 min",
    route: "/child/games/coping-castle"
  }
];

const ChildGames = () => {
  const navigate = useNavigate();

  const handlePlayGame = (route: string) => {
    navigate(route);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Fun & Mindful Games 🎮</h1>
        <p className="text-blue-600">Play games that help you learn about emotions and stay calm</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <Card
              key={game.id}
              className="bg-white/70 backdrop-blur-sm border-2 border-blue-200 rounded-3xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${game.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg text-gray-800 mb-2">{game.title}</CardTitle>
                <div className="flex justify-center gap-4 text-xs">
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                    {game.difficulty}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full">
                    {game.time}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {game.description}
                </p>
                <Button
                  onClick={() => handlePlayGame(game.route)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-semibold"
                >
                  Play Now! 🚀
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-3xl">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold text-blue-700 mb-2">Coming Soon! 🌟</h3>
          <p className="text-blue-600 mb-4">
            More exciting games are on their way! Tell us what kind of games you'd like to play.
          </p>
          <Button variant="outline" className="rounded-xl border-2 border-blue-300 text-blue-600">
            Suggest a Game 💡
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildGames;
