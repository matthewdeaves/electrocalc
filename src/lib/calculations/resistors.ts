/**
 * Resistor series and parallel calculations
 */

/**
 * Calculate total resistance of resistors in series
 * Rtotal = R1 + R2 + R3 + ...
 */
export function calculateSeriesResistance(resistors: number[]): number {
  return resistors.reduce((sum, r) => sum + r, 0)
}

/**
 * Calculate total resistance of resistors in parallel
 * 1/Rtotal = 1/R1 + 1/R2 + 1/R3 + ...
 */
export function calculateParallelResistance(resistors: number[]): number {
  if (resistors.length === 0) return 0
  if (resistors.length === 1) return resistors[0]

  const reciprocalSum = resistors.reduce((sum, r) => sum + 1 / r, 0)
  return 1 / reciprocalSum
}

/**
 * Calculate two resistors in parallel (simplified)
 * Rtotal = (R1 * R2) / (R1 + R2)
 */
export function calculate2ResistorsParallel(r1: number, r2: number): number {
  return (r1 * r2) / (r1 + r2)
}

/**
 * Calculate power distribution across series resistors
 */
export function calculateSeriesPowerDistribution(
  resistors: number[],
  totalVoltage: number
): { voltage: number; current: number; power: number }[] {
  const totalResistance = calculateSeriesResistance(resistors)
  const current = totalVoltage / totalResistance

  return resistors.map((r) => ({
    voltage: current * r,
    current: current,
    power: current * current * r,
  }))
}

/**
 * Calculate power distribution across parallel resistors
 */
export function calculateParallelPowerDistribution(
  resistors: number[],
  voltage: number
): { voltage: number; current: number; power: number }[] {
  return resistors.map((r) => ({
    voltage: voltage,
    current: voltage / r,
    power: (voltage * voltage) / r,
  }))
}

/**
 * Find resistor combinations to achieve target resistance
 */
export function findResistorCombinations(
  target: number,
  available: number[],
  maxResistors: number = 2
): { type: 'series' | 'parallel'; resistors: number[]; totalResistance: number; error: number }[] {
  const combinations: { type: 'series' | 'parallel'; resistors: number[]; totalResistance: number; error: number }[] = []

  // Single resistor
  available.forEach((r) => {
    combinations.push({
      type: 'series',
      resistors: [r],
      totalResistance: r,
      error: Math.abs(r - target) / target,
    })
  })

  if (maxResistors >= 2) {
    // Two resistors in series
    for (let i = 0; i < available.length; i++) {
      for (let j = i; j < available.length; j++) {
        const total = available[i] + available[j]
        combinations.push({
          type: 'series',
          resistors: [available[i], available[j]],
          totalResistance: total,
          error: Math.abs(total - target) / target,
        })
      }
    }

    // Two resistors in parallel
    for (let i = 0; i < available.length; i++) {
      for (let j = i; j < available.length; j++) {
        const total = calculate2ResistorsParallel(available[i], available[j])
        combinations.push({
          type: 'parallel',
          resistors: [available[i], available[j]],
          totalResistance: total,
          error: Math.abs(total - target) / target,
        })
      }
    }
  }

  // Sort by error
  return combinations.sort((a, b) => a.error - b.error)
}
