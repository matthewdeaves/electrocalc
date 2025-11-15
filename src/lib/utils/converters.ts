/**
 * Convert between voltage units
 */
export function convertVoltage(value: number, from: string, to: string): number {
  const toVolts: Record<string, number> = {
    'V': 1,
    'mV': 1e-3,
    'kV': 1e3,
  }

  const volts = value * toVolts[from]
  return volts / toVolts[to]
}

/**
 * Convert between current units
 */
export function convertCurrent(value: number, from: string, to: string): number {
  const toAmps: Record<string, number> = {
    'A': 1,
    'mA': 1e-3,
    'µA': 1e-6,
  }

  const amps = value * toAmps[from]
  return amps / toAmps[to]
}

/**
 * Convert between resistance units
 */
export function convertResistance(value: number, from: string, to: string): number {
  const toOhms: Record<string, number> = {
    'Ω': 1,
    'kΩ': 1e3,
    'MΩ': 1e6,
  }

  const ohms = value * toOhms[from]
  return ohms / toOhms[to]
}

/**
 * Convert between capacitance units
 */
export function convertCapacitance(value: number, from: string, to: string): number {
  const toFarads: Record<string, number> = {
    'F': 1,
    'mF': 1e-3,
    'µF': 1e-6,
    'nF': 1e-9,
    'pF': 1e-12,
  }

  const farads = value * toFarads[from]
  return farads / toFarads[to]
}

/**
 * Convert between inductance units
 */
export function convertInductance(value: number, from: string, to: string): number {
  const toHenries: Record<string, number> = {
    'H': 1,
    'mH': 1e-3,
    'µH': 1e-6,
  }

  const henries = value * toHenries[from]
  return henries / toHenries[to]
}

/**
 * Convert between frequency units
 */
export function convertFrequency(value: number, from: string, to: string): number {
  const toHz: Record<string, number> = {
    'Hz': 1,
    'kHz': 1e3,
    'MHz': 1e6,
  }

  const hz = value * toHz[from]
  return hz / toHz[to]
}

/**
 * Convert between power units
 */
export function convertPower(value: number, from: string, to: string): number {
  const toWatts: Record<string, number> = {
    'W': 1,
    'mW': 1e-3,
    'kW': 1e3,
  }

  const watts = value * toWatts[from]
  return watts / toWatts[to]
}

/**
 * Convert between time units
 */
export function convertTime(value: number, from: string, to: string): number {
  const toSeconds: Record<string, number> = {
    's': 1,
    'ms': 1e-3,
    'µs': 1e-6,
  }

  const seconds = value * toSeconds[from]
  return seconds / toSeconds[to]
}
