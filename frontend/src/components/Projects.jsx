import { useEffect, useRef, useState } from 'react'

const filterTabs = ['All', 'Go', 'Web']

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
    <section id="projects" className="section" ref={ref}>
      <h2 className="section-title slide-in-heading">Projects.</h2>

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
              border: filter === tab ? '1px solid var(--cyan)' : '1px solid rgba(0,245,255,0.15)',
              background: filter === tab ? 'rgba(0,245,255,0.12)' : 'rgba(0,245,255,0.03)',
              color: filter === tab ? 'var(--cyan)' : 'rgba(226,232,240,0.5)',
              transition: 'all 0.3s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filtered.map((p, i) => (
          <article
            key={p.title}
            className="project-card glass-card"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.45s ease, transform 0.45s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {p.badge && (
              <span style={{
                position: 'absolute', top: '14px', right: '14px',
                fontFamily: 'Space Mono', fontSize: '10px', letterSpacing: '1px',
                color: '#020818', background: 'var(--cyan)',
                padding: '3px 8px', borderRadius: '4px', fontWeight: 700,
              }}>{p.badge}</span>
            )}
            <h3>{p.icon ? `${p.icon} ` : ''}{p.title}</h3>
            <p>{p.description}</p>

            <div className="tech-row">
              {p.tech?.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>

            <div className="link-row">
              {p.github && <a href={p.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
              {p.demo && <a href={p.demo} target="_blank" rel="noreferrer">Live Demo ↗</a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
