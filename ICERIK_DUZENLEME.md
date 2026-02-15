# İçeriği tek yerden düzenleme (Wix gibi)

Sitedeki **metinleri ve resim yollarını** kodlara dokunmadan tek sayfadan düzenleyebilirsiniz.

## Nasıl kullanılır?

1. **İçerik paneline girin**  
   Siteniz açıkken adres çubuğuna şunu yazın:  
   **`https://mfkdanismanlik.com/panel`**  
   (yerelde: `http://localhost:3000/panel`)

2. **Dil seçin**  
   Türkçe / English / Français.

3. **“İçeriği getir”** butonuna tıklayın.  
   Tüm site metinleri ve resim alanları tek kutuya yüklenecek.

4. **Düzenleyin**  
   Bu kutuda gördüğünüz metinleri doğrudan değiştirin.  
   - Ana sayfa başlığı: `home` → `title`  
   - Menü metinleri: `nav` altında  
   - Hero resmi: `images` → `hero` alanına örn. `/images/hero.jpg` yazın  
   Resim eklemek için önce resmi **public/images/** klasörüne koyun, sonra burada ilgili alana `/images/dosyaadi.jpg` yazın.

5. **Admin şifresini** girin (env’de tanımladığınız `ADMIN_SECRET`).

6. **“Kaydet”** butonuna tıklayın.  
   Değişiklikler kaydedilir; siteyi yenilediğinizde yeni içerik görünür.

## İlk kurulum (bir kez)

- Supabase’de **site_content** tablosunu oluşturun:  
  `supabase/site-content.sql` dosyasının içeriğini Supabase SQL Editor’da çalıştırın.

- `.env` dosyanıza şunları ekleyin (veya `.env.example`’dan kopyalayıp doldurun):  
  - `SUPABASE_SERVICE_ROLE_KEY` (Supabase Dashboard → Settings → API → service_role)  
  - `ADMIN_SECRET` (admin paneline giriş için kullanacağınız şifre)

Bu adımlardan sonra her zaman sadece **/admin** sayfasını açıp oradan düzenlemeniz yeterli; başka dosyaya dokunmanız gerekmez.
