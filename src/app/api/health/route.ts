import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { recipes } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  const startTime = Date.now();

  try {
    // Provjeri database konekciju
    await db
      .select({ count: sql<number>`1` })
      .from(recipes)
      .limit(1);

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: "connected",
      responseTime: `${Date.now() - startTime}ms`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}
