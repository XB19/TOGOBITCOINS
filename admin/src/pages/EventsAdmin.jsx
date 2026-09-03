import { useEffect, useRef, useState } from 'react'
import { FaPlus, FaPen, FaTrash, FaTimes, FaCalendarAlt, FaMapMarkerAlt, FaImage, FaBitcoin } from 'react-icons/fa'
import { api, mediaUrl, uploadImage } from '../lib/api'
import { Card, Button, Field, Input, Textarea, PageHeader, Toast } from '../components/ui'

const emptyForm = { title: '', date: '', time: '', place: '', theme: '', description: '', link: '', image: null }

export default function EventsAdmin() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // event object, or {} for new
  const [toast, setToast] = useState(null)

  function refresh() {
    return api.get('/api/events').then(setEvents)
  }

  useEffect(() => {
    refresh().finally(() => setLoading(false))
  }, [])

  async function handleDelete(event) {
    if (!confirm(`Supprimer « ${event.title} » ? Cette action est irréversible.`)) return
    try {
      await api.del(`/api/events/${event.id}`)
      await refresh()
      setToast({ type: 'success', message: 'Événement supprimé.' })
    } catch (err) {
      setToast({ type: 'error', message: err.message })
    }
  }

  return (
    <div>
      <PageHeader
        title="Événements"
        description="Les événements sont affichés du plus récent au plus ancien — placez le plus récent en premier dans votre esprit, l'ordre d'affichage suit celui de cette liste."
        action={
          <Button onClick={() => setEditing({})}>
            <FaPlus size={13} /> Ajouter un événement
          </Button>
        }
      />

      {loading ? (
        <p className="text-sm text-gray-400">Chargement…</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="aspect-[16/10] w-full bg-gray-100">
                {event.image ? (
                  <img src={mediaUrl('events', event.image)} alt={event.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-bitcoin-dark via-bitcoin to-bitcoin-light">
                    <FaBitcoin className="text-white/80" size={32} />
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-bitcoin-dark">
                  <FaCalendarAlt size={11} /> {event.date}
                </p>
                <h3 className="mt-1.5 font-display text-sm font-semibold text-ink">{event.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                  <FaMapMarkerAlt size={10} /> {event.place}
                </p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" className="!px-3 !py-1.5 text-xs" onClick={() => setEditing(event)}>
                    <FaPen size={11} /> Modifier
                  </Button>
                  <Button variant="danger" className="!px-3 !py-1.5 text-xs" onClick={() => handleDelete(event)}>
                    <FaTrash size={11} /> Supprimer
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {editing && (
        <EventForm
          event={editing}
          onClose={() => setEditing(null)}
          onSaved={async (message) => {
            setEditing(null)
            await refresh()
            setToast({ type: 'success', message })
          }}
          onError={(err) => setToast({ type: 'error', message: err.message })}
        />
      )}

      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
    </div>
  )
}

function EventForm({ event, onClose, onSaved, onError }) {
  const isNew = !event.id
  const [form, setForm] = useState({ ...emptyForm, ...event, link: event.link || '' })
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState(event.image ? mediaUrl('events', event.image) : null)
  const [saving, setSaving] = useState(false)
  const fileRef = useRef(null)

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function pickImage(file) {
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      let imageFilename = form.image
      if (imageFile) {
        const uploaded = await uploadImage('events', imageFile)
        imageFilename = uploaded.filename
      }
      const payload = { ...form, image: imageFilename, link: form.link || null }
      delete payload.id
      if (isNew) {
        await api.post('/api/events', payload)
        onSaved('Événement ajouté.')
      } else {
        await api.put(`/api/events/${event.id}`, payload)
        onSaved('Événement mis à jour.')
      }
    } catch (err) {
      onError(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 py-10" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-ink">
            {isNew ? 'Ajouter un événement' : 'Modifier l’événement'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-ink">
            <FaTimes size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[75vh] space-y-4 overflow-y-auto px-6 py-5">
          <Field label="Image">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-28 flex-none items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                {preview ? (
                  <img src={preview} alt="" className="h-full w-full object-cover" />
                ) : (
                  <FaImage className="text-gray-300" size={22} />
                )}
              </div>
              <div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => pickImage(e.target.files?.[0])}
                />
                <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
                  Choisir une image
                </Button>
                <p className="mt-1.5 text-xs text-gray-400">Optionnel — un visuel par défaut s'affiche sinon.</p>
              </div>
            </div>
          </Field>

          <Field label="Titre">
            <Input required value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Ex. Bitcoin Dev #5" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Date" hint="Texte libre, ex. « 12 octobre 2026 »">
              <Input required value={form.date} onChange={(e) => set('date', e.target.value)} />
            </Field>
            <Field label="Heure (optionnel)">
              <Input value={form.time || ''} onChange={(e) => set('time', e.target.value)} placeholder="Ex. 08h00 UTC" />
            </Field>
          </div>

          <Field label="Lieu">
            <Input required value={form.place} onChange={(e) => set('place', e.target.value)} />
          </Field>

          <Field label="Thème / catégorie">
            <Input required value={form.theme} onChange={(e) => set('theme', e.target.value)} placeholder="Ex. Formation & sensibilisation" />
          </Field>

          <Field label="Description">
            <Textarea required value={form.description} onChange={(e) => set('description', e.target.value)} rows={4} />
          </Field>

          <Field label="Lien d'inscription (optionnel)" hint="Affiche un bouton « S'inscrire » si renseigné">
            <Input value={form.link} onChange={(e) => set('link', e.target.value)} placeholder="https://luma.com/…" />
          </Field>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Enregistrement…' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
