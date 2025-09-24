export interface RandomNumberGenerator {
  /** Retorna um inteiro entre min e max (ambos inclusivos). */
  generate(min: number, max: number): Promise<number>;
}