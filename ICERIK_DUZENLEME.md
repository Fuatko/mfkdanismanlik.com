# İçeriği tek yerden düzenleme (Wix gibi)

Sitedeki **metinleri ve resim yollarını** kodlara dokunmadan tek sayfadan düzenleyebilirsiniz.

---

## Ne yapıyorum? (Özet)

**Vercel’de 4 değişken** tanımlı olmalı:

| Değişken | Ne işe yarıyor? | Nereden alınır? |
|----------|-----------------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase projenize bağlanır | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Genel site erişimi | Supabase → Settings → API → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | **Kaydet** ve **resim yükle** işlemleri (gizli) | Supabase → Settings → API → service_role (gizli) |
| `ADMIN_SECRET` | Panelde girdiğiniz şifre; sadece bu şifreyi bilen kaydedebilir | Kendiniz belirleyin (örn. güçlü bir şifre) |

**Supabase’de 2 şey** (bir kez yapılır):

1. **Tablo:** `site_content` — içerik burada saklanır.  
   `supabase/site-content.sql` dosyasını Supabase SQL Editor’da çalıştırın.
2. **Storage bucket:** `site-images` — yüklediğiniz resimler buraya gider.  
   Supabase → Storage → New bucket → İsim: **site-images**, Public bucket ✓ → Create.

**Panelde ne yapıyorsunuz?**

1. **Şifre** = Vercel’de yazdığınız `ADMIN_SECRET`. Bunu paneldeki “Admin şifresi” kutusuna giriyorsunuz; böylece “Kaydet” ve “Resim yükle” çalışır.
2. **Resim:** “Bilgisayardan resim seç” → dosyayı seçin → yükleme **Supabase Storage**’a gider. Sonra **“Kaydet”**e basın ki bu resim adresi içeriğe yazılsın.
3. **Kaydet** = Metin + resim URL’leri Supabase’deki `site_content` tablosuna yazılır.

Yani: **Değişkenler tanımlı** = Vercel’de bu 4 değişken var. **Sizin yapmanız gereken** = Supabase’de bucket’ı oluşturmak (yoksa “Bucket not found” çıkar), panelde şifreyi girip resim yükleyip “Kaydet” demek.

---

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
