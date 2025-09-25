import Fastify from "fastify";
import { GenerateRandomUseCase } from "./application/GenerateRandomUseCase.js";
import { MathRng } from "./infrastructure/rng/MathRng.js";
import { CryptoRng } from "./infrastructure/rng/CryptoRng.js";

const app = Fastify({ logger: true });

app.get("/random", async (req, reply) => {
  const q = req.query as Partial<Record<string, string>>;
  const min = Number(q.min ?? "1");
  const max = Number(q.max ?? "100");
  const strategy = (q.strategy ?? "crypto").toLowerCase();

  const rng = strategy === "math" ? new MathRng() : new CryptoRng();
  const uc = new GenerateRandomUseCase(rng);

  try {
    const res = await uc.exec({ min, max });
    return reply.send(res);
  } catch (e: any) {
    return reply.status(400).send({ error: e?.message ?? "Bad Request" });
  }
});

const PORT = Number(process.env.PORT ?? 4000);
app.listen({ port: PORT, host: "0.0.0.0" })
  .then(() => console.log(`HTTP on http://localhost:${PORT}`))
  .catch((e) => { console.error(e); process.exit(1); });
app.get("/health", async () => ({ ok: true }));