import { randomInt } from "crypto";
import type { RandomNumberGenerator } from "../../domain/ports/RandomNumberGenerator.js";

export class CryptoRng implements RandomNumberGenerator {
  async generate(min: number, max: number): Promise<number> {
    return await new Promise<number>((resolve, reject) =>
      randomInt(min, max + 1, (err, n) => (err ? reject(err) : resolve(n)))
    );
  }
}