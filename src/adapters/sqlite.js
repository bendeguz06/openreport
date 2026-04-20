import Database from "better-sqlite3";
import { BaseAdapter } from "./base.js";
export class SQLiteAdapter extends BaseAdapter {
    db;
    constructor(dbPath) {
        super();
        this.db = new Database(dbPath);
        this.db.exec(`
      CREATE TABLE IF NOT EXISTS reports (
        id         TEXT PRIMARY KEY,
        name       TEXT NOT NULL,
        reason     TEXT NOT NULL,
        ip_hash    TEXT,
        created_at TEXT NOT NULL
      )
    `);
    }
    save(report) {
        const stmt = this.db.prepare("INSERT INTO reports (id, name, reason, ip_hash, created_at) VALUES (?, ?, ?, ?, ?)");
        stmt.run(report.id, report.name, report.reason, report.ipHash ?? null, report.createdAt.toISOString());
        return Promise.resolve();
    }
    list() {
        const rows = this.db.prepare("SELECT * FROM reports").all();
        const reports = rows.map((row) => ({
            id: row.id,
            name: row.name,
            reason: row.reason,
            ...(row.ip_hash != null && { ipHash: row.ip_hash }),
            createdAt: new Date(row.created_at),
        }));
        return Promise.resolve(reports);
    }
}
//# sourceMappingURL=sqlite.js.map