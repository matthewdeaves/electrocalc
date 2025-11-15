import { LEDSpec, ICSpec } from '../../types'

// Common LED specifications
export const LED_SPECS: LEDSpec[] = [
  { name: 'Red LED', forwardVoltage: 1.8, typicalCurrent: 20, color: '#ef4444' },
  { name: 'Green LED', forwardVoltage: 2.0, typicalCurrent: 20, color: '#22c55e' },
  { name: 'Yellow LED', forwardVoltage: 2.1, typicalCurrent: 20, color: '#eab308' },
  { name: 'Blue LED', forwardVoltage: 3.2, typicalCurrent: 20, color: '#3b82f6' },
  { name: 'White LED', forwardVoltage: 3.3, typicalCurrent: 20, color: '#e5e7eb' },
  { name: 'Infrared LED', forwardVoltage: 1.2, typicalCurrent: 20, color: '#7f1d1d' },
  { name: 'UV LED', forwardVoltage: 3.6, typicalCurrent: 20, color: '#8b5cf6' },
]

// Common IC specifications
export const IC_SPECS: ICSpec[] = [
  {
    name: '555 Timer',
    type: 'timer',
    specs: {
      minVoltage: 4.5,
      maxVoltage: 16,
      outputCurrent: 200,
    },
  },
  {
    name: '7805',
    type: 'regulator',
    specs: {
      outputVoltage: 5,
      minInputVoltage: 7,
      maxInputVoltage: 35,
      maxCurrent: 1000,
    },
  },
  {
    name: '7812',
    type: 'regulator',
    specs: {
      outputVoltage: 12,
      minInputVoltage: 14.5,
      maxInputVoltage: 35,
      maxCurrent: 1000,
    },
  },
  {
    name: 'LM317',
    type: 'regulator',
    specs: {
      minOutputVoltage: 1.25,
      maxOutputVoltage: 37,
      minInputVoltage: 3,
      maxInputVoltage: 40,
      maxCurrent: 1500,
    },
  },
  {
    name: 'LM741',
    type: 'opamp',
    specs: {
      minVoltage: 5,
      maxVoltage: 18,
      gainBandwidth: 1e6,
    },
  },
]

// Common bench supply voltages
export const COMMON_VOLTAGES = [3.3, 5, 9, 12, 15, 24, -5, -12, -15]

// Common capacitor values (in µF)
export const COMMON_CAPACITORS = [
  0.001, 0.01, 0.1, 1, 10, 22, 47, 100, 220, 470, 1000, 2200, 4700,
]

// Wire gauge current capacity (AWG to Amperes)
export const AWG_CURRENT_CAPACITY: Record<number, number> = {
  30: 0.52,
  28: 1.4,
  26: 2.2,
  24: 3.5,
  22: 5.0,
  20: 7.5,
  18: 10.0,
  16: 13.0,
  14: 17.0,
  12: 23.0,
  10: 33.0,
}
