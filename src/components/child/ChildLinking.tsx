import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Link2, Users } from "lucide-react";
import { useChild } from "@/contexts/ChildContext";
import { useToast } from "@/hooks/use-toast";
import { useRequireAuth } from "@/hooks/useRedirects";

const ChildLinking = () => {
  const [code, setCode] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const { linkToParent } = useChild();
  const { toast } = useToast();
  const navigate = useNavigate();

  useRequireAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !displayName.trim()) return;

    setLoading(true);
    try {
      await linkToParent(code.trim(), displayName.trim());
      toast({
        title: "Successfully linked! 🎉",
        description: "You're now connected with your parent",
      });
      navigate("/child/chat", { replace: true });
    } catch (error) {
      toast({
        title: "Link failed",
        description: error instanceof Error ? error.message : "Please check your code and try again",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-child-primary/5 via-child-background to-child-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 dark:bg-child-surface/90 backdrop-blur-sm border-2 border-child-primary/20 rounded-3xl shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-child-primary to-child-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse-glow">
            <Link2 className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-quicksand text-child-primary mb-2">
            Connect with Parent
          </CardTitle>
          <p className="text-child-secondary text-sm">
            Enter your parent's code to get started
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-child-primary font-semibold">
                Your Name
              </Label>
              <Input
                id="displayName"
                type="text"
                placeholder="What should we call you?"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="rounded-xl border-child-primary/20 bg-white dark:bg-child-surface focus:border-child-primary focus:ring-2 focus:ring-child-primary/20"
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="code" className="text-child-primary font-semibold">
                Parent Code
              </Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter the code from your parent"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="rounded-xl border-child-primary/20 bg-white dark:bg-child-surface focus:border-child-primary focus:ring-2 focus:ring-child-primary/20"
                disabled={loading}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !code.trim() || !displayName.trim()}
              className="w-full bg-gradient-to-r from-child-primary to-child-secondary text-white rounded-xl py-3 font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Connecting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Connect
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-child-primary/5 rounded-xl">
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-child-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-child-primary font-medium mb-1">
                  Need help?
                </p>
                <p className="text-xs text-child-secondary">
                  Ask your parent to generate a new code if this one doesn't work.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildLinking;