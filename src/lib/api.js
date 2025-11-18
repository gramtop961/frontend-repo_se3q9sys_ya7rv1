const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return res.json()
}

export const api = {
  baseUrl: BASE_URL,
  // Health
  health: () => request('/'),
  testDb: () => request('/test'),

  // Content
  listSightings: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return request(`/sightings${qs ? `?${qs}` : ''}`)
  },
  createSighting: (payload) => request('/sightings', { method: 'POST', body: JSON.stringify(payload) }),

  listPlaces: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return request(`/places${qs ? `?${qs}` : ''}`)
  },
  createPlace: (payload) => request('/places', { method: 'POST', body: JSON.stringify(payload) }),

  listPosts: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return request(`/posts${qs ? `?${qs}` : ''}`)
  },
  createPost: (payload) => request('/posts', { method: 'POST', body: JSON.stringify(payload) }),

  createEmergency: (payload) => request('/emergencies', { method: 'POST', body: JSON.stringify(payload) }),
  listEmergencies: (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return request(`/emergencies${qs ? `?${qs}` : ''}`)
  },

  // Badges & articles
  listBadges: () => request('/badges'),
  listArticles: () => request('/articles')
}
