/**
 * BJT Transistor switching calculations
 * Focused on transistor as a switch (saturation mode)
 */

import { FORCED_BETA, type TransistorSpec } from '../constants/transistors'

export interface TransistorSwitchingResult {
  baseResistor: number // Calculated Rb in ohms
  baseCurrent: number // Ib in mA
  collectorCurrent: number // Ic in mA
  powerDissipation: number // in mW
  isSaturated: boolean
  safetyMargin: number // % of max Ic rating
  warnings: string[]
  vceActual: number // Actual Vce (Vce_sat when saturated)
}

/**
 * Calculate base resistor for transistor switching
 * Uses forced beta method for reliable saturation
 *
 * Formula: Rb = (Vcontrol - Vbe) / Ib
 * where Ib = Ic / forced_beta (typically 10)
 */
export function calculateBaseResistor(
  controlVoltage: number,
  collectorCurrent: number, // mA
  transistorSpec: TransistorSpec,
  forcedBeta: number = FORCED_BETA
): number {
  const vbe = transistorSpec.vbe
  const ib_mA = collectorCurrent / forcedBeta // Base current in mA
  const ib_A = ib_mA / 1000 // Convert to amps

  const rb = (controlVoltage - vbe) / ib_A
  return rb
}

/**
 * Complete transistor switching analysis
 */
export function calculateTransistorSwitching(
  controlVoltage: number,
  supplyVoltage: number,
  collectorCurrent: number, // mA (load current)
  transistorSpec: TransistorSpec,
  loadType: 'LED' | 'Relay' | 'Motor' | 'Other' = 'Other'
): TransistorSwitchingResult {
  const warnings: string[] = []

  // Calculate base resistor using forced beta
  const rb = calculateBaseResistor(controlVoltage, collectorCurrent, transistorSpec)

  // Calculate base current
  const ib_mA = collectorCurrent / FORCED_BETA
  const ib_A = ib_mA / 1000

  // Check saturation
  const isSaturated = ib_mA >= collectorCurrent / transistorSpec.hFE_min

  // Calculate power dissipation
  const vce = isSaturated ? transistorSpec.vce_sat : supplyVoltage * 0.5 // Rough estimate if not saturated
  const ic_A = collectorCurrent / 1000
  const powerDissipation_W = (vce * ic_A) + (transistorSpec.vbe * ib_A)
  const powerDissipation = powerDissipation_W * 1000 // Convert to mW

  // Calculate safety margin
  const safetyMargin = ((transistorSpec.maxCollectorCurrent - collectorCurrent) / transistorSpec.maxCollectorCurrent) * 100

  // Generate warnings
  if (collectorCurrent > transistorSpec.maxCollectorCurrent) {
    warnings.push(`⚠️ Collector current (${collectorCurrent}mA) exceeds transistor max rating (${transistorSpec.maxCollectorCurrent}mA)!`)
  }

  if (powerDissipation > 500) {
    warnings.push(`⚠️ Power dissipation (${powerDissipation.toFixed(0)}mW) is high - consider heatsink or different transistor`)
  }

  if (powerDissipation > transistorSpec.maxPower) {
    warnings.push(`⚠️ Power dissipation exceeds transistor max rating (${transistorSpec.maxPower}mW)!`)
  }

  if (ib_mA > 5) {
    warnings.push(`⚠️ Base current (${ib_mA.toFixed(1)}mA) is unusually high - consider redesign`)
  }

  if (controlVoltage < transistorSpec.vbe + 0.5) {
    warnings.push(`⚠️ Control voltage may be too low to reliably saturate transistor`)
  }

  if (!isSaturated) {
    warnings.push(`⚠️ Transistor may not be fully saturated - increase base current or check hFE`)
  }

  if (loadType === 'Relay' || loadType === 'Motor') {
    warnings.push(`🔧 Inductive load detected - FLYBACK DIODE REQUIRED! (1N4001 or similar across load)`)
  }

  if (safetyMargin < 20 && collectorCurrent <= transistorSpec.maxCollectorCurrent) {
    warnings.push(`⚡ Operating near max current - consider larger transistor for safety margin`)
  }

  return {
    baseResistor: rb,
    baseCurrent: ib_mA,
    collectorCurrent,
    powerDissipation,
    isSaturated,
    safetyMargin: Math.max(0, safetyMargin),
    warnings,
    vceActual: vce,
  }
}

/**
 * Check if transistor is in saturation
 */
export function checkSaturation(
  baseCurrent: number, // mA
  collectorCurrent: number, // mA
  hFE_min: number
): boolean {
  return baseCurrent >= collectorCurrent / hFE_min
}

/**
 * Calculate power dissipation in transistor
 */
export function calculatePowerDissipation(
  vce: number,
  ic: number, // mA
  vbe: number,
  ib: number // mA
): number {
  const ic_A = ic / 1000
  const ib_A = ib / 1000
  const power_W = (vce * ic_A) + (vbe * ib_A)
  return power_W * 1000 // Return in mW
}

/**
 * Calculate minimum base current for saturation
 */
export function calculateMinimumBaseCurrent(
  collectorCurrent: number, // mA
  hFE_min: number
): number {
  return collectorCurrent / hFE_min
}

/**
 * Estimate load resistance from current
 */
export function calculateLoadResistance(
  supplyVoltage: number,
  collectorCurrent: number, // mA
  vce_sat: number
): number {
  const ic_A = collectorCurrent / 1000
  const voltageAcrossLoad = supplyVoltage - vce_sat
  return voltageAcrossLoad / ic_A
}
