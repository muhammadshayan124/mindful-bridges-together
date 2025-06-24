
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Calendar, TrendingUp, AlertTriangle } from "lucide-react";

const ParentReports = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your children's mental health progress</p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export All Reports
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="mood">Mood Trends</TabsTrigger>
          <TabsTrigger value="activity">Activity Reports</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+15%</div>
                <p className="text-xs text-gray-600">Improvement this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Active Days
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24/30</div>
                <p className="text-xs text-gray-600">Days with activity this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Alerts Generated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">3</div>
                <p className="text-xs text-gray-600">This month (2 resolved)</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Emma (Age 8)</h4>
                    <Badge variant="default">Excellent Progress</Badge>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Avg Mood:</span>
                      <div className="font-medium">4.2/5</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Sessions:</span>
                      <div className="font-medium">18</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Streak:</span>
                      <div className="font-medium">7 days</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Focus Area:</span>
                      <div className="font-medium">Anxiety Management</div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Alex (Age 10)</h4>
                    <Badge variant="secondary">Needs Attention</Badge>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Avg Mood:</span>
                      <div className="font-medium">3.1/5</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Sessions:</span>
                      <div className="font-medium">12</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Streak:</span>
                      <div className="font-medium">3 days</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Focus Area:</span>
                      <div className="font-medium">Social Confidence</div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Sophie (Age 6)</h4>
                    <Badge variant="default">Great Engagement</Badge>
                  </div>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Avg Mood:</span>
                      <div className="font-medium">4.7/5</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Sessions:</span>
                      <div className="font-medium">22</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Streak:</span>
                      <div className="font-medium">12 days</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Focus Area:</span>
                      <div className="font-medium">Emotional Expression</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mood" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mood Trends Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Mood trend chart would be displayed here</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Pattern Recognition</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Emma's mood improves after physical activities</li>
                        <li>• Alex shows lower moods on Mondays and Tuesdays</li>
                        <li>• Sophie is most positive during evening sessions</li>
                        <li>• Weekend moods are generally 20% higher</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Schedule more breathing exercises for Emma</li>
                        <li>• Consider Monday check-ins for Alex</li>
                        <li>• Continue current approach with Sophie</li>
                        <li>• Weekend family activities show positive impact</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">156</div>
                    <p className="text-sm text-gray-600">Total Chat Messages</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">45</div>
                    <p className="text-sm text-gray-600">Games Completed</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">32</div>
                    <p className="text-sm text-gray-600">Journal Entries</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Most Popular Activities</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span>Breathing Buddy</span>
                      <Badge>28 sessions</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span>Chat Sessions</span>
                      <Badge>24 sessions</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span>Gratitude Garden</span>
                      <Badge>19 sessions</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-700">Positive Trend Detected</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Emma's anxiety levels have decreased by 30% over the past month. 
                    Consistent use of breathing exercises appears to be the key factor.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-yellow-700">Attention Needed</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Alex has mentioned school-related stress in 60% of recent conversations. 
                    Consider scheduling a parent-teacher conference or additional support.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-700">Excellent Progress</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Sophie shows remarkable emotional intelligence development. 
                    Her ability to identify and express feelings has improved significantly.
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Recommended Actions</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Continue current breathing exercise routine for Emma</li>
                    <li>• Schedule check-in with Alex's teacher about school stress</li>
                    <li>• Explore advanced emotional learning games for Sophie</li>
                    <li>• Consider family mindfulness activities on weekends</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentReports;
