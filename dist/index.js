import { GenerateRandomUseCase } from "./application/GenerateRandomUseCase.js";
import { CryptoRng } from "./infrastructure/rng/CryptoRng.js";
import { MathRng } from "./infrastructure/rng/MathRng.js";
const [, , minArg, maxArg] = process.argv;
const min = Number(minArg ?? 1);
const max = Number(maxArg ?? 100);
const strategy = (process.env.STRATEGY ?? "crypto").toLowerCase();
const rng = strategy === "math" ? new MathRng() : new CryptoRng();
const uc = new GenerateRandomUseCase(rng);
uc.exec({ min, max })
    .then(r => console.log(`[${r.source}] entre ${r.min} e ${r.max}:`, r.value))
    .catch(e => (console.error("Erro:", e.message), process.exit(1)));
