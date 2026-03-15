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
  const [glitch, setGlitch] = useState(false)
  const joke = useMemo(() => jokes[index] ?? '', [index])

  const nextJoke = () => {
    setGlitch(true)
    setTimeout(() => {
      setIndex((current) => getRandomIndex(jokes.length, current))
      setGlitch(false)
    }, 300)
  }

  return (
    <section id="fun" className="section-shell" style={{ padding: '90px 48px 60px', maxWidth: '980px', margin: '0 auto' }}>
      <h2 className="section-title slide-in-heading" style={{ marginBottom: '24px' }}>Dev jokes.</h2>

      <article className="glass-card fun-card">
        <p className="fun-label">// because not everything needs a ticket</p>
        <p className={`fun-joke ${glitch ? 'glitch-text' : ''}`} style={{ whiteSpace: 'pre-line' }}>{joke}</p>
        <button
          type="button"
          className="fun-button interactive-focus"
          onClick={nextJoke}
        >
          Next Joke →
        </button>
      </article>
    </section>
  )
}
