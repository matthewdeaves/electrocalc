import { useState, useEffect } from 'react'
import { Card } from '../ui/Card'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { ResultDisplay, ResultGrid } from '../ui/ResultDisplay'
import { calculateWireVoltageDrop } from '../../lib/calculations/power'
import { AWG_CURRENT_CAPACITY } from '../../lib/constants/components'
import { formatVoltage, formatPower } from '../../lib/utils/formatters'

const HELP_CONTENT = `Calculate voltage drop and power loss in wire based on AWG gauge, length, and current.

**AWG (American Wire Gauge):** Lower numbers = thicker wire

**Typical Uses:**
• 22-24 AWG: Breadboard jumpers, low current
• 18-20 AWG: Power connections, moderate current
• 14-16 AWG: High current applications

Keep voltage drop below 3% for best performance.`

export default function WireGaugeCalculator() {
  const [awg, setAwg] = useState('22')
  const [length, setLength] = useState<string>('5')
  const [current, setCurrent] = useState<string>('1')
  const [results, setResults] = useState<ReturnType<typeof calculateWireVoltageDrop> | null>(null)

  const awgOptions = Object.keys(AWG_CURRENT_CAPACITY).map(g => ({
    value: g,
    label: `${g} AWG (max ${AWG_CURRENT_CAPACITY[Number(g)]}A)`,
  }))

  useEffect(() => {
    const len = parseFloat(length)
    const cur = parseFloat(current)
    const gauge = parseInt(awg)

    if (len && cur && gauge) {
      setResults(calculateWireVoltageDrop(gauge, len, cur))
    }
  }, [awg, length, current])

  return (
    <Card title="Wire Gauge Calculator" subtitle="Calculate voltage drop and current capacity" helpContent={HELP_CONTENT}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select label="Wire Gauge (AWG)" options={awgOptions} value={awg} onChange={(e) => setAwg(e.target.value)} />
          <Input label="Wire Length" type="number" value={length} onChange={(e) => setLength(e.target.value)} unit="ft" helpText="One-way length" />
          <Input label="Current" type="number" value={current} onChange={(e) => setCurrent(e.target.value)} unit="A" />
        </div>

        {results && (
          <ResultGrid columns={2}>
            <ResultDisplay
              label="Voltage Drop"
              value={formatVoltage(results.voltageDrop)}
              variant={results.acceptable ? 'success' : 'warning'}
              helpText={results.recommendation}
            />
            <ResultDisplay label="Power Loss" value={formatPower(results.powerLoss)} variant="info" />
          </ResultGrid>
        )}
      </div>
    </Card>
  )
}
