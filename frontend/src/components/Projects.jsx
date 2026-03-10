import { useEffect, useState } from 'react'

export default function Projects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]))
  }, [])

  return (
    <section id="projects" className="section">
      <p className="section-label">02. Projects</p>
      <h2 className="section-title">Things I've built & deployed</h2>

      <div className="projects-grid">
        {projects.map((p) => (
          <article key={p.title} className="project-card">
            <h3>{p.icon ? `${p.icon} ` : ''}{p.title}</h3>
            <p>{p.description}</p>

            <div className="tech-row">
              {p.tech?.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>

            <div className="link-row">
              {p.github && <a href={p.github} target="_blank" rel="noreferrer">GitHub</a>}
              {p.demo && <a href={p.demo} target="_blank" rel="noreferrer">Live Demo</a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
