import { NextRequest } from "next/server";
import { DUMMY_MESSAGES } from "@/data/messages";
import { fetchFromGAS } from "@/app/api/api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  return fetchFromGAS(
    process.env.GOOGLE_APPS_SCRIPT_MESSAGES_URL,
    DUMMY_MESSAGES,
    searchParams
  );
}
