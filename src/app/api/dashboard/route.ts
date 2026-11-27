// GET /api/dashboard – Dashboard statistics
import { NextResponse } from "next/server";
import { getDashboardStats } from "@/lib/database";

export async function GET() {
  return NextResponse.json(getDashboardStats());
}
