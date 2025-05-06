import { searchMovies } from "@/services/server/moviesService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const results = await searchMovies(
      request.nextUrl.searchParams.get("query") || ""
    );

    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
