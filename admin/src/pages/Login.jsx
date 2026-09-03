import { useState } from 'react'
import { FaLock } from 'react-icons/fa'
import { useAuth } from '../lib/AuthContext'
import { Button, Input } from '../components/ui'
import logo from '../assets/logo.png'

export default function Login() {
  const { login } = useAuth()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(password)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid-glow flex min-h-screen items-center justify-center bg-ink px-5">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-panel p-8 shadow-2xl">
        <div className="flex justify-center">
          <div className="rounded-2xl bg-white p-3 shadow-lg shadow-bitcoin/20">
            <img src={logo} alt="Togo Bitcoin Community" className="h-12 w-auto object-contain" />
          </div>
        </div>
        <h1 className="mt-5 text-center font-display text-xl font-bold text-white">Togo Bitcoin Community</h1>
        <p className="mt-1 text-center text-sm text-gray-400">Tableau de bord administrateur</p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
              <FaLock size={11} /> Mot de passe
            </label>
            <Input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="!bg-ink !border-white/10 !text-white"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full justify-center">
            {loading ? 'Connexion…' : 'Se connecter'}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500">
          Mot de passe généré au premier lancement du serveur — voir la console ou{' '}
          <code className="rounded bg-white/5 px-1 py-0.5">server/.admin-password</code>.
        </p>
      </div>
    </div>
  )
}
