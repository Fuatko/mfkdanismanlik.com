-- İletişim formu gönderimleri için tablo
-- Supabase SQL Editor'da bu dosyayı çalıştırın

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Anon kullanıcıların sadece INSERT yapabilmesi için RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);
