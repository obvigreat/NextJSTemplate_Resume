-- Enable RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create policies for documents table
CREATE POLICY "Enable read access for all users" ON documents
    FOR SELECT USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON documents
    FOR INSERT WITH CHECK (true);

-- Storage policies
BEGIN;
  -- Create a policy to allow public read access
  INSERT INTO storage.policies (name, definition)
  VALUES (
    'Public Read Access',
    '(bucket_id = ''documents'')'
  );

  -- Create a policy to allow authenticated users to upload files
  INSERT INTO storage.policies (name, definition)
  VALUES (
    'Allow Uploads',
    '(bucket_id = ''documents'')'
  );
COMMIT; 