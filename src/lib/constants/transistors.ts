/**
 * BJT Transistor specifications for common transistors
 */

export interface TransistorSpec {
  name: string
  type: 'NPN' | 'PNP'
  maxCollectorCurrent: number // mA
  hFE_min: number
  hFE_typical: number
  hFE_max: number
  vbe: number // V
  vce_sat: number // V
  maxPower: number // mW
  description: string
}

// Common BJT transistors used in breadboarding
export const TRANSISTOR_SPECS: TransistorSpec[] = [
  {
    name: '2N3904',
    type: 'NPN',
    maxCollectorCurrent: 200,
    hFE_min: 100,
    hFE_typical: 150,
    hFE_max: 300,
    vbe: 0.7,
    vce_sat: 0.2,
    maxPower: 625,
    description: 'General purpose NPN, most common for beginners',
  },
  {
    name: '2N3906',
    type: 'PNP',
    maxCollectorCurrent: 200,
    hFE_min: 100,
    hFE_typical: 150,
    hFE_max: 300,
    vbe: 0.7,
    vce_sat: 0.2,
    maxPower: 625,
    description: 'General purpose PNP, complement to 2N3904',
  },
  {
    name: '2N2222',
    type: 'NPN',
    maxCollectorCurrent: 800,
    hFE_min: 100,
    hFE_typical: 200,
    hFE_max: 300,
    vbe: 0.7,
    vce_sat: 0.3,
    maxPower: 500,
    description: 'Higher current NPN, good for motors and relays',
  },
  {
    name: 'BC547',
    type: 'NPN',
    maxCollectorCurrent: 100,
    hFE_min: 110,
    hFE_typical: 300,
    hFE_max: 800,
    vbe: 0.7,
    vce_sat: 0.2,
    maxPower: 500,
    description: 'Low power NPN, very common in Europe',
  },
  {
    name: 'BC557',
    type: 'PNP',
    maxCollectorCurrent: 100,
    hFE_min: 110,
    hFE_typical: 300,
    hFE_max: 800,
    vbe: 0.7,
    vce_sat: 0.2,
    maxPower: 500,
    description: 'Low power PNP, complement to BC547',
  },
  {
    name: 'TIP120',
    type: 'NPN',
    maxCollectorCurrent: 5000,
    hFE_min: 1000,
    hFE_typical: 2500,
    hFE_max: 4000,
    vbe: 1.4,
    vce_sat: 2.0,
    maxPower: 2000,
    description: 'Darlington NPN, high current for motors/relays',
  },
  {
    name: 'TIP125',
    type: 'PNP',
    maxCollectorCurrent: 5000,
    hFE_min: 1000,
    hFE_typical: 2500,
    hFE_max: 4000,
    vbe: 1.4,
    vce_sat: 2.0,
    maxPower: 2000,
    description: 'Darlington PNP, high current complement to TIP120',
  },
]

// Load types for warning context
export type LoadType = 'LED' | 'Relay' | 'Motor' | 'Other'

// Forced beta for saturation switching (industry standard)
export const FORCED_BETA = 10

// Common control voltages
export const COMMON_CONTROL_VOLTAGES = [3.3, 5, 9, 12]

// Common supply voltages
export const COMMON_SUPPLY_VOLTAGES = [3.3, 5, 9, 12, 24]
