import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Key, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { getParentChildren, createLinkCode } from "@/lib/api";
import { ParentChild, LinkCodeCreateOut } from "@/types";
import { useRequireAuth } from "@/hooks/useRedirects";

interface ParentLinkingProps {
  onLinked: () => void;
}

const ParentLinking = ({ onLinked }: ParentLinkingProps) => {
  const [loading, setLoading] = useState(true);
  const [generatingCode, setGeneratingCode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const { session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useRequireAuth();

  // Check if parent already has children linked
  useEffect(() => {
    const checkParentStatus = async () => {
      if (!session?.access_token) return;
      
      try {
        const children = await getParentChildren(session.access_token);
        if (children.length > 0) {
          navigate("/parent", { replace: true });
          return;
        }
      } catch (error) {
        console.error('Error checking parent status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkParentStatus();
  }, [session, navigate]);

  const generateLinkCode = async () => {
    if (!session?.access_token) return;

    setGeneratingCode(true);
    try {
      const response = await createLinkCode(session.access_token);
      setGeneratedCode(response.code);
      toast({
        title: "Link code generated! 🔗",
        description: "Share this code with your child to connect them to your account",
      });
    } catch (error) {
      toast({
        title: "Failed to generate code",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive"
      });
    } finally {
      setGeneratingCode(false);
    }
  };

  const goToDashboard = () => {
    onLinked();
    navigate("/parent");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Generate Link Code */}
        <Card className="bg-white/90 dark:bg-card/90 backdrop-blur-sm border-2 border-secondary/20 rounded-3xl shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Key className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl font-bold text-secondary mb-2">
              Generate Child Link Code
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Create a code for your child to link their account to yours
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <Button
              onClick={generateLinkCode}
              disabled={generatingCode}
              variant="outline"
              className="w-full border-secondary/20 hover:border-secondary hover:bg-secondary/10 rounded-xl py-3 font-semibold"
            >
              {generatingCode ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Generate Link Code
                </div>
              )}
            </Button>

            {generatedCode && (
              <div className="space-y-4">
                <div className="p-4 bg-secondary/5 rounded-xl border border-secondary/20">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Share this code with your child:</p>
                    <div className="text-2xl font-bold text-secondary bg-white dark:bg-card p-3 rounded-lg border tracking-widest">
                      {generatedCode}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      This code will expire in 24 hours
                    </p>
                  </div>
                </div>
                <Button
                  onClick={goToDashboard}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white rounded-xl py-3 font-semibold hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Go to Dashboard
                  </div>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParentLinking;