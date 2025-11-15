/**
 * 555 Timer calculations
 */

export interface Timer555AstableResult {
  frequency: number
  timeHigh: number
  timeLow: number
  period: number
  dutyCycle: number
}

export interface Timer555MonostableResult {
  pulseWidth: number
}

/**
 * Calculate 555 timer in astable mode (oscillator)
 * f = 1.44 / ((R1 + 2*R2) * C)
 * Time High = 0.693 * (R1 + R2) * C
 * Time Low = 0.693 * R2 * C
 */
export function calculate555Astable(
  r1: number, // ohms
  r2: number, // ohms
  c: number   // farads
): Timer555AstableResult {
  const timeHigh = 0.693 * (r1 + r2) * c
  const timeLow = 0.693 * r2 * c
  const period = timeHigh + timeLow
  const frequency = 1 / period
  const dutyCycle = timeHigh / period

  return {
    frequency,
    timeHigh,
    timeLow,
    period,
    dutyCycle,
  }
}

/**
 * Calculate 555 timer in monostable mode (one-shot)
 * Pulse Width = 1.1 * R * C
 */
export function calculate555Monostable(
  r: number, // ohms
  c: number  // farads
): Timer555MonostableResult {
  const pulseWidth = 1.1 * r * c

  return {
    pulseWidth,
  }
}

/**
 * Calculate component values for desired frequency (astable)
 */
export function calculate555ComponentsForFrequency(
  targetFrequency: number,
  dutyCycle: number = 0.5 // 50% default
): { r1: number; r2: number; c: number } {
  // Choose a common capacitor value
  const c = 1e-6 // 1µF as default

  // For 50% duty cycle: R1 should be small, R2 large
  // f = 1.44 / ((R1 + 2*R2) * C)
  // Rearrange: R1 + 2*R2 = 1.44 / (f * C)

  const totalR = 1.44 / (targetFrequency * c)

  let r1: number, r2: number

  if (dutyCycle >= 0.5) {
    // Duty cycle = (R1 + R2) / (R1 + 2*R2)
    // Solve for R1 and R2
    r2 = totalR / (2 + (1 - dutyCycle) / dutyCycle)
    r1 = totalR - 2 * r2
  } else {
    // For duty cycles < 50%, we need additional circuitry
    // Use standard approach with small R1
    r1 = totalR * 0.1
    r2 = (totalR - r1) / 2
  }

  return { r1, r2, c }
}

/**
 * RC Time Constant calculations
 */

export interface RCTimeConstantResult {
  timeConstant: number // τ = RC
  time63: number       // Time to reach 63.2%
  time95: number       // Time to reach 95%
  time99: number       // Time to reach 99%
}

/**
 * Calculate RC time constant
 * τ = R * C
 */
export function calculateRCTimeConstant(
  r: number, // ohms
  c: number  // farads
): RCTimeConstantResult {
  const timeConstant = r * c
  const time63 = timeConstant
  const time95 = 3 * timeConstant
  const time99 = 5 * timeConstant

  return {
    timeConstant,
    time63,
    time95,
    time99,
  }
}

/**
 * Calculate voltage at time t during charging
 * V(t) = Vs * (1 - e^(-t/RC))
 */
export function calculateChargingVoltage(
  supplyVoltage: number,
  time: number,
  resistance: number,
  capacitance: number
): number {
  const tau = resistance * capacitance
  return supplyVoltage * (1 - Math.exp(-time / tau))
}

/**
 * Calculate voltage at time t during discharging
 * V(t) = V0 * e^(-t/RC)
 */
export function calculateDischargingVoltage(
  initialVoltage: number,
  time: number,
  resistance: number,
  capacitance: number
): number {
  const tau = resistance * capacitance
  return initialVoltage * Math.exp(-time / tau)
}

/**
 * Calculate time to reach specific voltage during charging
 */
export function calculateTimeToVoltage(
  supplyVoltage: number,
  targetVoltage: number,
  resistance: number,
  capacitance: number
): number {
  const tau = resistance * capacitance
  const ratio = targetVoltage / supplyVoltage
  return -tau * Math.log(1 - ratio)
}
