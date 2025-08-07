import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Heart, Save } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

type MoodType = 'very_sad' | 'sad' | 'neutral' | 'happy' | 'very_happy';

const moods = [
  { emoji: "😢", label: "Very Sad", color: "from-red-200 to-red-300", value: "very_sad" as MoodType },
  { emoji: "😟", label: "Sad", color: "from-orange-200 to-orange-300", value: "sad" as MoodType },
  { emoji: "😐", label: "Okay", color: "from-yellow-200 to-yellow-300", value: "neutral" as MoodType },
  { emoji: "🙂", label: "Good", color: "from-green-200 to-green-300", value: "happy" as MoodType },
  { emoji: "🤩", label: "Amazing", color: "from-blue-200 to-blue-300", value: "very_happy" as MoodType }
];

const ChildMood = () => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [moodNote, setMoodNote] = useState("");
  const [todaysMood, setTodaysMood] = useState<any>(null);
  const [recentMoods, setRecentMoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const today = new Date().toLocaleDateString();

  useEffect(() => {
    if (user) {
      loadTodaysMood();
      loadRecentMoods();
    }
  }, [user]);

  const loadTodaysMood = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('child_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setTodaysMood(data);
        setSelectedMood(data.mood);
        setMoodNote(data.note || "");
      }
    } catch (error) {
      console.error('Error loading mood:', error);
      toast({
        title: "Error",
        description: "Failed to load today's mood",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadRecentMoods = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('child_id', user.id)
        .order('date', { ascending: false })
        .limit(7);

      if (error) throw error;
      setRecentMoods(data || []);
    } catch (error) {
      console.error('Error loading recent moods:', error);
    }
  };

  const saveMood = async () => {
    if (!user || !selectedMood) return;

    try {
      setSaving(true);
      const today = new Date().toISOString().split('T')[0];

      if (todaysMood) {
        // Update existing mood
        const { error } = await supabase
          .from('mood_entries')
          .update({
            mood: selectedMood,
            note: moodNote,
          })
          .eq('id', todaysMood.id);

        if (error) throw error;
      } else {
        // Create new mood entry
        const { error } = await supabase
          .from('mood_entries')
          .insert({
            child_id: user.id,
            mood: selectedMood,
            note: moodNote,
            date: today,
          });

        if (error) throw error;
      }

      toast({
        title: "Mood saved! 🌟",
        description: "Your mood has been recorded for today",
      });

      // Reload to get updated data
      loadTodaysMood();
      loadRecentMoods();
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

  const getMoodEmoji = (moodValue: MoodType) => {
    return moods.find(m => m.value === moodValue)?.emoji || "😐";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
            📅 {today} • {todaysMood ? "You can update your mood anytime!" : "Pick the emoji that matches your mood"}
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
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-child-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-child-primary">Loading your mood...</p>
              </div>
            ) : (
              <>
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
                            {todaysMood ? "Update Mood" : "Save Mood"}
                          </div>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Mood Journey */}
        <Card className="bg-white/90 dark:bg-child-surface/90 backdrop-blur-sm border-2 border-child-accent/20 rounded-3xl shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-child-accent font-quicksand flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Your Mood Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentMoods.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">📊</div>
                <p className="text-child-secondary">No mood entries yet</p>
                <p className="text-sm text-child-secondary/70">Start tracking your moods to see your journey!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentMoods.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={`p-3 rounded-2xl transition-all duration-300 hover:shadow-md ${
                      index === 0 ? 'bg-child-primary/10 border-2 border-child-primary/30' : 'bg-child-background/50 border border-child-primary/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                        <div>
                          <div className="font-medium text-child-primary text-sm">
                            {formatDate(entry.date)}
                          </div>
                          {entry.note && (
                            <div className="text-xs text-child-secondary truncate max-w-20">
                              {entry.note}
                            </div>
                          )}
                        </div>
                      </div>
                      {index === 0 && (
                        <div className="text-xs text-child-accent font-semibold px-2 py-1 bg-child-accent/20 rounded-full">
                          Latest
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChildMood;