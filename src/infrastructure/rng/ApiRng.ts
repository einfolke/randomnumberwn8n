// Adapter de exemplo para uma API que retorna { "result": number }
import type { RandomNumberGenerator } from "../../domain/ports/RandomNumberGenerator.js";

export class ApiRng implements RandomNumberGenerator {
  constructor(private readonly endpoint: string) {}

  async generate(min: number, max: number): Promise<number> {
    const url = new URL(this.endpoint);
    url.searchParams.set("min", String(min));
    url.searchParams.set("max", String(max));

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${await res.text()}`);
    const data = (await res.json()) as { result: unknown };

    const n = Number(data?.result);
    if (!Number.isInteger(n) || n < min || n > max) {
      throw new Error("Resposta inválida da API");
    }
    return n;
  }
}
