// GET /api/reports – List all reports
// GET /api/reports?id=xxx – Get a single report
import { NextRequest, NextResponse } from "next/server";
import { getAllReports, getReportById } from "@/lib/database";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (id) {
    const record = getReportById(id);
    if (!record) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }
    return NextResponse.json(record);
  }

  return NextResponse.json(getAllReports());
}
