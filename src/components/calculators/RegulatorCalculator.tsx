import { useState, useEffect } from 'react'
import { Card } from '../ui/Card'
import Input from '../ui/Input'
import { ResultDisplay, ResultGrid } from '../ui/ResultDisplay'
import { calculateRegulatorDissipation } from '../../lib/calculations/power'
import { formatPower, formatPercentage } from '../../lib/utils/formatters'

const HELP_CONTENT = `Calculate power dissipation and efficiency for linear voltage regulators like 7805, 7812, LM317.

**Power Dissipation:** Pd = (Vin - Vout) × Iout

**Important:** Linear regulators waste power as heat. The power dissipation tells you if you need a heatsink.

**Rule of thumb:**
• < 1W: No heatsink needed
• 1-2W: Small heatsink
• > 2W: Large heatsink required`

export default function RegulatorCalculator() {
  const [inputVoltage, setInputVoltage] = useState<string>('12')
  const [outputVoltage, setOutputVoltage] = useState<string>('5')
  const [outputCurrent, setOutputCurrent] = useState<string>('0.5')
  const [results, setResults] = useState<ReturnType<typeof calculateRegulatorDissipation> | null>(null)

  useEffect(() => {
    const vin = parseFloat(inputVoltage)
    const vout = parseFloat(outputVoltage)
    const iout = parseFloat(outputCurrent)

    if (vin && vout && iout && vin > vout) {
      setResults(calculateRegulatorDissipation(vin, vout, iout))
    } else {
      setResults(null)
    }
  }, [inputVoltage, outputVoltage, outputCurrent])

  return (
    <Card title="Linear Regulator Power" subtitle="Calculate power dissipation and heatsink requirements" helpContent={HELP_CONTENT}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Input Voltage" type="number" value={inputVoltage} onChange={(e) => setInputVoltage(e.target.value)} unit="V" />
          <Input label="Output Voltage" type="number" value={outputVoltage} onChange={(e) => setOutputVoltage(e.target.value)} unit="V" />
          <Input label="Output Current" type="number" value={outputCurrent} onChange={(e) => setOutputCurrent(e.target.value)} unit="A" />
        </div>

        {results && (
          <ResultGrid columns={2}>
            <ResultDisplay
              label="Power Dissipation"
              value={formatPower(results.powerDissipation)}
              variant={results.powerDissipation > 2 ? 'error' : results.powerDissipation > 1 ? 'warning' : 'success'}
              helpText={results.heatSinkRequired ? '⚠️ Heatsink required!' : 'No heatsink needed'}
            />
            <ResultDisplay label="Efficiency" value={formatPercentage(results.efficiency)} variant="info" />
            <ResultDisplay label="Output Power" value={formatPower(results.outputPower)} variant="default" />
            <ResultDisplay label="Input Power" value={formatPower(results.inputPower)} variant="default" />
          </ResultGrid>
        )}
      </div>
    </Card>
  )
}
