import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { success: false, error: "API URL not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(apiUrl, {
      next: { revalidate: 60 },
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
