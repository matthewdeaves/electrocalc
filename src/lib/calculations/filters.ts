/**
 * Filter calculations (RC low-pass, high-pass, etc.)
 */

export interface FilterResult {
  cutoffFrequency: number
  resistance?: number
  capacitance?: number
}

/**
 * Calculate RC low-pass filter cutoff frequency
 * fc = 1 / (2 * π * R * C)
 */
export function calculateLowPassCutoff(resistance: number, capacitance: number): number {
  return 1 / (2 * Math.PI * resistance * capacitance)
}

/**
 * Calculate RC high-pass filter cutoff frequency
 * fc = 1 / (2 * π * R * C)
 */
export function calculateHighPassCutoff(resistance: number, capacitance: number): number {
  return 1 / (2 * Math.PI * resistance * capacitance)
}

/**
 * Calculate component values for desired cutoff frequency
 */
export function calculateFilterComponents(
  targetFrequency: number,
  preferredResistance?: number,
  preferredCapacitance?: number
): FilterResult {
  // If resistance is preferred, calculate capacitance
  if (preferredResistance) {
    const capacitance = 1 / (2 * Math.PI * targetFrequency * preferredResistance)
    return {
      cutoffFrequency: targetFrequency,
      resistance: preferredResistance,
      capacitance,
    }
  }

  // If capacitance is preferred, calculate resistance
  if (preferredCapacitance) {
    const resistance = 1 / (2 * Math.PI * targetFrequency * preferredCapacitance)
    return {
      cutoffFrequency: targetFrequency,
      resistance,
      capacitance: preferredCapacitance,
    }
  }

  // Default: choose common values
  const capacitance = 1e-6 // 1µF
  const resistance = 1 / (2 * Math.PI * targetFrequency * capacitance)

  return {
    cutoffFrequency: targetFrequency,
    resistance,
    capacitance,
  }
}

/**
 * Calculate RL low-pass filter cutoff frequency
 * fc = R / (2 * π * L)
 */
export function calculateRLLowPassCutoff(resistance: number, inductance: number): number {
  return resistance / (2 * Math.PI * inductance)
}

/**
 * Calculate RL high-pass filter cutoff frequency
 * fc = R / (2 * π * L)
 */
export function calculateRLHighPassCutoff(resistance: number, inductance: number): number {
  return resistance / (2 * Math.PI * inductance)
}

/**
 * Calculate filter attenuation at given frequency
 * For low-pass: H(f) = 1 / √(1 + (f/fc)²)
 */
export function calculateLowPassAttenuation(frequency: number, cutoffFrequency: number): {
  attenuation: number
  attenuationDB: number
} {
  const ratio = frequency / cutoffFrequency
  const attenuation = 1 / Math.sqrt(1 + ratio * ratio)
  const attenuationDB = 20 * Math.log10(attenuation)

  return { attenuation, attenuationDB }
}

/**
 * Calculate filter attenuation at given frequency
 * For high-pass: H(f) = (f/fc) / √(1 + (f/fc)²)
 */
export function calculateHighPassAttenuation(frequency: number, cutoffFrequency: number): {
  attenuation: number
  attenuationDB: number
} {
  const ratio = frequency / cutoffFrequency
  const attenuation = ratio / Math.sqrt(1 + ratio * ratio)
  const attenuationDB = 20 * Math.log10(attenuation)

  return { attenuation, attenuationDB }
}
