
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, TrendingUp, MessageCircle, Calendar } from "lucide-react";

const childrenData = [
  {
    id: 1,
    name: "Emma",
    age: 8,
    lastActivity: "2 hours ago",
    currentMood: { emoji: "😊", level: 4, trend: "stable" },
    weeklyAverage: 3.8,
    alerts: 0,
    recentActivity: "Completed breathing exercise"
  },
  {
    id: 2,
    name: "Alex",
    age: 10,
    lastActivity: "1 day ago",
    currentMood: { emoji: "😐", level: 3, trend: "declining" },
    weeklyAverage: 3.2,
    alerts: 1,
    recentActivity: "Wrote in journal about school stress"
  },
  {
    id: 3,
    name: "Sophie",
    age: 6,
    lastActivity: "30 minutes ago",
    currentMood: { emoji: "😄", level: 5, trend: "improving" },
    weeklyAverage: 4.2,
    alerts: 0,
    recentActivity: "Played Gratitude Garden game"
  }
];

const weeklyStats = {
  totalSessions: 24,
  averageMood: 3.7,
  gamesPlayed: 12,
  journalEntries: 8,
  moodCheckins: 15
};

const alerts = [
  {
    id: 1,
    type: "warning",
    child: "Alex",
    message: "Mood has been consistently low for 3 days",
    time: "2 hours ago"
  },
  {
    id: 2,
    type: "info",
    child: "Emma",
    message: "Completed daily mood check-in streak of 7 days!",
    time: "1 day ago"
  }
];

const ParentDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Monitor your children's mental health and wellbeing</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.totalSessions}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.averageMood}/5</div>
            <p className="text-xs text-green-600">+0.3 from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Games Played</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.gamesPlayed}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Journal Entries</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.journalEntries}</div>
            <p className="text-xs text-blue-600">+2 from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Children Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Children Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {childrenData.map((child) => (
              <div key={child.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {child.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{child.name}</h3>
                      <span className="text-sm text-gray-500">({child.age} years old)</span>
                      {child.alerts > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {child.alerts} alert{child.alerts > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{child.recentActivity}</p>
                    <p className="text-xs text-gray-500">Last active: {child.lastActivity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{child.currentMood.emoji}</span>
                    <div className="text-sm">
                      <div className="font-medium">Mood: {child.currentMood.level}/5</div>
                      <div className={`text-xs ${
                        child.currentMood.trend === 'improving' ? 'text-green-600' :
                        child.currentMood.trend === 'declining' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {child.currentMood.trend}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Weekly avg: {child.weeklyAverage}/5
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts & Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Recent Alerts & Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'warning' 
                    ? 'bg-yellow-50 border-yellow-400' 
                    : 'bg-blue-50 border-blue-400'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{alert.child}</span>
                      <Badge variant={alert.type === 'warning' ? 'destructive' : 'default'}>
                        {alert.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700">{alert.message}</p>
                  </div>
                  <span className="text-xs text-gray-500">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentDashboard;
