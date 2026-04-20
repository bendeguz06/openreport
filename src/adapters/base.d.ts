import type { ReportAdapter, Report } from "../types.js";
export declare abstract class BaseAdapter implements ReportAdapter {
    abstract save(report: Report): Promise<void>;
    abstract list(): Promise<Report[]>;
}
//# sourceMappingURL=base.d.ts.map