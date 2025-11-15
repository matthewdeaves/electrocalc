import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format number with engineering notation
 */
export function formatEngineering(value: number, unit: string, decimals: number = 2): string {
  if (!isFinite(value) || isNaN(value)) return 'Invalid'
  if (value === 0) return `0${unit}`

  const absValue = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  // Determine prefix
  if (absValue >= 1e9) return `${sign}${(absValue / 1e9).toFixed(decimals)}G${unit}`
  if (absValue >= 1e6) return `${sign}${(absValue / 1e6).toFixed(decimals)}M${unit}`
  if (absValue >= 1e3) return `${sign}${(absValue / 1e3).toFixed(decimals)}k${unit}`
  if (absValue >= 1) return `${sign}${absValue.toFixed(decimals)}${unit}`
  if (absValue >= 1e-3) return `${sign}${(absValue * 1e3).toFixed(decimals)}m${unit}`
  if (absValue >= 1e-6) return `${sign}${(absValue * 1e6).toFixed(decimals)}µ${unit}`
  if (absValue >= 1e-9) return `${sign}${(absValue * 1e9).toFixed(decimals)}n${unit}`
  if (absValue >= 1e-12) return `${sign}${(absValue * 1e12).toFixed(decimals)}p${unit}`

  return `${sign}${absValue.toExponential(decimals)}${unit}`
}

/**
 * Format voltage
 */
export function formatVoltage(value: number): string {
  return formatEngineering(value, 'V')
}

/**
 * Format current
 */
export function formatCurrent(value: number): string {
  return formatEngineering(value, 'A')
}

/**
 * Format resistance
 */
export function formatResistance(value: number): string {
  return formatEngineering(value, 'Ω')
}

/**
 * Format capacitance
 */
export function formatCapacitance(value: number): string {
  return formatEngineering(value, 'F')
}

/**
 * Format inductance
 */
export function formatInductance(value: number): string {
  return formatEngineering(value, 'H')
}

/**
 * Format frequency
 */
export function formatFrequency(value: number): string {
  return formatEngineering(value, 'Hz')
}

/**
 * Format power
 */
export function formatPower(value: number): string {
  return formatEngineering(value, 'W')
}

/**
 * Format time
 */
export function formatTime(value: number): string {
  return formatEngineering(value, 's')
}

/**
 * Format percentage
 */
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}
