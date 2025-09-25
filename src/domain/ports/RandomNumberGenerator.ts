import type { IExecuteFunctions } from 'n8n-core';
import { INodeType, INodeTypeDescription, NodeOperationError } from 'n8n-workflow';
import { RandomOrgRng } from '/infrastructure/rng/RandomOrgRng.js';
import { GenerateRandomUseCase } from '../application/GenerateRandomUseCase.js';

export class RandomNumberNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Random',
    name: 'random',
    group: ['transform'],
    version: 1,
    description: 'True Random Number Generator via random.org',
    defaults: { name: 'Random' },
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        default: 'trueRandomNumberGenerator',
        options: [
          {
            name: 'True Random Number Generator',
            value: 'trueRandomNumberGenerator',
            action: 'Generate a true random integer (random.org)',
          },
        ],
      },
      { displayName: 'Min', name: 'min', type: 'number', default: 1, required: true },
      { displayName: 'Max', name: 'max', type: 'number', default: 60, required: true },
    ],
  };

  async execute(this: IExecuteFunctions) {
    const items = this.getInputData();
    const out = [];

    for (let i = 0; i < items.length; i++) {
      const op = this.getNodeParameter('operation', i) as string;
      if (op !== 'trueRandomNumberGenerator') {
        throw new NodeOperationError(this.getNode(), `Unsupported operation: ${op}`, { itemIndex: i });
      }
      const min = this.getNodeParameter('min', i) as number;
      const max = this.getNodeParameter('max', i) as number;

      if (!Number.isInteger(min) || !Number.isInteger(max)) {
        throw new NodeOperationError(this.getNode(), 'Min/Max devem ser inteiros', { itemIndex: i });
      }
      if (min > max) {
        throw new NodeOperationError(this.getNode(), 'Min não pode ser maior que Max', { itemIndex: i });
      }

      const rng = new RandomOrgRng();
      const uc = new GenerateRandomUseCase(rng);
      const res = await uc.exec({ min, max });

      out.push({ json: res });
    }
    return this.prepareOutputData(out);
  }
}
