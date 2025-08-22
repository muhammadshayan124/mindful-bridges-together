-- Fix security warnings: Set proper search_path for functions

-- Update the user role function with proper search path
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT 
LANGUAGE SQL 
SECURITY DEFINER 
STABLE
SET search_path = public
AS $$
  SELECT role::text FROM public.profiles WHERE id = auth.uid();
$$;

-- Update the child linking function with proper search path  
CREATE OR REPLACE FUNCTION public.is_child_linked_to_user(target_child_id uuid)
RETURNS BOOLEAN 
LANGUAGE SQL 
SECURITY DEFINER 
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.children 
    WHERE child_id = target_child_id 
    AND (parent_id = auth.uid() OR child_id = auth.uid())
  );
$$;