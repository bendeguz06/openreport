import { hashIP } from "./core.js";
import type { WhistleAdapter, Whistle } from "./types.js";
import type { OpenWhistleConfig, OpenWhistleClient } from "./types.js";

export type { Whistle, WhistleAdapter, RawWhistle, OpenWhistleConfig, OpenWhistleClient } from "./types.js";
export { SQLiteAdapter } from "./adapters/sqlite.js";
export { SupabaseAdapter } from "./adapters/supabase.js";
export { BaseAdapter } from "./adapters/base.js";

export function createOpenWhistle(config: OpenWhistleConfig): OpenWhistleClient {
  return {
    async submit(whistle) {
      const anonymized: Whistle = {
        id: crypto.randomUUID(),
        name: whistle.name,
        reason: whistle.reason,
        ...(whistle.ip && { ipHash: hashIP(whistle.ip, config.salt) }),
        createdAt: new Date(),
      };
      await config.adapter.save(anonymized);
    },
    async list() {
      return config.adapter.list();
    },
  };
}
