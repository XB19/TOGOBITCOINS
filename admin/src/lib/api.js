async function request(method, url, body) {
  const opts = {
    method,
    credentials: 'include',
    headers: {},
  }
  if (body instanceof FormData) {
    opts.body = body
  } else if (body !== undefined) {
    opts.headers['Content-Type'] = 'application/json'
    opts.body = JSON.stringify(body)
  }
  const res = await fetch(url, opts)
  let data = null
  try {
    data = await res.json()
  } catch {
    // no body
  }
  if (!res.ok) {
    throw new Error(data?.error || `Erreur ${res.status}`)
  }
  return data
}

export const api = {
  get: (url) => request('GET', url),
  post: (url, body) => request('POST', url, body),
  put: (url, body) => request('PUT', url, body),
  del: (url) => request('DELETE', url),
}

export function mediaUrl(folder, filename) {
  if (!filename) return null
  return `/media/${folder}/${filename}`
}

export async function uploadImage(folder, file) {
  const form = new FormData()
  form.append('image', file)
  return api.post(`/api/upload/${folder}`, form)
}
