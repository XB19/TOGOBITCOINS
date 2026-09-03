import { useEffect, useState } from 'react'
import { FaPlus, FaTrash, FaSave } from 'react-icons/fa'
import { api } from '../lib/api'
import { Card, Button, Field, Input, PageHeader, Toast } from '../components/ui'

function ListField({ label, values, onChange, placeholder }) {
  return (
    <Field label={label}>
      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={v}
              placeholder={placeholder}
              onChange={(e) => {
                const next = [...values]
                next[i] = e.target.value
                onChange(next)
              }}
            />
            <Button
              type="button"
              variant="danger"
              className="!px-3"
              onClick={() => onChange(values.filter((_, idx) => idx !== i))}
            >
              <FaTrash size={12} />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" className="!px-3 !py-1.5 text-xs" onClick={() => onChange([...values, ''])}>
          <FaPlus size={11} /> Ajouter
        </Button>
      </div>
    </Field>
  )
}

export default function ContactAdmin() {
  const [contact, setContact] = useState(null)
  const [toast, setToast] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.get('/api/contact').then(setContact)
  }, [])

  async function save() {
    setSaving(true)
    try {
      await api.put('/api/contact', contact)
      setToast({ type: 'success', message: 'Coordonnées enregistrées.' })
    } catch (err) {
      setToast({ type: 'error', message: err.message })
    } finally {
      setSaving(false)
    }
  }

  if (!contact) return <p className="text-sm text-gray-400">Chargement…</p>

  return (
    <div>
      <PageHeader
        title="Coordonnées"
        description="Emails, téléphones et liens utilisés dans le pied de page, le menu et les boutons « Rejoindre »."
      />

      <Card className="max-w-2xl space-y-5 p-6">
        <Field label="Lien du groupe WhatsApp" hint="Utilisé par tous les boutons « Rejoindre la communauté »">
          <Input value={contact.whatsappLink} onChange={(e) => setContact({ ...contact, whatsappLink: e.target.value })} />
        </Field>

        <Field label="Lien du profil X (Twitter)">
          <Input value={contact.xLink} onChange={(e) => setContact({ ...contact, xLink: e.target.value })} />
        </Field>

        <Field label="Adresse / localisation">
          <Input value={contact.location} onChange={(e) => setContact({ ...contact, location: e.target.value })} />
        </Field>

        <Field label="Email principal" hint="Affiché sur la page Contact">
          <Input value={contact.contactEmail} onChange={(e) => setContact({ ...contact, contactEmail: e.target.value })} />
        </Field>

        <ListField
          label="Emails affichés dans le pied de page"
          values={contact.contactEmails}
          placeholder="contact@example.com"
          onChange={(v) => setContact({ ...contact, contactEmails: v })}
        />

        <ListField
          label="Numéros de téléphone"
          values={contact.phones}
          placeholder="93 37 70 31"
          onChange={(v) => setContact({ ...contact, phones: v })}
        />

        <div className="border-t border-gray-100 pt-4">
          <Button onClick={save} disabled={saving}>
            <FaSave size={13} /> {saving ? 'Enregistrement…' : 'Enregistrer'}
          </Button>
        </div>
      </Card>

      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
    </div>
  )
}
