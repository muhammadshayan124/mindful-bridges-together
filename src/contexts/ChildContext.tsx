import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { assignChild } from '@/lib/api';

interface ChildContextType {
  childId: string | null;
  displayName: string | null;
  parentName: string | null;
  isLinked: boolean;
  linkToParent: (code: string, displayName: string) => Promise<void>;
  unlinkChild: () => void;
  loading: boolean;
}

const ChildContext = createContext<ChildContextType | undefined>(undefined);

export const ChildProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [childId, setChildId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [parentName, setParentName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  // Load child data from localStorage and validate with backend
  useEffect(() => {
    const storedChildId = localStorage.getItem('child_id');
    const storedDisplayName = localStorage.getItem('child_display_name');
    const storedParentName = localStorage.getItem('child_parent_name');
    
    if (storedChildId) {
      setChildId(storedChildId);
      setDisplayName(storedDisplayName);
      setParentName(storedParentName);
    }
    setLoading(false);
  }, []);

  const linkToParent = async (code: string, displayName: string) => {
    const token = session?.access_token;
    if (!token) throw new Error('Not authenticated');
    
    const response = await assignChild(code, displayName, token);
    
    // Use child_id from backend response
    setChildId(response.child_id);
    setDisplayName(displayName);
    setParentName("Connected Parent");
    
    // Store in localStorage
    localStorage.setItem('child_id', response.child_id);
    localStorage.setItem('child_display_name', displayName);
    localStorage.setItem('child_parent_name', "Connected Parent");
  };

  const unlinkChild = () => {
    localStorage.removeItem('child_id');
    localStorage.removeItem('child_display_name');
    localStorage.removeItem('child_parent_name');
    setChildId(null);
    setDisplayName(null);
    setParentName(null);
  };

  const value = {
    childId,
    displayName,
    parentName,
    isLinked: !!childId,
    linkToParent,
    unlinkChild,
    loading
  };

  return (
    <ChildContext.Provider value={value}>
      {children}
    </ChildContext.Provider>
  );
};

export const useChild = () => {
  const context = useContext(ChildContext);
  if (context === undefined) {
    throw new Error('useChild must be used within a ChildProvider');
  }
  return context;
};