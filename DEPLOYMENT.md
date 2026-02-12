# mfkdanismanlik.com — Yayına Alma Rehberi

## 1. Supabase Kurulumu

### 1.1 Tabloyu Oluşturma

1. [Supabase Dashboard](https://supabase.com/dashboard) → Projeniz
2. Sol menüden **SQL Editor** seçin
3. **New query** ile yeni sorgu açın
4. `supabase/contact-submissions.sql` dosyasının içeriğini yapıştırın
5. **Run** ile çalıştırın

### 1.2 API Bilgilerini Alma

1. Sol menüden **Settings** → **API**
2. Şunları not alın:
   - **Project URL** (örn: `https://xxxxx.supabase.co`)
   - **anon public** key

---

## 2. Yerel Geliştirme

1. Proje kökünde `.env.local` dosyası oluşturun:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

2. Bağımlılıkları yükleyin ve çalıştırın:

```bash
npm install
npm run dev
```

3. http://localhost:3000/contact adresinde formu test edin

---

## 3. Vercel’e Deploy

### 3.1 Vercel Hesabı ve Proje

1. [vercel.com](https://vercel.com) → GitHub/GitLab/Bitbucket ile giriş
2. **Add New** → **Project**
3. `consulting-website` klasörünü seçin (veya GitHub’a push edip oradan import edin)

### 3.2 Environment Variables

Vercel Proje → **Settings** → **Environment Variables**:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |

**Deploy** ile yayına alın.

---

## 4. Domain (mfkdanismanlik.com) Bağlama

### 4.1 Vercel’de Domain Ekleme

1. Vercel Proje → **Settings** → **Domains**
2. `mfkdanismanlik.com` ve `www.mfkdanismanlik.com` ekleyin
3. Vercel size verdiği DNS kayıtlarını not alın

### 4.2 DNS Ayarları

Domain’i **Wix’te** veya **registrar’da** yönetiyorsanız:

- Wix: **Domains** → **Manage** → **DNS Records**
- Diğer (GoDaddy, Namecheap vb.): DNS / Nameservers bölümü

Vercel’in verdiği A veya CNAME kayıtlarını ekleyin:

**Örnek:**
- Type: `A` → Name: `@` → Value: `76.76.21.21`
- Type: `CNAME` → Name: `www` → Value: `cname.vercel-dns.com`

(Wix’ten domain kullanıyorsanız, Wix’in kendi hosting’ini kapatıp sadece DNS ile Vercel’e yönlendirmeniz gerekebilir.)

---

## 5. İletişim Bilgilerini Güncelleme

`content/pages/contact.md` ve `src/app/contact/page.tsx` içindeki e-posta, telefon ve adresi MFK Danışmanlık bilgileriyle güncelleyin.
