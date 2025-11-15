import { useState, useEffect } from 'react'
import { Card } from '../ui/Card'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { ResultDisplay } from '../ui/ResultDisplay'
import { calculateSeriesCapacitance, calculateParallelCapacitance, calculateCapacitorEnergy } from '../../lib/calculations/capacitors'
import { formatCapacitance, formatEngineering } from '../../lib/utils/formatters'
import { Plus, X } from 'lucide-react'

const HELP_CONTENT = `Calculate capacitor combinations and energy storage.

**Series:** 1/Ctotal = 1/C1 + 1/C2 + ...
• Total capacitance decreases
• Voltage rating increases

**Parallel:** Ctotal = C1 + C2 + C3 + ...
• Total capacitance increases
• Current capacity increases

**Energy:** E = 0.5 × C × V²`

export default function CapacitorCalculator() {
  const [capacitors, setCapacitors] = useState<string[]>(['0.000001', '0.000001'])
  const [mode, setMode] = useState<'series' | 'parallel'>('parallel')
  const [voltage, setVoltage] = useState<string>('5')
  const [totalCapacitance, setTotalCapacitance] = useState<number>(0)
  const [energy, setEnergy] = useState<number>(0)

  useEffect(() => {
    const values = capacitors.map((c) => parseFloat(c)).filter((c) => !isNaN(c) && c > 0)
    const v = parseFloat(voltage)

    if (values.length > 0) {
      const total = mode === 'series' ? calculateSeriesCapacitance(values) : calculateParallelCapacitance(values)
      setTotalCapacitance(total)
      if (v) {
        setEnergy(calculateCapacitorEnergy(total, v))
      }
    }
  }, [capacitors, mode, voltage])

  return (
    <Card title="Capacitor Calculator" subtitle="Series, parallel, and energy calculations" helpContent={HELP_CONTENT}>
      <div className="space-y-6">
        <div className="flex gap-2">
          <Button variant={mode === 'series' ? 'primary' : 'outline'} onClick={() => setMode('series')} size="sm">Series</Button>
          <Button variant={mode === 'parallel' ? 'primary' : 'outline'} onClick={() => setMode('parallel')} size="sm">Parallel</Button>
        </div>

        <div className="space-y-3">
          {capacitors.map((cap, i) => (
            <div key={i} className="flex items-end gap-2">
              <Input label={`C${i + 1}`} type="number" value={cap} onChange={(e) => {
                const newCaps = [...capacitors]
                newCaps[i] = e.target.value
                setCapacitors(newCaps)
              }} unit="F" helpText="e.g., 0.000001 for 1µF" className="flex-1" />
              <Button variant="outline" size="md" onClick={() => capacitors.length > 1 && setCapacitors(capacitors.filter((_, idx) => idx !== i))} disabled={capacitors.length === 1}><X className="w-4 h-4" /></Button>
            </div>
          ))}
        </div>

        <Button variant="secondary" onClick={() => setCapacitors([...capacitors, ''])} className="w-full"><Plus className="w-4 h-4 mr-2" />Add Capacitor</Button>

        <Input label="Voltage (for energy calc)" type="number" value={voltage} onChange={(e) => setVoltage(e.target.value)} unit="V" />

        {totalCapacitance > 0 && (
          <div className="space-y-3">
            <ResultDisplay label={`Total Capacitance (${mode})`} value={formatCapacitance(totalCapacitance)} variant="success" />
            {energy > 0 && <ResultDisplay label="Energy Stored" value={formatEngineering(energy, 'J')} variant="info" />}
          </div>
        )}
      </div>
    </Card>
  )
}
