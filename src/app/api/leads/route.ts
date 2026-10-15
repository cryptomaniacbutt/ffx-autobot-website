import { NextRequest, NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, plan, message } = body ?? {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { ok: false, error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const result = await saveLead({
      name: name.trim().slice(0, 120),
      email: email.trim().toLowerCase().slice(0, 190),
      plan: typeof plan === "string" ? plan.slice(0, 60) : "",
      message: typeof message === "string" ? message.trim().slice(0, 2000) : "",
    });

    return NextResponse.json({ ok: true, id: result.id });
  } catch (error) {
    console.error("[leads] failed to save lead:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
