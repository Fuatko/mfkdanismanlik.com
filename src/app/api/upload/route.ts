import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "site-images";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) return null;
  return createClient(url, key);
}

/** Sadece bucket oluşturmayı dene (panelden "Bucket'ı oluştur" için) */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("createBucket") !== "1") {
    return NextResponse.json({ error: "createBucket=1 gerekli" }, { status: 400 });
  }
  const secret = request.headers.get("X-Admin-Secret") ?? "";
  const adminSecret = process.env.ADMIN_SECRET?.trim();
  if (!adminSecret || secret !== adminSecret) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_ROLE_KEY tanımlı değil" },
      { status: 503 }
    );
  }
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = Array.isArray(buckets) && buckets.some((b) => b.name === BUCKET);
  if (exists) {
    return NextResponse.json({ ok: true, message: "Bucket zaten var." });
  }
  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: 5242880,
  });
  if (error) {
    const msg = (error.message || "").toLowerCase();
    if (msg.includes("already exists") || msg.includes("duplicate")) {
      return NextResponse.json({ ok: true, message: "Bucket zaten var." });
    }
    return NextResponse.json(
      { error: `Oluşturulamadı: ${error.message}. Aşağıdaki manuel adımları uygulayın.` },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true, message: "Bucket oluşturuldu. Birkaç saniye sonra resim yüklemeyi deneyin." });
}

export async function POST(request: Request) {
  const secret = request.headers.get("X-Admin-Secret") ?? "";
  const adminSecret = process.env.ADMIN_SECRET?.trim();
  if (!adminSecret || secret !== adminSecret) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase service role tanımlı değil" },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Form verisi alınamadı" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file || !file.size) {
    return NextResponse.json({ error: "Dosya seçilmedi" }, { status: 400 });
  }

  const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Sadece resim (jpg, png, gif, webp) yüklenebilir" }, { status: 400 });
  }

  const name = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  // Bucket var mı kontrol et; yoksa oluştur
  let bucketReady = false;
  const { data: buckets, error: listErr } = await supabase.storage.listBuckets();
  if (listErr) {
    // listBuckets hata verirse yine de create dene (bazı projelerde list kısıtlı olabilir)
    bucketReady = false;
  } else {
    bucketReady = Array.isArray(buckets) && buckets.some((b) => b.name === BUCKET);
  }

  if (!bucketReady) {
    const { error: createErr } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 5242880,
    });
    if (createErr) {
      const msg = (createErr.message || "").toLowerCase();
      const alreadyExists = msg.includes("already exists") || msg.includes("duplicate");
      if (!alreadyExists) {
        return NextResponse.json(
          {
            error: `Bucket oluşturulamadı: ${createErr.message}. Supabase Dashboard → Storage → New bucket → İsim: site-images, Public: açık. Oluşturup tekrar deneyin.`,
          },
          { status: 500 }
        );
      }
    }
    // Supabase propagasyonu için yeterli bekleme
    await new Promise((r) => setTimeout(r, 3500));
  }

  const doUpload = () =>
    supabase.storage
      .from(BUCKET)
      .upload(name, file, { contentType: file.type, upsert: false });

  let result = await doUpload();

  // "Bucket not found" ise tekrar oluştur, bekle, iki kez dene
  for (let attempt = 0; attempt < 2 && result.error; attempt++) {
    const msg = (result.error.message || "").toLowerCase();
    if (!msg.includes("bucket") || !msg.includes("not found")) break;
    await supabase.storage.createBucket(BUCKET, { public: true, fileSizeLimit: 5242880 });
    await new Promise((r) => setTimeout(r, attempt === 0 ? 4000 : 6000));
    result = await doUpload();
  }

  if (result.error) {
    const msg = (result.error.message || "").toLowerCase();
    if (msg.includes("bucket") && msg.includes("not found")) {
      return NextResponse.json(
        {
          error:
            "Bucket hazır değil. Panelde sarı kutudaki «Bucket'ı oluşturmayı dene» butonuna tıklayın, 30 sn bekleyin, sonra tekrar resim seçin. Olmazsa: Supabase → Storage → New bucket → site-images (public).",
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: result.error.message }, { status: 500 });
  }

  if (!result.data?.path) {
    return NextResponse.json({ error: "Yükleme sonrası yol alınamadı" }, { status: 500 });
  }
  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(result.data.path);
  return NextResponse.json({ url: urlData.publicUrl });
}
