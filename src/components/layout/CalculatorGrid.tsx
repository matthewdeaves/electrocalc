import OhmsLawCalculator from '../calculators/OhmsLawCalculator'
import LEDResistorCalculator from '../calculators/LEDResistorCalculator'
import VoltageDividerCalculator from '../calculators/VoltageDividerCalculator'
import ResistorCombosCalculator from '../calculators/ResistorCombosCalculator'
import Timer555Calculator from '../calculators/Timer555Calculator'
import RCTimeCalculator from '../calculators/RCTimeCalculator'
import CapacitorCalculator from '../calculators/CapacitorCalculator'
import FilterCalculator from '../calculators/FilterCalculator'
import ResistorColorCalculator from '../calculators/ResistorColorCalculator'
import UnitConverterCalculator from '../calculators/UnitConverterCalculator'
import StandardValuesCalculator from '../calculators/StandardValuesCalculator'
import RegulatorCalculator from '../calculators/RegulatorCalculator'
import OpAmpCalculator from '../calculators/OpAmpCalculator'
import BatteryLifeCalculator from '../calculators/BatteryLifeCalculator'
import WireGaugeCalculator from '../calculators/WireGaugeCalculator'

export default function CalculatorGrid() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Electronics Calculator Suite
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Essential tools for breadboarding and circuit design
        </p>
      </div>

      <div className="space-y-8">
        {/* Basic Calculators */}
        <section id="calc-ohms-law">
          <OhmsLawCalculator />
        </section>

        <section id="calc-led-resistor">
          <LEDResistorCalculator />
        </section>

        <section id="calc-voltage-divider">
          <VoltageDividerCalculator />
        </section>

        <section id="calc-resistors">
          <ResistorCombosCalculator />
        </section>

        {/* Timing Calculators */}
        <section id="calc-555-timer">
          <Timer555Calculator />
        </section>

        <section id="calc-rc-time">
          <RCTimeCalculator />
        </section>

        {/* Component Calculators */}
        <section id="calc-capacitors">
          <CapacitorCalculator />
        </section>

        <section id="calc-op-amp">
          <OpAmpCalculator />
        </section>

        {/* Frequency Calculators */}
        <section id="calc-filters">
          <FilterCalculator />
        </section>

        {/* Power Calculators */}
        <section id="calc-regulator">
          <RegulatorCalculator />
        </section>

        <section id="calc-battery">
          <BatteryLifeCalculator />
        </section>

        {/* Utility Calculators */}
        <section id="calc-resistor-color">
          <ResistorColorCalculator />
        </section>

        <section id="calc-unit-converter">
          <UnitConverterCalculator />
        </section>

        <section id="calc-standard-values">
          <StandardValuesCalculator />
        </section>

        <section id="calc-wire-gauge">
          <WireGaugeCalculator />
        </section>
      </div>
    </div>
  )
}
