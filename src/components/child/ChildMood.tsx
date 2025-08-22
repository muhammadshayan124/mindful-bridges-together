import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Heart, Save } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { useChild } from "@/contexts/ChildContext";
import { useAuth } from "@/contexts/AuthContext";
import { submitMood } from "@/lib/api";
import { OkOut } from "@/types";
import { useToast } from "@/hooks/use-toast";

type MoodType = 'very_sad' | 'sad' | 'neutral' | 'happy' | 'very_happy';

const moods = [
  { emoji: "😢", label: "Very Sad", color: "from-red-200 to-red-300", value: "very_sad" as MoodType },
  { emoji: "😟", label: "Sad", color: "from-orange-200 to-orange-300", value: "sad" as MoodType },
  { emoji: "😐", label: "Okay", color: "from-yellow-200 to-yellow-300", value: "neutral" as MoodType },
  { emoji: "🙂", label: "Good", color: "from-green-200 to-green-300", value: "happy" as MoodType },
  { emoji: "🤩", label: "Amazing", color: "from-blue-200 to-blue-300", value: "very_happy" as MoodType }
];

const getMoodScore = (mood: MoodType): number => {
  const scores = { very_sad: 1, sad: 3, neutral: 5, happy: 7, very_happy: 9 };
  return scores[mood];
};

const ChildMood = () => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [moodNote, setMoodNote] = useState("");
  const [saving, setSaving] = useState(false);
  const { childId } = useChild();
  const { session } = useAuth();
  const { toast } = useToast();

  const today = new Date().toLocaleDateString();

  const saveMood = async () => {
    const token = session?.access_token;
    if (!childId || !selectedMood || !token) return;

    try {
      setSaving(true);
      
      await submitMood(
        childId,
        selectedMood,
        getMoodScore(selectedMood),
        moodNote.trim() || undefined,
        token
      );

      toast({
        title: "Mood saved! 🌟",
        description: "Your mood has been recorded",
      });

      // Reset form
      setSelectedMood(null);
      setMoodNote("");
    } catch (error) {
      console.error('Error saving mood:', error);
      toast({
        title: "Error",
        description: "Failed to save mood",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-child-primary via-child-secondary to-child-accent bg-clip-text text-transparent mb-3 animate-float font-quicksand">
              How are you feeling today? 💝
            </h1>
            <p className="text-lg text-child-secondary font-medium">
              📅 {today} • Pick the emoji that matches your mood
            </p>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Mood Card */}
          <Card className="lg:col-span-2 bg-white/90 dark:bg-child-surface/90 backdrop-blur-sm border-2 border-child-primary/20 rounded-3xl shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-child-primary to-child-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse-glow">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-quicksand text-child-primary mb-2">
                Today's Mood Check-in
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-8">
                <div className="grid grid-cols-5 gap-4">
                  {moods.map((mood) => (
                    <Button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`h-20 w-full rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                        selectedMood === mood.value
                          ? `bg-gradient-to-br ${mood.color} shadow-lg ring-4 ring-child-primary/30 scale-105`
                          : `bg-gradient-to-br ${mood.color} hover:shadow-md`
                      }`}
                      variant="ghost"
                    >
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-3xl">{mood.emoji}</span>
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-800">
                          {mood.label}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>

                {selectedMood && (
                  <Card className="bg-child-background/50 border-child-primary/20 rounded-2xl animate-in fade-in slide-in-from-bottom-4">
                    <CardContent className="p-4 space-y-4">
                      <label className="block text-sm font-medium text-child-primary mb-2">
                        Want to tell me more about your day? (optional)
                      </label>
                      <Textarea
                        value={moodNote}
                        onChange={(e) => setMoodNote(e.target.value)}
                        placeholder="What made you feel this way? Share anything you'd like..."
                        className="rounded-xl border-child-primary/20 bg-white dark:bg-child-surface focus:border-child-primary focus:ring-2 focus:ring-child-primary/20 resize-none"
                        rows={3}
                      />
                        <Button
                          onClick={saveMood}
                          disabled={saving}
                          className="w-full bg-gradient-to-r from-child-primary to-child-secondary text-white rounded-xl py-3 font-semibold hover:shadow-lg transition-all duration-300"
                        >
                          {saving ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Saving...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Save className="w-4 h-4" />
                              Save Mood
                            </div>
                          )}
                        </Button>
                    </CardContent>
                  </Card>
                )}
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="bg-white/90 dark:bg-child-surface/90 backdrop-blur-sm border-2 border-child-accent/20 rounded-3xl shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-child-accent font-quicksand flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Daily Check-in
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-4xl mb-3">💝</div>
                <p className="text-child-secondary">Share how you're feeling</p>
                <p className="text-sm text-child-secondary/70 mt-2">
                  Your feelings matter and help us understand how to support you better.
                </p>
                
                <div className="mt-6 p-4 bg-child-primary/5 rounded-xl">
                  <p className="text-xs text-child-secondary">
                    💭 <strong>Remember:</strong> There are no wrong feelings. Every emotion is valid and important.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
  );
};

export default ChildMood;