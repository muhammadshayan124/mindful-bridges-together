
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Calendar } from "lucide-react";

const journalEntries = [
  {
    id: 1,
    date: "Today",
    title: "My School Day",
    preview: "Today was pretty good. I had math class and it wasn't as scary as I thought...",
    mood: "😊"
  },
  {
    id: 2,
    date: "Yesterday",
    title: "Playing with Friends",
    preview: "Me and my best friend played in the park after school. We had so much fun...",
    mood: "😄"
  },
  {
    id: 3,
    date: "2 days ago",
    title: "Feeling Worried",
    preview: "I was worried about the test but talking to mom helped me feel better...",
    mood: "😐"
  },
];

const ChildJournal = () => {
  const [journalText, setJournalText] = useState("");
  const [entryTitle, setEntryTitle] = useState("");

  const handleSaveEntry = () => {
    if (!journalText.trim()) return;
    console.log("Journal entry saved:", { title: entryTitle, content: journalText });
    setJournalText("");
    setEntryTitle("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Your Personal Journal 📝</h1>
        <p className="text-blue-600">Write about your day, feelings, and thoughts</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-white/70 backdrop-blur-sm border-2 border-blue-200 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl text-blue-700 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Write New Entry
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="text"
              placeholder="Give your entry a title... ✨"
              value={entryTitle}
              onChange={(e) => setEntryTitle(e.target.value)}
              className="w-full p-3 rounded-xl border-2 border-blue-200 focus:border-blue-400 focus:outline-none"
            />
            
            <Textarea
              placeholder="What's on your mind today? Share your thoughts, feelings, or anything that happened... 💭

Remember, this is your safe space to express yourself!"
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              className="min-h-48 resize-none rounded-xl border-2 border-blue-200 focus:border-blue-400"
            />
            
            <div className="flex gap-3">
              <Button 
                onClick={handleSaveEntry}
                className="flex-1 bg-blue-500 hover:bg-blue-600 rounded-xl"
                disabled={!journalText.trim()}
              >
                Save Entry 💾
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setJournalText("");
                  setEntryTitle("");
                }}
                className="rounded-xl border-2 border-blue-200"
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-2 border-green-200 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl text-green-700 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Your Recent Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {journalEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{entry.mood}</span>
                      <span className="text-sm text-gray-500">{entry.date}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{entry.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{entry.preview}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChildJournal;
