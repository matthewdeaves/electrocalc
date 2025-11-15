/**
 * Capacitor calculations
 */

/**
 * Calculate capacitors in series
 * 1/Ctotal = 1/C1 + 1/C2 + ...
 */
export function calculateSeriesCapacitance(capacitors: number[]): number {
  if (capacitors.length === 0) return 0
  if (capacitors.length === 1) return capacitors[0]

  const reciprocalSum = capacitors.reduce((sum, c) => sum + 1 / c, 0)
  return 1 / reciprocalSum
}

/**
 * Calculate capacitors in parallel
 * Ctotal = C1 + C2 + C3 + ...
 */
export function calculateParallelCapacitance(capacitors: number[]): number {
  return capacitors.reduce((sum, c) => sum + c, 0)
}

/**
 * Calculate energy stored in capacitor
 * E = 0.5 * C * V²
 */
export function calculateCapacitorEnergy(capacitance: number, voltage: number): number {
  return 0.5 * capacitance * voltage * voltage
}

/**
 * Calculate charge stored in capacitor
 * Q = C * V
 */
export function calculateCapacitorCharge(capacitance: number, voltage: number): number {
  return capacitance * voltage
}

/**
 * Calculate capacitive reactance
 * Xc = 1 / (2 * π * f * C)
 */
export function calculateCapacitiveReactance(frequency: number, capacitance: number): number {
  return 1 / (2 * Math.PI * frequency * capacitance)
}

/**
 * Inductors calculations
 */

/**
 * Calculate inductors in series
 * Ltotal = L1 + L2 + L3 + ...
 */
export function calculateSeriesInductance(inductors: number[]): number {
  return inductors.reduce((sum, l) => sum + l, 0)
}

/**
 * Calculate inductors in parallel
 * 1/Ltotal = 1/L1 + 1/L2 + ...
 */
export function calculateParallelInductance(inductors: number[]): number {
  if (inductors.length === 0) return 0
  if (inductors.length === 1) return inductors[0]

  const reciprocalSum = inductors.reduce((sum, l) => sum + 1 / l, 0)
  return 1 / reciprocalSum
}

/**
 * Calculate energy stored in inductor
 * E = 0.5 * L * I²
 */
export function calculateInductorEnergy(inductance: number, current: number): number {
  return 0.5 * inductance * current * current
}

/**
 * Calculate inductive reactance
 * XL = 2 * π * f * L
 */
export function calculateInductiveReactance(frequency: number, inductance: number): number {
  return 2 * Math.PI * frequency * inductance
}

/**
 * Calculate LC resonant frequency
 * f = 1 / (2 * π * √(L * C))
 */
export function calculateResonantFrequency(inductance: number, capacitance: number): number {
  return 1 / (2 * Math.PI * Math.sqrt(inductance * capacitance))
}
