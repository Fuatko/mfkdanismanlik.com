import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "public", "images");
    if (!fs.existsSync(dir)) {
      return NextResponse.json([]);
    }
    const files = fs
      .readdirSync(dir)
      .filter(
        (f) =>
          !f.startsWith(".") &&
          f !== "README.md" &&
          /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f)
      )
      .map((f) => "/images/" + f)
      .sort();
    return NextResponse.json(files);
  } catch {
    return NextResponse.json([]);
  }
}
