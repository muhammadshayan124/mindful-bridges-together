
import { Flower } from "./types";

interface FlowerDisplayProps {
  flower: Flower;
  index: number;
}

const FlowerDisplay = ({ flower, index }: FlowerDisplayProps) => {
  return (
    <div
      className="group relative animate-in fade-in duration-500"
      style={{
        animationDelay: `${index * 100}ms`,
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
  );
};

export default FlowerDisplay;
