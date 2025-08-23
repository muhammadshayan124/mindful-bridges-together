import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Save, Sparkles, Edit3 } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { useChild } from "@/contexts/ChildContext";
import { useAuth } from "@/contexts/AuthContext";
import { postJSON } from "@/lib/api";
import { OkOut } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useRedirectIfNoLinkedChild } from "@/hooks/useRedirects";
import { format } from "date-fns";

const prompts = [
  "What made you smile today? 😊",
  "Tell me about someone who was kind to you today 💝",
  "What's something new you learned? 🌟",
  "Describe your favorite moment from today 🌈",
  "What are you grateful for right now? 🙏",
  "If today was a color, what would it be and why? 🎨",
  "What would you like to do tomorrow? ✨"
];

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const ChildJournal = () => {
  const [journalEntry, setJournalEntry] = useState("");
  const [journalTitle, setJournalTitle] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { childId } = useChild();
  const { session } = useAuth();
  const { toast } = useToast();

  useRedirectIfNoLinkedChild("/child/link");

  // For now, we'll keep entries in local state since this is a demo
  // In the real app, you'd fetch from the backend API
  const loadEntries = async () => {
    // This would call your API to load journal entries
    // For now, we'll just clear loading state
    setLoading(false);
  };

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    setJournalEntry(`${prompt}\n\n`);
    setJournalTitle(prompt.split('?')[0] + "?");
  };

  const saveEntry = async () => {
    if (!childId || !session?.access_token || !journalEntry.trim() || !journalTitle.trim()) {
      toast({
        title: "Missing information",
        description: "Please add both a title and some content to your journal entry",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);
      
      // Call the real API endpoint
      const response = await postJSON<OkOut>('/api/journal', {
        child_id: childId,
        text: journalEntry
      }, session.access_token);

      // Add to local entries
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        title: journalTitle,
        content: journalEntry,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      if (editingEntry) {
        setEntries(prev => prev.map(entry => 
          entry.id === editingEntry.id 
            ? { ...newEntry, id: editingEntry.id }
            : entry
        ));
        toast({
          title: "Entry updated! ✏️",
          description: "Your journal entry has been saved",
        });
      } else {
        setEntries(prev => [newEntry, ...prev]);
        toast({
          title: "Entry saved! 📖",
          description: response.sentiment 
            ? "Your journal entry has been saved and analyzed"
            : "Your journal entry has been saved",
        });
      }

      // Reset form
      setJournalEntry("");
      setJournalTitle("");
      setSelectedPrompt(null);
      setEditingEntry(null);
    } catch (error) {
      console.error('Error saving entry:', error);
      toast({
        title: "Error",
        description: "Failed to save journal entry",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const editEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setJournalTitle(entry.title);
    setJournalEntry(entry.content);
    setSelectedPrompt(null);
  };

  const cancelEdit = () => {
    setEditingEntry(null);
    setJournalTitle("");
    setJournalEntry("");
    setSelectedPrompt(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="text-center flex-1">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-child-primary via-child-secondary to-child-accent bg-clip-text text-transparent mb-3 animate-float font-quicksand">
            Your Personal Journal 📖
          </h1>
          <p className="text-lg text-child-secondary font-medium">
            Write about your day, feelings, and thoughts in your safe space ✨
          </p>
        </div>
        <ThemeToggle />
      </div>

      <Card className="bg-white/90 dark:bg-child-surface/90 backdrop-blur-sm border-2 border-child-primary/20 rounded-3xl shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-child-primary to-child-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse-glow">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-quicksand text-child-primary mb-2">
            Share Your Thoughts
          </CardTitle>
          <p className="text-child-secondary font-medium">
            This is your special place to express yourself freely
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Writing Area */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-child-primary">
              {editingEntry ? "✏️ Edit your entry:" : "📝 Write a new entry:"}
            </h3>
            
            <Input
              value={journalTitle}
              onChange={(e) => setJournalTitle(e.target.value)}
              placeholder="Give your entry a title..."
              className="rounded-2xl border-2 border-child-primary/20 focus:border-child-primary focus:ring-2 focus:ring-child-primary/20 text-base font-medium"
            />
            
            <Textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="Start writing about your day... What happened? How did you feel? What made you happy?"
              className="min-h-40 rounded-2xl border-2 border-child-primary/20 focus:border-child-primary focus:ring-2 focus:ring-child-primary/20 resize-none text-base"
            />
            
            <div className="flex gap-3">
              <Button
                onClick={saveEntry}
                disabled={saving || !journalEntry.trim() || !journalTitle.trim()}
                className="flex-1 bg-gradient-to-r from-child-primary to-child-secondary text-white rounded-2xl py-3 font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {saving ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    {editingEntry ? "Update Entry" : "Save Entry"}
                  </div>
                )}
              </Button>
              
              {editingEntry && (
                <Button
                  onClick={cancelEdit}
                  variant="outline"
                  className="px-6 rounded-2xl border-2 border-child-primary/20 hover:border-child-primary/40"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>

          {/* Prompts Section */}
          {!editingEntry && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-child-primary">
                ✨ Need some inspiration? Pick a prompt:
              </h3>
              <div className="grid gap-3">
                {prompts.map((prompt, index) => (
                  <Button
                    key={index}
                    onClick={() => handlePromptSelect(prompt)}
                    variant="outline"
                    className={`p-4 h-auto text-left justify-start rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      selectedPrompt === prompt
                        ? "border-child-primary bg-child-primary/10 text-child-primary"
                        : "border-child-primary/20 hover:border-child-primary/40"
                    }`}
                  >
                    <Sparkles className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="font-medium">{prompt}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Previous Entries */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-child-primary flex items-center gap-2">
              📚 Your journal entries:
              <span className="text-sm font-normal text-child-secondary">
                ({entries.length} {entries.length === 1 ? 'entry' : 'entries'})
              </span>
            </h3>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-child-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-child-primary">Loading your entries...</p>
              </div>
            ) : entries.length === 0 ? (
              <Card className="bg-child-background/50 border-child-primary/20 rounded-2xl p-6 text-center">
                <BookOpen className="w-12 h-12 text-child-primary/50 mx-auto mb-3" />
                <p className="text-child-primary/70 mb-2">No journal entries yet</p>
                <p className="text-sm text-child-secondary">Start writing your first entry above!</p>
              </Card>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {entries.map((entry) => (
                  <Card key={entry.id} className="bg-white/90 dark:bg-child-surface/90 border-child-primary/20 rounded-2xl hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-child-primary line-clamp-1">
                          {entry.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-child-secondary">
                            {format(new Date(entry.created_at), 'MMM d, yyyy')}
                          </span>
                          <Button
                            onClick={() => editEntry(entry)}
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-full hover:bg-child-primary/10"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-child-secondary line-clamp-3">
                        {entry.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildJournal;