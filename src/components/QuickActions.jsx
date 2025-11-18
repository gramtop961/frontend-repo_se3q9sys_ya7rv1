import { useState } from 'react'
import { api } from '../lib/api'
import { Camera, AlertTriangle, PlusCircle } from 'lucide-react'

export default function QuickActions() {
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  async function addSampleSighting() {
    setBusy(true)
    setMessage('')
    try {
      // Rome center sample coords
      const payload = {
        lat: 41.9028 + (Math.random() - 0.5) * 0.02,
        lng: 12.4964 + (Math.random() - 0.5) * 0.02,
        note: 'Micetto curioso avvistato vicino a una fontanella',
        status: Math.random() < 0.2 ? 'urgent' : 'normal'
      }
      const res = await api.createSighting(payload)
      setMessage(`Miao! Avvistamento creato (#${res.id.substring(0,6)}…)`)
    } catch (e) {
      setMessage(`Errore: ${e.message}`)
    } finally {
      setBusy(false)
    }
  }

  async function sendEmergency() {
    setBusy(true)
    setMessage('')
    try {
      const payload = {
        lat: 41.9028,
        lng: 12.4964,
        description: 'Gatto ferito segnalato in zona centro. Necessario intervento',
        status: 'open'
      }
      const res = await api.createEmergency(payload)
      setMessage(`Allerta inviata! (#${res.id.substring(0,6)}…)`)
    } catch (e) {
      setMessage(`Errore: ${e.message}`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 flex flex-col gap-4">
      <h2 className="text-white font-semibold">Azioni rapide</h2>
      <div className="flex flex-wrap gap-3">
        <button onClick={addSampleSighting} disabled={busy} className="inline-flex items-center gap-2 rounded-lg bg-fuchsia-500 px-4 py-2 font-semibold text-white shadow hover:bg-fuchsia-600 disabled:opacity-60">
          <Camera size={18} /> Avvistamento demo
        </button>
        <button onClick={sendEmergency} disabled={busy} className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 font-semibold text-white shadow hover:bg-amber-600 disabled:opacity-60">
          <AlertTriangle size={18} /> Segnala emergenza
        </button>
      </div>
      {message && (
        <div className="text-sm text-white/80 bg-white/5 rounded-lg p-2">{message}</div>
      )}
    </section>
  )
}
