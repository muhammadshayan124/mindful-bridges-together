import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthToken } from '@/hooks/useAuthToken';
import { getJSON, postJSON } from '@/lib/api';
import { LinkCodeConsumeIn } from '@/types';

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
  const { token } = useAuthToken();

  // Load child data from localStorage and validate with backend
  useEffect(() => {
    const storedChildId = localStorage.getItem('child_id');
    const storedDisplayName = localStorage.getItem('child_display_name');
    const storedParentName = localStorage.getItem('child_parent_name');
    
    if (storedChildId && token) {
      setChildId(storedChildId);
      setDisplayName(storedDisplayName);
      setParentName(storedParentName);
    }
    setLoading(false);
  }, [token]);

  const linkToParent = async (code: string, displayName: string) => {
    if (!token) throw new Error('Not authenticated');
    
    const payload: LinkCodeConsumeIn = { code, display_name: displayName };
    const result = await postJSON<{ child_id: string; parent_name: string }>('/api/child/link-code/consume', payload, token);
    
    setChildId(result.child_id);
    setDisplayName(displayName);
    setParentName(result.parent_name);
    
    // Store in localStorage
    localStorage.setItem('child_id', result.child_id);
    localStorage.setItem('child_display_name', displayName);
    localStorage.setItem('child_parent_name', result.parent_name);
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