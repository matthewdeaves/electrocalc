import { type LoadType } from '../../lib/constants/transistors'

interface TransistorCircuitDiagramProps {
  transistorType: 'NPN' | 'PNP'
  transistorName: string
  baseResistor: number
  baseResistorStandard: string
  controlVoltage: number
  supplyVoltage: number
  loadCurrent: number
  loadType: LoadType
  showFlybackDiode: boolean
  baseCurrent: number
}

export default function TransistorCircuitDiagram({
  transistorType,
  transistorName,
  baseResistor,
  baseResistorStandard,
  controlVoltage,
  supplyVoltage,
  loadCurrent,
  loadType,
  showFlybackDiode,
  baseCurrent,
}: TransistorCircuitDiagramProps) {
  // SVG dimensions
  const width = 600
  const height = 400

  // Component positions
  const transistorX = 300
  const transistorY = 220

  // Colors
  const wireColorPower = '#ef4444' // Red
  const wireColorGround = '#1f2937' // Dark gray/black
  const wireColorSignal = '#3b82f6' // Blue
  const componentColor = '#1f2937'
  const labelBg = '#ffffff'

  // Helper to create a label
  const Label = ({ x, y, text, align = 'middle' }: { x: number; y: number; text: string; align?: 'start' | 'middle' | 'end' }) => (
    <g>
      <rect
        x={align === 'middle' ? x - 30 : align === 'end' ? x - 65 : x}
        y={y - 10}
        width={60}
        height={20}
        fill={labelBg}
        stroke="#e5e7eb"
        strokeWidth="1"
        rx="3"
      />
      <text
        x={x}
        y={y + 5}
        textAnchor={align}
        fontSize="12"
        fontWeight="500"
        fill={componentColor}
        fontFamily="system-ui, sans-serif"
      >
        {text}
      </text>
    </g>
  )

  // Resistor symbol
  const Resistor = ({ x1, y1, x2, y2, vertical = false }: { x1: number; y1: number; x2: number; y2: number; vertical?: boolean }) => {
    const length = vertical ? Math.abs(y2 - y1) : Math.abs(x2 - x1)
    const zigzagLength = 30
    const midPoint = vertical ? (y1 + y2) / 2 : (x1 + x2) / 2

    if (vertical) {
      const startY = midPoint - zigzagLength / 2
      const path = `M ${x1},${y1} L ${x1},${startY} L ${x1 - 5},${startY + 5} L ${x1 + 5},${startY + 10} L ${x1 - 5},${startY + 15} L ${x1 + 5},${startY + 20} L ${x1 - 5},${startY + 25} L ${x1},${startY + 30} L ${x1},${y2}`
      return <path d={path} stroke={componentColor} strokeWidth="2" fill="none" />
    } else {
      const startX = midPoint - zigzagLength / 2
      const path = `M ${x1},${y1} L ${startX},${y1} L ${startX + 5},${y1 - 5} L ${startX + 10},${y1 + 5} L ${startX + 15},${y1 - 5} L ${startX + 20},${y1 + 5} L ${startX + 25},${y1 - 5} L ${startX + 30},${y1} L ${x2},${y1}`
      return <path d={path} stroke={componentColor} strokeWidth="2" fill="none" />
    }
  }

  // LED symbol
  const LED = ({ x, y }: { x: number; y: number }) => (
    <g>
      <path
        d={`M ${x - 8},${y - 8} L ${x + 8},${y} L ${x - 8},${y + 8} Z`}
        stroke={componentColor}
        strokeWidth="2"
        fill="none"
      />
      <line x1={x + 8} y1={y - 8} x2={x + 8} y2={y + 8} stroke={componentColor} strokeWidth="2" />
      {/* Light rays */}
      <path d={`M ${x + 10},${y - 5} L ${x + 15},${y - 8} M ${x + 13},${y - 8} L ${x + 15},${y - 6}`} stroke={componentColor} strokeWidth="1.5" />
      <path d={`M ${x + 10},${y + 5} L ${x + 15},${y + 8} M ${x + 13},${y + 8} L ${x + 15},${y + 6}`} stroke={componentColor} strokeWidth="1.5" />
    </g>
  )

  // Transistor symbol (NPN or PNP)
  const TransistorSymbol = ({ x, y, type }: { x: number; y: number; type: 'NPN' | 'PNP' }) => {
    const baseX = x - 15
    const emitterY = type === 'NPN' ? y + 25 : y - 25
    const collectorY = type === 'NPN' ? y - 25 : y + 25

    return (
      <g>
        {/* Base line (vertical) */}
        <line x1={baseX} y1={y - 20} x2={baseX} y2={y + 20} stroke={componentColor} strokeWidth="3" />
        {/* Base connection */}
        <line x1={x - 40} y1={y} x2={baseX} y2={y} stroke={componentColor} strokeWidth="2" />
        {/* Collector */}
        <line x1={baseX} y1={collectorY} x2={x + 15} y2={collectorY} stroke={componentColor} strokeWidth="2" />
        <line x1={x + 15} y1={collectorY} x2={x + 15} y2={collectorY > y ? y + 40 : y - 40} stroke={componentColor} strokeWidth="2" />
        {/* Emitter with arrow */}
        <line x1={baseX} y1={emitterY} x2={x + 15} y2={emitterY} stroke={componentColor} strokeWidth="2" />
        <line x1={x + 15} y1={emitterY} x2={x + 15} y2={emitterY > y ? y + 40 : y - 40} stroke={componentColor} strokeWidth="2" />
        {/* Arrow on emitter */}
        {type === 'NPN' ? (
          <path d={`M ${x + 15},${y + 35} L ${x + 10},${y + 30} L ${x + 15},${y + 30} Z`} fill={componentColor} />
        ) : (
          <path d={`M ${baseX + 5},${y - 20} L ${baseX},${y - 25} L ${baseX + 5},${y - 25} Z`} fill={componentColor} />
        )}
        {/* Circle */}
        <circle cx={x} cy={y} r="30" stroke={componentColor} strokeWidth="2" fill="none" />
      </g>
    )
  }

  // Diode symbol (for flyback)
  const Diode = ({ x, y, vertical = false }: { x: number; y: number; vertical?: boolean }) => {
    if (vertical) {
      return (
        <g>
          <path d={`M ${x - 6},${y - 8} L ${x + 6},${y - 8} L ${x},${y + 2} Z`} stroke={componentColor} strokeWidth="2" fill="none" />
          <line x1={x - 6} y1={y + 2} x2={x + 6} y2={y + 2} stroke={componentColor} strokeWidth="2" />
        </g>
      )
    }
    return (
      <g>
        <path d={`M ${x - 8},${y - 6} L ${x - 8},${y + 6} L ${x + 2},${y} Z`} stroke={componentColor} strokeWidth="2" fill="none" />
        <line x1={x + 2} y1={y - 6} x2={x + 2} y2={y + 6} stroke={componentColor} strokeWidth="2" />
      </g>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
      <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
        Wiring Diagram - How to Connect
      </h4>
      <svg
        width="100%"
        height="auto"
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto"
        style={{ maxWidth: '600px' }}
      >
        {transistorType === 'NPN' ? (
          // NPN Configuration
          <g>
            {/* Control signal input */}
            <line x1={50} y1={transistorY} x2={transistorX - 40} y2={transistorY} stroke={wireColorSignal} strokeWidth="2" />
            <circle cx={50} cy={transistorY} r="4" fill={wireColorSignal} />
            <Label x={50} y={transistorY - 20} text={`Control ${controlVoltage}V`} align="middle" />

            {/* Base resistor */}
            <Resistor x1={50} y1={transistorY} x2={transistorX - 40} y2={transistorY} />
            <Label x={150} y={transistorY - 20} text={baseResistorStandard} align="middle" />

            {/* Transistor */}
            <TransistorSymbol x={transistorX} y={transistorY} type="NPN" />
            <Label x={transistorX} y={transistorY + 65} text={transistorName} align="middle" />

            {/* Emitter to ground */}
            <line x1={transistorX + 15} y1={transistorY + 40} x2={transistorX + 15} y2={350} stroke={wireColorGround} strokeWidth="2" />
            <line x1={transistorX - 10} y1={350} x2={transistorX + 40} y2={350} stroke={wireColorGround} strokeWidth="3" />
            <Label x={transistorX + 15} y={370} text="GND" align="middle" />

            {/* Collector to load */}
            <line x1={transistorX + 15} y1={transistorY - 40} x2={transistorX + 15} y2={120} stroke={wireColorPower} strokeWidth="2" />

            {/* Load */}
            {loadType === 'LED' ? (
              <>
                <LED x={transistorX + 15} y={90} />
                <Label x={transistorX + 15} y={60} text={`LED ${loadCurrent}mA`} align="middle" />
              </>
            ) : (
              <>
                <Resistor x1={transistorX + 15} y1={120} x2={transistorX + 15} y2={70} vertical />
                <Label x={transistorX + 15} y={60} text={`Load ${loadCurrent}mA`} align="middle" />
              </>
            )}

            {/* Supply voltage to load */}
            <line x1={transistorX + 15} y1={loadType === 'LED' ? 70 : 70} x2={transistorX + 15} y2={40} stroke={wireColorPower} strokeWidth="2" />
            <circle cx={transistorX + 15} cy={40} r="4" fill={wireColorPower} />
            <Label x={transistorX + 15} y={25} text={`Vcc ${supplyVoltage}V`} align="middle" />

            {/* Flyback diode (if needed) */}
            {showFlybackDiode && (
              <g>
                <line x1={transistorX + 50} y1={40} x2={transistorX + 50} y2={95} stroke="#9333ea" strokeWidth="2" strokeDasharray="4,4" />
                <Diode x={transistorX + 50} y={70} vertical />
                <line x1={transistorX + 50} y1={95} x2={transistorX + 50} y2={350} stroke="#9333ea" strokeWidth="2" strokeDasharray="4,4" />
                <text x={transistorX + 70} y={70} fontSize="11" fill="#9333ea" fontWeight="600">
                  1N4001
                </text>
                <text x={transistorX + 70} y={85} fontSize="10" fill="#9333ea">
                  (flyback)
                </text>
              </g>
            )}

            {/* Current flow indicators */}
            <text x={transistorX + 35} y={150} fontSize="11" fill="#64748b" fontStyle="italic">
              Ic: {loadCurrent}mA
            </text>
            <text x={transistorX - 120} y={transistorY + 30} fontSize="11" fill="#64748b" fontStyle="italic">
              Ib: {baseCurrent.toFixed(1)}mA
            </text>

            {/* Connection labels */}
            <text x={transistorX - 55} y={transistorY - 5} fontSize="10" fill="#64748b">
              Base
            </text>
            <text x={transistorX + 30} y={transistorY - 50} fontSize="10" fill="#64748b">
              Collector
            </text>
            <text x={transistorX + 30} y={transistorY + 55} fontSize="10" fill="#64748b">
              Emitter
            </text>
          </g>
        ) : (
          // PNP Configuration
          <g>
            {/* Supply voltage to emitter */}
            <line x1={transistorX + 15} y1={40} x2={transistorX + 15} y2={transistorY - 40} stroke={wireColorPower} strokeWidth="2" />
            <circle cx={transistorX + 15} cy={40} r="4" fill={wireColorPower} />
            <Label x={transistorX + 15} y={25} text={`Vcc ${supplyVoltage}V`} align="middle" />

            {/* Transistor */}
            <TransistorSymbol x={transistorX} y={transistorY} type="PNP" />
            <Label x={transistorX} y={transistorY - 65} text={transistorName} align="middle" />

            {/* Collector to load */}
            <line x1={transistorX + 15} y1={transistorY + 40} x2={transistorX + 15} y2={280} stroke={wireColorGround} strokeWidth="2" />

            {/* Load */}
            {loadType === 'LED' ? (
              <>
                <LED x={transistorX + 15} y={310} />
                <Label x={transistorX + 15} y={340} text={`LED ${loadCurrent}mA`} align="middle" />
              </>
            ) : (
              <>
                <Resistor x1={transistorX + 15} y1={280} x2={transistorX + 15} y2={330} vertical />
                <Label x={transistorX + 15} y={340} text={`Load ${loadCurrent}mA`} align="middle" />
              </>
            )}

            {/* Load to ground */}
            <line x1={transistorX + 15} y1={loadType === 'LED' ? 330 : 330} x2={transistorX + 15} y2={360} stroke={wireColorGround} strokeWidth="2" />
            <line x1={transistorX - 10} y1={360} x2={transistorX + 40} y2={360} stroke={wireColorGround} strokeWidth="3" />
            <Label x={transistorX + 15} y={380} text="GND" align="middle" />

            {/* Base resistor */}
            <line x1={50} y1={transistorY} x2={transistorX - 40} y2={transistorY} stroke={wireColorSignal} strokeWidth="2" />
            <Resistor x1={50} y1={transistorY} x2={transistorX - 40} y2={transistorY} />
            <Label x={150} y={transistorY + 25} text={baseResistorStandard} align="middle" />

            {/* Control signal (low to turn on PNP) */}
            <circle cx={50} cy={transistorY} r="4" fill={wireColorSignal} />
            <Label x={50} y={transistorY + 25} text={`Control 0V`} align="middle" />
            <text x={35} y={transistorY - 8} fontSize="10" fill="#64748b">
              (LOW)
            </text>

            {/* Flyback diode (if needed) */}
            {showFlybackDiode && (
              <g>
                <line x1={transistorX + 50} y1={40} x2={transistorX + 50} y2={305} stroke="#9333ea" strokeWidth="2" strokeDasharray="4,4" />
                <Diode x={transistorX + 50} y={180} vertical />
                <line x1={transistorX + 50} y1={305} x2={transistorX + 50} y2={360} stroke="#9333ea" strokeWidth="2" strokeDasharray="4,4" />
                <text x={transistorX + 70} y={180} fontSize="11" fill="#9333ea" fontWeight="600">
                  1N4001
                </text>
                <text x={transistorX + 70} y={195} fontSize="10" fill="#9333ea">
                  (flyback)
                </text>
              </g>
            )}

            {/* Current flow indicators */}
            <text x={transistorX + 35} y={250} fontSize="11" fill="#64748b" fontStyle="italic">
              Ic: {loadCurrent}mA
            </text>
            <text x={transistorX - 120} y={transistorY + 5} fontSize="11" fill="#64748b" fontStyle="italic">
              Ib: {baseCurrent.toFixed(1)}mA
            </text>

            {/* Connection labels */}
            <text x={transistorX - 55} y={transistorY + 15} fontSize="10" fill="#64748b">
              Base
            </text>
            <text x={transistorX + 30} y={transistorY + 55} fontSize="10" fill="#64748b">
              Collector
            </text>
            <text x={transistorX + 30} y={transistorY - 50} fontSize="10" fill="#64748b">
              Emitter
            </text>
          </g>
        )}
      </svg>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5" style={{ backgroundColor: wireColorPower }} />
          <span>Power (+)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5" style={{ backgroundColor: wireColorGround }} />
          <span>Ground (-)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5" style={{ backgroundColor: wireColorSignal }} />
          <span>Control Signal</span>
        </div>
        {showFlybackDiode && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 border-t-2 border-dashed" style={{ borderColor: '#9333ea' }} />
            <span className="text-purple-600 dark:text-purple-400">Flyback Diode</span>
          </div>
        )}
      </div>
    </div>
  )
}
