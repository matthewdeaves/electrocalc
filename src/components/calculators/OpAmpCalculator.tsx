import { useState, useEffect } from 'react'
import { Card } from '../ui/Card'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { ResultDisplay, ResultGrid } from '../ui/ResultDisplay'
import { calculateInvertingGain, calculateNonInvertingGain } from '../../lib/calculations/power'
import { formatResistance } from '../../lib/utils/formatters'

const HELP_CONTENT = `Calculate op-amp gain configurations.

**Non-Inverting Amplifier:**
• Gain = 1 + (Rf / Rin)
• Output in phase with input
• Minimum gain is 1

**Inverting Amplifier:**
• Gain = -(Rf / Rin)
• Output 180° out of phase
• Can have gain < 1`

export default function OpAmpCalculator() {
  const [mode, setMode] = useState<'noninverting' | 'inverting'>('noninverting')
  const [rf, setRf] = useState<string>('10000')
  const [rin, setRin] = useState<string>('1000')
  const [gain, setGain] = useState<number>(0)

  useEffect(() => {
    const rfVal = parseFloat(rf)
    const rinVal = parseFloat(rin)

    if (rfVal && rinVal) {
      const g = mode === 'noninverting' ? calculateNonInvertingGain(rfVal, rinVal) : calculateInvertingGain(rfVal, rinVal)
      setGain(g)
    }
  }, [mode, rf, rin])

  return (
    <Card title="Op-Amp Calculator" subtitle="Calculate inverting and non-inverting gains" helpContent={HELP_CONTENT}>
      <div className="space-y-6">
        <div className="flex gap-2">
          <Button variant={mode === 'noninverting' ? 'primary' : 'outline'} onClick={() => setMode('noninverting')} size="sm">Non-Inverting</Button>
          <Button variant={mode === 'inverting' ? 'primary' : 'outline'} onClick={() => setMode('inverting')} size="sm">Inverting</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Feedback Resistor (Rf)" type="number" value={rf} onChange={(e) => setRf(e.target.value)} unit="Ω" />
          <Input label="Input Resistor (Rin)" type="number" value={rin} onChange={(e) => setRin(e.target.value)} unit="Ω" />
        </div>

        {gain !== 0 && (
          <ResultDisplay label="Voltage Gain" value={gain.toFixed(2)} variant="success" helpText={`Output = ${mode === 'inverting' ? '-' : ''}${Math.abs(gain).toFixed(2)} × Input`} />
        )}
      </div>
    </Card>
  )
}
