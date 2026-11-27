// POST /api/verify – Analyze a scholarship listing
import { NextRequest, NextResponse } from "next/server";
import { analyzeScholarship } from "@/lib/analysis-engine";
import { saveReport } from "@/lib/database";
import { ScholarshipInput } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ScholarshipInput;

    // Basic validation
    if (!body.name?.trim()) {
      return NextResponse.json(
        { error: "Scholarship name is required" },
        { status: 400 }
      );
    }

    const report = analyzeScholarship(body);
    saveReport(report);

    return NextResponse.json(report);
  } catch (err) {
    console.error("Verification error:", err);
    return NextResponse.json(
      { error: "Failed to analyze scholarship" },
      { status: 500 }
    );
  }
}
