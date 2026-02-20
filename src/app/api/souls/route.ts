import { NextResponse } from "next/server";
import { getSouls } from "@/data/souls";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  
  let souls = getSouls();

  // If a search query is provided, filter the souls
  if (search) {
    const lq = search.toLowerCase();
    souls = souls.filter((s) => 
      s.name.toLowerCase().includes(lq) || 
      s.description.toLowerCase().includes(lq) || 
      (s.tags && s.tags.some(t => t.toLowerCase().includes(lq)))
    );
  }

  return NextResponse.json({
    status: "success",
    count: souls.length,
    data: souls
  });
}