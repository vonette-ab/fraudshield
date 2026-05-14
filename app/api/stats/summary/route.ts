import { NextRequest, NextResponse } from "next/server";

const FRAUDSHIELD_API_URL = process.env.FRAUDSHIELD_API_URL || "http://192.168.0.125:8080";

export async function GET(req: NextRequest) {
  try {
    const response = await fetch(`${FRAUDSHIELD_API_URL}/api/stats/summary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.get("Authorization") || "",
        "X-API-Key": process.env.FRAUDSHIELD_API_KEY || "",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("[FraudShield] Stats summary error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats summary" },
      { status: 502 }
    );
  }
}
