
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, TrendingUp, Users, Calendar, Plus, Copy, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuthToken } from "@/hooks/useAuthToken";
import { getJSON, postJSON } from "@/lib/api";
import { ParentOverview, ParentChild, LinkCodeCreateOut } from "@/types";
import { useToast } from "@/hooks/use-toast";
import RiskBadge from "@/components/ui/RiskBadge";
import Sparkline from "@/components/charts/Sparkline";


const ParentDashboard = () => {
  const [overview, setOverview] = useState<ParentOverview | null>(null);
  const [children, setChildren] = useState<ParentChild[]>([]);
  const [loading, setLoading] = useState(true);
  const [linkCode, setLinkCode] = useState<string | null>(null);
  const [linkExpiry, setLinkExpiry] = useState<string | null>(null);
  const [creatingLink, setCreatingLink] = useState(false);
  const { token } = useAuthToken();
  const { toast } = useToast();

  useEffect(() => {
    if (token) {
      loadData();
      const interval = setInterval(loadData, 60000); // Refresh every minute
      return () => clearInterval(interval);
    }
  }, [token]);

  const loadData = async () => {
    if (!token) return;
    
    try {
      const [overviewData, childrenData] = await Promise.all([
        getJSON<ParentOverview>('/api/parent/overview?days=7', token),
        getJSON<ParentChild[]>('/api/parent/children', token)
      ]);
      
      setOverview(overviewData);
      setChildren(childrenData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Error loading data",
        description: "Failed to load dashboard information",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createLinkCode = async () => {
    if (!token) return;
    
    try {
      setCreatingLink(true);
      const result = await postJSON<LinkCodeCreateOut>('/api/parent/link-code/create', {}, token);
      setLinkCode(result.code);
      setLinkExpiry(result.expires_at);
      
      toast({
        title: "Link code created!",
        description: "Share this code with your child to connect them to your account"
      });
    } catch (error) {
      console.error('Error creating link code:', error);
      toast({
        title: "Error",
        description: "Failed to create link code",
        variant: "destructive"
      });
    } finally {
      setCreatingLink(false);
    }
  };

  const copyLinkCode = () => {
    if (linkCode) {
      navigator.clipboard.writeText(linkCode);
      toast({
        title: "Copied!",
        description: "Link code copied to clipboard"
      });
    }
  };

  const formatTimeUntilExpiry = (expiryTime: string) => {
    const expiry = new Date(expiryTime);
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return "Expired";
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-poppins">Dashboard</h1>
          <p className="text-gray-600 font-quicksand mt-1">Monitor your children's wellbeing</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 self-start sm:self-auto">
              <Plus className="w-4 h-4 mr-2" />
              Link Child
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Link a Child</DialogTitle>
              <DialogDescription>
                Create a code for your child to connect to your parent account.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {!linkCode ? (
                <Button 
                  onClick={createLinkCode} 
                  disabled={creatingLink}
                  className="w-full"
                >
                  {creatingLink ? "Creating..." : "Generate Link Code"}
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-mono font-bold text-blue-600 mb-2">
                      {linkCode}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Share this code with your child
                    </p>
                    <Button 
                      onClick={copyLinkCode}
                      variant="outline"
                      size="sm"
                      className="mb-2"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Code
                    </Button>
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      Expires in {linkExpiry && formatTimeUntilExpiry(linkExpiry)}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={createLinkCode} 
                    variant="outline"
                    className="w-full"
                  >
                    Generate New Code
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium font-quicksand">Total Children</p>
                <p className="text-2xl lg:text-3xl font-bold text-blue-800 font-poppins">
                  {children.length}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium font-quicksand">Avg Wellbeing</p>
                <p className="text-2xl lg:text-3xl font-bold text-green-800 font-poppins">
                  {overview?.children.length ? 
                    Math.round(overview.children.reduce((acc, child) => 
                      acc + (child.last_7_days[child.last_7_days.length - 1]?.wellbeing || 0), 0
                    ) / overview.children.length * 10) / 10 : '—'}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium font-quicksand">High Risk</p>
                <p className="text-2xl lg:text-3xl font-bold text-orange-800 font-poppins">
                  {overview?.children.filter(c => c.risk === 'high').length || 0}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium font-quicksand">Total Alerts</p>
                <p className="text-2xl lg:text-3xl font-bold text-purple-800 font-poppins">
                  {overview?.children.reduce((acc, child) => 
                    acc + child.last_7_days.reduce((sum, day) => sum + day.high_risk_count, 0), 0
                  ) || 0}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Children Overview */}
      {overview && overview.children.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 font-poppins">
            Children Overview
          </h2>
          
          <div className="grid gap-6">
            {overview.children.map((child) => (
              <Card key={child.child_id} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 font-poppins">
                        {child.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <RiskBadge level={child.risk} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* 7-Day Sentiment Trend */}
                    <Card className="bg-blue-50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-blue-700">
                          7-Day Sentiment Trend
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Sparkline 
                          points={child.last_7_days.map(day => ({
                            x: day.day,
                            y: day.avg_sentiment
                          }))}
                          min={-1}
                          max={1}
                          height={40}
                        />
                        <p className="text-xs text-blue-600 mt-2">
                          Latest: {(child.last_7_days[child.last_7_days.length - 1]?.avg_sentiment || 0).toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>
                    
                    {/* 7-Day Wellbeing */}
                    <Card className="bg-green-50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-green-700">
                          7-Day Wellbeing
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Sparkline 
                          points={child.last_7_days.map(day => ({
                            x: day.day,
                            y: day.wellbeing
                          }))}
                          min={0}
                          max={10}
                          height={40}
                        />
                        <p className="text-xs text-green-600 mt-2">
                          Current: {(child.last_7_days[child.last_7_days.length - 1]?.wellbeing || 0).toFixed(1)}/10
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Risk Events */}
                  <div className="mt-4">
                    <div className="text-sm text-gray-600">
                      High risk events this week: {child.last_7_days.reduce((sum, day) => sum + day.high_risk_count, 0)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* No children state */}
      {overview && overview.children.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-4xl mb-4">👶</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No children linked yet</h3>
            <p className="text-gray-600 mb-4">Create a link code to connect with your child</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Link Your First Child
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Link a Child</DialogTitle>
                  <DialogDescription>
                    Create a code for your child to connect to your parent account.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  {!linkCode ? (
                    <Button 
                      onClick={createLinkCode} 
                      disabled={creatingLink}
                      className="w-full"
                    >
                      {creatingLink ? "Creating..." : "Generate Link Code"}
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center p-6 bg-gray-50 rounded-lg">
                        <div className="text-3xl font-mono font-bold text-blue-600 mb-2">
                          {linkCode}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          Share this code with your child
                        </p>
                        <Button 
                          onClick={copyLinkCode}
                          variant="outline"
                          size="sm"
                          className="mb-2"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Code
                        </Button>
                        <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          Expires in {linkExpiry && formatTimeUntilExpiry(linkExpiry)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}

    </div>
  );
};

export default ParentDashboard;
