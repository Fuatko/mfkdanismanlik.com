# Resimler Klasörü

Bu klasöre web sitenizde kullanmak istediğiniz resimleri ekleyebilirsiniz.

## Kullanım

1. Resimlerinizi bu klasöre kopyalayın (örn: `hero-image.jpg`, `about-team.jpg`)
2. Next.js'te resimler `/images/` yolu ile erişilebilir
3. Örnek: `/images/hero-image.jpg` → `public/images/hero-image.jpg` dosyasına karşılık gelir

## Önerilen Formatlar

- **Hero/Banner resimleri**: JPG veya WebP (1920x1080 veya daha büyük)
- **İkonlar/Logolar**: SVG veya PNG (transparent arka plan için)
- **Genel kullanım**: WebP (daha küçük dosya boyutu) veya JPG

## Resim Boyutları Önerileri

- Hero resimleri: 1920x1080px veya daha büyük
- Kart/İkon resimleri: 800x600px
- Küçük resimler: 400x300px

## Örnek Kullanım

Ana sayfada hero resmi eklemek için `src/app/[locale]/page.tsx` dosyasında:

```tsx
<HeroPlaceholder
  title="..."
  imageUrl="/images/hero-image.jpg"
  imageAlt="MFK Danışmanlık Hero"
/>
```
