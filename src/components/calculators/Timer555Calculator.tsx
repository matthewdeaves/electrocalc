import { useState, useEffect } from 'react'
import { Card } from '../ui/Card'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { ResultDisplay, ResultGrid } from '../ui/ResultDisplay'
import { calculate555Astable, calculate555Monostable } from '../../lib/calculations/timers'
import { formatFrequency, formatTime, formatPercentage } from '../../lib/utils/formatters'

const HELP_CONTENT = `The 555 timer IC is one of the most popular ICs for timing and oscillator circuits.

**Astable Mode (Oscillator):**
• Continuous square wave output
• Frequency = 1.44 / ((R1 + 2×R2) × C)
• Duty cycle = (R1 + R2) / (R1 + 2×R2)

**Monostable Mode (One-shot):**
• Single pulse when triggered
• Pulse width = 1.1 × R × C

**Typical values:**
• R1, R2: 1kΩ to 1MΩ
• C: 1nF to 1000µF
• Supply: 4.5V to 16V`

export default function Timer555Calculator() {
  const [mode, setMode] = useState<'astable' | 'monostable'>('astable')
  const [r1, setR1] = useState<string>('10000')
  const [r2, setR2] = useState<string>('10000')
  const [r, setR] = useState<string>('10000')
  const [c, setC] = useState<string>('0.0001')

  const [astableResults, setAstableResults] = useState<ReturnType<typeof calculate555Astable> | null>(null)
  const [monostableResults, setMonostableResults] = useState<ReturnType<typeof calculate555Monostable> | null>(null)

  useEffect(() => {
    if (mode === 'astable') {
      const r1Val = parseFloat(r1)
      const r2Val = parseFloat(r2)
      const cVal = parseFloat(c)

      if (r1Val && r2Val && cVal) {
        setAstableResults(calculate555Astable(r1Val, r2Val, cVal))
      } else {
        setAstableResults(null)
      }
    } else {
      const rVal = parseFloat(r)
      const cVal = parseFloat(c)

      if (rVal && cVal) {
        setMonostableResults(calculate555Monostable(rVal, cVal))
      } else {
        setMonostableResults(null)
      }
    }
  }, [mode, r1, r2, r, c])

  return (
    <Card
      title="555 Timer Calculator"
      subtitle="Calculate frequencies and timing for 555 timer circuits"
      helpContent={HELP_CONTENT}
    >
      <div className="space-y-6">
        {/* Mode selector */}
        <div className="flex gap-2">
          <Button
            variant={mode === 'astable' ? 'primary' : 'outline'}
            onClick={() => setMode('astable')}
            size="sm"
          >
            Astable (Oscillator)
          </Button>
          <Button
            variant={mode === 'monostable' ? 'primary' : 'outline'}
            onClick={() => setMode('monostable')}
            size="sm"
          >
            Monostable (One-shot)
          </Button>
        </div>

        {mode === 'astable' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="R1"
                type="number"
                placeholder="10000"
                value={r1}
                onChange={(e) => setR1(e.target.value)}
                unit="Ω"
                helpText="Between Vcc and discharge"
              />
              <Input
                label="R2"
                type="number"
                placeholder="10000"
                value={r2}
                onChange={(e) => setR2(e.target.value)}
                unit="Ω"
                helpText="Between discharge and trigger"
              />
              <Input
                label="C"
                type="number"
                placeholder="0.0001"
                value={c}
                onChange={(e) => setC(e.target.value)}
                unit="F"
                helpText="Timing capacitor (e.g., 0.0001 for 100µF)"
              />
            </div>

            {astableResults && (
              <div>
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Results
                </h4>
                <ResultGrid columns={2}>
                  <ResultDisplay
                    label="Frequency"
                    value={formatFrequency(astableResults.frequency)}
                    variant="success"
                  />
                  <ResultDisplay
                    label="Period"
                    value={formatTime(astableResults.period)}
                    variant="info"
                  />
                  <ResultDisplay
                    label="Time High"
                    value={formatTime(astableResults.timeHigh)}
                    variant="default"
                  />
                  <ResultDisplay
                    label="Time Low"
                    value={formatTime(astableResults.timeLow)}
                    variant="default"
                  />
                  <ResultDisplay
                    label="Duty Cycle"
                    value={formatPercentage(astableResults.dutyCycle)}
                    variant="info"
                  />
                </ResultGrid>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="R"
                type="number"
                placeholder="10000"
                value={r}
                onChange={(e) => setR(e.target.value)}
                unit="Ω"
                helpText="Timing resistor"
              />
              <Input
                label="C"
                type="number"
                placeholder="0.0001"
                value={c}
                onChange={(e) => setC(e.target.value)}
                unit="F"
                helpText="Timing capacitor"
              />
            </div>

            {monostableResults && (
              <div>
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Results
                </h4>
                <ResultDisplay
                  label="Pulse Width"
                  value={formatTime(monostableResults.pulseWidth)}
                  variant="success"
                  helpText="Duration of output pulse"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
