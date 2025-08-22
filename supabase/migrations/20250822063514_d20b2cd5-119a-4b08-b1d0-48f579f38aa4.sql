-- Fix security issue: Remove overly permissive service role policies and implement proper RLS

-- Create security definer functions to avoid RLS recursion
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
  SELECT role::text FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_child_linked_to_user(target_child_id uuid)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.children 
    WHERE child_id = target_child_id 
    AND (parent_id = auth.uid() OR child_id = auth.uid())
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- DROP overly permissive service role policies
DROP POLICY IF EXISTS "Service role access" ON public.children;
DROP POLICY IF EXISTS "Service role access" ON public.journals;
DROP POLICY IF EXISTS "Service role access" ON public.parents;
DROP POLICY IF EXISTS "Service role access" ON public.sentiment_daily;
DROP POLICY IF EXISTS "Service role access" ON public.chat_messages;
DROP POLICY IF EXISTS "Service role access" ON public.moods;
DROP POLICY IF EXISTS "Service role access" ON public.game_events;
DROP POLICY IF EXISTS "Service role access" ON public.family_links;

-- CHILDREN table: Proper access control
CREATE POLICY "Children can view their own record" ON public.children
FOR SELECT USING (child_id = auth.uid());

CREATE POLICY "Parents can insert children" ON public.children
FOR INSERT WITH CHECK (parent_id = auth.uid());

CREATE POLICY "Parents can update their children" ON public.children
FOR UPDATE USING (parent_id = auth.uid());

CREATE POLICY "Parents can delete their children" ON public.children
FOR DELETE USING (parent_id = auth.uid());

-- JOURNALS table: Children own their journals, parents can view
CREATE POLICY "Children can manage their own journals" ON public.journals
FOR ALL USING (child_id = auth.uid());

CREATE POLICY "Parents can view their children's journals" ON public.journals
FOR SELECT USING (public.is_child_linked_to_user(child_id) AND public.get_user_role() = 'parent');

-- CHAT_MESSAGES table: Children own their chats, parents can view
CREATE POLICY "Children can manage their own chat messages" ON public.chat_messages
FOR ALL USING (child_id = auth.uid());

CREATE POLICY "Parents can view their children's chat messages" ON public.chat_messages
FOR SELECT USING (public.is_child_linked_to_user(child_id) AND public.get_user_role() = 'parent');

-- MOODS table: Children own their moods, parents can view
CREATE POLICY "Children can manage their own moods" ON public.moods
FOR ALL USING (child_id = auth.uid());

CREATE POLICY "Parents can view their children's moods" ON public.moods
FOR SELECT USING (public.is_child_linked_to_user(child_id) AND public.get_user_role() = 'parent');

-- GAME_EVENTS table: Children own their game events, parents can view
CREATE POLICY "Children can manage their own game events" ON public.game_events
FOR ALL USING (child_id = auth.uid());

CREATE POLICY "Parents can view their children's game events" ON public.game_events
FOR SELECT USING (public.is_child_linked_to_user(child_id) AND public.get_user_role() = 'parent');

-- SENTIMENT_DAILY table: Read-only for users, but with proper access control
CREATE POLICY "Children can view their own sentiment data" ON public.sentiment_daily
FOR SELECT USING (child_id = auth.uid());

CREATE POLICY "Parents can view their children's sentiment data" ON public.sentiment_daily
FOR SELECT USING (public.is_child_linked_to_user(child_id) AND public.get_user_role() = 'parent');

-- PARENTS table: Users can manage their own parent record
CREATE POLICY "Users can manage their own parent record" ON public.parents
FOR ALL USING (user_id = auth.uid());

-- FAMILY_LINKS table: Only parents can manage family links
CREATE POLICY "Parents can manage their family links" ON public.family_links
FOR ALL USING (parent_id = auth.uid());