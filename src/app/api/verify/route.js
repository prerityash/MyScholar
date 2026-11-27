// POST /api/verify – Analyze a scholarship listing with Zod validation
import { NextResponse } from "next/server";
import { analyzeScholarship } from "@/lib/analysis-engine";
import { scholarshipInputSchema, formatZodError } from "@/lib/schemas";

export async function POST(request) {
  try {
    const rawBody = await request.json();

    // Validate input payload with Zod
    const validation = scholarshipInputSchema.safeParse(rawBody);
    if (!validation.success) {
      return NextResponse.json(
        { error: formatZodError(validation.error) },
        { status: 400 }
      );
    }

    // Pass validated & sanitized data into the heuristic analysis engine
    const report = analyzeScholarship(validation.data);
    return NextResponse.json(report);
  } catch (err) {
    console.error("Verification error:", err);
    return NextResponse.json(
      { error: "Failed to analyze scholarship" },
      { status: 500 }
    );
  }
}
