import { useState } from 'react'
import {
  Calculator,
  Lightbulb,
  ArrowDownUp,
  Zap,
  Timer,
  Activity,
  Filter,
  Palette,
  ArrowLeftRight,
  Target,
  TrendingUp,
  Battery,
  Cable,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '../../lib/utils/formatters'

interface CalculatorItem {
  id: string
  name: string
  icon: typeof Calculator
  category: string
}

const calculators: CalculatorItem[] = [
  { id: 'ohms-law', name: "Ohm's Law", icon: Calculator, category: 'Basic' },
  { id: 'led-resistor', name: 'LED Resistor', icon: Lightbulb, category: 'Basic' },
  { id: 'voltage-divider', name: 'Voltage Divider', icon: ArrowDownUp, category: 'Basic' },
  { id: 'resistors', name: 'Resistor Combos', icon: Target, category: 'Basic' },
  { id: '555-timer', name: '555 Timer', icon: Timer, category: 'Timing' },
  { id: 'rc-time', name: 'RC Time Constant', icon: Activity, category: 'Timing' },
  { id: 'capacitors', name: 'Capacitors', icon: Zap, category: 'Components' },
  { id: 'filters', name: 'Filters', icon: Filter, category: 'Frequency' },
  { id: 'resistor-color', name: 'Resistor Color Code', icon: Palette, category: 'Utility' },
  { id: 'unit-converter', name: 'Unit Converter', icon: ArrowLeftRight, category: 'Utility' },
  { id: 'standard-values', name: 'Standard Values', icon: Target, category: 'Utility' },
  { id: 'regulator', name: 'Linear Regulator', icon: Zap, category: 'Power' },
  { id: 'op-amp', name: 'Op-Amp', icon: TrendingUp, category: 'Components' },
  { id: 'battery', name: 'Battery Life', icon: Battery, category: 'Power' },
  { id: 'wire-gauge', name: 'Wire Gauge', icon: Cable, category: 'Utility' },
]

const categories = ['Basic', 'Timing', 'Components', 'Frequency', 'Power', 'Utility']

export default function Sidebar() {
  const [selectedCalc, setSelectedCalc] = useState('ohms-law')
  const [isOpen, setIsOpen] = useState(false)

  const scrollToCalculator = (id: string) => {
    setSelectedCalc(id)
    const element = document.getElementById(`calc-${id}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsOpen(false) // Close mobile menu
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 lg:hidden p-3 rounded-full bg-blue-600 text-white shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-y-auto transition-transform duration-300 z-40',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="p-4 space-y-6">
          {categories.map((category) => {
            const categoryCalcs = calculators.filter((calc) => calc.category === category)
            if (categoryCalcs.length === 0) return null

            return (
              <div key={category}>
                <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  {category}
                </h3>
                <nav className="space-y-1">
                  {categoryCalcs.map((calc) => {
                    const Icon = calc.icon
                    return (
                      <button
                        key={calc.id}
                        onClick={() => scrollToCalculator(calc.id)}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                          selectedCalc === calc.id
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        )}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span>{calc.name}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            )
          })}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
