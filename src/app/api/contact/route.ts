import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(request: Request) {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      { success: false, error: "Sunucu yapılandırması eksik" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Ad, e-posta ve mesaj alanları zorunludur" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("contact_submissions").insert({
      name: name.trim().slice(0, 200),
      email: email.trim().slice(0, 200),
      message: message.trim().slice(0, 5000),
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: "Kayıt alınamadı" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Beklenmeyen hata" },
      { status: 500 }
    );
  }
}
