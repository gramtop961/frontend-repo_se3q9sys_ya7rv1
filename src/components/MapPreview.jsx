import { useEffect, useState } from 'react'
import { MapPin, AlertTriangle } from 'lucide-react'
import { api } from '../lib/api'

export default function MapPreview() {
  const [sightings, setSightings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api.listSightings({ limit: 20 })
      .then(setSightings)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="map" className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold">Mappa avvistamenti (preview)</h2>
        <span className="text-xs text-white/60">{sightings.length} pin</span>
      </div>

      <div className="aspect-[16/9] w-full rounded-xl bg-[conic-gradient(at_top_left,_#0ea5e9_0%,_#a78bfa_30%,_#ec4899_60%,_#0ea5e9_100%)] opacity-80" />

      <div className="mt-4 grid gap-2">
        {loading ? (
          <p className="text-white/70 text-sm">Caricamento…</p>
        ) : error ? (
          <p className="text-rose-300 text-sm">Errore: {error}</p>
        ) : sightings.length === 0 ? (
          <div className="text-white/70 text-sm">Nessun avvistamento ancora. Sii il primo!</div>
        ) : (
          sightings.map((s) => (
            <div key={s.id} className="flex items-center gap-3 text-white/80 text-sm bg-white/5 rounded-lg p-2">
              {s.status === 'urgent' ? (
                <AlertTriangle className="text-amber-400" size={16} />
              ) : (
                <MapPin className="text-fuchsia-400" size={16} />
              )}
              <div className="truncate">
                <span className="font-medium">{s.note || 'Avvistamento'}</span>
                <span className="ml-2 text-white/50">({s.lat.toFixed(3)}, {s.lng.toFixed(3)})</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
