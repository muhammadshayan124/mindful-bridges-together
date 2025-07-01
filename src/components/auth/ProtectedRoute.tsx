
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'parent' | 'child';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log('ProtectedRoute - User:', user?.id);
    console.log('ProtectedRoute - Profile:', profile);
    console.log('ProtectedRoute - Loading:', loading);
    console.log('ProtectedRoute - Required Role:', requiredRole);
  }, [user, profile, loading, requiredRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mindful-background-light dark:bg-mindful-background-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mindful-accent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 font-quicksand">Loading your safe space...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    console.log('No user or profile, redirecting to auth');
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requiredRole && profile.role !== requiredRole) {
    console.log('Role mismatch, redirecting based on actual role');
    // Redirect to appropriate interface based on user's role
    const redirectPath = profile.role === 'parent' ? '/parent' : '/child';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
