import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useChild } from '@/contexts/ChildContext';

export const useRequireAuth = (loginPath = "/auth") => {
  const navigate = useNavigate();
  const { session } = useAuth();
  
  useEffect(() => {
    if (!session?.access_token) {
      navigate(loginPath);
    }
  }, [session, navigate, loginPath]);
};

export const useRedirectIfLinkedChild = (target = "/child/chat") => {
  const navigate = useNavigate();
  const { isLinked } = useChild();
  
  useEffect(() => {
    if (isLinked) {
      navigate(target, { replace: true });
    }
  }, [isLinked, navigate, target]);
};

export const useRedirectIfNoLinkedChild = (linkPath = "/child/link") => {
  const navigate = useNavigate();
  const { isLinked, loading } = useChild();
  
  useEffect(() => {
    if (!loading && !isLinked) {
      navigate(linkPath, { replace: true });
    }
  }, [isLinked, loading, navigate, linkPath]);
};

export const useRedirectParentIfHasKids = (hasKids: boolean, target = "/parent") => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (hasKids) {
      navigate(target, { replace: true });
    }
  }, [hasKids, navigate, target]);
};