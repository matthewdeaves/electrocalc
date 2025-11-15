import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils/formatters'
import { Info } from 'lucide-react'
import { useState } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  helpContent?: string
  children: ReactNode
}

export function Card({ className, title, subtitle, helpContent, children, ...props }: CardProps) {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <div
      className={cn(
        'rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm',
        className
      )}
      {...props}
    >
      {(title || subtitle) && (
        <div className="border-b border-slate-200 dark:border-slate-700 px-6 py-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {title && (
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
              )}
            </div>
            {helpContent && (
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="ml-4 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                title="Toggle help"
              >
                <Info
                  className={cn(
                    'w-5 h-5 transition-colors',
                    showHelp
                      ? 'text-blue-500 dark:text-blue-400'
                      : 'text-slate-400 dark:text-slate-500'
                  )}
                />
              </button>
            )}
          </div>
          {showHelp && helpContent && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
              <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line">
                {helpContent}
              </p>
            </div>
          )}
        </div>
      )}
      <div className="px-6 py-4">{children}</div>
    </div>
  )
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />
}
