import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useChild } from "@/contexts/ChildContext";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE } from "@/lib/api";
import { Unlink, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DiagnosticPanel = () => {
  const { childId, isLinked } = useChild();
  const { signOut } = useAuth();
  const { toast } = useToast();

  const { unlinkChild } = useChild();

  const handleUnlink = () => {
    unlinkChild();
    
    toast({
      title: "Unlinked successfully",
      description: "You've been disconnected from your parent",
    });
    
    // Reload the page to reset state
    window.location.reload();
  };

  return (
    <Card className="bg-card border shadow-sm mb-4">
      <CardHeader>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Connection Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div>
          <span className="font-medium">API Base:</span>
          <code className="ml-2 text-xs bg-muted px-2 py-1 rounded">{API_BASE}</code>
        </div>
        <div>
          <span className="font-medium">Child ID:</span>
          <code className="ml-2 text-xs bg-muted px-2 py-1 rounded">
            {childId ?? '(not linked)'}
          </code>
        </div>
        <div>
          <span className="font-medium">Status:</span>
          <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
            isLinked 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            {isLinked ? 'Linked' : 'Not Linked'}
          </span>
        </div>
        {isLinked && (
          <Button
            onClick={handleUnlink}
            variant="destructive"
            size="sm"
            className="w-full mt-3"
          >
            <Unlink className="w-4 h-4 mr-2" />
            Unlink from Parent
          </Button>
        )}
      </CardContent>
    </Card>
  );
};