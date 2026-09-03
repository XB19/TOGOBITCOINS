import { useEffect, useState } from 'react'
import { FaPlus, FaTrash, FaSave } from 'react-icons/fa'
import { api } from '../lib/api'
import { Card, Button, Field, Input, Textarea, PageHeader, Toast } from '../components/ui'

const tabs = [
  { key: 'pillars', label: 'Piliers (accueil)' },
  { key: 'offerings', label: 'Ce que nous proposons' },
  { key: 'values', label: 'Nos valeurs' },
  { key: 'about', label: 'À propos' },
]

export default function PagesAdmin() {
  const [tab, setTab] = useState('pillars')
  const [toast, setToast] = useState(null)

  return (
    <div>
      <PageHeader title="Textes du site" description="Les textes fixes utilisés sur l'accueil et la page À propos." />

      <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              tab === t.key ? 'bg-bitcoin text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'about' ? (
        <AboutEditor notify={setToast} />
      ) : (
        <ListEditor sub={tab} notify={setToast} />
      )}

      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
    </div>
  )
}

function ListEditor({ sub, notify }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  function refresh() {
    return api.get(`/api/pages/${sub}`).then(setItems)
  }

  useEffect(() => {
    setLoading(true)
    refresh().finally(() => setLoading(false))
  }, [sub])

  async function handleAdd() {
    try {
      await api.post(`/api/pages/${sub}`, { title: 'Nouveau titre', description: 'Description…' })
      await refresh()
    } catch (err) {
      notify({ type: 'error', message: err.message })
    }
  }

  async function handleSave(item) {
    try {
      await api.put(`/api/pages/${sub}/${item.id}`, { title: item.title, description: item.description })
      notify({ type: 'success', message: 'Enregistré.' })
      await refresh()
    } catch (err) {
      notify({ type: 'error', message: err.message })
    }
  }

  async function handleDelete(item) {
    if (!confirm(`Supprimer « ${item.title} » ?`)) return
    try {
      await api.del(`/api/pages/${sub}/${item.id}`)
      await refresh()
    } catch (err) {
      notify({ type: 'error', message: err.message })
    }
  }

  if (loading) return <p className="text-sm text-gray-400">Chargement…</p>

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <Card key={item.id} className="p-5">
          <div className="grid gap-4 sm:grid-cols-[1fr_2fr] sm:items-start">
            <Field label="Titre">
              <Input
                value={item.title}
                onChange={(e) => {
                  const next = [...items]
                  next[i] = { ...item, title: e.target.value }
                  setItems(next)
                }}
              />
            </Field>
            <Field label="Description">
              <Textarea
                rows={2}
                value={item.description}
                onChange={(e) => {
                  const next = [...items]
                  next[i] = { ...item, description: e.target.value }
                  setItems(next)
                }}
              />
            </Field>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <Button variant="danger" className="!px-3 !py-1.5 text-xs" onClick={() => handleDelete(item)}>
              <FaTrash size={11} /> Supprimer
            </Button>
            <Button variant="outline" className="!px-3 !py-1.5 text-xs" onClick={() => handleSave(item)}>
              <FaSave size={11} /> Enregistrer
            </Button>
          </div>
        </Card>
      ))}

      <Button variant="outline" onClick={handleAdd}>
        <FaPlus size={12} /> Ajouter un élément
      </Button>
    </div>
  )
}

function AboutEditor({ notify }) {
  const [about, setAbout] = useState(null)

  useEffect(() => {
    api.get('/api/pages/about').then(setAbout)
  }, [])

  async function save() {
    try {
      await api.put('/api/pages/about', about)
      notify({ type: 'success', message: 'Textes « À propos » enregistrés.' })
    } catch (err) {
      notify({ type: 'error', message: err.message })
    }
  }

  if (!about) return <p className="text-sm text-gray-400">Chargement…</p>

  return (
    <div className="space-y-5">
      <Card className="p-5">
        <h3 className="font-display text-sm font-semibold text-ink">Notre conviction</h3>
        <div className="mt-3 space-y-3">
          <Field label="Titre">
            <Input
              value={about.conviction.title}
              onChange={(e) => setAbout({ ...about, conviction: { ...about.conviction, title: e.target.value } })}
            />
          </Field>
          <Field label="Texte">
            <Textarea
              rows={4}
              value={about.conviction.text}
              onChange={(e) => setAbout({ ...about, conviction: { ...about.conviction, text: e.target.value } })}
            />
          </Field>
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-display text-sm font-semibold text-ink">Notre vision</h3>
        <div className="mt-3 space-y-3">
          <Field label="Titre">
            <Input
              value={about.vision.title}
              onChange={(e) => setAbout({ ...about, vision: { ...about.vision, title: e.target.value } })}
            />
          </Field>
          <Field label="Texte">
            <Textarea
              rows={4}
              value={about.vision.text}
              onChange={(e) => setAbout({ ...about, vision: { ...about.vision, text: e.target.value } })}
            />
          </Field>
        </div>
      </Card>

      <Button onClick={save}>
        <FaSave size={13} /> Enregistrer
      </Button>
    </div>
  )
}
