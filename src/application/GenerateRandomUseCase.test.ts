import { test } from 'node:test';
import assert from 'node:assert/strict';

import { GenerateRandomUseCase } from './GenerateRandomUseCase.js';
import type { RandomNumberGenerator } from '../domain/ports/RandomNumberGenerator.js';

class FixedRng implements RandomNumberGenerator {
  constructor(private readonly n: number) {}
  async generate(): Promise<number> {
    return this.n;
  }
}

test('retorna número do adapter e mantém o range', async () => {
  const uc = new GenerateRandomUseCase(new FixedRng(7));
  const res = await uc.exec({ min: 1, max: 10 });
  assert.equal(res.value, 7);
  assert.equal(res.min, 1);
  assert.equal(res.max, 10);
});

test('valida: min > max lança erro', async () => {
  const uc = new GenerateRandomUseCase(new FixedRng(1));
  await assert.rejects(() => uc.exec({ min: 10, max: 1 }), /min não pode ser maior que max/);
});
