// ==============================================================================
// [Unit III: API Development - Route Handlers (route.js)]
// [Unit III: API Development - REST APIs, HTTP Methods (POST)]
// [Unit III: API Development - Request and Response Handling]
// ==============================================================================

import { NextResponse } from "next/server";
import { analyzeScholarship } from "@/lib/analysis-engine";

// [Unit III: HTTP Methods - POST /api/verify]
// Accepts scholarship data in request body and returns detailed risk report
export async function POST(request) {
  try {
    // [Unit III: Request Handling - Parsing JSON body]
    const data = await request.json();

    if (!data.name || data.name.trim() === "") {
      return NextResponse.json(
        { error: "Scholarship name is required" },
        { status: 400 }
      );
    }

    // Run Heuristic Analysis
    const report = analyzeScholarship(data);

    // [Unit III: Response Handling - NextResponse with JSON payload and HTTP 200]
    return NextResponse.json(report, { status: 200 });
  } catch (err) {
    console.error("Verification error:", err);
    return NextResponse.json(
      { error: "Internal server error during analysis" },
      { status: 500 }
    );
  }
}
