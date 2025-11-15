import { useState } from 'react'
import { Card } from '../ui/Card'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { ResultDisplay } from '../ui/ResultDisplay'
import { convertResistance, convertVoltage, convertCurrent, convertCapacitance } from '../../lib/utils/converters'

const HELP_CONTENT = `Convert between different units for electronics values.

Supports conversion for:
• Voltage (V, mV, kV)
• Current (A, mA, µA)
• Resistance (Ω, kΩ, MΩ)
• Capacitance (F, µF, nF, pF)`

type UnitType = 'voltage' | 'current' | 'resistance' | 'capacitance'

const unitOptions = {
  voltage: ['V', 'mV', 'kV'],
  current: ['A', 'mA', 'µA'],
  resistance: ['Ω', 'kΩ', 'MΩ'],
  capacitance: ['F', 'µF', 'nF', 'pF'],
}

export default function UnitConverterCalculator() {
  const [type, setType] = useState<UnitType>('voltage')
  const [value, setValue] = useState<string>('5')
  const [fromUnit, setFromUnit] = useState('V')
  const [toUnit, setToUnit] = useState('mV')

  const convert = () => {
    const val = parseFloat(value)
    if (isNaN(val)) return 0

    switch (type) {
      case 'voltage': return convertVoltage(val, fromUnit, toUnit)
      case 'current': return convertCurrent(val, fromUnit, toUnit)
      case 'resistance': return convertResistance(val, fromUnit, toUnit)
      case 'capacitance': return convertCapacitance(val, fromUnit, toUnit)
      default: return 0
    }
  }

  const result = convert()

  return (
    <Card title="Unit Converter" subtitle="Convert between electronics units" helpContent={HELP_CONTENT}>
      <div className="space-y-6">
        <Select
          label="Quantity Type"
          options={[
            { value: 'voltage', label: 'Voltage' },
            { value: 'current', label: 'Current' },
            { value: 'resistance', label: 'Resistance' },
            { value: 'capacitance', label: 'Capacitance' },
          ]}
          value={type}
          onChange={(e) => {
            const newType = e.target.value as UnitType
            setType(newType)
            setFromUnit(unitOptions[newType][0])
            setToUnit(unitOptions[newType][1] || unitOptions[newType][0])
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input label="From" type="number" value={value} onChange={(e) => setValue(e.target.value)} />
            <Select
              label="Unit"
              options={unitOptions[type].map(u => ({ value: u, label: u }))}
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="mt-2"
            />
          </div>
          <div>
            <Select
              label="To Unit"
              options={unitOptions[type].map(u => ({ value: u, label: u }))}
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
            />
          </div>
        </div>

        <ResultDisplay label="Result" value={`${result.toFixed(6)} ${toUnit}`} variant="success" />
      </div>
    </Card>
  )
}
