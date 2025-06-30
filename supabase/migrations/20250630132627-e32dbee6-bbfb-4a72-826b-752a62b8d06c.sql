
-- Create user role enum
CREATE TYPE public.user_role AS ENUM ('parent', 'child');

-- Create mood enum for children's mood tracking
CREATE TYPE public.mood_type AS ENUM ('very_sad', 'sad', 'neutral', 'happy', 'very_happy');

-- Create profiles table for additional user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL,
  full_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create children table to link children with their parents
CREATE TABLE public.children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  parent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  relationship TEXT DEFAULT 'child',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(child_id, parent_id)
);

-- Create mood_entries table for children's mood tracking
CREATE TABLE public.mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  mood mood_type NOT NULL,
  note TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(child_id, date)
);

-- Create journal_entries table for children's journaling
CREATE TABLE public.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_messages table for AI chat history
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_user BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, role, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role', 'child')::user_role,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User')
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for children relationships
CREATE POLICY "Parents can view their children" ON public.children
  FOR SELECT USING (
    parent_id = auth.uid() OR 
    child_id = auth.uid()
  );

CREATE POLICY "Parents can manage their children" ON public.children
  FOR ALL USING (parent_id = auth.uid());

-- RLS Policies for mood_entries
CREATE POLICY "Children can manage their own mood entries" ON public.mood_entries
  FOR ALL USING (child_id = auth.uid());

CREATE POLICY "Parents can view their children's mood entries" ON public.mood_entries
  FOR SELECT USING (
    child_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM public.children 
      WHERE children.child_id = mood_entries.child_id 
      AND children.parent_id = auth.uid()
    )
  );

-- RLS Policies for journal_entries
CREATE POLICY "Children can manage their own journal entries" ON public.journal_entries
  FOR ALL USING (child_id = auth.uid());

CREATE POLICY "Parents can view their children's journal entries" ON public.journal_entries
  FOR SELECT USING (
    child_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM public.children 
      WHERE children.child_id = journal_entries.child_id 
      AND children.parent_id = auth.uid()
    )
  );

-- RLS Policies for chat_messages
CREATE POLICY "Children can manage their own chat messages" ON public.chat_messages
  FOR ALL USING (child_id = auth.uid());

CREATE POLICY "Parents can view their children's chat messages" ON public.chat_messages
  FOR SELECT USING (
    child_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM public.children 
      WHERE children.child_id = chat_messages.child_id 
      AND children.parent_id = auth.uid()
    )
  );
