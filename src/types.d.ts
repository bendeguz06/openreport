export interface Report {
    id: string;
    name: string;
    reason: string;
    ipHash?: string;
    createdAt: Date;
}
export interface ReportAdapter {
    save(report: Report): Promise<void>;
    list(): Promise<Report[]>;
}
export interface RawReport {
    name: string;
    reason: string;
    ip?: string;
}
export interface OpenReportConfig {
    adapter: ReportAdapter;
    salt: string;
}
export interface OpenReportClient {
    submit: (report: RawReport) => Promise<void>;
    list: () => Promise<Report[]>;
}
//# sourceMappingURL=types.d.ts.map