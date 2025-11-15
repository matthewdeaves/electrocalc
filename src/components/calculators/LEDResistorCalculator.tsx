import { useState, useEffect } from 'react'
import { Card } from '../ui/Card'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { ResultDisplay, ResultGrid } from '../ui/ResultDisplay'
import { calculateLEDResistor } from '../../lib/calculations/led'
import { LED_SPECS } from '../../lib/constants/components'
import { findNearestStandardValue } from '../../lib/constants/standardValues'
import { formatResistance, formatPower } from '../../lib/utils/formatters'

const HELP_CONTENT = `Calculate the current-limiting resistor value for an LED to prevent damage.

**Formula:** R = (Vs - Vf) / If

Where:
• Vs = Supply voltage
• Vf = LED forward voltage
• If = Desired forward current (typically 10-20mA)

The calculator shows the exact resistor value needed and the nearest standard value from the E24 series. Always check the power dissipation to ensure you use an appropriately rated resistor.`

export default function LEDResistorCalculator() {
  const [supplyVoltage, setSupplyVoltage] = useState<string>('5')
  const [ledType, setLedType] = useState<number>(0)
  const [forwardCurrent, setForwardCurrent] = useState<string>('20')

  const [results, setResults] = useState<ReturnType<typeof calculateLEDResistor> | null>(null)
  const [nearestStandard, setNearestStandard] = useState<{ value: number; formatted: string } | null>(null)

  const selectedLED = LED_SPECS[ledType]

  useEffect(() => {
    const vs = parseFloat(supplyVoltage)
    const vf = selectedLED.forwardVoltage
    const current = parseFloat(forwardCurrent)

    if (vs && vf && current && vs > vf) {
      const result = calculateLEDResistor(vs, vf, current)
      setResults(result)
      setNearestStandard(findNearestStandardValue(result.resistorValue))
    } else {
      setResults(null)
      setNearestStandard(null)
    }
  }, [supplyVoltage, ledType, forwardCurrent, selectedLED])

  return (
    <Card
      title="LED Current Limiting Resistor"
      subtitle="Calculate the resistor value needed for your LED"
      helpContent={HELP_CONTENT}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Supply Voltage"
            type="number"
            placeholder="e.g., 5"
            value={supplyVoltage}
            onChange={(e) => setSupplyVoltage(e.target.value)}
            unit="V"
          />
          <Select
            label="LED Type"
            value={ledType}
            onChange={(e) => setLedType(parseInt(e.target.value))}
            options={LED_SPECS.map((led, idx) => ({
              value: idx,
              label: `${led.name} (${led.forwardVoltage}V)`,
            }))}
          />
          <Input
            label="Forward Current"
            type="number"
            placeholder="20"
            value={forwardCurrent}
            onChange={(e) => setForwardCurrent(e.target.value)}
            unit="mA"
            helpText="Typically 10-20mA"
          />
        </div>

        {/* LED Preview */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: selectedLED.color }}
          />
          <span className="text-sm text-slate-700 dark:text-slate-300">
            Selected: {selectedLED.name} @ {selectedLED.forwardVoltage}V
          </span>
        </div>

        {results && nearestStandard && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Results
            </h4>
            <ResultGrid columns={2}>
              <ResultDisplay
                label="Calculated Resistor"
                value={formatResistance(results.resistorValue)}
                variant="info"
              />
              <ResultDisplay
                label="Nearest Standard (E24)"
                value={nearestStandard.formatted}
                variant="success"
                helpText="Use this standard value"
              />
              <ResultDisplay
                label="Power Dissipation"
                value={formatPower(results.powerDissipation)}
                variant={results.powerDissipation > 0.125 ? 'warning' : 'default'}
                helpText={
                  results.powerDissipation > 0.125
                    ? '⚠️ Use 1/4W or higher resistor'
                    : '1/8W resistor is sufficient'
                }
              />
              <ResultDisplay
                label="Actual Current"
                value={results.actualCurrent.toFixed(1)}
                unit="mA"
                variant="default"
              />
            </ResultGrid>
          </div>
        )}
      </div>
    </Card>
  )
}
