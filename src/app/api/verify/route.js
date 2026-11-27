// POST /api/verify – Analyze a scholarship listing (JavaScript)
import { NextResponse } from "next/server";
import { analyzeScholarship } from "@/lib/analysis-engine";

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body?.name?.trim()) {
      return NextResponse.json(
        { error: "Scholarship name is required" },
        { status: 400 }
      );
    }

    const report = analyzeScholarship(body);
    return NextResponse.json(report);
  } catch (err) {
    console.error("Verification error:", err);
    return NextResponse.json(
      { error: "Failed to analyze scholarship" },
      { status: 500 }
    );
  }
}
