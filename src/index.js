import { hashIP } from "./core.js";
export function createOpenReport(config) {
    return {
        async submit(report) {
            const anonymized = {
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
//# sourceMappingURL=index.js.map