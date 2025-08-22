import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGameTelemetry } from "@/hooks/useGameTelemetry";
import { useChild } from "@/contexts/ChildContext";
import { useAuthToken } from "@/hooks/useAuthToken";
import { getGames } from "@/lib/api";
import { Heart, Star, Play, CheckCircle, Trophy, Gamepad2, Loader2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";

// Import game components
import BreathingBuddy from "./games/BreathingBuddy";
import CopingCastle from "./games/CopingCastle";
import EmotionDetective from "./games/EmotionDetective";
import GratitudeGarden from "./games/GratitudeGarden";
import MindfulMaze from "./games/MindfulMaze";
import WorryWarriors from "./games/WorryWarriors";

type Game = {
  id: string;
  title: string;
  description: string;
  category: 'mindfulness' | 'coping' | 'emotions' | 'creativity';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  skills: string[];
  component?: React.ComponentType<{ onComplete: () => void }>;
};

const localGames: Game[] = [
  {
    id: 'breathing-buddy',
    title: 'Breathing Buddy',
    description: 'Learn calming breathing techniques with your animated friend',
    category: 'mindfulness',
    difficulty: 'easy',
    estimatedTime: '5 minutes',
    skills: ['Deep Breathing', 'Relaxation', 'Focus'],
    component: BreathingBuddy
  },
  {
    id: 'emotion-detective',
    title: 'Emotion Detective',
    description: 'Discover and identify different emotions through fun scenarios',
    category: 'emotions',
    difficulty: 'medium',
    estimatedTime: '10 minutes',
    skills: ['Emotion Recognition', 'Empathy', 'Self-Awareness'],
    component: EmotionDetective
  },
  {
    id: 'gratitude-garden',
    title: 'Gratitude Garden',
    description: 'Plant seeds of gratitude and watch your garden grow',
    category: 'mindfulness',
    difficulty: 'easy',
    estimatedTime: '8 minutes',
    skills: ['Gratitude', 'Positivity', 'Reflection'],
    component: GratitudeGarden
  },
  {
    id: 'coping-castle',
    title: 'Coping Castle',
    description: 'Build your fortress of coping strategies and emotional strength',
    category: 'coping',
    difficulty: 'medium',
    estimatedTime: '15 minutes',
    skills: ['Coping Strategies', 'Problem Solving', 'Resilience'],
    component: CopingCastle
  },
  {
    id: 'mindful-maze',
    title: 'Mindful Maze',
    description: 'Navigate through challenges using mindfulness techniques',
    category: 'mindfulness',
    difficulty: 'hard',
    estimatedTime: '12 minutes',
    skills: ['Mindfulness', 'Focus', 'Decision Making'],
    component: MindfulMaze
  },
  {
    id: 'worry-warriors',
    title: 'Worry Warriors',
    description: 'Transform worries into strength with superhero strategies',
    category: 'coping',
    difficulty: 'medium',
    estimatedTime: '10 minutes',
    skills: ['Anxiety Management', 'Confidence', 'Problem Solving'],
    component: WorryWarriors
  }
];

export default function ChildGames() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [completedGames, setCompletedGames] = useState<string[]>([]);
  const [games, setGames] = useState<Game[]>(localGames);
  const [loading, setLoading] = useState(true);
  const { startSession, endSession } = useGameTelemetry();
  const { childId } = useChild();
  const { token } = useAuthToken();
  const { toast } = useToast();

  useEffect(() => {
    const loadGames = async () => {
      try {
        // Load favorites and completed games from localStorage
        const savedFavorites = localStorage.getItem('childGameFavorites');
        const savedCompleted = localStorage.getItem('childCompletedGames');
        
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
        if (savedCompleted) setCompletedGames(JSON.parse(savedCompleted));

        // Try to load games from backend
        if (token) {
          const backendGames = await getGames(token);
          // Merge backend games with local games, prioritizing backend
          const mergedGames = [...localGames];
          backendGames.forEach((bgame: any) => {
            const existingIndex = mergedGames.findIndex(g => g.id === bgame.id);
            if (existingIndex >= 0) {
              mergedGames[existingIndex] = { ...mergedGames[existingIndex], ...bgame };
            } else {
              mergedGames.push({
                id: bgame.id,
                title: bgame.title || bgame.name,
                description: bgame.description,
                category: bgame.category || 'creativity',
                difficulty: bgame.difficulty || 'medium',
                estimatedTime: bgame.estimatedTime || '10 minutes',
                skills: bgame.skills || []
              });
            }
          });
          setGames(mergedGames);
        }
      } catch (error) {
        console.warn('Could not load games from backend, using local games:', error);
        setGames(localGames);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, [token]);

  const toggleFavorite = (gameId: string) => {
    const newFavorites = favorites.includes(gameId) 
      ? favorites.filter(id => id !== gameId)
      : [...favorites, gameId];
    
    setFavorites(newFavorites);
    localStorage.setItem('childGameFavorites', JSON.stringify(newFavorites));
    
    // Track game interaction
  };

  const startGame = (game: Game) => {
    setSelectedGame(game);
    if (childId) {
      startSession();
    }
  };

  const completeGame = (gameId: string) => {
    const newCompleted = [...completedGames, gameId];
    setCompletedGames(newCompleted);
    localStorage.setItem('childCompletedGames', JSON.stringify(newCompleted));
    
    if (childId) {
      endSession(gameId, 100);
    }

    toast({
      title: "🎉 Game Complete!",
      description: "Great job! You're building amazing skills.",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mindfulness': return 'bg-accent/20 text-accent-foreground border-accent';
      case 'coping': return 'bg-primary/20 text-primary-foreground border-primary';
      case 'emotions': return 'bg-secondary/20 text-secondary-foreground border-secondary';
      case 'creativity': return 'bg-muted text-muted-foreground border-muted';
      default: return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8">
          <CardContent className="flex items-center gap-4">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading your games...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedGame) {
    const GameComponent = selectedGame.component;
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-6">
            <Button
              onClick={() => setSelectedGame(null)}
              variant="outline"
              className="mb-4 rounded-2xl"
            >
              ← Back to Games
            </Button>
            <ThemeToggle />
          </div>
          
          {GameComponent && (
            <GameComponent onComplete={() => completeGame(selectedGame.id)} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Fun Learning Games 🎮</h1>
            <p className="text-muted-foreground text-lg">
              Explore games that help you learn about emotions, mindfulness, and coping skills
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card shadow-md rounded-2xl">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{completedGames.length}</div>
              <div className="text-sm text-muted-foreground">Games Completed</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-md rounded-2xl">
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{favorites.length}</div>
              <div className="text-sm text-muted-foreground">Favorite Games</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-md rounded-2xl">
            <CardContent className="p-6 text-center">
              <Gamepad2 className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{games.length}</div>
              <div className="text-sm text-muted-foreground">Available Games</div>
            </CardContent>
          </Card>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card key={game.id} className="relative overflow-hidden hover:shadow-lg transition-all duration-200 bg-card rounded-2xl">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge className={getCategoryColor(game.category)}>
                    {game.category}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleFavorite(game.id)}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        favorites.includes(game.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-muted-foreground hover:text-red-400'
                      }`}
                    />
                  </Button>
                </div>
                
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  {game.title}
                  {completedGames.includes(game.id) && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </CardTitle>
                
                <CardDescription className="text-muted-foreground">
                  {game.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-4">
                <div className="flex items-center gap-2">
                  <div 
                    className={`w-3 h-3 rounded-full ${getDifficultyColor(game.difficulty)}`}
                  />
                  <span className="text-sm text-muted-foreground capitalize">
                    {game.difficulty} • {game.estimatedTime}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {game.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="outline" 
                      className="text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <Button
                  onClick={() => startGame(game)}
                  className="w-full rounded-xl"
                  size="lg"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {completedGames.includes(game.id) ? 'Play Again' : 'Start Game'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}