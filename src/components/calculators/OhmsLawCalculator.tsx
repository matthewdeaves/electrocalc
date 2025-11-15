import { useState, useEffect } from 'react'
import { Card } from '../ui/Card'
import Input from '../ui/Input'
import { ResultDisplay, ResultGrid } from '../ui/ResultDisplay'
import { calculateOhmsLaw } from '../../lib/calculations/ohmsLaw'
import { formatVoltage, formatCurrent, formatResistance, formatPower } from '../../lib/utils/formatters'

const HELP_CONTENT = `Ohm's Law is the fundamental relationship between voltage, current, and resistance in electrical circuits.

**Key Formulas:**
• V = I × R (Voltage = Current × Resistance)
• I = V / R (Current = Voltage / Resistance)
• R = V / I (Resistance = Voltage / Current)
• P = V × I (Power = Voltage × Current)

Enter any two values to calculate the remaining values. Power is always calculated when possible.`

export default function OhmsLawCalculator() {
  const [voltage, setVoltage] = useState<string>('')
  const [current, setCurrent] = useState<string>('')
  const [resistance, setResistance] = useState<string>('')

  const [results, setResults] = useState<ReturnType<typeof calculateOhmsLaw>>({})

  useEffect(() => {
    const v = voltage ? parseFloat(voltage) : undefined
    const i = current ? parseFloat(current) / 1000 : undefined // Convert mA to A
    const r = resistance ? parseFloat(resistance) : undefined

    // Only calculate if we have exactly 2 inputs
    const inputCount = [v, i, r].filter(val => val !== undefined && !isNaN(val as number)).length

    if (inputCount >= 2) {
      const result = calculateOhmsLaw(v, i, r)
      setResults(result)
    } else {
      setResults({})
    }
  }, [voltage, current, resistance])

  return (
    <Card
      title="Ohm's Law Calculator"
      subtitle="Calculate voltage, current, resistance, and power"
      helpContent={HELP_CONTENT}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Voltage (V)"
            type="number"
            placeholder="e.g., 5"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
            unit="V"
            helpText="Supply voltage"
          />
          <Input
            label="Current (mA)"
            type="number"
            placeholder="e.g., 20"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            unit="mA"
            helpText="Current flow"
          />
          <Input
            label="Resistance (Ω)"
            type="number"
            placeholder="e.g., 220"
            value={resistance}
            onChange={(e) => setResistance(e.target.value)}
            unit="Ω"
            helpText="Total resistance"
          />
        </div>

        {Object.keys(results).length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Results
            </h4>
            <ResultGrid columns={2}>
              {results.voltage !== undefined && !voltage && (
                <ResultDisplay
                  label="Voltage"
                  value={formatVoltage(results.voltage)}
                  variant="success"
                />
              )}
              {results.current !== undefined && !current && (
                <ResultDisplay
                  label="Current"
                  value={formatCurrent(results.current)}
                  variant="success"
                />
              )}
              {results.resistance !== undefined && !resistance && (
                <ResultDisplay
                  label="Resistance"
                  value={formatResistance(results.resistance)}
                  variant="success"
                />
              )}
              {results.power !== undefined && (
                <ResultDisplay
                  label="Power"
                  value={formatPower(results.power)}
                  variant={results.power > 0.25 ? 'warning' : 'info'}
                  helpText={
                    results.power > 0.25
                      ? '⚠️ Use 1/2W or higher rated resistor'
                      : 'Standard 1/4W resistor is sufficient'
                  }
                />
              )}
            </ResultGrid>
          </div>
        )}
      </div>
    </Card>
  )
}
