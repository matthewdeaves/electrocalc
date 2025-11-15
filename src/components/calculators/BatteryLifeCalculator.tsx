import { useState, useEffect } from 'react'
import { Card } from '../ui/Card'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { ResultDisplay } from '../ui/ResultDisplay'
import { calculateBatteryLife } from '../../lib/calculations/power'

const HELP_CONTENT = `Estimate battery runtime based on capacity and current draw.

**Formula:** Runtime (hours) = (Capacity × Efficiency) / Current Draw

**Common Battery Capacities:**
• AA Alkaline: 2000-3000 mAh
• AAA Alkaline: 1000-1200 mAh
• 9V Alkaline: 400-600 mAh
• 18650 Li-ion: 2000-3500 mAh

Efficiency factor accounts for voltage drop and capacity loss under load.`

const BATTERY_PRESETS = [
  { name: 'AA Alkaline', capacity: 2500 },
  { name: 'AAA Alkaline', capacity: 1100 },
  { name: '9V Alkaline', capacity: 500 },
  { name: '18650 Li-ion', capacity: 2500 },
  { name: 'Custom', capacity: 0 },
]

export default function BatteryLifeCalculator() {
  const [preset, setPreset] = useState(0)
  const [capacity, setCapacity] = useState<string>('2500')
  const [current, setCurrent] = useState<string>('50')
  const [efficiency, setEfficiency] = useState<string>('0.8')
  const [results, setResults] = useState<ReturnType<typeof calculateBatteryLife> | null>(null)

  useEffect(() => {
    if (preset !== 4) {
      setCapacity(BATTERY_PRESETS[preset].capacity.toString())
    }
  }, [preset])

  useEffect(() => {
    const cap = parseFloat(capacity)
    const cur = parseFloat(current)
    const eff = parseFloat(efficiency)

    if (cap && cur && eff) {
      setResults(calculateBatteryLife(cap, cur, eff))
    }
  }, [capacity, current, efficiency])

  return (
    <Card title="Battery Life Calculator" subtitle="Estimate runtime based on capacity and current" helpContent={HELP_CONTENT}>
      <div className="space-y-6">
        <Select
          label="Battery Type"
          options={BATTERY_PRESETS.map((b, i) => ({ value: i, label: b.name }))}
          value={preset}
          onChange={(e) => setPreset(Number(e.target.value))}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="Battery Capacity" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} unit="mAh" />
          <Input label="Current Draw" type="number" value={current} onChange={(e) => setCurrent(e.target.value)} unit="mA" />
          <Input label="Efficiency" type="number" value={efficiency} onChange={(e) => setEfficiency(e.target.value)} helpText="0.7-0.9 typical" />
        </div>

        {results && (
          <ResultDisplay label="Estimated Runtime" value={results.runtimeFormatted} variant="success" helpText={`${results.runtime.toFixed(1)} hours total`} />
        )}
      </div>
    </Card>
  )
}
