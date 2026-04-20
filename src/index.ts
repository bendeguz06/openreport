import { hashIP } from "./core.js";
import type { ReportAdapter, Report } from "./types.js";
import type { OpenReportConfig, OpenReportClient } from "./types.js";

export function createOpenReport(config: OpenReportConfig): OpenReportClient {
  return {
    async submit(report) {
      const anonymized: Report = {
        id: crypto.randomUUID(),
        name: report.name,
        reason: report.reason,
        ...(report.ip && { ipHash: hashIP(report.ip, config.salt) }),
        createdAt: new Date(),
      }; // or "exactOptionalPropertyTypes": false
      await config.adapter.save(anonymized);
    },
    async list() {
      return config.adapter.list();
    },
  };
}
