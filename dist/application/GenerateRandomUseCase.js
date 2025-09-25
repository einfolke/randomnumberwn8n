import { Range } from "../domain/entities/Range.js";
export class GenerateRandomUseCase {
    rng;
    constructor(rng) {
        this.rng = rng;
    }
    async exec(input) {
        const r = new Range(input.min, input.max);
        const value = await this.rng.generate(r.min, r.max);
        return { value, min: r.min, max: r.max, source: this.rng.constructor.name };
    }
}
