/**
 * Voltage divider calculations
 * Vout = Vin * (R2 / (R1 + R2))
 */

export interface VoltageDividerResult {
  outputVoltage?: number
  r1?: number
  r2?: number
  current?: number
  powerDissipation?: number
}

/**
 * Calculate output voltage of voltage divider
 */
export function calculateOutputVoltage(
  inputVoltage: number,
  r1: number,
  r2: number
): number {
  return inputVoltage * (r2 / (r1 + r2))
}

/**
 * Calculate R2 given Vin, Vout, and R1
 */
export function calculateR2(
  inputVoltage: number,
  outputVoltage: number,
  r1: number
): number {
  return (r1 * outputVoltage) / (inputVoltage - outputVoltage)
}

/**
 * Calculate R1 given Vin, Vout, and R2
 */
export function calculateR1(
  inputVoltage: number,
  outputVoltage: number,
  r2: number
): number {
  return (r2 * (inputVoltage - outputVoltage)) / outputVoltage
}

/**
 * Calculate voltage divider with load
 */
export function calculateLoadedDivider(
  inputVoltage: number,
  r1: number,
  r2: number,
  loadResistance: number
): VoltageDividerResult {
  // R2 in parallel with load
  const r2Parallel = (r2 * loadResistance) / (r2 + loadResistance)

  const outputVoltage = inputVoltage * (r2Parallel / (r1 + r2Parallel))
  const current = inputVoltage / (r1 + r2Parallel)
  const powerDissipation = current * inputVoltage

  return {
    outputVoltage,
    r1,
    r2,
    current,
    powerDissipation,
  }
}

/**
 * Suggest resistor ratio for a given voltage division
 */
export function suggestResistorRatio(
  inputVoltage: number,
  outputVoltage: number
): { ratio: number; r1Multiplier: number; r2Multiplier: number } {
  const ratio = outputVoltage / inputVoltage
  const r1Multiplier = 1 - ratio
  const r2Multiplier = ratio

  return { ratio, r1Multiplier, r2Multiplier }
}
