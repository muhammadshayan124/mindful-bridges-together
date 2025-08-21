import { useAuth } from '@/contexts/AuthContext';

export const useAuthToken = () => {
  const { session, signOut } = useAuth();
  
  return {
    token: session?.access_token || '',
    signOut
  };
};