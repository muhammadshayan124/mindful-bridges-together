
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageCircle, Gamepad2, BookOpen, Plus } from "lucide-react";

const children = [
  {
    id: 1,
    name: "Emma",
    age: 8,
    avatar: "E",
    joinDate: "2023-09-15",
    totalSessions: 45,
    currentStreak: 7,
    favoriteActivity: "Breathing exercises",
    recentMoods: [4, 5, 4, 3, 4, 5, 4],
    stats: {
      chatSessions: 23,
      gamesPlayed: 15,
      journalEntries: 12,
      moodCheckins: 28
    }
  },
  {
    id: 2,
    name: "Alex",
    age: 10,
    avatar: "A",
    joinDate: "2023-08-20",
    totalSessions: 62,
    currentStreak: 3,
    favoriteActivity: "Journal writing",
    recentMoods: [3, 2, 3, 3, 4, 2, 3],
    stats: {
      chatSessions: 34,
      gamesPlayed: 8,
      journalEntries: 25,
      moodCheckins: 31
    }
  },
  {
    id: 3,
    name: "Sophie",
    age: 6,
    avatar: "S",
    joinDate: "2023-10-01",
    totalSessions: 28,
    currentStreak: 12,
    favoriteActivity: "Mindful games",
    recentMoods: [5, 4, 5, 5, 4, 5, 5],
    stats: {
      chatSessions: 12,
      gamesPlayed: 22,
      journalEntries: 5,
      moodCheckins: 20
    }
  }
];

const ParentChildren = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Children</h1>
          <p className="text-gray-600">Detailed view of each child's progress and activities</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Child
        </Button>
      </div>

      <div className="grid gap-6">
        {children.map((child) => (
          <Card key={child.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {child.avatar}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{child.name}</CardTitle>
                    <p className="text-gray-600">{child.age} years old • Member since {new Date(child.joinDate).toLocaleDateString()}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="secondary">{child.totalSessions} total sessions</Badge>
                      <Badge variant="default">{child.currentStreak} day streak</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline">View Details</Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                {/* Activity Stats */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">Activity Summary</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Chat Sessions</span>
                      </div>
                      <span className="font-medium">{child.stats.chatSessions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Gamepad2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Games Played</span>
                      </div>
                      <span className="font-medium">{child.stats.gamesPlayed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">Journal Entries</span>
                      </div>
                      <span className="font-medium">{child.stats.journalEntries}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">Mood Check-ins</span>
                      </div>
                      <span className="font-medium">{child.stats.moodCheckins}</span>
                    </div>
                  </div>
                </div>

                {/* Mood Trend */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">Recent Mood Trend</h4>
                  <div className="flex items-end gap-1 h-20">
                    {child.recentMoods.map((mood, index) => (
                      <div
                        key={index}
                        className="bg-blue-500 rounded-t"
                        style={{
                          height: `${(mood / 5) * 100}%`,
                          width: '12px'
                        }}
                        title={`Day ${index + 1}: ${mood}/5`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">Last 7 days</p>
                </div>

                {/* Favorite Activity */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">Preferences</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="text-gray-600">Favorite Activity:</span>
                      <br />
                      <span className="font-medium">{child.favoriteActivity}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-600">Best Session Time:</span>
                      <br />
                      <span className="font-medium">After school</span>
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      View Chat History
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Export Report
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Set Reminders
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ParentChildren;
