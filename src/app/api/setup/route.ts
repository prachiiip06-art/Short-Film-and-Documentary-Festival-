import { NextResponse } from "next/server";
import { execSync } from "child_process";
import path from "path";

export async function POST() {
  // Only allow in environments where DATABASE_URL is present
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { error: "DATABASE_URL is not set. Add it in Vercel → Settings → Environment Variables." },
      { status: 400 }
    );
  }

  try {
    // prisma db push is the no-terminal friendly way for students
    // It creates/updates tables without requiring migration history management
    const root = process.cwd();
    execSync("npx prisma db push --accept-data-loss --skip-generate", {
      cwd: root,
      env: process.env,
      stdio: "pipe"
    });

    // Run seed
    execSync("npx tsx prisma/seed.ts", {
      cwd: root,
      env: process.env,
      stdio: "pipe"
    });

    return NextResponse.json({
      success: true,
      message: "Database schema applied and Frame By Frame seed data loaded."
    });
  } catch (error: any) {
    console.error("Setup error:", error);
    const msg = error?.stderr?.toString?.() || error?.message || "Unknown error during setup";
    return NextResponse.json(
      { error: "Setup failed: " + msg.slice(0, 500) },
      { status: 500 }
    );
  }
}
