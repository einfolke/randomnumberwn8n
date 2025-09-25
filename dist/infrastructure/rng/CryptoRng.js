import { randomInt } from "crypto";
export class CryptoRng {
    async generate(min, max) {
        return await new Promise((resolve, reject) => randomInt(min, max + 1, (err, n) => (err ? reject(err) : resolve(n))));
    }
}
