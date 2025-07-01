
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const GratitudeExamples = () => {
  const examples = [
    { text: "My family and friends", emoji: "👨‍👩‍👧‍👦" },
    { text: "A sunny day", emoji: "☀️" },
    { text: "My favorite food", emoji: "🍕" },
    { text: "A good book", emoji: "📚" },
    { text: "Playing games", emoji: "🎮" },
    { text: "Learning something new", emoji: "🧠" },
    { text: "My pet", emoji: "🐕" },
    { text: "A comfortable bed", emoji: "🛏️" },
    { text: "Music I love", emoji: "🎵" }
  ];

  return (
    <Card className="bg-gradient-to-br from-mint-50 via-calm-50 to-lavender-50 dark:from-mint-900/20 dark:via-calm-900/20 dark:to-lavender-900/20 backdrop-blur-sm border-2 border-mint-200 dark:border-mint-700 rounded-3xl shadow-lg">
      <CardContent className="p-6">
        <h4 className="font-bold text-xl text-mint-700 dark:text-mint-300 mb-4 flex items-center gap-2 font-poppins">
          <Sparkles className="w-6 h-6 text-mint-500 sparkle-animation" />
          Ideas for gratitude:
        </h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {examples.map((example, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-3 bg-white/70 dark:bg-serenity-800/70 backdrop-blur-sm rounded-xl border border-mint-200/50 dark:border-mint-700/50 hover:bg-white/90 dark:hover:bg-serenity-700/90 transition-all duration-300 transform hover:scale-105 cursor-pointer animate-in fade-in slide-in-from-bottom-2"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <span className="text-2xl animate-bounce" style={{animationDelay: `${index * 200}ms`}}>
                {example.emoji}
              </span>
              <span className="text-sm font-medium text-serenity-700 dark:text-serenity-300">
                {example.text}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-mint-600 dark:text-mint-400 font-medium italic">
            💝 What makes your heart happy today?
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GratitudeExamples;
