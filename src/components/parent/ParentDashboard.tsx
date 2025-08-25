import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Sparkline from "@/components/charts/Sparkline";
import { getParentSummary } from "@/lib/api";
import { ParentOverview } from "@/types";
import RiskBadge from "@/components/ui/RiskBadge";
import { Heart, MessageCircle, BookOpen, TrendingUp, Calendar, Bell, RefreshCw, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ParentDashboardProps {
  parentData?: ParentOverview;
}

export default function ParentDashboard({ parentData }: ParentDashboardProps = {}) {
  const { toast } = useToast();
  const [overview, setOverview] = useState<ParentOverview | null>(parentData || null);
  const [loading, setLoading] = useState(!parentData);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const loadOverview = async (showRefreshing = false) => {
    const token = 'demo-token';
    
    if (showRefreshing) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await getParentSummary(token);
      setOverview(data);
      setLastUpdate(new Date());
      
      if (showRefreshing) {
        toast({
          title: "✅ Data Updated",
          description: "Latest information has been loaded."
        });
      }
    } catch (error) {
      console.error('Failed to load parent summary:', error);
      toast({
        title: "Update Failed",
        description: "Could not fetch the latest data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!parentData) {
      loadOverview();
    }
  }, [parentData]);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-muted rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!overview || overview.children.length === 0) {
    return (
      <div className="p-6">
        <Card className="max-w-2xl mx-auto bg-card rounded-2xl shadow-md">
          <CardContent className="text-center py-12">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Children Linked</h2>
            <p className="text-muted-foreground mb-6">
              You haven't linked any children to your account yet. Create a link code to get started.
            </p>
            <Button className="mx-auto rounded-xl">
              Create Link Code
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Parent Dashboard 👨‍👩‍👧‍👦</h1>
          <p className="text-muted-foreground">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <Button
          onClick={() => loadOverview(true)}
          variant="outline"
          className="flex items-center gap-2 rounded-xl"
          disabled={refreshing}
        >
          {refreshing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          Request Update
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {overview.children.map((child) => (
          <Card key={child.child_id} className="relative bg-card shadow-md rounded-2xl hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-bold">{child.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    ID: {child.child_id.slice(-8)}
                  </CardDescription>
                </div>
                <RiskBadge level={child.risk} />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* 7-day mood trend */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">7-Day Mood Trend</span>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="h-16 bg-muted/30 rounded-lg p-2">
                  <Sparkline 
                    points={child.last_7_days.map((d, i) => ({ x: i, y: d.avg_sentiment }))}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>7 days ago</span>
                  <span>Today</span>
                </div>
              </div>

              {/* Activity summary */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="text-center p-4 bg-destructive/10 border-destructive/20">
                  <MessageCircle className="w-5 h-5 text-destructive mx-auto mb-1" />
                  <div className="text-lg font-bold text-destructive">
                    {child.last_7_days.reduce((sum, day) => sum + day.high_risk_count, 0)}
                  </div>
                  <div className="text-xs text-destructive/80">High Risk Messages</div>
                </Card>
                
                <Card className="text-center p-4 bg-green-500/10 border-green-500/20">
                  <Heart className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <div className="text-lg font-bold text-green-700">
                    {Math.round(child.last_7_days.reduce((sum, day) => sum + day.wellbeing, 0) / child.last_7_days.length)}
                  </div>
                  <div className="text-xs text-green-600">Avg Wellbeing</div>
                </Card>
              </div>

              {/* Recent activity indicators */}
              <div className="pt-2 border-t border-border">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Recent Activity</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Last 7 days
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary insights */}
      <Card className="bg-card shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            AI Insights 🧠
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {overview.children.map((child) => {
              const avgSentiment = child.last_7_days.reduce((sum, day) => sum + day.avg_sentiment, 0) / child.last_7_days.length;
              const totalHighRisk = child.last_7_days.reduce((sum, day) => sum + day.high_risk_count, 0);
              
              return (
                <Card key={child.child_id} className="p-4 bg-muted/30 border-border/50">
                  <div className="font-medium mb-1">{child.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {avgSentiment > 0.6 ? (
                      "😊 Showing positive emotional patterns this week"
                    ) : avgSentiment > 0.3 ? (
                      "😐 Emotional state appears neutral with some variation"
                    ) : (
                      "😔 May benefit from additional emotional support"
                    )}
                    {totalHighRisk > 0 && (
                      <span className="text-destructive font-medium">
                        {" • "}⚠️ {totalHighRisk} high-priority message{totalHighRisk > 1 ? 's' : ''} detected
                      </span>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}