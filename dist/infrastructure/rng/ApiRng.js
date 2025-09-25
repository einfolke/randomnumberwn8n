export class ApiRng {
    endpoint;
    constructor(endpoint) {
        this.endpoint = endpoint;
    }
    async generate(min, max) {
        const url = new URL(this.endpoint);
        url.searchParams.set("min", String(min));
        url.searchParams.set("max", String(max));
        const res = await fetch(url);
        if (!res.ok)
            throw new Error(`HTTP ${res.status} - ${await res.text()}`);
        const data = (await res.json());
        const n = Number(data?.result);
        if (!Number.isInteger(n) || n < min || n > max) {
            throw new Error("Resposta inválida da API");
        }
        return n;
    }
}
