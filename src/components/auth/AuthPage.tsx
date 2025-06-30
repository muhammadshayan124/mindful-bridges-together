
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Users, UserCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

type UserRole = 'parent' | 'child';
type AuthMode = 'signin' | 'signup';

const AuthPage = () => {
  const [role, setRole] = useState<UserRole>('child');
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!fullName.trim()) {
          toast({
            title: "Error",
            description: "Please enter your full name",
            variant: "destructive"
          });
          return;
        }
        
        const { error } = await signUp(email, password, role, fullName);
        if (error) throw error;
        
        toast({
          title: "Success!",
          description: "Account created successfully. Please check your email to verify your account."
        });
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        
        toast({
          title: "Welcome back!",
          description: "You have been signed in successfully."
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="flex justify-center items-center gap-3 mb-6">
            <Heart className="w-10 h-10 text-pink-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent font-poppins">
              MindfulBuddy
            </h1>
          </Link>
          <p className="text-gray-600 font-quicksand">
            {mode === 'signin' ? 'Welcome back!' : 'Join our caring community'}
          </p>
        </div>

        <Card className="shadow-xl border-2 border-blue-100">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {role === 'parent' ? (
                <Users className="w-12 h-12 text-green-500" />
              ) : (
                <UserCircle className="w-12 h-12 text-blue-500" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold font-poppins">
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </CardTitle>
            <CardDescription className="font-quicksand">
              {mode === 'signin' 
                ? `Sign in to your ${role} account` 
                : `Create a new ${role} account`
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setRole('child')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  role === 'child'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Child
              </button>
              <button
                type="button"
                onClick={() => setRole('parent')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  role === 'parent'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Parent
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button
                type="submit"
                className={`w-full py-3 font-semibold ${
                  role === 'parent' 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                disabled={loading}
              >
                {loading ? 'Please wait...' : (mode === 'signin' ? 'Sign In' : 'Create Account')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                className="text-sm text-gray-600 hover:text-gray-800 font-quicksand"
              >
                {mode === 'signin' 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
