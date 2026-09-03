// Small shared UI primitives so every admin screen looks and behaves the same way.

export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}>{children}</div>
  )
}

export function Button({ variant = 'primary', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none'
  const variants = {
    primary: 'bg-bitcoin text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-bitcoin/30',
    outline: 'border border-gray-300 text-ink hover:border-bitcoin hover:text-bitcoin-dark',
    ghost: 'text-gray-500 hover:bg-gray-100 hover:text-ink',
    danger: 'text-red-600 hover:bg-red-50',
  }
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}

export function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-gray-400">{hint}</span>}
    </label>
  )
}

const inputClass =
  'w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-gray-400 focus:border-bitcoin'

export function Input(props) {
  return <input className={inputClass} {...props} />
}

export function Textarea(props) {
  return <textarea className={`${inputClass} resize-y`} rows={4} {...props} />
}

export function PageHeader({ title, description, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">{title}</h1>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export function Toast({ message, type = 'success', onClose }) {
  if (!message) return null
  const styles = type === 'error' ? 'bg-red-600' : 'bg-ink'
  return (
    <div className={`fixed bottom-6 right-6 z-50 rounded-xl px-5 py-3 text-sm font-medium text-white shadow-xl ${styles}`}>
      <div className="flex items-center gap-3">
        {message}
        <button onClick={onClose} className="text-white/70 hover:text-white">
          ✕
        </button>
      </div>
    </div>
  )
}
