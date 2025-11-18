import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { Heart, MessageSquare } from 'lucide-react'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    api.listPosts({ limit: 20 }).then(setPosts).catch(console.error)
  }, [])

  async function submitPost(e) {
    e.preventDefault()
    if (!text.trim()) return
    setBusy(true)
    try {
      const p = await api.createPost({ text, tags: ['miao'] })
      setText('')
      const latest = await api.listPosts({ limit: 20 })
      setPosts(latest)
    } catch (e) {
      console.error(e)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
      <h2 className="text-white font-semibold mb-3">Feed community</h2>
      <form onSubmit={submitPost} className="mb-4 flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Condividi un miao gentile…" className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-white placeholder-white/60 outline-none border border-white/10 focus:border-fuchsia-400"/>
        <button disabled={busy} className="rounded-lg bg-fuchsia-500 px-4 py-2 font-semibold text-white hover:bg-fuchsia-600 disabled:opacity-60">Pubblica</button>
      </form>

      <div className="grid gap-3">
        {posts.length === 0 ? (
          <p className="text-white/70 text-sm">Ancora nessun post. Inizia la conversazione!</p>
        ) : posts.map((p) => (
          <article key={p.id} className="rounded-xl bg-white/5 p-3 text-white/90">
            <div className="text-sm">{p.text}</div>
            <div className="mt-2 flex items-center gap-4 text-white/60 text-xs">
              <span className="inline-flex items-center gap-1"><Heart size={14}/> {p.miao_count || 0}</span>
              <span className="inline-flex items-center gap-1"><MessageSquare size={14}/> 0</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
