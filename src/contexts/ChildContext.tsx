import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { assignChild } from '@/lib/api';

interface ChildContextType {
  childId: string | null;
  displayName: string | null;
  parentName: string | null;
  isLinked: boolean;
  linkToParent: (code: string, displayName: string) => Promise<void>;
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

  const generateChildId = () => {
    return 'child_' + Math.random().toString(36).substr(2, 9);
  };

  const linkToParent = async (code: string, displayName: string) => {
    const token = session?.access_token;
    if (!token) throw new Error('Not authenticated');
    
    await assignChild(code, displayName, token);
    
    // Generate and set child ID
    const newChildId = generateChildId();
    setChildId(newChildId);
    setDisplayName(displayName);
    setParentName("Connected Parent");
    
    // Store in localStorage
    localStorage.setItem('child_id', newChildId);
    localStorage.setItem('child_display_name', displayName);
    localStorage.setItem('child_parent_name', "Connected Parent");
  };

  const value = {
    childId,
    displayName,
    parentName,
    isLinked: !!childId,
    linkToParent,
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