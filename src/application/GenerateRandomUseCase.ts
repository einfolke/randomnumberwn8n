import { Range } from "../domain/entities/Range.js";
import type { RandomNumberGenerator } from "../domain/ports/RandomNumberGenerator.js";

export class GenerateRandomUseCase {
  constructor(private readonly rng: RandomNumberGenerator) {}
  async exec(input: { min: number; max: number }) {
    const r = new Range(input.min, input.max);
    const value = await this.rng.generate(r.min, r.max);
    return { value, min: r.min, max: r.max, source: this.rng.constructor.name };
  }
}