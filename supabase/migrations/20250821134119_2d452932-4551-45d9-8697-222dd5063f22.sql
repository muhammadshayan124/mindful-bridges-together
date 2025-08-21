-- Create tables for parent-child linking and data storage

-- ACCOUNTS
CREATE TABLE IF NOT EXISTS parents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE,
  display_name TEXT NOT NULL,
  parent_id UUID REFERENCES parents(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- PARENT↔CHILD LINKING
CREATE TABLE IF NOT EXISTS family_links (
  code TEXT PRIMARY KEY,
  parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_by_child UUID REFERENCES children(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- CHILD DATA (replacing existing tables with new structure)
DROP TABLE IF EXISTS chat_messages CASCADE;
CREATE TABLE chat_messages (
  id BIGSERIAL PRIMARY KEY,
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('user','assistant')) NOT NULL,
  content TEXT NOT NULL,
  sentiment NUMERIC,
  triage_level TEXT CHECK (triage_level IN ('none','low','medium','high')),
  created_at TIMESTAMPTZ DEFAULT now()
);

DROP TABLE IF EXISTS mood_entries CASCADE;
CREATE TABLE moods (
  id BIGSERIAL PRIMARY KEY,
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  mood TEXT NOT NULL,
  mood_score INT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

DROP TABLE IF EXISTS journal_entries CASCADE;
CREATE TABLE journals (
  id BIGSERIAL PRIMARY KEY,
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  sentiment NUMERIC,
  created_at TIMESTAMPTZ DEFAULT now()
);

DROP TABLE IF EXISTS game_sessions CASCADE;
DROP TABLE IF EXISTS game_events CASCADE;
CREATE TABLE game_events (
  id BIGSERIAL PRIMARY KEY,
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  activity TEXT NOT NULL,
  delta INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- DAILY ROLLUPS
CREATE TABLE IF NOT EXISTS sentiment_daily (
  child_id UUID NOT NULL REFERENCES children(id) ON DELETE CASCADE,
  day DATE NOT NULL,
  avg_sentiment NUMERIC,
  high_risk_count INT DEFAULT 0,
  wellbeing_score INT,
  PRIMARY KEY (child_id, day)
);

-- Enable RLS on all tables
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE moods ENABLE ROW LEVEL SECURITY;
ALTER TABLE journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sentiment_daily ENABLE ROW LEVEL SECURITY;

-- RLS policies (service role access only - frontend will use API)
CREATE POLICY "Service role access" ON parents FOR ALL USING (true);
CREATE POLICY "Service role access" ON children FOR ALL USING (true);
CREATE POLICY "Service role access" ON family_links FOR ALL USING (true);
CREATE POLICY "Service role access" ON chat_messages FOR ALL USING (true);
CREATE POLICY "Service role access" ON moods FOR ALL USING (true);
CREATE POLICY "Service role access" ON journals FOR ALL USING (true);
CREATE POLICY "Service role access" ON game_events FOR ALL USING (true);
CREATE POLICY "Service role access" ON sentiment_daily FOR ALL USING (true);