# Electro Calc - Electronics Calculator Suite

A comprehensive web-based electronics calculator application designed for breadboarding and circuit design, specifically tailored for working through "Make Electronics: Third Edition."

## Features

### 15 Essential Calculators

#### Basic Calculations
- **Ohm's Law Calculator** - Calculate voltage, current, resistance, and power
- **LED Current Limiting Resistor** - Determine resistor values for LEDs with presets for common LED types
- **Voltage Divider** - Design voltage divider circuits with quick presets (5V→3.3V, etc.)
- **Resistor Combinations** - Calculate series and parallel resistor combinations with dynamic add/remove

#### Timing Circuits
- **555 Timer** - Both astable (oscillator) and monostable (one-shot) modes
- **RC Time Constant** - Charging/discharging calculations with visual curve graph

#### Components
- **Capacitor Calculator** - Series/parallel combinations and energy storage
- **Op-Amp Calculator** - Inverting and non-inverting amplifier gain calculations

#### Frequency & Filters
- **Filter Calculator** - RC low-pass and high-pass filter design

#### Power Supply
- **Linear Regulator Power** - Power dissipation and heatsink requirements (7805, LM317, etc.)
- **Battery Life** - Estimate runtime based on capacity and current draw

#### Utility Tools
- **Resistor Color Code** - Decode 4-band resistor color codes
- **Unit Converter** - Convert between voltage, current, resistance, and capacitance units
- **Standard Value Finder** - Find nearest E12/E24/E96 series resistor values
- **Wire Gauge Calculator** - AWG wire sizing for current capacity and voltage drop

### Key Features

- **Live Calculations** - Results update instantly as you type
- **Dark Mode** - Toggle between light and dark themes (persisted to localStorage)
- **Component Presets** - Quick access to common LED specs, IC values, and standard components
- **Visual Aids** - Graphs for RC charging curves, circuit diagrams
- **Help Content** - Each calculator includes contextual help with formulas and key concepts
- **Standard Values** - Automatic suggestions for nearest standard component values (E12/E24/E96 series)
- **Safety Warnings** - Alerts for power dissipation, current limits, and heatsink requirements
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Sidebar Navigation** - Easy access to all calculators organized by category

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Running the Application

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`

### Building for Production

```bash
# Build static files
npm run build

# Preview production build
npm run preview
```

The built files will be in the `dist/` directory and can be served by any static file server or opened directly in a browser.

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type-safe code
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **Recharts** - Chart library for visualizations
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## Project Structure

```
electro/
├── src/
│   ├── components/
│   │   ├── calculators/      # All 15 calculator components
│   │   ├── ui/                # Reusable UI components
│   │   └── layout/            # Header, Sidebar, Grid layouts
│   ├── lib/
│   │   ├── calculations/      # Pure calculation functions
│   │   ├── constants/         # Standard values, component specs
│   │   └── utils/             # Formatters, converters
│   ├── store/                 # Zustand state management
│   ├── types/                 # TypeScript type definitions
│   ├── App.tsx                # Main application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── index.html
```

## Usage Tips

1. **Quick Navigation** - Use the sidebar to jump between calculators
2. **Mobile Menu** - On mobile, tap the menu button (bottom right) to access the sidebar
3. **Standard Values** - Look for "Nearest Standard Value" results to find real components
4. **Power Warnings** - Pay attention to power dissipation warnings to avoid burning out components
5. **Presets** - Use preset buttons for common voltage conversions and component selections
6. **Help Content** - Click the info icon (ℹ️) on any calculator to see formulas and tips

## Common Workflows

### Designing an LED Circuit
1. Open **LED Current Limiting Resistor** calculator
2. Select your supply voltage (e.g., 5V from breadboard power supply)
3. Choose LED type (color determines forward voltage)
4. Enter desired current (typically 20mA)
5. Use the "Nearest Standard" value shown

### Voltage Regulation
1. Open **Linear Regulator Power** calculator
2. Enter input voltage, output voltage, and current
3. Check power dissipation - use heatsink if needed
4. For adjustable regulators, check formulas in help content

### Timing Circuits
1. **555 Timer** for oscillators and pulses
2. **RC Time Constant** for simple delays and debouncing
3. Use graphs to visualize timing behavior

### Resistor Networks
1. **Resistor Combinations** calculator
2. Add/remove resistors dynamically
3. See nearest standard value for the combination

## License

This project is open source and available for educational and personal use.

## Contributing

This tool was designed for practical breadboarding work. Suggestions and improvements are welcome!

## Acknowledgments

- Designed for use with "Make Electronics: Third Edition" by Charles Platt
- Built with modern web technologies for offline-first usage
- Component values and formulas based on standard electronics references

---

**Happy breadboarding!** 🔌⚡
