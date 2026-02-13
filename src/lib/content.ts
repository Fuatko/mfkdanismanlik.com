import fs from "fs";
import path from "path";

export interface PageFrontmatter {
  title: string;
  tagline?: string;
  hero_abstract?: string;
}

export interface PageContent {
  slug: string;
  frontmatter: PageFrontmatter;
  body: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "pages");

function parseFrontmatter(content: string): { frontmatter: PageFrontmatter; body: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: { title: "Untitled" }, body: content };
  }
  const [, yaml, body] = match;
  const raw: Record<string, string> = {};
  yaml.split("\n").forEach((line) => {
    const colon = line.indexOf(":");
    if (colon > 0) {
      const key = line.slice(0, colon).trim();
      const value = line.slice(colon + 1).trim().replace(/^["']|["']$/g, "");
      raw[key] = value;
    }
  });
  const frontmatter: PageFrontmatter = {
    title: raw.title ?? "Untitled",
    tagline: raw.tagline,
    hero_abstract: raw.hero_abstract,
  };
  return {
    frontmatter,
    body: body.trim(),
  };
}

export function getPageContent(slug: string): PageContent | null {
  const segments = slug.split("/").filter(Boolean);
  const basePath = path.join(CONTENT_DIR, ...segments);
  const mdPath = path.join(basePath, "index.md");
  const singlePath = basePath + ".md";

  let filePath: string | null = null;
  if (fs.existsSync(mdPath)) filePath = mdPath;
  else if (fs.existsSync(singlePath)) filePath = singlePath;

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { frontmatter, body } = parseFrontmatter(raw);
  return {
    slug,
    frontmatter,
    body,
  };
}

export function getAllPageSlugs(): string[] {
  const slugs: string[] = [];
  function walk(dir: string, prefix: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        walk(full, prefix + e.name + "/");
      } else if (e.name.endsWith(".md")) {
        const base = e.name.replace(/\.md$/, "");
        slugs.push(prefix ? prefix + base : base);
      }
    }
  }
  if (fs.existsSync(CONTENT_DIR)) walk(CONTENT_DIR, "");
  return slugs;
}
