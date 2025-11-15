/**
 * Ohm's Law calculations: V = I * R
 * Power calculations: P = V * I = I² * R = V² / R
 */

export interface OhmsLawResult {
  voltage?: number
  current?: number
  resistance?: number
  power?: number
}

/**
 * Calculate missing values using Ohm's Law
 */
export function calculateOhmsLaw(
  voltage?: number,
  current?: number,
  resistance?: number
): OhmsLawResult {
  const result: OhmsLawResult = {}

  // V = I * R
  if (current !== undefined && resistance !== undefined && voltage === undefined) {
    result.voltage = current * resistance
  }

  // I = V / R
  if (voltage !== undefined && resistance !== undefined && current === undefined) {
    result.current = voltage / resistance
  }

  // R = V / I
  if (voltage !== undefined && current !== undefined && resistance === undefined) {
    result.resistance = voltage / current
  }

  // Calculate power if we have enough information
  const v = voltage ?? result.voltage
  const i = current ?? result.current
  const r = resistance ?? result.resistance

  if (v !== undefined && i !== undefined) {
    result.power = v * i
  } else if (i !== undefined && r !== undefined) {
    result.power = i * i * r
  } else if (v !== undefined && r !== undefined) {
    result.power = (v * v) / r
  }

  return result
}

/**
 * Calculate voltage
 */
export function calculateVoltage(current: number, resistance: number): number {
  return current * resistance
}

/**
 * Calculate current
 */
export function calculateCurrent(voltage: number, resistance: number): number {
  return voltage / resistance
}

/**
 * Calculate resistance
 */
export function calculateResistance(voltage: number, current: number): number {
  return voltage / current
}

/**
 * Calculate power
 */
export function calculatePower(voltage?: number, current?: number, resistance?: number): number {
  if (voltage !== undefined && current !== undefined) {
    return voltage * current
  }
  if (current !== undefined && resistance !== undefined) {
    return current * current * resistance
  }
  if (voltage !== undefined && resistance !== undefined) {
    return (voltage * voltage) / resistance
  }
  return 0
}
