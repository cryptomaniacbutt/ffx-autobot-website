/**
 * Unified lead storage.
 *
 * - Production (Vercel): saves leads to a Turso database (libsql) when
 *   TURSO_DATABASE_URL + TURSO_AUTH_TOKEN are configured.
 * - Local / sandbox: falls back to the local SQLite database via Prisma,
 *   so development keeps working with zero extra setup.
 *
 * Table schema (Turso — create once, see deployment guide):
 *   CREATE TABLE IF NOT EXISTS "Lead" (
 *     "id"        INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
 *     "name"      TEXT NOT NULL,
 *     "email"     TEXT NOT NULL,
 *     "plan"      TEXT NOT NULL DEFAULT '',
 *     "message"   TEXT NOT NULL DEFAULT '',
 *     "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
 *   );
 */

export interface LeadInput {
  name: string;
  email: string;
  plan: string;
  message: string;
}

export interface SaveLeadResult {
  ok: boolean;
  id: number;
  storage: "turso" | "local";
}

export function usingTurso(): boolean {
  return Boolean(process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN);
}

export async function saveLead(input: LeadInput): Promise<SaveLeadResult> {
  if (usingTurso()) {
    // Production path — Turso (libsql)
    const { createClient } = await import("@libsql/client");
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL as string,
      authToken: process.env.TURSO_AUTH_TOKEN as string,
    });
    const result = await client.execute({
      sql: 'INSERT INTO "Lead" ("name", "email", "plan", "message") VALUES (?, ?, ?, ?)',
      args: [input.name, input.email, input.plan, input.message],
    });
    return { ok: true, id: Number(result.lastInsertRowid ?? 0), storage: "turso" };
  }

  // Local path — SQLite via Prisma (development / sandbox)
  const { db } = await import("@/lib/db");
  const lead = await db.lead.create({ data: input });
  return { ok: true, id: lead.id, storage: "local" };
}
