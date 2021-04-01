import { sha256 } from "js-sha256";

export class Hash {
  static create(str: string): string {
    const hash = sha256.update(str);
    return hash.hex();
  }
}
