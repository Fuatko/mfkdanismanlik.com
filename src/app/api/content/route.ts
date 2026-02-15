import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import type { Locale } from "@/lib/i18n-constants";
import { isValidLocale } from "@/lib/i18n-constants";

function getSupabaseAnon() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key) return null;
  return createClient(url, key);
}

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) return null;
  return createClient(url, key);
}

function getContentFromFile(locale: Locale): Record<string, unknown> {
  const filePath = path.join(process.cwd(), "content", "translations", `${locale}.json`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Record<string, unknown>;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") ?? "tr") as Locale;
  if (!isValidLocale(locale)) {
    return NextResponse.json({ error: "Geçersiz dil" }, { status: 400 });
  }

  const supabase = getSupabaseAnon();
  if (supabase) {
    const { data } = await supabase
      .from("site_content")
      .select("content")
      .eq("locale", locale)
      .single();
    if (data?.content) {
      return NextResponse.json(data.content as Record<string, unknown>);
    }
  }

  try {
    const content = getContentFromFile(locale);
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: "İçerik okunamadı" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const secret = request.headers.get("X-Admin-Secret") ?? request.headers.get("Authorization")?.replace("Bearer ", "");
  const adminSecret = process.env.ADMIN_SECRET?.trim();
  if (!adminSecret || secret !== adminSecret) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  let body: { locale?: string; content?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON" }, { status: 400 });
  }

  const locale = (body.locale ?? "tr") as Locale;
  if (!isValidLocale(locale)) {
    return NextResponse.json({ error: "Geçersiz dil" }, { status: 400 });
  }

  const content = body.content;
  if (!content || typeof content !== "object") {
    return NextResponse.json({ error: "content gerekli" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase service role yapılandırılmamış (SUPABASE_SERVICE_ROLE_KEY)" },
      { status: 503 }
    );
  }

  const { error } = await supabase
    .from("site_content")
    .upsert(
      { locale, content, updated_at: new Date().toISOString() },
      { onConflict: "locale" }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
