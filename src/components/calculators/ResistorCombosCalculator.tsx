import { useState, useEffect } from 'react'
import { Card } from '../ui/Card'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { ResultDisplay } from '../ui/ResultDisplay'
import { Plus, X } from 'lucide-react'
import { calculateSeriesResistance, calculateParallelResistance } from '../../lib/calculations/resistors'
import { formatResistance } from '../../lib/utils/formatters'
import { findNearestStandardValue } from '../../lib/constants/standardValues'

const HELP_CONTENT = `Calculate total resistance of resistors in series or parallel configurations.

**Series:** Rtotal = R1 + R2 + R3 + ...
• Current same through all resistors
• Voltages add up
• Total resistance increases

**Parallel:** 1/Rtotal = 1/R1 + 1/R2 + 1/R3 + ...
• Voltage same across all resistors
• Currents add up
• Total resistance decreases

Add or remove resistors dynamically to see how they affect the total resistance.`

export default function ResistorCombosCalculator() {
  const [resistors, setResistors] = useState<string[]>(['1000', '2200'])
  const [mode, setMode] = useState<'series' | 'parallel'>('series')

  const [totalResistance, setTotalResistance] = useState<number>(0)
  const [nearestStandard, setNearestStandard] = useState<{ value: number; formatted: string } | null>(null)

  useEffect(() => {
    const values = resistors
      .map((r) => parseFloat(r))
      .filter((r) => !isNaN(r) && r > 0)

    if (values.length > 0) {
      const total =
        mode === 'series'
          ? calculateSeriesResistance(values)
          : calculateParallelResistance(values)
      setTotalResistance(total)
      setNearestStandard(findNearestStandardValue(total))
    } else {
      setTotalResistance(0)
      setNearestStandard(null)
    }
  }, [resistors, mode])

  const addResistor = () => {
    setResistors([...resistors, ''])
  }

  const removeResistor = (index: number) => {
    if (resistors.length > 1) {
      setResistors(resistors.filter((_, i) => i !== index))
    }
  }

  const updateResistor = (index: number, value: string) => {
    const newResistors = [...resistors]
    newResistors[index] = value
    setResistors(newResistors)
  }

  return (
    <Card
      title="Resistor Combinations"
      subtitle="Calculate series and parallel resistor values"
      helpContent={HELP_CONTENT}
    >
      <div className="space-y-6">
        {/* Mode selector */}
        <div className="flex gap-2">
          <Button
            variant={mode === 'series' ? 'primary' : 'outline'}
            onClick={() => setMode('series')}
            size="sm"
          >
            Series
          </Button>
          <Button
            variant={mode === 'parallel' ? 'primary' : 'outline'}
            onClick={() => setMode('parallel')}
            size="sm"
          >
            Parallel
          </Button>
        </div>

        {/* Resistor inputs */}
        <div className="space-y-3">
          {resistors.map((resistor, index) => (
            <div key={index} className="flex items-end gap-2">
              <div className="flex-1">
                <Input
                  label={`Resistor ${index + 1}`}
                  type="number"
                  placeholder="e.g., 1000"
                  value={resistor}
                  onChange={(e) => updateResistor(index, e.target.value)}
                  unit="Ω"
                />
              </div>
              <Button
                variant="outline"
                size="md"
                onClick={() => removeResistor(index)}
                disabled={resistors.length === 1}
                className="flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button variant="secondary" onClick={addResistor} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Resistor
        </Button>

        {totalResistance > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Results
            </h4>
            <div className="space-y-3">
              <ResultDisplay
                label={`Total Resistance (${mode})`}
                value={formatResistance(totalResistance)}
                variant="success"
              />
              {nearestStandard && (
                <ResultDisplay
                  label="Nearest Standard Value (E24)"
                  value={nearestStandard.formatted}
                  variant="info"
                  helpText="Closest standard resistor value"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
