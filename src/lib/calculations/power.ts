/**
 * Power supply and regulator calculations
 */

export interface RegulatorResult {
  powerDissipation: number
  efficiency: number
  heatSinkRequired: boolean
  outputPower: number
  inputPower: number
}

/**
 * Calculate linear regulator power dissipation
 * Pd = (Vin - Vout) * Iout
 */
export function calculateRegulatorDissipation(
  inputVoltage: number,
  outputVoltage: number,
  outputCurrent: number // in amps
): RegulatorResult {
  const voltageDrop = inputVoltage - outputVoltage
  const powerDissipation = voltageDrop * outputCurrent
  const outputPower = outputVoltage * outputCurrent
  const inputPower = inputVoltage * outputCurrent
  const efficiency = outputPower / inputPower

  // Typical 7805 can handle ~1W without heatsink
  const heatSinkRequired = powerDissipation > 1.0

  return {
    powerDissipation,
    efficiency,
    heatSinkRequired,
    outputPower,
    inputPower,
  }
}

/**
 * Calculate LM317 output voltage
 * Vout = 1.25 * (1 + R2/R1)
 */
export function calculateLM317Output(r1: number, r2: number): number {
  return 1.25 * (1 + r2 / r1)
}

/**
 * Calculate LM317 resistor values for desired output
 */
export function calculateLM317Resistors(outputVoltage: number, r1: number = 240): {
  r1: number
  r2: number
} {
  // Vout = 1.25 * (1 + R2/R1)
  // R2 = R1 * (Vout/1.25 - 1)
  const r2 = r1 * (outputVoltage / 1.25 - 1)

  return { r1, r2 }
}

/**
 * Battery life calculation
 */
export interface BatteryLifeResult {
  runtime: number // in hours
  runtimeFormatted: string
}

/**
 * Calculate battery runtime
 */
export function calculateBatteryLife(
  batteryCapacity: number, // in mAh
  currentDraw: number, // in mA
  efficiency: number = 0.8 // 80% efficiency by default
): BatteryLifeResult {
  const runtime = (batteryCapacity * efficiency) / currentDraw

  const hours = Math.floor(runtime)
  const minutes = Math.floor((runtime - hours) * 60)

  const runtimeFormatted = `${hours}h ${minutes}m`

  return {
    runtime,
    runtimeFormatted,
  }
}

/**
 * Op-Amp gain calculations
 */

/**
 * Calculate non-inverting amplifier gain
 * Gain = 1 + (Rf / Rin)
 */
export function calculateNonInvertingGain(rf: number, rin: number): number {
  return 1 + rf / rin
}

/**
 * Calculate inverting amplifier gain
 * Gain = -Rf / Rin
 */
export function calculateInvertingGain(rf: number, rin: number): number {
  return -rf / rin
}

/**
 * Calculate resistor values for desired non-inverting gain
 */
export function calculateNonInvertingResistors(
  gain: number,
  rin: number = 10000
): { rf: number; rin: number } {
  // Gain = 1 + Rf/Rin
  // Rf = Rin * (Gain - 1)
  const rf = rin * (gain - 1)

  return { rf, rin }
}

/**
 * Calculate resistor values for desired inverting gain
 */
export function calculateInvertingResistors(
  gain: number,
  rin: number = 10000
): { rf: number; rin: number } {
  // Gain = -Rf/Rin
  // Rf = -Gain * Rin
  const rf = Math.abs(gain) * rin

  return { rf, rin }
}

/**
 * Wire gauge calculations
 */

const AWG_RESISTANCE: Record<number, number> = {
  // Ohms per 1000 feet
  30: 103.2,
  28: 64.9,
  26: 40.8,
  24: 25.7,
  22: 16.1,
  20: 10.1,
  18: 6.39,
  16: 4.02,
  14: 2.52,
  12: 1.59,
  10: 1.00,
}

export interface WireGaugeResult {
  voltageDrop: number
  powerLoss: number
  acceptable: boolean
  recommendation: string
}

/**
 * Calculate voltage drop in wire
 */
export function calculateWireVoltageDrop(
  awg: number,
  lengthFeet: number,
  current: number // in amps
): WireGaugeResult {
  const resistancePerFoot = AWG_RESISTANCE[awg] / 1000
  const totalResistance = resistancePerFoot * lengthFeet * 2 // *2 for round trip
  const voltageDrop = current * totalResistance
  const powerLoss = current * current * totalResistance

  // Acceptable if voltage drop < 3%
  const acceptable = voltageDrop < 0.36 // assuming 12V system, 3% = 0.36V

  let recommendation = ''
  if (!acceptable) {
    recommendation = 'Voltage drop too high. Consider larger gauge wire.'
  } else {
    recommendation = 'Wire gauge is acceptable for this application.'
  }

  return {
    voltageDrop,
    powerLoss,
    acceptable,
    recommendation,
  }
}
