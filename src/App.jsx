import { useState } from 'react'
import { api } from './lib/api'
import Hero from './components/Hero'
import MapPreview from './components/MapPreview'
import QuickActions from './components/QuickActions'
import Feed from './components/Feed'

function App() {
  const [ready, setReady] = useState(true)

  const handleCreateSighting = async () => {
    try {
      await api.createSighting({
        lat: 41.9028,
        lng: 12.4964,
        note: 'Micetto tigrato sul muretto',
        status: 'normal'
      })
      alert('Avvistamento creato!')
    } catch (e) {
      alert('Errore: ' + e.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-fuchsia-900/30 text-white">
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <header className="mb-8 flex items-center justify-between">
          <div className="text-2xl font-extrabold tracking-tight">
            CatAdvisor <span className="text-fuchsia-400">MVP</span>
          </div>
          <div className="text-xs text-white/60">Backend: {api.baseUrl}</div>
        </header>

        <div className="grid gap-6">
          <Hero onCreateSighting={handleCreateSighting} />
          <div className="grid md:grid-cols-2 gap-6">
            <MapPreview />
            <QuickActions />
          </div>
          <Feed />
        </div>

        <footer className="mt-10 text-center text-white/50 text-sm">
          Tono: ironico-gentile • Privacy prima di tutto • Mici prima di tutto
        </footer>
      </div>
    </div>
  )
}

export default App
