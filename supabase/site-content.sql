-- Site içeriği (metin + resim yolları) - Admin panelinden düzenlenir
-- Supabase SQL Editor'da bu dosyayı çalıştırın

CREATE TABLE IF NOT EXISTS site_content (
  locale TEXT PRIMARY KEY,
  content JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Herkes (anon) sadece okuyabilsin; yazma sadece sunucu tarafından (service role) yapılacak
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read"
  ON site_content
  FOR SELECT
  TO anon
  USING (true);

-- INSERT/UPDATE anon'a kapalı (admin sadece API üzerinden şifre ile yapacak, API service role kullanacak)
