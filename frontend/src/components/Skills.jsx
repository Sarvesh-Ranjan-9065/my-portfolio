import { useEffect, useRef, useState } from 'react'

const SKILLS = [
  {
    category: "Backend",
    icon: "⚡",
    items: ["Go", "gRPC", "REST APIs", "GraphQL", "PostgreSQL", "Redis", "Kafka"],
  },
  {
    category: "DevOps",
    icon: "🔧",
    items: ["Docker", "Kubernetes", "Helm", "ArgoCD", "GitHub Actions", "Jenkins"],
  },
  {
    category: "Cloud & Infrastructure",
    icon: "☁️",
    items: ["AWS", "GCP", "Terraform", "Pulumi", "Ansible", "Linux"],
  },
  {
    category: "Observability",
    icon: "📊",
    items: ["Prometheus", "Grafana", "OpenTelemetry", "Jaeger", "ELK Stack"],
  },
]

export default function Skills() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" style={{
      padding: '120px 48px',
      background: 'rgba(0,245,255,0.01)',
      borderTop: '1px solid rgba(0,245,255,0.06)',
      borderBottom: '1px solid rgba(0,245,255,0.06)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease',
          marginBottom: '64px',
        }}>
          <div style={{
            fontFamily: 'Space Mono', fontSize: '12px', color: 'var(--cyan)',
            letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px',
          }}>03. Skills</div>
          <h2 style={{
            fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: '#e2e8f0', lineHeight: 1.1,
          }}>
            The tools that power<br />
            <span className="gradient-text">the infrastructure</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {SKILLS.map((group, gi) => (
            <div
              key={group.category}
              className="glass-card"
              style={{
                padding: '32px', borderRadius: '16px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease ${gi * 0.1 + 0.2}s`,
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Glow line top */}
              <div style={{
                position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
                opacity: 0.4,
              }} />

              <div style={{ fontSize: '24px', marginBottom: '12px' }}>{group.icon}</div>
              <h3 style={{
                fontFamily: 'Syne', fontWeight: 700, fontSize: '1rem',
                color: 'var(--cyan)', marginBottom: '20px',
                letterSpacing: '1px', textTransform: 'uppercase',
              }}>{group.category}</h3>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {group.items.map((skill, si) => (
                  <span
                    key={skill}
                    style={{
                      fontFamily: 'Space Mono', fontSize: '12px',
                      color: 'rgba(226,232,240,0.7)',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '4px', padding: '5px 12px',
                      opacity: visible ? 1 : 0,
                      transition: `opacity 0.3s ease ${gi * 0.1 + si * 0.04 + 0.4}s`,
                      cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      e.target.style.color = 'var(--cyan)'
                      e.target.style.borderColor = 'rgba(0,245,255,0.3)'
                      e.target.style.background = 'rgba(0,245,255,0.06)'
                    }}
                    onMouseLeave={e => {
                      e.target.style.color = 'rgba(226,232,240,0.7)'
                      e.target.style.borderColor = 'rgba(255,255,255,0.08)'
                      e.target.style.background = 'rgba(255,255,255,0.04)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
