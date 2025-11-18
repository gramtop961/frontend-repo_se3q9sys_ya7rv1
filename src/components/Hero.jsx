import { Cat, MapPin, Camera, AlertTriangle } from 'lucide-react'

export default function Hero({ onCreateSighting }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-600/20 via-purple-600/20 to-indigo-600/20 p-10 shadow-xl">
      <div className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative z-10 grid gap-6 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            CatAdvisor
          </h1>
          <p className="mt-3 text-lg text-white/80">
            Il TripAdvisor dei gatti: mappa avvistamenti, luoghi felini e storie.
            Condividi un "miao" e aiuta la community con segnalazioni utili.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={onCreateSighting} className="inline-flex items-center gap-2 rounded-lg bg-fuchsia-500 px-4 py-2 font-semibold text-white shadow hover:bg-fuchsia-600 transition">
              <Camera size={18} /> Nuovo avvistamento
            </button>
            <a href="#map" className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 font-semibold text-white hover:bg-white/20 transition">
              <MapPin size={18} /> Vai alla mappa
            </a>
          </div>
          <div className="mt-4 flex items-center gap-4 text-white/70 text-sm">
            <div className="inline-flex items-center gap-2"><Cat size={16}/> Community gentile</div>
            <div className="inline-flex items-center gap-2"><AlertTriangle size={16}/> SOS gatti feriti</div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="aspect-video w-full rounded-2xl border border-white/10 bg-black/20 backdrop-blur p-4">
            <div className="h-full w-full rounded-xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,122,0.25),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.25),transparent_35%)]" />
          </div>
        </div>
      </div>
    </section>
  )
}
