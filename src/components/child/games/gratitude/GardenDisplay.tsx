
import { Card, CardContent } from "@/components/ui/card";
import { Flower } from "./types";
import FlowerDisplay from "./FlowerDisplay";

interface GardenDisplayProps {
  flowers: Flower[];
}

const GardenDisplay = ({ flowers }: GardenDisplayProps) => {
  return (
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
              <FlowerDisplay key={flower.id} flower={flower} index={index} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GardenDisplay;
