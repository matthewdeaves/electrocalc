import { useState } from 'react'
import { Card } from '../ui/Card'
import Select from '../ui/Select'
import { ResultDisplay } from '../ui/ResultDisplay'

const HELP_CONTENT = `Decode resistor color bands to determine resistance value and tolerance.

**4-Band Resistors:**
• Band 1-2: Digits
• Band 3: Multiplier
• Band 4: Tolerance

**Common Colors:**
Black=0, Brown=1, Red=2, Orange=3, Yellow=4, Green=5, Blue=6, Violet=7, Gray=8, White=9
Gold=×0.1, Silver=×0.01`

const colors = ['Black', 'Brown', 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Violet', 'Gray', 'White']
const multipliers = ['Black (×1)', 'Brown (×10)', 'Red (×100)', 'Orange (×1k)', 'Yellow (×10k)', 'Green (×100k)', 'Blue (×1M)', 'Gold (×0.1)', 'Silver (×0.01)']
const tolerances = ['Brown (±1%)', 'Red (±2%)', 'Gold (±5%)', 'Silver (±10%)']

export default function ResistorColorCalculator() {
  const [band1, setBand1] = useState(2)
  const [band2, setBand2] = useState(2)
  const [mult, setMult] = useState(2)
  const [tol, setTol] = useState(2)

  const multValues = [1, 10, 100, 1000, 10000, 100000, 1000000, 0.1, 0.01]
  const tolValues = [1, 2, 5, 10]

  const resistance = (band1 * 10 + band2) * multValues[mult]

  return (
    <Card title="Resistor Color Code" subtitle="Decode 4-band resistor colors" helpContent={HELP_CONTENT}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Select label="1st Band" options={colors.map((c, i) => ({ value: i, label: c }))} value={band1} onChange={(e) => setBand1(Number(e.target.value))} />
          <Select label="2nd Band" options={colors.map((c, i) => ({ value: i, label: c }))} value={band2} onChange={(e) => setBand2(Number(e.target.value))} />
          <Select label="Multiplier" options={multipliers.map((m, i) => ({ value: i, label: m }))} value={mult} onChange={(e) => setMult(Number(e.target.value))} />
          <Select label="Tolerance" options={tolerances.map((t, i) => ({ value: i, label: t }))} value={tol} onChange={(e) => setTol(Number(e.target.value))} />
        </div>

        <ResultDisplay label="Resistance Value" value={resistance >= 1000 ? `${(resistance / 1000).toFixed(2)}kΩ` : `${resistance.toFixed(2)}Ω`} variant="success" helpText={`±${tolValues[tol]}% tolerance`} />
      </div>
    </Card>
  )
}
