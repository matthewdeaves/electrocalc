import { useState, useEffect } from 'react'
import { Card } from '../ui/Card'
import Input from '../ui/Input'
import { ResultDisplay, ResultGrid } from '../ui/ResultDisplay'
import { calculateOutputVoltage, calculateR1, calculateR2 } from '../../lib/calculations/voltageDivider'
import { formatVoltage, formatResistance } from '../../lib/utils/formatters'

const HELP_CONTENT = `A voltage divider is a simple circuit that produces an output voltage that is a fraction of its input voltage.

**Formula:** Vout = Vin × (R2 / (R1 + R2))

**Common Uses:**
• Step down voltages (e.g., 5V to 3.3V)
• Create reference voltages
• Sensor interfaces
• Bias circuits

**Important:** The output voltage will drop under load. For best results, ensure the load resistance is at least 10× the divider resistance.`

export default function VoltageDividerCalculator() {
  const [inputVoltage, setInputVoltage] = useState<string>('5')
  const [r1, setR1] = useState<string>('10000')
  const [r2, setR2] = useState<string>('10000')
  const [outputVoltage, setOutputVoltage] = useState<string>('')

  const [calculatedOutput, setCalculatedOutput] = useState<number | null>(null)
  const [calculatedR1, setCalculatedR1] = useState<number | null>(null)
  const [calculatedR2, setCalculatedR2] = useState<number | null>(null)

  useEffect(() => {
    const vin = parseFloat(inputVoltage)
    const r1Val = parseFloat(r1)
    const r2Val = parseFloat(r2)
    const vout = parseFloat(outputVoltage)

    // Calculate output voltage if we have Vin, R1, and R2
    if (vin && r1Val && r2Val && !outputVoltage) {
      setCalculatedOutput(calculateOutputVoltage(vin, r1Val, r2Val))
      setCalculatedR1(null)
      setCalculatedR2(null)
    }
    // Calculate R1 if we have Vin, Vout, and R2
    else if (vin && vout && r2Val && !r1 && vout < vin) {
      setCalculatedR1(calculateR1(vin, vout, r2Val))
      setCalculatedOutput(null)
      setCalculatedR2(null)
    }
    // Calculate R2 if we have Vin, Vout, and R1
    else if (vin && vout && r1Val && !r2 && vout < vin) {
      setCalculatedR2(calculateR2(vin, vout, r1Val))
      setCalculatedOutput(null)
      setCalculatedR1(null)
    } else {
      setCalculatedOutput(null)
      setCalculatedR1(null)
      setCalculatedR2(null)
    }
  }, [inputVoltage, r1, r2, outputVoltage])

  return (
    <Card
      title="Voltage Divider Calculator"
      subtitle="Calculate voltage division with two resistors"
      helpContent={HELP_CONTENT}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Input Voltage (Vin)"
            type="number"
            placeholder="e.g., 5"
            value={inputVoltage}
            onChange={(e) => setInputVoltage(e.target.value)}
            unit="V"
          />
          <Input
            label="Output Voltage (Vout)"
            type="number"
            placeholder="Leave empty to calculate"
            value={outputVoltage}
            onChange={(e) => setOutputVoltage(e.target.value)}
            unit="V"
            helpText="Optional - leave empty to calculate"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="R1 (top resistor)"
            type="number"
            placeholder="e.g., 10000"
            value={r1}
            onChange={(e) => setR1(e.target.value)}
            unit="Ω"
          />
          <Input
            label="R2 (bottom resistor)"
            type="number"
            placeholder="e.g., 10000"
            value={r2}
            onChange={(e) => setR2(e.target.value)}
            unit="Ω"
          />
        </div>

        {/* Quick presets for common voltage conversions */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-slate-600 dark:text-slate-400">Quick presets:</span>
          <button
            onClick={() => {
              setInputVoltage('5')
              setOutputVoltage('3.3')
              setR1('1700')
              setR2('3300')
            }}
            className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50"
          >
            5V → 3.3V
          </button>
          <button
            onClick={() => {
              setInputVoltage('12')
              setOutputVoltage('5')
              setR1('10000')
              setR2('')
            }}
            className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50"
          >
            12V → 5V
          </button>
        </div>

        {(calculatedOutput || calculatedR1 || calculatedR2) && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Results
            </h4>
            <ResultGrid columns={1}>
              {calculatedOutput !== null && (
                <ResultDisplay
                  label="Output Voltage"
                  value={formatVoltage(calculatedOutput)}
                  variant="success"
                />
              )}
              {calculatedR1 !== null && (
                <ResultDisplay
                  label="R1 (top resistor)"
                  value={formatResistance(calculatedR1)}
                  variant="success"
                />
              )}
              {calculatedR2 !== null && (
                <ResultDisplay
                  label="R2 (bottom resistor)"
                  value={formatResistance(calculatedR2)}
                  variant="success"
                />
              )}
            </ResultGrid>
          </div>
        )}
      </div>
    </Card>
  )
}
