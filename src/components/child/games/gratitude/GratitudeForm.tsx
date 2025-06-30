
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { flowerTypes, Flower } from "./types";

interface GratitudeFormProps {
  onAddFlower: (flower: Flower) => void;
  onCancel: () => void;
}

const GratitudeForm = ({ onAddFlower, onCancel }: GratitudeFormProps) => {
  const [newGratitude, setNewGratitude] = useState('');

  const handleSubmit = () => {
    if (newGratitude.trim()) {
      const randomFlower = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
      const newFlower: Flower = {
        id: Date.now(),
        gratitude: newGratitude.trim(),
        type: randomFlower.type,
        color: randomFlower.color,
        planted: new Date()
      };
      
      onAddFlower(newFlower);
      setNewGratitude('');
    }
  };

  return (
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
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <div className="flex justify-center gap-3">
            <Button
              onClick={handleSubmit}
              disabled={!newGratitude.trim()}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl"
            >
              🌱 Plant Flower
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
              className="border-2 border-gray-300 text-gray-600 rounded-xl"
            >
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GratitudeForm;
