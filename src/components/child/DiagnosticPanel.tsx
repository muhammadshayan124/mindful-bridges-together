import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { API_BASE } from "@/lib/api";
import { Settings, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DiagnosticPanel = () => {
  const { toast } = useToast();

  const handleSignOut = () => {
    window.location.href = '/';
    
    toast({
      title: "Signed out successfully",
      description: "You have been signed out.",
    });
  };

  return (
    <Card className="bg-card border shadow-sm mb-4">
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Account Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div>
          <span className="font-medium">API Base:</span>
          <code className="ml-2 text-xs bg-muted px-2 py-1 rounded">{API_BASE}</code>
        </div>
        <div>
          <span className="font-medium">User ID:</span>
          <code className="ml-2 text-xs bg-muted px-2 py-1 rounded">
            demo-user
          </code>
        </div>
        <div>
          <span className="font-medium">Status:</span>
          <span className="ml-2 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            Demo Mode
          </span>
        </div>
        <div>
          <Button
            onClick={handleSignOut}
            variant="destructive"
            size="sm"
            className="w-full mt-3"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};