import { useEffect, useRef, useState } from 'react'
import { FaPlus, FaTrash, FaTimes, FaImage } from 'react-icons/fa'
import { api, mediaUrl, uploadImage } from '../lib/api'
import { Card, Button, Field, Input, PageHeader, Toast } from '../components/ui'

export default function PartnersAdmin() {
  const [partners, setPartners] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [toast, setToast] = useState(null)

  function refresh() {
    return api.get('/api/partners').then(setPartners)
  }

  useEffect(() => {
    refresh().finally(() => setLoading(false))
  }, [])

  async function handleDelete(partner) {
    if (!confirm(`Retirer « ${partner.name} » des partenaires ?`)) return
    try {
      await api.del(`/api/partners/${partner.id}`)
      await refresh()
      setToast({ type: 'success', message: 'Partenaire retiré.' })
    } catch (err) {
      setToast({ type: 'error', message: err.message })
    }
  }

  return (
    <div>
      <PageHeader
        title="Partenaires"
        description="Ces logos défilent automatiquement dans la section « Ils nous accompagnent » de l'accueil."
        action={
          <Button onClick={() => setAdding(true)}>
            <FaPlus size={13} /> Ajouter un partenaire
          </Button>
        }
      />

      {loading ? (
        <p className="text-sm text-gray-400">Chargement…</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner) => (
            <Card key={partner.id} className="p-5 text-center">
              <div className="flex h-20 items-center justify-center">
                <img src={mediaUrl('partners', partner.logo)} alt={partner.name} className="max-h-16 max-w-full object-contain" />
              </div>
              <p className="mt-3 text-sm font-medium text-ink">{partner.name}</p>
              <Button variant="danger" className="mt-3 !px-3 !py-1.5 text-xs" onClick={() => handleDelete(partner)}>
                <FaTrash size={11} /> Retirer
              </Button>
            </Card>
          ))}
          {partners.length === 0 && <p className="text-sm text-gray-400">Aucun partenaire pour le moment.</p>}
        </div>
      )}

      {adding && (
        <PartnerForm
          onClose={() => setAdding(false)}
          onSaved={async () => {
            setAdding(false)
            await refresh()
            setToast({ type: 'success', message: 'Partenaire ajouté.' })
          }}
          onError={(err) => setToast({ type: 'error', message: err.message })}
        />
      )}

      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
    </div>
  )
}

function PartnerForm({ onClose, onSaved, onError }) {
  const [name, setName] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const fileRef = useRef(null)

  function pickImage(f) {
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!file) return onError(new Error('Choisissez un logo.'))
    setSaving(true)
    try {
      const uploaded = await uploadImage('partners', file)
      await api.post('/api/partners', { name, logo: uploaded.filename })
      onSaved()
    } catch (err) {
      onError(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-ink">Ajouter un partenaire</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-ink">
            <FaTimes size={16} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          <Field label="Logo">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-24 flex-none items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                {preview ? <img src={preview} alt="" className="max-h-full max-w-full object-contain" /> : <FaImage className="text-gray-300" size={20} />}
              </div>
              <div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => pickImage(e.target.files?.[0])} />
                <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
                  Choisir un logo
                </Button>
              </div>
            </div>
          </Field>
          <Field label="Nom du partenaire">
            <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex. Trezor Academy" />
          </Field>
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Enregistrement…' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
