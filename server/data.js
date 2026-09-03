import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const ROOT = path.join(__dirname, '..')
export const DATA_DIR = path.join(ROOT, 'src', 'data')
export const ASSETS_DIR = path.join(ROOT, 'src', 'assets')

export const FILES = {
  events: path.join(DATA_DIR, 'events.json'),
  partners: path.join(DATA_DIR, 'partners.json'),
  pages: path.join(DATA_DIR, 'pages.json'),
  contact: path.join(DATA_DIR, 'contact.json'),
}

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

export function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n')
}

const DIACRITICS_RE = new RegExp('[\\u0300-\\u036f]', 'g')

export function slugify(str) {
  return (
    String(str || 'item')
      .toLowerCase()
      .normalize('NFD')
      .replace(DIACRITICS_RE, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 40) || 'item'
  )
}

function uniqueId(list, base) {
  const seen = new Set(list.map((x) => x.id))
  let id = slugify(base)
  let n = 2
  while (seen.has(id)) id = `${slugify(base)}-${n++}`
  return id
}

export function readList(key) {
  return readJson(FILES[key])
}

export function writeList(key, list) {
  writeJson(FILES[key], list)
}

export function addItem(key, item, titleField = 'title') {
  const list = readList(key)
  const id = uniqueId(list, item[titleField] || item.name)
  const withId = { id, ...item }
  list.push(withId)
  writeList(key, list)
  return withId
}

export function updateItem(key, id, patch) {
  const list = readList(key)
  const idx = list.findIndex((x) => x.id === id)
  if (idx === -1) return null
  list[idx] = { ...list[idx], ...patch, id }
  writeList(key, list)
  return list[idx]
}

export function deleteItem(key, id) {
  const list = readList(key)
  const next = list.filter((x) => x.id !== id)
  writeList(key, next)
  return next.length !== list.length
}

export function reorder(key, orderedIds) {
  const list = readList(key)
  const byId = new Map(list.map((x) => [x.id, x]))
  const next = orderedIds.map((id) => byId.get(id)).filter(Boolean)
  for (const item of list) if (!orderedIds.includes(item.id)) next.push(item)
  writeList(key, next)
  return next
}

export function saveUpload(subfolder, originalName, buffer) {
  const dir = path.join(ASSETS_DIR, subfolder)
  fs.mkdirSync(dir, { recursive: true })
  const ext = path.extname(originalName) || '.jpg'
  const base = slugify(path.basename(originalName, ext))
  let filename = `${base}${ext}`
  let n = 2
  while (fs.existsSync(path.join(dir, filename))) {
    filename = `${base}-${n++}${ext}`
  }
  fs.writeFileSync(path.join(dir, filename), buffer)
  return filename
}

export function deleteUpload(subfolder, filename) {
  if (!filename) return
  const p = path.join(ASSETS_DIR, subfolder, filename)
  if (fs.existsSync(p)) fs.unlinkSync(p)
}

export function randomToken() {
  return crypto.randomBytes(24).toString('hex')
}
