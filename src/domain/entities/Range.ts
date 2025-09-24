export class Range {
  constructor(public readonly min: number, public readonly max: number) {
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
      throw new Error("min e max devem ser inteiros");
    }
    if (min > max) throw new Error("min não pode ser maior que max");
  }
}