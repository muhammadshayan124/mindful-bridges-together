import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Key, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { getJSON, postJSON } from "@/lib/api";
import { ParentOverview, LinkCodeCreateOut } from "@/types";

interface ParentLinkingProps {
  onLinked: (parentData: ParentOverview) => void;
}

const ParentLinking = ({ onLinked }: ParentLinkingProps) => {
  const [parentCode, setParentCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatingCode, setGeneratingCode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const { session } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentCode.trim() || !session?.access_token) return;

    setLoading(true);
    try {
      const parentData = await getJSON<ParentOverview>(
        `/api/parent/summary?parent_id=${parentCode.trim()}`,
        session.access_token
      );

      onLinked(parentData);
      toast({
        title: "Connected successfully! 👨‍👩‍👧‍👦",
        description: `Welcome! You have ${parentData.children?.length || 0} children connected.`,
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: error instanceof Error ? error.message : "Please check your parent code and try again",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateLinkCode = async () => {
    if (!session?.access_token) return;

    setGeneratingCode(true);
    try {
      const response = await postJSON<LinkCodeCreateOut>(
        '/api/parent/create-link',
        { parent_id: session.user.id },
        session.access_token
      );

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Enter Parent Code */}
        <Card className="bg-white/90 dark:bg-card/90 backdrop-blur-sm border-2 border-primary/20 rounded-3xl shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-primary mb-2">
              Parent Dashboard Access
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Enter your parent code to view your children's progress
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="parentCode" className="text-primary font-semibold">
                  Parent Code
                </Label>
                <Input
                  id="parentCode"
                  type="text"
                  placeholder="Enter your parent access code"
                  value={parentCode}
                  onChange={(e) => setParentCode(e.target.value.toUpperCase())}
                  className="rounded-xl border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  disabled={loading}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading || !parentCode.trim()}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white rounded-xl py-3 font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Connecting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Access Dashboard
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParentLinking;