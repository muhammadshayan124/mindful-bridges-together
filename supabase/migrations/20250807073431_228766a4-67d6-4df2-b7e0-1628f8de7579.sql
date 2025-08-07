-- Create game_sessions table (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'game_sessions') THEN
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
  END IF;
END $$;

-- Create game_events table (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'game_events') THEN
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
  END IF;
END $$;