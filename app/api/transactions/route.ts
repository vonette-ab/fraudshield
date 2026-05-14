
import { NextRequest, NextResponse } from "next/server";

const FRAUDSHIELD_API_URL = process.env.FRAUDSHIELD_API_URL || "http://localhost:8080";

export async function GET(req: NextRequest) {
  try {
    // Forward any query params e.g. ?page=1&status=flagged
    const { searchParams } = new URL(req.url);
    const queryString = searchParams.toString();

    const response = await fetch(
      `${FRAUDSHIELD_API_URL}/api/transactions${queryString ? `?${queryString}` : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.get("Authorization") || "",
          "X-API-Key": process.env.FRAUDSHIELD_API_KEY || "",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error("[FraudShield] Fetch transactions error:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 502 }
    );
  }
}