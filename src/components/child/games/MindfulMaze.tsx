
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, RotateCcw, Trophy } from "lucide-react";

interface Position {
  x: number;
  y: number;
}

const MindfulMaze = () => {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const [gameWon, setGameWon] = useState(false);
  const [moves, setMoves] = useState(0);
  const [collectibles, setCollectibles] = useState<Position[]>([
    { x: 1, y: 2 }, { x: 3, y: 1 }, { x: 2, y: 3 }, { x: 4, y: 2 }
  ]);
  const [collected, setCollected] = useState<Position[]>([]);

  // 5x5 maze: 0 = path, 1 = wall
  const maze = [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 1, 2] // 2 = goal
  ];

  const resetGame = () => {
    setPlayerPos({ x: 0, y: 0 });
    setGameWon(false);
    setMoves(0);
    setCollected([]);
    setCollectibles([
      { x: 1, y: 2 }, { x: 3, y: 1 }, { x: 2, y: 3 }, { x: 4, y: 2 }
    ]);
  };

  const movePlayer = (direction: 'up' | 'down' | 'left' | 'right') => {
    const newPos = { ...playerPos };
    
    switch (direction) {
      case 'up':
        if (newPos.y > 0) newPos.y--;
        break;
      case 'down':
        if (newPos.y < 4) newPos.y++;
        break;
      case 'left':
        if (newPos.x > 0) newPos.x--;
        break;
      case 'right':
        if (newPos.x < 4) newPos.x++;
        break;
    }

    // Check if new position is valid (not a wall)
    if (maze[newPos.y][newPos.x] !== 1) {
      setPlayerPos(newPos);
      setMoves(prev => prev + 1);

      // Check for collectibles
      const collectibleIndex = collectibles.findIndex(
        c => c.x === newPos.x && c.y === newPos.y
      );
      if (collectibleIndex !== -1) {
        const collectedItem = collectibles[collectibleIndex];
        setCollected(prev => [...prev, collectedItem]);
        setCollectibles(prev => prev.filter((_, i) => i !== collectibleIndex));
      }

      // Check for goal
      if (maze[newPos.y][newPos.x] === 2) {
        setGameWon(true);
      }
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameWon) return;
      
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          movePlayer('up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          movePlayer('down');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          movePlayer('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          movePlayer('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerPos, gameWon]);

  const getCellContent = (x: number, y: number) => {
    if (playerPos.x === x && playerPos.y === y) {
      return '🧘‍♀️'; // Player
    }
    if (collectibles.some(c => c.x === x && c.y === y)) {
      return '🌸'; // Collectible
    }
    if (maze[y][x] === 1) {
      return '🌲'; // Wall
    }
    if (maze[y][x] === 2) {
      return '🏆'; // Goal
    }
    return ''; // Empty path
  };

  const getCellStyle = (x: number, y: number) => {
    if (maze[y][x] === 1) {
      return 'bg-green-200'; // Wall
    }
    if (maze[y][x] === 2) {
      return 'bg-yellow-200'; // Goal
    }
    return 'bg-blue-50'; // Path
  };

  if (gameWon) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gradient-to-br from-yellow-50 to-green-50 border-2 border-yellow-200 rounded-3xl">
          <CardContent className="p-8 text-center space-y-6">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
            <h2 className="text-2xl font-bold text-green-700">Maze Completed!</h2>
            <div className="space-y-2">
              <p className="text-lg text-green-600">
                You finished in {moves} moves!
              </p>
              <p className="text-green-600">
                Mindful flowers collected: {collected.length}/4 🌸
              </p>
            </div>
            <div className="text-sm text-gray-600 max-w-md mx-auto">
              <p className="mb-2">🧘‍♀️ You stayed mindful and focused!</p>
              <p>Remember: Taking your time and being aware of your surroundings helps you navigate life's challenges.</p>
            </div>
            <Button
              onClick={resetGame}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-green-700 flex items-center justify-center gap-2">
            <Star className="w-8 h-8 text-yellow-500" />
            Mindful Maze
          </CardTitle>
          <p className="text-green-600">Navigate peacefully through the maze while collecting mindful flowers</p>
          <div className="flex justify-center items-center gap-4 mt-2">
            <span className="text-sm text-gray-600">Moves: {moves}</span>
            <span className="text-sm text-gray-600">Flowers: {collected.length}/4 🌸</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Maze Grid */}
          <div className="flex justify-center">
            <div className="grid grid-cols-5 gap-1 p-4 bg-white rounded-2xl border-2 border-green-200">
              {maze.map((row, y) =>
                row.map((cell, x) => (
                  <div
                    key={`${x}-${y}`}
                    className={`w-16 h-16 flex items-center justify-center text-2xl border border-gray-200 rounded-lg ${getCellStyle(x, y)}`}
                  >
                    {getCellContent(x, y)}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Movement Controls */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Move with arrow keys or buttons:</h3>
              <div className="flex flex-col items-center gap-2">
                <Button
                  onClick={() => movePlayer('up')}
                  className="w-16 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                >
                  ↑
                </Button>
                <div className="flex gap-2">
                  <Button
                    onClick={() => movePlayer('left')}
                    className="w-16 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  >
                    ←
                  </Button>
                  <Button
                    onClick={() => movePlayer('down')}
                    className="w-16 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  >
                    ↓
                  </Button>
                  <Button
                    onClick={() => movePlayer('right')}
                    className="w-16 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  >
                    →
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <Card className="bg-white/50 border border-green-200 rounded-2xl">
            <CardContent className="p-4">
              <h4 className="font-semibold text-green-700 mb-2">How to play:</h4>
              <ul className="text-sm text-green-600 space-y-1">
                <li>🧘‍♀️ You are the peaceful meditator</li>
                <li>🌸 Collect mindful flowers along the way</li>
                <li>🌲 Trees block your path - find another way</li>
                <li>🏆 Reach the trophy to complete the maze</li>
                <li>💡 Take your time and stay mindful!</li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={resetGame}
              variant="outline"
              className="border-2 border-green-300 text-green-600 rounded-xl"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Restart Maze
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MindfulMaze;
