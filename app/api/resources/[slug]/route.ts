import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { verifyDownloadToken } from "@/lib/leads/token";
import { resourceBySlug } from "@/lib/resources";

export const runtime = "nodejs";

/** Serves a gated PDF only to a visitor holding a signed link from the lead form. */
export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = resourceBySlug.get(slug);
  if (!resource) return NextResponse.json({ message: "Not found." }, { status: 404 });

  const token = new URL(request.url).searchParams.get("token");
  if (!verifyDownloadToken(slug, token)) {
    return NextResponse.json({ message: "This download link has expired. Request the resource again." }, { status: 403 });
  }

  try {
    const file = await readFile(path.join(process.cwd(), "content", "resources", "files", resource.file));
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "content-type": "application/pdf",
        "content-disposition": `attachment; filename="${resource.file}"`,
        "cache-control": "private, no-store",
      },
    });
  } catch {
    return NextResponse.json({ message: "The file is not available yet." }, { status: 404 });
  }
}
