import { useState, useEffect } from 'react'
import { Card } from '../ui/Card'
import Input from '../ui/Input'
import { ResultDisplay, ResultGrid } from '../ui/ResultDisplay'
import { calculateRCTimeConstant, calculateChargingVoltage } from '../../lib/calculations/timers'
import { formatTime } from '../../lib/utils/formatters'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const HELP_CONTENT = `The RC time constant (τ = R × C) determines how quickly a capacitor charges or discharges through a resistor.

**Key Points:**
• τ = R × C (time constant in seconds)
• At 1τ: 63.2% charged
• At 3τ: 95% charged
• At 5τ: 99% charged (considered "fully" charged)

**Applications:**
• Timing circuits
• Debouncing switches
• Filtering
• Delay circuits`

export default function RCTimeCalculator() {
  const [resistance, setResistance] = useState<string>('10000')
  const [capacitance, setCapacitance] = useState<string>('0.0001')
  const [supplyVoltage, setSupplyVoltage] = useState<string>('5')

  const [results, setResults] = useState<ReturnType<typeof calculateRCTimeConstant> | null>(null)
  const [chartData, setChartData] = useState<{ time: number; voltage: number }[]>([])

  useEffect(() => {
    const r = parseFloat(resistance)
    const c = parseFloat(capacitance)
    const vs = parseFloat(supplyVoltage)

    if (r && c) {
      const result = calculateRCTimeConstant(r, c)
      setResults(result)

      // Generate charging curve data
      const data: { time: number; voltage: number }[] = []
      const maxTime = result.time99
      const steps = 50

      for (let i = 0; i <= steps; i++) {
        const time = (i / steps) * maxTime
        const voltage = calculateChargingVoltage(vs || 5, time, r, c)
        data.push({ time: time * 1000, voltage }) // Convert to ms
      }
      setChartData(data)
    } else {
      setResults(null)
      setChartData([])
    }
  }, [resistance, capacitance, supplyVoltage])

  return (
    <Card
      title="RC Time Constant Calculator"
      subtitle="Calculate charging time and visualize the curve"
      helpContent={HELP_CONTENT}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Resistance"
            type="number"
            placeholder="10000"
            value={resistance}
            onChange={(e) => setResistance(e.target.value)}
            unit="Ω"
          />
          <Input
            label="Capacitance"
            type="number"
            placeholder="0.0001"
            value={capacitance}
            onChange={(e) => setCapacitance(e.target.value)}
            unit="F"
            helpText="e.g., 0.0001 for 100µF"
          />
          <Input
            label="Supply Voltage"
            type="number"
            placeholder="5"
            value={supplyVoltage}
            onChange={(e) => setSupplyVoltage(e.target.value)}
            unit="V"
            helpText="For graph only"
          />
        </div>

        {results && (
          <>
            <div>
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Results
              </h4>
              <ResultGrid columns={2}>
                <ResultDisplay
                  label="Time Constant (τ)"
                  value={formatTime(results.timeConstant)}
                  variant="success"
                  helpText="Time to reach 63.2%"
                />
                <ResultDisplay
                  label="Time to 95%"
                  value={formatTime(results.time95)}
                  variant="info"
                  helpText="3 × τ"
                />
                <ResultDisplay
                  label="Time to 99%"
                  value={formatTime(results.time99)}
                  variant="info"
                  helpText="5 × τ (fully charged)"
                />
              </ResultGrid>
            </div>

            {chartData.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Charging Curve
                </h4>
                <div className="h-64 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-slate-300 dark:stroke-slate-600" />
                      <XAxis
                        dataKey="time"
                        label={{ value: 'Time (ms)', position: 'insideBottom', offset: -5 }}
                        className="text-slate-600 dark:text-slate-400"
                      />
                      <YAxis
                        label={{ value: 'Voltage (V)', angle: -90, position: 'insideLeft' }}
                        className="text-slate-600 dark:text-slate-400"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          border: 'none',
                          borderRadius: '0.375rem',
                          color: '#fff',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="voltage"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  )
}
