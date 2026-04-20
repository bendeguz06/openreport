import type { Report } from "../types.js";
import { BaseAdapter } from "./base.js";
export declare class SupabaseAdapter extends BaseAdapter {
    private readonly client;
    constructor();
    save(report: Report): Promise<void>;
    list(): Promise<Report[]>;
}
//# sourceMappingURL=supabase.d.ts.map