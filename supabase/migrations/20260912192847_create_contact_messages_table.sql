/*
# Create contact_messages table

1. New Tables
- `contact_messages`
  - `id` (uuid, primary key, auto-generated)
  - `company` (text, not null) — name of the company submitting the form
  - `full_name` (text, not null) — full name of the contact person
  - `email` (text, not null) — email address to reply to
  - `need_type` (text, not null) — type of need (web, ai, security, audit, other)
  - `message` (text, not null) — the project description / message body
  - `created_at` (timestamptz, default now()) — when the message was submitted

2. Security
- Enable RLS on `contact_messages`.
- This is a single-tenant app with no sign-in screen, so anon + authenticated roles
  are allowed to INSERT new contact messages (the public contact form).
- SELECT / UPDATE / DELETE are restricted to authenticated only, so the site owner
  can manage messages after signing in, but anon visitors cannot read or modify them.

3. Notes
- The frontend inserts rows using the anon key (no auth required to submit the form).
- Only the site owner (authenticated) can read, update, or delete messages.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  need_type text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon + authenticated) to submit contact messages
DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can read messages (site owner)
DROP POLICY IF EXISTS "auth_select_contact_messages" ON contact_messages;
CREATE POLICY "auth_select_contact_messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users can update messages
DROP POLICY IF EXISTS "auth_update_contact_messages" ON contact_messages;
CREATE POLICY "auth_update_contact_messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

-- Only authenticated users can delete messages
DROP POLICY IF EXISTS "auth_delete_contact_messages" ON contact_messages;
CREATE POLICY "auth_delete_contact_messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (true);
