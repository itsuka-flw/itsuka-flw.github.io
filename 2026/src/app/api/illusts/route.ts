import { NextRequest } from "next/server";
import { DUMMY_ILLUSTS } from "@/data/illusts";
import { fetchFromGAS } from "@/app/api/api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  return fetchFromGAS(
    process.env.GOOGLE_APPS_SCRIPT_ILLUSTS_URL,
    DUMMY_ILLUSTS,
    searchParams
  );
}
