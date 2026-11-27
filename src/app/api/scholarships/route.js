// ==============================================================================
// [Unit III: API Development - Route Handlers, REST APIs & HTTP Methods]
// [Unit III: API Development - Request and Response Handling]
// [Unit IV: Database Integration - CRUD Operations (Read All, Create)]
// ==============================================================================

import { NextResponse } from "next/server";
import { ScholarshipDB } from "@/lib/db";

// [Unit III: HTTP Methods - GET /api/scholarships]
// REST API endpoint returning verified listings
export async function GET() {
  try {
    const data = await ScholarshipDB.findAll();
    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// [Unit III: HTTP Methods - POST /api/scholarships]
// REST API endpoint to add new scholarship listing
export async function POST(request) {
  try {
    const body = await request.json();
    const created = await ScholarshipDB.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Scholarship created successfully",
        data: created,
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
}
