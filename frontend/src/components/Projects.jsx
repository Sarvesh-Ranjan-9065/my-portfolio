import { useEffect, useRef, useState } from 'react'
import SpotlightCard from '../extra_UI/compo/spotlight_card'

const filterTabs = ['All', 'Go', 'Web']

function getProjectImage(title) {
  const normalized = (title || '').toLowerCase()
  if (normalized.includes('virtual mall')) return '/ai-virtual-mall.png'
  if (normalized.includes('air quality')) return '/AQMS.png'
  if (normalized.includes('movie-crud') || normalized.includes('movie crud')) return '/movie-crud.png'
  if (normalized.includes('simple-static') || normalized.includes('simple static')) return '/static.png'
  return ''
}

function getCategory(tech) {
  if (!tech) return 'Web'
  const t = tech.map(s => s.toLowerCase())
  if (t.some(s => s.includes('go') || s === 'net/http')) return 'Go'
  return 'Web'
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('All')
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]))
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => getCategory(p.tech) === filter)

  return (
    <section id="projects" className="section" style={{ padding: '80px 48px' }} ref={ref}>
      <h2 className="slide-in-heading" style={{
        fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        color: '#e2e8f0', lineHeight: 1.1, marginBottom: '28px',
      }}>
        Projects
      </h2>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {filterTabs.map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            style={{
              fontFamily: 'Space Mono', fontSize: '12px', letterSpacing: '1px',
              textTransform: 'uppercase', cursor: 'pointer',
              padding: '8px 20px', borderRadius: '6px',
              border: filter === tab ? '1px solid var(--cyan)' : '1px solid rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.15)',
              background: filter === tab
                ? 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.12)'
                : 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.03)',
              color: filter === tab ? 'var(--cyan)' : 'rgba(226,232,240,0.5)',
              transition: 'all 0.3s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filtered.map((p) => (
          <SpotlightCard
            key={p.title}
            className="!p-0 !bg-transparent !border-0"
            spotlightColor="rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.24)"
          >
            <article
              className="project-card glass-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.45s ease, transform 0.45s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >

              {getProjectImage(p.title) && (
                <div style={{ marginBottom: '14px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.2)' }}>
                  <img
                    src={getProjectImage(p.title)}
                    alt={`${p.title} preview`}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '168px', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              )}

              <div style={{ marginBottom: '12px' }}>
                <h3 style={{ marginBottom: '8px' }}>{p.icon ? `${p.icon} ` : ''}{p.title}</h3>
                <p style={{ margin: 0 }}>{p.description}</p>
              </div>

              <div className="tech-row" style={{ marginTop: 0 }}>
                {p.tech?.map((t) => <span key={t} className="chip">{t}</span>)}
              </div>

              <div className="link-row">
                {p.github && <a href={p.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
                {p.demo && <a href={p.demo} target="_blank" rel="noreferrer">Live Demo ↗</a>}
              </div>
            </article>
          </SpotlightCard>
        ))}
      </div>
    </section>
  )
}
