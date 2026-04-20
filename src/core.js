import { createHash } from "crypto";
export function hashIP(ip, salt) {
    return createHash("sha256")
        .update(ip + salt)
        .digest("hex");
}
//# sourceMappingURL=core.js.map