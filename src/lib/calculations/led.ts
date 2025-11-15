/**
 * LED current limiting resistor calculations
 */

export interface LEDResistorResult {
  resistorValue: number
  powerDissipation: number
  actualCurrent: number
  nearestStandard?: number
}

/**
 * Calculate current limiting resistor for LED
 * R = (Vs - Vf) / If
 */
export function calculateLEDResistor(
  supplyVoltage: number,
  forwardVoltage: number,
  forwardCurrent: number // in mA
): LEDResistorResult {
  const currentAmps = forwardCurrent / 1000
  const voltageDrop = supplyVoltage - forwardVoltage

  const resistorValue = voltageDrop / currentAmps
  const powerDissipation = voltageDrop * currentAmps

  return {
    resistorValue,
    powerDissipation,
    actualCurrent: forwardCurrent,
  }
}

/**
 * Calculate actual current through LED with given resistor
 */
export function calculateLEDCurrent(
  supplyVoltage: number,
  forwardVoltage: number,
  resistance: number
): number {
  return ((supplyVoltage - forwardVoltage) / resistance) * 1000 // return in mA
}

/**
 * Calculate series LEDs
 */
export function calculateSeriesLEDs(
  supplyVoltage: number,
  ledForwardVoltage: number,
  ledCurrent: number, // mA
  numLEDs: number
): LEDResistorResult {
  const totalLEDVoltage = ledForwardVoltage * numLEDs
  const remainingVoltage = supplyVoltage - totalLEDVoltage

  if (remainingVoltage <= 0) {
    return {
      resistorValue: 0,
      powerDissipation: 0,
      actualCurrent: 0,
    }
  }

  const currentAmps = ledCurrent / 1000
  const resistorValue = remainingVoltage / currentAmps
  const powerDissipation = remainingVoltage * currentAmps

  return {
    resistorValue,
    powerDissipation,
    actualCurrent: ledCurrent,
  }
}
