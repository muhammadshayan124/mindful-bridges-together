-- Create mood_type enum
CREATE TYPE mood_type AS ENUM ('very_sad', 'sad', 'neutral', 'happy', 'very_happy');

-- Create mood_entries table
CREATE TABLE mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL,
  mood mood_type NOT NULL,
  note TEXT,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(child_id, date)
);

-- Enable RLS on mood_entries
ALTER TABLE mood_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for mood_entries
CREATE POLICY "Children can manage their own mood entries" 
ON mood_entries 
FOR ALL 
USING (child_id = auth.uid());

CREATE POLICY "Parents can view their children's mood entries" 
ON mood_entries 
FOR SELECT 
USING (
  child_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM children 
    WHERE children.child_id = mood_entries.child_id 
    AND children.parent_id = auth.uid()
  )
);

-- Create journal_entries table
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  sentiment_score FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on journal_entries
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for journal_entries
CREATE POLICY "Children can manage their own journal entries" 
ON journal_entries 
FOR ALL 
USING (child_id = auth.uid());

CREATE POLICY "Parents can view their children's journal entries" 
ON journal_entries 
FOR SELECT 
USING (
  child_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM children 
    WHERE children.child_id = journal_entries.child_id 
    AND children.parent_id = auth.uid()
  )
);

-- Create game_sessions table
CREATE TABLE game_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL,
  game_name TEXT NOT NULL,
  mood_before mood_type,
  mood_after mood_type,
  start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on game_sessions
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for game_sessions
CREATE POLICY "Children can manage their own game sessions" 
ON game_sessions 
FOR ALL 
USING (child_id = auth.uid());

CREATE POLICY "Parents can view their children's game sessions" 
ON game_sessions 
FOR SELECT 
USING (
  child_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM children 
    WHERE children.child_id = game_sessions.child_id 
    AND children.parent_id = auth.uid()
  )
);

-- Create game_events table
CREATE TABLE game_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES game_sessions(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  value TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on game_events
ALTER TABLE game_events ENABLE ROW LEVEL SECURITY;

-- Create policies for game_events
CREATE POLICY "Children can manage their own game events" 
ON game_events 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM game_sessions 
    WHERE game_sessions.id = game_events.session_id 
    AND game_sessions.child_id = auth.uid()
  )
);

CREATE POLICY "Parents can view their children's game events" 
ON game_events 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM game_sessions gs
    JOIN children c ON c.child_id = gs.child_id
    WHERE gs.id = game_events.session_id 
    AND (gs.child_id = auth.uid() OR c.parent_id = auth.uid())
  )
);

-- Create trigger function for updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for journal_entries
CREATE TRIGGER update_journal_entries_updated_at
  BEFORE UPDATE ON journal_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();