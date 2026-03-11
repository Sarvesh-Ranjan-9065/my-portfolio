import { useMemo, useState } from 'react'
import { jokes } from '../data/jokes'

function getRandomIndex(max, current) {
  if (max <= 1) return 0
  let next = Math.floor(Math.random() * max)
  while (next === current) {
    next = Math.floor(Math.random() * max)
  }
  return next
}

export default function Fun() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * jokes.length))
  const joke = useMemo(() => jokes[index] ?? '', [index])

  return (
    <section id="fun" className="section-shell" style={{ padding: '90px 48px 60px', maxWidth: '980px', margin: '0 auto' }}>
      <p className="section-label">09. fun.exe()</p>
      <h2 className="section-title" style={{ marginBottom: '24px' }}>Code Laughs, Randomized</h2>

      <article className="glass-card fun-card">
        <p className="fun-label">// because not everything needs a ticket</p>
        <p className="fun-joke">{joke}</p>
        <button
          type="button"
          className="fun-button interactive-focus"
          onClick={() => setIndex((current) => getRandomIndex(jokes.length, current))}
        >
          Next Joke →
        </button>
      </article>
    </section>
  )
}
