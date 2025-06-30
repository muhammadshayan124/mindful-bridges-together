
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Plus, RotateCcw, Sparkles } from "lucide-react";

interface Flower {
  id: number;
  gratitude: string;
  type: string;
  color: string;
  planted: Date;
}

const flowerTypes = [
  { type: '🌸', name: 'Cherry Blossom', color: 'from-pink-200 to-pink-400' },
  { type: '🌺', name: 'Hibiscus', color: 'from-red-200 to-red-400' },
  { type: '🌻', name: 'Sunflower', color: 'from-yellow-200 to-yellow-400' },
  { type: '🌷', name: 'Tulip', color: 'from-purple-200 to-purple-400' },
  { type: '🌹', name: 'Rose', color: 'from-red-200 to-rose-400' },
  { type: '🌼', name: 'Daisy', color: 'from-white to-yellow-200' },
];

const GratitudeGarden = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [newGratitude, setNewGratitude] = useState('');
  const [showForm, setShowForm] = useState(false);

  const addFlower = () => {
    if (newGratitude.trim()) {
      const randomFlower = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
      const newFlower: Flower = {
        id: Date.now(),
        gratitude: newGratitude.trim(),
        type: randomFlower.type,
        color: randomFlower.color,
        planted: new Date()
      };
      
      setFlowers(prev => [...prev, newFlower]);
      setNewGratitude('');
      setShowForm(false);
    }
  };

  const resetGarden = () => {
    setFlowers([]);
    setNewGratitude('');
    setShowForm(false);
  };

  const getGardenMessage = () => {
    const count = flowers.length;
    if (count === 0) return "Your garden is ready for planting! 🌱";
    if (count < 3) return "Your garden is starting to bloom! 🌿";
    if (count < 6) return "What a beautiful garden you're growing! 🌺";
    if (count < 10) return "Your gratitude garden is flourishing! 🌻";
    return "You have a magnificent garden full of gratitude! 🌈";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-green-700 flex items-center justify-center gap-2">
            <Heart className="w-8 h-8 text-pink-500" />
            Gratitude Garden
          </CardTitle>
          <p className="text-green-600">Plant beautiful flowers by sharing things you're grateful for</p>
          <div className="flex justify-center items-center gap-4 mt-2">
            <span className="text-sm text-gray-600">Flowers Planted: {flowers.length}</span>
            <span className="text-sm text-gray-600 flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              {getGardenMessage()}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Garden Display */}
          <Card className="bg-gradient-to-b from-sky-100 to-green-100 border-2 border-green-200 rounded-2xl min-h-80">
            <CardContent className="p-6">
              {flowers.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="text-6xl mb-4">🌱</div>
                  <p className="text-gray-600 text-lg">Your garden is waiting for the first flower!</p>
                  <p className="text-gray-500 text-sm mt-2">Share something you're grateful for to plant a flower</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {flowers.map((flower, index) => (
                    <div
                      key={flower.id}
                      className="group relative"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animation: 'fadeIn 0.5s ease-out forwards'
                      }}
                    >
                      <div
                        className={`w-20 h-24 bg-gradient-to-t ${flower.color} rounded-full flex items-end justify-center p-2 shadow-lg hover:scale-110 transition-transform cursor-pointer`}
                        title={flower.gratitude}
                      >
                        <span className="text-3xl">{flower.type}</span>
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white p-2 rounded-lg shadow-lg text-xs max-w-32 text-center border">
                        {flower.gratitude}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Add Gratitude Section */}
          {!showForm ? (
            <div className="text-center">
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Plant a New Flower
              </Button>
            </div>
          ) : (
            <Card className="bg-white/70 border-2 border-green-200 rounded-2xl">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-green-700 text-center">
                  What are you grateful for today? 🌟
                </h3>
                <div className="space-y-4">
                  <Input
                    placeholder="I'm grateful for..."
                    value={newGratitude}
                    onChange={(e) => setNewGratitude(e.target.value)}
                    className="text-center text-lg border-2 border-green-200 rounded-xl"
                    maxLength={50}
                    onKeyPress={(e) => e.key === 'Enter' && addFlower()}
                  />
                  <div className="flex justify-center gap-3">
                    <Button
                      onClick={addFlower}
                      disabled={!newGratitude.trim()}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl"
                    >
                      🌱 Plant Flower
                    </Button>
                    <Button
                      onClick={() => {
                        setShowForm(false);
                        setNewGratitude('');
                      }}
                      variant="outline"
                      className="border-2 border-gray-300 text-gray-600 rounded-xl"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Gratitude Examples */}
          <Card className="bg-white/50 border border-green-200 rounded-2xl">
            <CardContent className="p-4">
              <h4 className="font-semibold text-green-700 mb-2">Ideas for gratitude:</h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-green-600">
                <div>• My family and friends</div>
                <div>• A sunny day</div>
                <div>• My favorite food</div>
                <div>• A good book</div>
                <div>• Playing games</div>
                <div>• Learning something new</div>
                <div>• My pet</div>
                <div>• A comfortable bed</div>
                <div>• Music I love</div>
              </div>
            </CardContent>
          </Card>

          {flowers.length > 0 && (
            <div className="text-center">
              <Button
                onClick={resetGarden}
                variant="outline"
                className="border-2 border-green-300 text-green-600 rounded-xl"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Start New Garden
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default GratitudeGarden;
