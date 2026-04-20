import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Report } from "../types.js";
import { BaseAdapter } from "./base.js";

interface ReportRow {
  id: string;
  name: string;
  reason: string;
  ip_hash: string | null;
  created_at: string;
}

export class SupabaseAdapter extends BaseAdapter {
  private readonly client: SupabaseClient;

  constructor() {
    super();
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_ANON_KEY"];
    if (!url) throw new Error("SUPABASE_URL environment variable is not set");
    if (!key) throw new Error("SUPABASE_ANON_KEY environment variable is not set");
    this.client = createClient(url, key);
  }

  async save(report: Report): Promise<void> {
    const { error } = await this.client.from("reports").insert({
      id: report.id,
      name: report.name,
      reason: report.reason,
      ip_hash: report.ipHash ?? null,
      created_at: report.createdAt.toISOString(),
    });
    if (error) throw new Error(`Supabase insert failed: ${error.message}`);
  }

  async list(): Promise<Report[]> {
    const { data, error } = await this.client
      .from("reports")
      .select("*");
    if (error) throw new Error(`Supabase select failed: ${error.message}`);
    return (data as ReportRow[]).map((row) => ({
      id: row.id,
      name: row.name,
      reason: row.reason,
      ...(row.ip_hash != null && { ipHash: row.ip_hash }),
      createdAt: new Date(row.created_at),
    }));
  }
}
