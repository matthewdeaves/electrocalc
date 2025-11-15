import { useState } from 'react'
import { Card } from '../ui/Card'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { ResultDisplay, ResultGrid } from '../ui/ResultDisplay'
import { findNearestStandardValue, E12_SERIES, E24_SERIES, E96_SERIES } from '../../lib/constants/standardValues'

const HELP_CONTENT = `Find the nearest standard resistor value from E-series.

**E12 Series (10% tolerance):** 12 values per decade
**E24 Series (5% tolerance):** 24 values per decade
**E96 Series (1% tolerance):** 96 values per decade

The calculator finds the closest available standard value to your calculated resistance.`

export default function StandardValuesCalculator() {
  const [value, setValue] = useState<string>('4700')
  const [series, setSeries] = useState<'E12' | 'E24' | 'E96'>('E24')

  const seriesMap = { E12: E12_SERIES, E24: E24_SERIES, E96: E96_SERIES }
  const val = parseFloat(value)
  const nearest = val ? findNearestStandardValue(val, seriesMap[series]) : null

  return (
    <Card title="Standard Value Finder" subtitle="Find nearest standard resistor values" helpContent={HELP_CONTENT}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Desired Value" type="number" value={value} onChange={(e) => setValue(e.target.value)} unit="Ω" />
          <Select
            label="Series"
            options={[
              { value: 'E12', label: 'E12 (10%)' },
              { value: 'E24', label: 'E24 (5%)' },
              { value: 'E96', label: 'E96 (1%)' },
            ]}
            value={series}
            onChange={(e) => setSeries(e.target.value as 'E12' | 'E24' | 'E96')}
          />
        </div>

        {nearest && (
          <ResultDisplay label="Nearest Standard Value" value={nearest.formatted} variant="success" helpText={`${series} series`} />
        )}
      </div>
    </Card>
  )
}
