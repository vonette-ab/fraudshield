
import { NextRequest, NextResponse } from "next/server";

const FRAUDSHIELD_BACKEND_URL =
  process.env.FRAUDSHIELD_API_URL || "http://localhost:8080";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(
      `${FRAUDSHIELD_BACKEND_URL}/api/transactions/analyze`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Forward auth token if your backend requires it
          Authorization: req.headers.get("Authorization") || "",
          // FraudShield API key if needed
          "X-API-Key": process.env.FRAUDSHIELD_API_KEY || "",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[FraudShield] Transaction analysis error:", error);
    return NextResponse.json(
      { error: "Failed to connect to FraudShield analysis service" },
      { status: 502 }
    );
  }
}
