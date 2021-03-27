import * as crypto from "crypto";

export class Hash {
  static create(str: string): string {
    return crypto.createHash("sha256").update(str).digest("hex");
  }
}
