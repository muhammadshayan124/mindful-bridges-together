
import { Flower } from "./types";

interface FlowerDisplayProps {
  flower: Flower;
  index: number;
}

const FlowerDisplay = ({ flower, index }: FlowerDisplayProps) => {
  return (
    <div
      className="group relative animate-in fade-in duration-700 hover:scale-110 transition-all cursor-pointer"
      style={{
        animationDelay: `${index * 150}ms`,
      }}
    >
      <div
        className={`w-24 h-28 bg-gradient-to-t ${flower.color} rounded-3xl flex items-end justify-center p-3 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden border-2 border-white/50 dark:border-serenity-700/50`}
        title={flower.gratitude}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        {/* Floating sparkles */}
        <div className="absolute top-1 right-1 text-xs animate-pulse opacity-70">✨</div>
        <div className="absolute top-2 left-1 text-xs animate-bounce opacity-60" style={{animationDelay: '0.5s'}}>💫</div>
        
        <span className="text-4xl drop-shadow-lg z-10 animate-float" style={{animationDuration: `${3 + index * 0.2}s`}}>
          {flower.type}
        </span>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 rounded-3xl"></div>
      </div>
      
      {/* Enhanced tooltip */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
        <div className="bg-white dark:bg-serenity-800 p-3 rounded-xl shadow-2xl text-xs max-w-40 text-center border-2 border-calm-200 dark:border-serenity-600 backdrop-blur-sm">
          <div className="font-semibold text-serenity-800 dark:text-serenity-100 mb-1">
            {flower.gratitude}
          </div>
          <div className="text-serenity-500 dark:text-serenity-400 text-xs">
            Planted {new Date(flower.planted).toLocaleDateString()}
          </div>
          
          {/* Tooltip arrow */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-serenity-800 border-l-2 border-t-2 border-calm-200 dark:border-serenity-600 rotate-45"></div>
        </div>
      </div>
      
      {/* Planted date indicator */}
      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-mint-400 to-calm-400 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg animate-pulse">
        {Math.floor((Date.now() - new Date(flower.planted).getTime()) / (1000 * 60 * 60 * 24)) + 1}d
      </div>
    </div>
  );
};

export default FlowerDisplay;
