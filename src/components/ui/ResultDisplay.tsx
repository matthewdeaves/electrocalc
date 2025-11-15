import { ReactNode } from 'react'
import { cn } from '../../lib/utils/formatters'
import { AlertTriangle, CheckCircle2, Info as InfoIcon } from 'lucide-react'

export interface ResultDisplayProps {
  label: string
  value: string | number
  unit?: string
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  helpText?: string
  className?: string
}

export function ResultDisplay({
  label,
  value,
  unit,
  variant = 'default',
  helpText,
  className,
}: ResultDisplayProps) {
  const Icon = variant === 'warning' ? AlertTriangle : variant === 'success' ? CheckCircle2 : null

  return (
    <div
      className={cn(
        'p-4 rounded-md border',
        {
          'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700':
            variant === 'default',
          'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800':
            variant === 'success',
          'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800':
            variant === 'warning',
          'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800': variant === 'error',
          'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800':
            variant === 'info',
        },
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {typeof value === 'number' ? value.toFixed(2) : value}
            </span>
            {unit && (
              <span className="text-base text-slate-600 dark:text-slate-400">{unit}</span>
            )}
          </div>
          {helpText && (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{helpText}</p>
          )}
        </div>
        {Icon && (
          <Icon
            className={cn('w-5 h-5 flex-shrink-0 ml-2', {
              'text-yellow-600 dark:text-yellow-500': variant === 'warning',
              'text-green-600 dark:text-green-500': variant === 'success',
            })}
          />
        )}
      </div>
    </div>
  )
}

export interface ResultGridProps {
  children: ReactNode
  columns?: 1 | 2 | 3
}

export function ResultGrid({ children, columns = 2 }: ResultGridProps) {
  return (
    <div
      className={cn('grid gap-4', {
        'grid-cols-1': columns === 1,
        'grid-cols-1 md:grid-cols-2': columns === 2,
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
      })}
    >
      {children}
    </div>
  )
}
