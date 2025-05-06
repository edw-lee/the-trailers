import { GetFeaturedTrailersResponseDto } from "@/dtos/trailers/GetFeaturedTrailersResponseDto";
import { createServerClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = await createServerClient();

  try {
    const { data, error } = await supabase      
      .from("random_featured_trailers")
      .select()
      .limit(10);

      if (error) {
      throw error;
    }

    const response: GetFeaturedTrailersResponseDto = {
      results: data,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
