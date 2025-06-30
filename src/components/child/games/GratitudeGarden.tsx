
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Plus, RotateCcw, Sparkles } from "lucide-react";
import { Flower } from "./gratitude/types";
import GardenDisplay from "./gratitude/GardenDisplay";
import GratitudeForm from "./gratitude/GratitudeForm";
import GratitudeExamples from "./gratitude/GratitudeExamples";

const GratitudeGarden = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [showForm, setShowForm] = useState(false);

  const addFlower = (flower: Flower) => {
    setFlowers(prev => [...prev, flower]);
    setShowForm(false);
  };

  const resetGarden = () => {
    setFlowers([]);
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
          <GardenDisplay flowers={flowers} />

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
            <GratitudeForm 
              onAddFlower={addFlower}
              onCancel={() => setShowForm(false)}
            />
          )}

          <GratitudeExamples />

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
    </div>
  );
};

export default GratitudeGarden;
