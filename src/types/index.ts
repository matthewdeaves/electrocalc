export type Unit =
  | 'V' | 'mV' | 'kV'
  | 'A' | 'mA' | 'µA'
  | 'Ω' | 'kΩ' | 'MΩ'
  | 'W' | 'mW'
  | 'F' | 'µF' | 'nF' | 'pF'
  | 'H' | 'mH' | 'µH'
  | 'Hz' | 'kHz' | 'MHz'
  | 's' | 'ms' | 'µs'

export interface CalculatorInfo {
  id: string
  name: string
  category: 'basic' | 'timing' | 'power' | 'frequency' | 'utility'
  description: string
  helpContent: string
}

export interface CalculationHistory {
  id: string
  calculatorId: string
  timestamp: number
  inputs: Record<string, number | string>
  outputs: Record<string, number | string>
  label?: string
  notes?: string
}

export interface LEDSpec {
  name: string
  forwardVoltage: number
  typicalCurrent: number
  color: string
}

export interface ICSpec {
  name: string
  type: string
  specs: Record<string, number | string>
}
