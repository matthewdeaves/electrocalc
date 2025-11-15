import { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils/formatters'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  unit?: string
  error?: string
  helpText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, unit, error, helpText, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm',
              'text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              'disabled:cursor-not-allowed disabled:opacity-50',
              unit && 'pr-12',
              error && 'border-red-500 dark:border-red-500',
              className
            )}
            ref={ref}
            {...props}
          />
          {unit && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-sm text-slate-500 dark:text-slate-400">{unit}</span>
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        {helpText && !error && (
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{helpText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
