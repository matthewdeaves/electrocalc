import { useState, useEffect } from 'react'
import { Card } from '../ui/Card'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Button from '../ui/Button'
import { ResultDisplay, ResultGrid } from '../ui/ResultDisplay'
import TransistorCircuitDiagram from '../ui/TransistorCircuitDiagram'
import { calculateTransistorSwitching } from '../../lib/calculations/transistor'
import { TRANSISTOR_SPECS, FORCED_BETA, type LoadType } from '../../lib/constants/transistors'
import { findNearestStandardValue } from '../../lib/constants/standardValues'
import { formatResistance, formatPower, formatCurrent } from '../../lib/utils/formatters'
import { ChevronDown, ChevronUp } from 'lucide-react'

const HELP_CONTENT = `Calculate base resistor and verify transistor switching for BJT transistors used as switches.

**Transistor as a Switch:**
When used to control LEDs, relays, motors, or other loads from a microcontroller, the transistor acts as an electronically controlled switch.

**Key Formulas:**
• Rb = (Vcontrol - Vbe) / Ib
• Ib = Ic / β_forced (using β = 10 for saturation)
• Power = Vce × Ic + Vbe × Ib

**NPN vs PNP:**
• NPN: Switches the low side (load between Vcc and collector)
• PNP: Switches the high side (load between emitter and ground)

**Common Applications:**
• Control LEDs from Arduino/microcontroller
• Drive relays and solenoids (requires flyback diode!)
• Switch small DC motors
• Interface between 3.3V and 5V logic

**Important Notes:**
• Always use flyback diode with inductive loads (relays, motors)
• Forced beta of 10 ensures reliable saturation
• Check power dissipation to avoid overheating
• For high current loads, use TIP120/TIP125 Darlington transistors`

export default function TransistorCalculator() {
  const [transistorIndex, setTransistorIndex] = useState(0)
  const [controlVoltage, setControlVoltage] = useState<string>('5')
  const [supplyVoltage, setSupplyVoltage] = useState<string>('5')
  const [loadCurrent, setLoadCurrent] = useState<string>('20')
  const [loadType, setLoadType] = useState<LoadType>('LED')
  const [showReference, setShowReference] = useState(false)

  const [results, setResults] = useState<ReturnType<typeof calculateTransistorSwitching> | null>(null)
  const [nearestStandard, setNearestStandard] = useState<{ value: number; formatted: string } | null>(null)

  const selectedTransistor = TRANSISTOR_SPECS[transistorIndex]

  useEffect(() => {
    const vControl = parseFloat(controlVoltage)
    const vSupply = parseFloat(supplyVoltage)
    const iLoad = parseFloat(loadCurrent)

    if (vControl && vSupply && iLoad) {
      const result = calculateTransistorSwitching(vControl, vSupply, iLoad, selectedTransistor, loadType)
      setResults(result)
      setNearestStandard(findNearestStandardValue(result.baseResistor))
    } else {
      setResults(null)
      setNearestStandard(null)
    }
  }, [controlVoltage, supplyVoltage, loadCurrent, transistorIndex, selectedTransistor, loadType])

  // Filter transistors by type
  const npnTransistors = TRANSISTOR_SPECS.filter(t => t.type === 'NPN')
  const pnpTransistors = TRANSISTOR_SPECS.filter(t => t.type === 'PNP')

  const currentTransistorType = selectedTransistor.type

  return (
    <Card
      title="BJT Transistor Switch Calculator"
      subtitle="Calculate base resistor for transistor switching applications"
      helpContent={HELP_CONTENT}
    >
      <div className="space-y-6">
        {/* Transistor selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Transistor"
            options={TRANSISTOR_SPECS.map((t, idx) => ({
              value: idx,
              label: `${t.name} (${t.type}) - ${t.maxCollectorCurrent}mA max`,
            }))}
            value={transistorIndex}
            onChange={(e) => setTransistorIndex(Number(e.target.value))}
          />
          <Select
            label="Load Type"
            options={[
              { value: 'LED', label: 'LED' },
              { value: 'Relay', label: 'Relay (inductive)' },
              { value: 'Motor', label: 'Motor (inductive)' },
              { value: 'Other', label: 'Other' },
            ]}
            value={loadType}
            onChange={(e) => setLoadType(e.target.value as LoadType)}
          />
        </div>

        {/* Transistor info banner */}
        <div className={`p-3 rounded-md ${currentTransistorType === 'NPN' ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' : 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800'}`}>
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className={`text-sm font-medium ${currentTransistorType === 'NPN' ? 'text-blue-900 dark:text-blue-100' : 'text-orange-900 dark:text-orange-100'}`}>
                {selectedTransistor.name} ({selectedTransistor.type})
              </p>
              <p className={`text-xs mt-1 ${currentTransistorType === 'NPN' ? 'text-blue-700 dark:text-blue-300' : 'text-orange-700 dark:text-orange-300'}`}>
                {selectedTransistor.description}
              </p>
              <p className={`text-xs mt-1 ${currentTransistorType === 'NPN' ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600 dark:text-orange-400'}`}>
                Max: {selectedTransistor.maxCollectorCurrent}mA, {selectedTransistor.maxPower}mW | hFE: {selectedTransistor.hFE_min}-{selectedTransistor.hFE_max}
              </p>
            </div>
          </div>
        </div>

        {/* Input parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Control Voltage"
            type="number"
            placeholder="5"
            value={controlVoltage}
            onChange={(e) => setControlVoltage(e.target.value)}
            unit="V"
            helpText="MCU/logic level"
          />
          <Input
            label="Supply Voltage (Vcc)"
            type="number"
            placeholder="5"
            value={supplyVoltage}
            onChange={(e) => setSupplyVoltage(e.target.value)}
            unit="V"
            helpText="Power supply"
          />
          <Input
            label="Load Current (Ic)"
            type="number"
            placeholder="20"
            value={loadCurrent}
            onChange={(e) => setLoadCurrent(e.target.value)}
            unit="mA"
            helpText="Current to switch"
          />
        </div>

        {/* Wiring Diagram */}
        {results && nearestStandard && (
          <TransistorCircuitDiagram
            transistorType={currentTransistorType}
            transistorName={selectedTransistor.name}
            baseResistor={results.baseResistor}
            baseResistorStandard={nearestStandard.formatted}
            controlVoltage={parseFloat(controlVoltage)}
            supplyVoltage={parseFloat(supplyVoltage)}
            loadCurrent={parseFloat(loadCurrent)}
            loadType={loadType}
            showFlybackDiode={loadType === 'Relay' || loadType === 'Motor'}
            baseCurrent={results.baseCurrent}
          />
        )}

        {/* Results */}
        {results && nearestStandard && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Results (using forced β = {FORCED_BETA})
            </h4>
            <ResultGrid columns={2}>
              <ResultDisplay
                label="Calculated Base Resistor"
                value={formatResistance(results.baseResistor)}
                variant="info"
              />
              <ResultDisplay
                label="Nearest Standard (E24)"
                value={nearestStandard.formatted}
                variant="success"
                helpText="Use this standard value"
              />
              <ResultDisplay
                label="Base Current (Ib)"
                value={formatCurrent(results.baseCurrent / 1000)}
                variant="default"
                helpText={`Ic / ${FORCED_BETA} for saturation`}
              />
              <ResultDisplay
                label="Transistor Power"
                value={formatPower(results.powerDissipation / 1000)}
                variant={results.powerDissipation > 500 ? 'warning' : 'default'}
                helpText={results.powerDissipation > 500 ? 'Consider heatsink' : 'Power dissipation OK'}
              />
              <ResultDisplay
                label="Safety Margin"
                value={`${results.safetyMargin.toFixed(0)}%`}
                variant={results.safetyMargin < 20 ? 'warning' : 'success'}
                helpText={`${results.safetyMargin.toFixed(0)}% below max Ic rating`}
              />
              <ResultDisplay
                label="Saturation Status"
                value={results.isSaturated ? '✓ Saturated' : '✗ Not Saturated'}
                variant={results.isSaturated ? 'success' : 'warning'}
                helpText={results.isSaturated ? 'Operating in saturation mode' : 'May need more base current'}
              />
            </ResultGrid>

            {/* Warnings */}
            {results.warnings.length > 0 && (
              <div className="mt-4 space-y-2">
                {results.warnings.map((warning, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-md text-sm ${
                      warning.includes('🔧')
                        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
                        : warning.includes('⚡')
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200'
                        : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                    }`}
                  >
                    {warning}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reference Photos (Collapsible) */}
        <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
          <button
            onClick={() => setShowReference(!showReference)}
            className="flex items-center justify-between w-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            <span>📚 Transistor Reference Diagram</span>
            {showReference ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showReference && (
            <div className="mt-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                {currentTransistorType} Transistor - Physical Layout Reference
              </h4>
              <div className="flex justify-center">
                <img
                  src={currentTransistorType === 'NPN' ? '/diagrams/npn-transistor.png' : '/diagrams/pnp-transistor.png'}
                  alt={`${currentTransistorType} Transistor Diagram`}
                  className="max-w-full h-auto max-h-96 rounded"
                />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3">
                This shows the physical layout and pin identification for {currentTransistorType} transistors like the {selectedTransistor.name}.
                Use this as a reference when identifying the Base, Collector, and Emitter pins on the actual component.
              </p>
            </div>
          )}
        </div>

        {/* Educational note */}
        <div className="text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-4">
          <p className="font-medium mb-1">💡 About Forced Beta:</p>
          <p>
            Using β = {FORCED_BETA} (instead of typical hFE of {selectedTransistor.hFE_typical}) ensures the transistor
            operates in deep saturation, providing reliable switching even with component variations and temperature changes.
          </p>
        </div>
      </div>
    </Card>
  )
}
