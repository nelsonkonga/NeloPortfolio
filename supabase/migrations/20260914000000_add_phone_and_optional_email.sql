/*
# Add phone column and make email optional in contact_messages

1. Changes
  - Add phone column (text)
  - Alter email column to DROP NOT NULL
*/

ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE contact_messages ALTER COLUMN email DROP NOT NULL;
