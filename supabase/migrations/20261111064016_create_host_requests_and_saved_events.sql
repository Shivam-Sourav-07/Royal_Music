/*
# Create host requests and saved events tables

1. Overview
This migration adds two new tables that support user-facing features of the Royal Music app:
  - `event_host_requests` — stores a user's request to host their own event on the platform.
  - `user_saved_events` — stores the events a user has marked as "attending" or "attended".
Both tables are owner-scoped: each authenticated user can only see and manage their own rows.
The app uses Supabase email/password auth, so policies target the `authenticated` role only.

2. New Tables

  a) `event_host_requests`
    - id           uuid, primary key
    - user_id      uuid, NOT NULL, defaults to auth.uid(), references auth.users ON DELETE CASCADE
    - title        text, NOT NULL — proposed event title
    - artist       text, NOT NULL — performer / host name
    - category     text, NOT NULL — music genre (one of the app's 12 categories)
    - description  text, NOT NULL — details about the proposed event
    - event_date   date, NOT NULL — requested event date
    - start_time   text, NOT NULL — 24h start time HH:mm
    - end_time     text, NOT NULL — 24h end time HH:mm
    - venue        text, NOT NULL — venue name
    - location     text, NOT NULL — city / country
    - expected_attendance integer, default 0 — estimated audience size
    - contact_email text, NOT NULL — email to reach the requester
    - status       text, NOT NULL DEFAULT 'pending' — review status: pending / approved / declined
    - created_at   timestamptz, default now()

  b) `user_saved_events`
    - id           uuid, primary key
    - user_id      uuid, NOT NULL, defaults to auth.uid(), references auth.users ON DELETE CASCADE
    - event_id     text, NOT NULL — references the static sample event id (string, not a FK since events are in-code)
    - created_at   timestamptz, default now()
    - UNIQUE (user_id, event_id) — a user can save an event only once

3. Security
  - RLS ENABLED on both tables.
  - Grants: SELECT, INSERT, UPDATE, DELETE on both tables TO authenticated only.
    No anon grants — these features require a signed-in user.
  - Policies on both tables are owner-scoped via auth.uid() = user_id (4 policies each: select/insert/update/delete).
  - The user_id column defaults to auth.uid() so frontend inserts that omit user_id succeed.
*/

-- ──────────────── event_host_requests ────────────────
CREATE TABLE IF NOT EXISTS event_host_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  artist text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  event_date date NOT NULL,
  start_time text NOT NULL,
  end_time text NOT NULL,
  venue text NOT NULL,
  location text NOT NULL,
  expected_attendance integer NOT NULL DEFAULT 0,
  contact_email text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE event_host_requests ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON event_host_requests TO authenticated;

DROP POLICY IF EXISTS "select_own_host_requests" ON event_host_requests;
CREATE POLICY "select_own_host_requests"
ON event_host_requests FOR SELECT
TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_host_requests" ON event_host_requests;
CREATE POLICY "insert_own_host_requests"
ON event_host_requests FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_host_requests" ON event_host_requests;
CREATE POLICY "update_own_host_requests"
ON event_host_requests FOR UPDATE
TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_host_requests" ON event_host_requests;
CREATE POLICY "delete_own_host_requests"
ON event_host_requests FOR DELETE
TO authenticated USING (auth.uid() = user_id);

-- ──────────────── user_saved_events ────────────────
CREATE TABLE IF NOT EXISTS user_saved_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, event_id)
);

ALTER TABLE user_saved_events ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON user_saved_events TO authenticated;

DROP POLICY IF EXISTS "select_own_saved_events" ON user_saved_events;
CREATE POLICY "select_own_saved_events"
ON user_saved_events FOR SELECT
TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_saved_events" ON user_saved_events;
CREATE POLICY "insert_own_saved_events"
ON user_saved_events FOR INSERT
TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_saved_events" ON user_saved_events;
CREATE POLICY "update_own_saved_events"
ON user_saved_events FOR UPDATE
TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_saved_events" ON user_saved_events;
CREATE POLICY "delete_own_saved_events"
ON user_saved_events FOR DELETE
TO authenticated USING (auth.uid() = user_id);
