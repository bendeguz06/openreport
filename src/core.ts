import { createHash } from "crypto";

export function hashIP(ip: string, salt: string): string {
  return createHash("sha256")
    .update(ip + salt)
    .digest("hex");
}
