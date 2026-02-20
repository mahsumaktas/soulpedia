import { NextResponse } from "next/server";
import { getSouls } from "@/data/souls";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const souls = getSouls();
  const soul = souls.find((s) => s.id === slug);

  if (!soul) {
    return NextResponse.json({ status: "error", message: "Soul not found" }, { status: 404 });
  }

  return NextResponse.json({
    status: "success",
    data: soul
  });
}