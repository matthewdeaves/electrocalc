import { useState, useEffect } from 'react'
import { Card } from '../ui/Card'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { ResultDisplay } from '../ui/ResultDisplay'
import { calculateLowPassCutoff, calculateFilterComponents } from '../../lib/calculations/filters'
import { formatFrequency, formatResistance, formatCapacitance } from '../../lib/utils/formatters'

const HELP_CONTENT = `RC filter calculator for low-pass and high-pass configurations.

**Cutoff Frequency:** fc = 1 / (2π × R × C)

At the cutoff frequency, the signal is attenuated by -3dB (70.7% of input).

**Low-pass:** Passes low frequencies, blocks high frequencies
**High-pass:** Passes high frequencies, blocks low frequencies`

export default function FilterCalculator() {
  const [filterType, setFilterType] = useState<'lowpass' | 'highpass'>('lowpass')
  const [resistance, setResistance] = useState<string>('10000')
  const [capacitance, setCapacitance] = useState<string>('0.00000001')
  const [cutoffFreq, setCutoffFreq] = useState<number>(0)

  useEffect(() => {
    const r = parseFloat(resistance)
    const c = parseFloat(capacitance)
    if (r && c) {
      setCutoffFreq(calculateLowPassCutoff(r, c))
    }
  }, [resistance, capacitance])

  return (
    <Card title="RC Filter Calculator" subtitle="Low-pass and high-pass filter design" helpContent={HELP_CONTENT}>
      <div className="space-y-6">
        <div className="flex gap-2">
          <Button variant={filterType === 'lowpass' ? 'primary' : 'outline'} onClick={() => setFilterType('lowpass')} size="sm">Low-Pass</Button>
          <Button variant={filterType === 'highpass' ? 'primary' : 'outline'} onClick={() => setFilterType('highpass')} size="sm">High-Pass</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Resistance" type="number" value={resistance} onChange={(e) => setResistance(e.target.value)} unit="Ω" />
          <Input label="Capacitance" type="number" value={capacitance} onChange={(e) => setCapacitance(e.target.value)} unit="F" helpText="e.g., 0.00000001 for 10nF" />
        </div>

        {cutoffFreq > 0 && (
          <ResultDisplay label="Cutoff Frequency (-3dB)" value={formatFrequency(cutoffFreq)} variant="success" helpText={`${filterType === 'lowpass' ? 'Frequencies above' : 'Frequencies below'} this are attenuated`} />
        )}
      </div>
    </Card>
  )
}
