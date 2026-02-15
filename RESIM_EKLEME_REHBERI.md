# Resim Ekleme ve Düzenleme Rehberi

## 📁 Resim Ekleme

### 1. Resimleri Klasöre Kopyalama

Resimlerinizi `public/images/` klasörüne kopyalayın:

```bash
# Örnek: hero-image.jpg dosyasını eklemek için
cp /yol/resimleriniz/hero-image.jpg public/images/
```

### 2. Ana Sayfaya Hero Resmi Ekleme

Ana sayfaya hero resmi eklemek için `src/app/[locale]/page.tsx` dosyasını düzenleyin:

```tsx
<HeroPlaceholder
  title={(home?.title as string) ?? ""}
  tagline={(home?.tagline as string) ?? ""}
  abstract={(home?.hero_abstract as string) ?? ""}
  size="full"
  imageUrl="/images/hero-image.jpg"  // ← Bu satırı ekleyin
  imageAlt="MFK Danışmanlık"         // ← Bu satırı ekleyin
/>
```

### 3. Diğer Sayfalara Resim Ekleme

#### Hakkımızda Sayfası (`src/app/[locale]/about/page.tsx`)
```tsx
import Image from "next/image";

// Component içinde:
<Image
  src="/images/team-photo.jpg"
  alt="MFK Danışmanlık Ekibi"
  width={800}
  height={600}
  className="rounded-lg"
/>
```

#### Hizmetler Sayfası (`src/app/[locale]/services/page.tsx`)
```tsx
import Image from "next/image";

<Image
  src="/images/service-image.jpg"
  alt="Hizmet Açıklaması"
  width={600}
  height={400}
/>
```

## 🎨 Resim Formatları ve Boyutları

### Önerilen Formatlar:
- **Hero/Banner**: JPG veya WebP (1920x1080px veya daha büyük)
- **Genel kullanım**: WebP (daha küçük dosya boyutu) veya JPG
- **İkonlar/Logolar**: SVG veya PNG (transparent arka plan için)

### Önerilen Boyutlar:
- Hero resimleri: 1920x1080px veya daha büyük
- Kart/İkon resimleri: 800x600px
- Küçük resimler: 400x300px

## ✏️ İçerik Düzenleme

### Metinleri Değiştirme

Tüm metinler `content/translations/` klasöründeki JSON dosyalarında:

- **Türkçe**: `content/translations/tr.json`
- **İngilizce**: `content/translations/en.json`
- **Fransızca**: `content/translations/fr.json`

### Örnek: Ana Sayfa Başlığını Değiştirme

`content/translations/tr.json` dosyasında:

```json
{
  "home": {
    "title": "Yeni Başlık Buraya",
    "tagline": "Yeni alt başlık buraya"
  }
}
```

### Örnek: Menü Öğelerini Değiştirme

```json
{
  "nav": {
    "home": "Ana Sayfa",
    "services": "Hizmetler",
    "methodology": "Metodoloji"
  }
}
```

## 🔧 Teknik Detaylar

### Next.js Image Component Kullanımı

Next.js'in Image component'i otomatik olarak:
- Resimleri optimize eder
- Lazy loading yapar
- Responsive boyutlandırma yapar

### Resim Yolu Formatı

- `public/images/hero.jpg` → `/images/hero.jpg` olarak kullanılır
- `public/` klasörü root olarak kabul edilir

## 📝 Örnek Senaryolar

### Senaryo 1: Ana Sayfaya Hero Resmi Eklemek

1. Resmi kopyala: `cp hero.jpg public/images/`
2. `src/app/[locale]/page.tsx` dosyasını aç
3. `HeroPlaceholder` component'ine `imageUrl="/images/hero.jpg"` ekle

### Senaryo 2: Hakkımızda Sayfasına Ekip Fotoğrafı Eklemek

1. Resmi kopyala: `cp team.jpg public/images/`
2. `src/app/[locale]/about/page.tsx` dosyasını aç
3. `Image` component'ini import et ve kullan

### Senaryo 3: İletişim Bilgilerini Güncellemek

1. `content/translations/tr.json` dosyasını aç
2. `contact` bölümünü bul ve güncelle:
```json
{
  "contact": {
    "email": "info@mfkdanismanlik.com",
    "phone": "+90 XXX XXX XX XX",
    "address": "Adresiniz buraya"
  }
}
```

## 🚀 Değişiklikleri Test Etme

1. Development server'ı başlat:
```bash
npm run dev
```

2. Tarayıcıda `http://localhost:3000` adresini aç

3. Değişiklikleri kontrol et

## 📦 Production'a Deploy

Değişiklikleri production'a göndermek için:

```bash
npm run build
npm start
```

Veya hosting sağlayıcınızın (Vercel, Netlify, vb.) otomatik deploy özelliğini kullanın.
