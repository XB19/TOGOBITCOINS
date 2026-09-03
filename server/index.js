import fs from 'fs'
import path from 'path'
import express from 'express'
import multer from 'multer'
import cookieParser from 'cookie-parser'
import {
  ROOT,
  ASSETS_DIR,
  FILES,
  readJson,
  writeJson,
  readList,
  addItem,
  updateItem,
  deleteItem,
  reorder,
  saveUpload,
  deleteUpload,
  randomToken,
} from './data.js'

const PORT = process.env.ADMIN_PORT || 4001
const PASSWORD_FILE = path.join(ROOT, 'server', '.admin-password')

function getPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD
  if (fs.existsSync(PASSWORD_FILE)) return fs.readFileSync(PASSWORD_FILE, 'utf8').trim()
  const generated = randomToken().slice(0, 10)
  fs.writeFileSync(PASSWORD_FILE, generated)
  return generated
}

function setPassword(newPassword) {
  fs.writeFileSync(PASSWORD_FILE, newPassword)
}

const sessions = new Set()

const app = express()
app.use(express.json({ limit: '5mb' }))
app.use(cookieParser())

// serve uploaded images so the admin UI can preview them
app.use('/media', express.static(ASSETS_DIR))

function requireAuth(req, res, next) {
  const token = req.cookies.admin_session
  if (token && sessions.has(token)) return next()
  return res.status(401).json({ error: 'Non authentifié' })
}

// ---- auth ----
app.post('/api/login', (req, res) => {
  const { password } = req.body || {}
  if (password && password === getPassword()) {
    const token = randomToken()
    sessions.add(token)
    res.cookie('admin_session', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    return res.json({ ok: true })
  }
  return res.status(401).json({ error: 'Mot de passe incorrect' })
})

app.post('/api/logout', (req, res) => {
  const token = req.cookies.admin_session
  if (token) sessions.delete(token)
  res.clearCookie('admin_session')
  res.json({ ok: true })
})

app.get('/api/me', (req, res) => {
  const token = req.cookies.admin_session
  res.json({ authenticated: Boolean(token && sessions.has(token)) })
})

app.put('/api/password', requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body || {}
  if (currentPassword !== getPassword()) {
    return res.status(400).json({ error: 'Mot de passe actuel incorrect' })
  }
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ error: 'Le nouveau mot de passe est trop court' })
  }
  setPassword(newPassword)
  res.json({ ok: true })
})

app.use('/api', (req, res, next) => {
  if (req.path === '/login' || req.path === '/me') return next()
  return requireAuth(req, res, next)
})

// ---- generic list CRUD for events & partners ----
function listRoutes(key, titleField) {
  app.get(`/api/${key}`, (req, res) => res.json(readList(key)))

  app.post(`/api/${key}`, (req, res) => {
    const created = addItem(key, req.body, titleField)
    res.json(created)
  })

  app.put(`/api/${key}/:id`, (req, res) => {
    const updated = updateItem(key, req.params.id, req.body)
    if (!updated) return res.status(404).json({ error: 'Introuvable' })
    res.json(updated)
  })

  app.delete(`/api/${key}/:id`, (req, res) => {
    const list = readList(key)
    const item = list.find((x) => x.id === req.params.id)
    const ok = deleteItem(key, req.params.id)
    if (!ok) return res.status(404).json({ error: 'Introuvable' })
    // best-effort cleanup of the associated image file
    const imageField = item?.image || item?.logo
    if (imageField) deleteUpload(key, imageField)
    res.json({ ok: true })
  })

  app.put(`/api/${key}-order`, (req, res) => {
    const { ids } = req.body || {}
    if (!Array.isArray(ids)) return res.status(400).json({ error: 'ids manquant' })
    res.json(reorder(key, ids))
  })
}

listRoutes('events', 'title')
listRoutes('partners', 'name')

// ---- pages.json: pillars / offerings / values (sub-lists) + about (object) ----
function subListRoutes(sub) {
  app.get(`/api/pages/${sub}`, (req, res) => res.json(readJson(FILES.pages)[sub]))

  app.post(`/api/pages/${sub}`, (req, res) => {
    const pages = readJson(FILES.pages)
    const list = pages[sub]
    const id =
      req.body.id ||
      (req.body.title || 'item').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40) + '-' + Date.now().toString(36)
    const item = { id, ...req.body }
    list.push(item)
    writeJson(FILES.pages, pages)
    res.json(item)
  })

  app.put(`/api/pages/${sub}/:id`, (req, res) => {
    const pages = readJson(FILES.pages)
    const list = pages[sub]
    const idx = list.findIndex((x) => x.id === req.params.id)
    if (idx === -1) return res.status(404).json({ error: 'Introuvable' })
    list[idx] = { ...list[idx], ...req.body, id: req.params.id }
    writeJson(FILES.pages, pages)
    res.json(list[idx])
  })

  app.delete(`/api/pages/${sub}/:id`, (req, res) => {
    const pages = readJson(FILES.pages)
    const before = pages[sub].length
    pages[sub] = pages[sub].filter((x) => x.id !== req.params.id)
    writeJson(FILES.pages, pages)
    res.json({ ok: pages[sub].length !== before })
  })
}

subListRoutes('pillars')
subListRoutes('offerings')
subListRoutes('values')

app.get('/api/pages/about', (req, res) => res.json(readJson(FILES.pages).about))
app.put('/api/pages/about', (req, res) => {
  const pages = readJson(FILES.pages)
  pages.about = { ...pages.about, ...req.body }
  writeJson(FILES.pages, pages)
  res.json(pages.about)
})

// ---- contact.json ----
app.get('/api/contact', (req, res) => res.json(readJson(FILES.contact)))
app.put('/api/contact', (req, res) => {
  const current = readJson(FILES.contact)
  const next = { ...current, ...req.body }
  writeJson(FILES.contact, next)
  res.json(next)
})

// ---- image uploads ----
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } })

app.post('/api/upload/:folder', upload.single('image'), (req, res) => {
  const folder = req.params.folder
  if (!['events', 'partners'].includes(folder)) {
    return res.status(400).json({ error: 'Dossier invalide' })
  }
  if (!req.file) return res.status(400).json({ error: 'Aucun fichier reçu' })
  const filename = saveUpload(folder, req.file.originalname, req.file.buffer)
  res.json({ filename, url: `/media/${folder}/${filename}` })
})

app.listen(PORT, () => {
  console.log(`\n  Admin server ready → http://localhost:${PORT}\n`)
  if (!process.env.ADMIN_PASSWORD) {
    console.log(`  Mot de passe admin : ${getPassword()}`)
    console.log(`  (enregistré dans server/.admin-password — changez-le depuis le tableau de bord)\n`)
  }
})
