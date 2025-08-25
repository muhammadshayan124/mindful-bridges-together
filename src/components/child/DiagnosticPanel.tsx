import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE } from "@/lib/api";
import { Settings, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DiagnosticPanel = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    
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
            {user?.id ?? '(not signed in)'}
          </code>
        </div>
        <div>
          <span className="font-medium">Status:</span>
          <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
            user 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            {user ? 'Signed In' : 'Not Signed In'}
          </span>
        </div>
        {user && (
          <Button
            onClick={handleSignOut}
            variant="destructive"
            size="sm"
            className="w-full mt-3"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        )}
      </CardContent>
    </Card>
  );
};