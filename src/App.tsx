import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import CalculatorGrid from './components/layout/CalculatorGrid'
import { useThemeStore } from './store/themeStore'

function App() {
  const { isDark, toggleTheme } = useThemeStore()

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <CalculatorGrid />
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
