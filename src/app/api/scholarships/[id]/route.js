// ==============================================================================
// [Unit III: API Development - Dynamic Route Handlers (/api/scholarships/[id])]
// [Unit III: API Development - REST APIs, HTTP Methods (GET, DELETE)]
// [Unit III: API Development - Request and Response Handling]
// ==============================================================================

import { NextResponse } from "next/server";
import { ScholarshipDB } from "@/lib/db";

// [Unit III: HTTP Methods - GET /api/scholarships/[id]]
export async function GET(request, { params }) {
  const { id } = await params;
  const item = await ScholarshipDB.findById(id);

  if (!item) {
    return NextResponse.json(
      { success: false, error: "Scholarship not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: item });
}

// [Unit III: HTTP Methods - DELETE /api/scholarships/[id]]
export async function DELETE(request, { params }) {
  const { id } = await params;
  const deleted = await ScholarshipDB.delete(id);

  if (!deleted) {
    return NextResponse.json(
      { success: false, error: "Scholarship not found or already deleted" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: `Scholarship ${id} deleted successfully`,
  });
}
