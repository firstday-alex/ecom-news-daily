import { NextResponse } from "next/server";
import { getDigest, saveDigest, getLatestDate } from "@/lib/kv";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const date = new URL(_req.url).searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "Missing date param" }, { status: 400 });
  }

  const digest = await getDigest(date);
  if (!digest) {
    return NextResponse.json({ error: "Digest not found" }, { status: 404 });
  }

  const filtered = digest.articles.filter((a) => a.id !== id);
  if (filtered.length === digest.articles.length) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  await saveDigest({
    ...digest,
    articles: filtered,
    articleCount: filtered.length,
  });

  return NextResponse.json({ ok: true });
}
