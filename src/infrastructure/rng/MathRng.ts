import type { RandomNumberGenerator } from "../../domain/ports/RandomNumberGenerator.js";

export class MathRng implements RandomNumberGenerator {
  async generate(min: number, max: number): Promise<number> {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}