import { NextResponse } from "next/server";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

export async function fetchFromGAS<T>(
  apiUrl: string | undefined,
  dummyData: T[],
  searchParams: URLSearchParams
) {
  const requestedLimit = parseInt(
    searchParams.get("limit") || String(DEFAULT_LIMIT)
  );
  const limit = Math.min(Math.max(1, requestedLimit), MAX_LIMIT);
  const offset = Math.max(0, parseInt(searchParams.get("offset") || "0"));

  if (!apiUrl) {
    const paginatedData = dummyData.slice(offset, offset + limit);
    const hasMore = offset + limit < dummyData.length;
    return NextResponse.json({
      success: true,
      data: paginatedData,
      hasMore,
      total: dummyData.length,
    });
  }

  try {
    const cacheDuration = parseInt(process.env.CACHE_DURATION || '600');
    // GASにlimit/offsetパラメータを渡す
    const gasUrl = `${apiUrl}?limit=${limit}&offset=${offset}`;
    const response = await fetch(gasUrl, {
      next: { revalidate: cacheDuration },
    });

    const result = await response.json();

    // GAS側でページング済みなので、そのまま返す
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { success: false, error: "データの取得に失敗しました。時間をおいて再度お試しください。" },
      { status: 500 }
    );
  }
}
