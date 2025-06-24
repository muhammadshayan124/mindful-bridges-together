
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Heart className="w-12 h-12 text-pink-500" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              MindfulBuddy
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A safe space for children's mental health, with caring support for families
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-blue-700 font-bold">Child Interface</CardTitle>
              <CardDescription className="text-blue-600">
                A fun and safe space to express yourself, play games, and track your mood
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-2 mb-6 text-sm text-blue-600">
                <p>🤖 Chat with your AI friend</p>
                <p>😊 Track your mood daily</p>
                <p>📝 Write in your journal</p>
                <p>🎮 Play calming games</p>
              </div>
              <Link to="/child/chat">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl">
                  Start Playing 🌟
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-700 font-bold">Parent Interface</CardTitle>
              <CardDescription className="text-green-600">
                Monitor your child's wellbeing and access helpful insights and resources
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-2 mb-6 text-sm text-green-600">
                <p>📊 View mood trends & insights</p>
                <p>👥 Manage multiple children</p>
                <p>🔔 Receive important alerts</p>
                <p>📈 Track progress over time</p>
              </div>
              <Link to="/parent/dashboard">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl">
                  Access Dashboard 📋
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Built with care for families • Safe & Secure • Privacy First
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
