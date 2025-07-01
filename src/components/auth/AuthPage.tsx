
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Users, UserCircle, Sparkles, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Link, Navigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

type UserRole = 'parent' | 'child';
type AuthMode = 'signin' | 'signup';

const AuthPage = () => {
  const [role, setRole] = useState<UserRole>('child');
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp, user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  // Redirect if already authenticated
  if (user && !authLoading) {
    const redirectPath = user.user_metadata?.role === 'parent' ? '/parent' : '/child';
    return <Navigate to={redirectPath} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        if (!fullName.trim()) {
          toast({
            title: "Error",
            description: "Please enter your full name",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
        
        const { error } = await signUp(email, password, role, fullName);
        if (error) {
          console.error('Sign up error:', error);
          throw error;
        }
        
        toast({
          title: "Welcome to MindfulBuddy! ✨",
          description: "Account created successfully. Please check your email to verify your account."
        });
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          console.error('Sign in error:', error);
          throw error;
        }
        
        toast({
          title: "Welcome back! 💙",
          description: "You have been signed in successfully."
        });
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast({
        title: "Authentication Error",
        description: error.message || "An error occurred during authentication. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getRoleThemeClass = () => {
    return role === 'child' ? 'auth-child-theme' : 'auth-parent-theme';
  };

  const getRoleGradient = () => {
    if (role === 'child') {
      return 'from-mindful-accent via-mindful-send-button to-mindful-mint';
    }
    return 'from-mindful-parent-primary via-mindful-parent-sidebar to-mindful-success';
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${getRoleThemeClass()} flex items-center justify-center p-4 transition-all duration-500`}>
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="flex justify-center items-center gap-3 mb-6 group">
            <Heart className="w-12 h-12 text-pink-500 animate-gentle-pulse group-hover:scale-110 transition-transform duration-300" />
            <h1 className={`text-4xl font-bold bg-gradient-to-r ${getRoleGradient()} bg-clip-text text-transparent font-inter`}>
              MindfulBuddy
            </h1>
          </Link>
          <p className={`text-lg font-quicksand ${role === 'child' ? 'text-purple-600 dark:text-purple-300' : 'text-gray-600 dark:text-gray-300'}`}>
            {mode === 'signin' ? 'Welcome back to your safe space!' : 'Join our caring community'}
          </p>
        </div>

        {/* Role Selection */}
        <div className="mb-8">
          <div className="flex bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-2 border-2 border-white/50 dark:border-gray-700/50 shadow-lg">
            <button
              type="button"
              onClick={() => setRole('child')}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold font-quicksand transition-all duration-300 flex items-center justify-center gap-3 ${
                role === 'child'
                  ? 'bg-gradient-to-r from-mindful-accent to-mindful-send-button text-white shadow-lg scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              Child
            </button>
            <button
              type="button"
              onClick={() => setRole('parent')}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold font-inter transition-all duration-300 flex items-center justify-center gap-3 ${
                role === 'parent'
                  ? 'bg-gradient-to-r from-mindful-parent-primary to-mindful-parent-sidebar text-white shadow-lg scale-105'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
              }`}
            >
              <Shield className="w-5 h-5" />
              Parent
            </button>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="shadow-2xl border-2 border-white/50 dark:border-gray-700/50 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 animate-scale-in">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-6">
              {role === 'parent' ? (
                <div className="w-16 h-16 bg-gradient-to-r from-mindful-parent-primary to-mindful-success rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-gradient-to-r from-mindful-accent to-mindful-mint rounded-2xl flex items-center justify-center shadow-lg">
                  <UserCircle className="w-8 h-8 text-white" />
                </div>
              )}
            </div>
            <CardTitle className={`text-3xl font-bold ${role === 'child' ? 'font-quicksand' : 'font-inter'}`}>
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </CardTitle>
            <CardDescription className={`text-lg ${role === 'child' ? 'font-quicksand' : 'font-inter'}`}>
              {mode === 'signin' 
                ? `Welcome back to your ${role === 'child' ? 'safe space' : 'dashboard'}` 
                : `Create your ${role === 'child' ? 'magical' : 'secure'} ${role} account`
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className={`text-sm font-medium ${role === 'child' ? 'font-quicksand' : 'font-inter'}`}>
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className={`${role === 'child' ? 'mindful-input-child' : 'mindful-input-parent'} child-focus`}
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className={`text-sm font-medium ${role === 'child' ? 'font-quicksand' : 'font-inter'}`}>
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`${role === 'child' ? 'mindful-input-child' : 'mindful-input-parent'} child-focus`}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className={`text-sm font-medium ${role === 'child' ? 'font-quicksand' : 'font-inter'}`}>
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`${role === 'child' ? 'mindful-input-child' : 'mindful-input-parent'} child-focus`}
                  required
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                className={`w-full py-4 font-semibold text-lg ${
                  role === 'child' ? 'mindful-button-child font-quicksand' : 'mindful-button-parent font-inter'
                }`}
                disabled={loading || authLoading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Please wait...
                  </span>
                ) : (
                  mode === 'signin' ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                className={`text-sm transition-colors duration-200 ${
                  role === 'child' 
                    ? 'text-purple-600 hover:text-purple-700 dark:text-purple-300 dark:hover:text-purple-200 font-quicksand' 
                    : 'text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200 font-inter'
                }`}
                disabled={loading || authLoading}
              >
                {mode === 'signin' 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Message */}
        <div className="text-center mt-8">
          <p className={`text-sm opacity-75 ${role === 'child' ? 'font-quicksand text-purple-600 dark:text-purple-300' : 'font-inter text-gray-600 dark:text-gray-300'}`}>
            {role === 'child' 
              ? '✨ A safe space where your feelings matter ✨' 
              : '🛡️ Trusted support for your family\'s mental wellness 🛡️'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
