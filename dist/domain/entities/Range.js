export class Range {
    min;
    max;
    constructor(min, max) {
        this.min = min;
        this.max = max;
        if (!Number.isInteger(min) || !Number.isInteger(max)) {
            throw new Error("min e max devem ser inteiros");
        }
        if (min > max)
            throw new Error("min não pode ser maior que max");
    }
}
