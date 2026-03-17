import { useEffect, useMemo, useState } from 'react'
import { jokes } from '../data/jokes'
import ShinyText from '../extra_UI/animations/shiny_text'
import SpotlightCard from '../extra_UI/compo/spotlight_card'

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

  const nextJoke = () => {
    setIndex((current) => getRandomIndex(jokes.length, current))
  }

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key.toLowerCase() === 'n' || event.key === 'ArrowRight') {
        nextJoke()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <section id="fun" className="section-shell" style={{ padding: '80px 48px', maxWidth: '980px', margin: '0 auto' }}>
      <div className="slide-in-heading" style={{ marginBottom: '18px', fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 800 }}>
        <ShinyText text="Dev jokes" speed={2.6} color="rgba(226,232,240,0.95)" shineColor="var(--cyan)" />
      </div>

      <SpotlightCard className="!p-0 !bg-transparent !border-0" spotlightColor="rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.22)">
        <article className="glass-card fun-card">
          <p className="fun-label">// because not everything needs a ticket</p>
          <p aria-live="polite" className="fun-joke" style={{ whiteSpace: 'pre-line' }}>{joke}</p>
          <button
            type="button"
            className="fun-button interactive-focus"
            onClick={nextJoke}
            title="Shortcut: N or Right Arrow"
          >
            Next Joke →
          </button>
        </article>
      </SpotlightCard>
    </section>
  )
}
