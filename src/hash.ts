export class Hash {
  static create(str: string): string {
    const SHA256 = require("crypto-js/sha256");
    return SHA256(str).toString();
  }
}
