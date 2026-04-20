import type { Report } from "../types.js";
import { BaseAdapter } from "./base.js";
export declare class SQLiteAdapter extends BaseAdapter {
    private readonly db;
    constructor(dbPath: string);
    save(report: Report): Promise<void>;
    list(): Promise<Report[]>;
}
//# sourceMappingURL=sqlite.d.ts.map