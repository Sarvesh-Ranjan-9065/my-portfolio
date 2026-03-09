import { useEffect, useRef, useState } from 'react'

const PROJECTS = [
  {
    id: 1,
    title: "CloudNative Orchestrator",
    description: "A Kubernetes-native workload orchestrator built in Go with custom CRDs, auto-scaling policies, and real-time metrics dashboard.",
    tech: ["Go", "Kubernetes", "gRPC", "Prometheus", "Docker"],
    github: "https://github.com/sarvesh",
    featured: true,
    icon: "⚙️",
  },
  {
    id: 2,
    title: "DevOps Pipeline Engine",
    description: "High-performance CI/CD pipeline engine with parallel job execution, artifact caching, and multi-cloud deployment targets.",
    tech: ["Go", "Gin", "Redis", "PostgreSQL", "Terraform"],
    github: "https://github.com/sarvesh",
    live: "https://demo.example.com",
    featured: true,
    icon: "🚀",
  },
  {
    id: 3,
    title: "Distributed Tracing System",
    description: "OpenTelemetry-compatible distributed tracing system with custom sampling strategies and real-time trace visualization.",
    tech: ["Go", "OpenTelemetry", "Jaeger", "Kafka", "ClickHouse"],
    github: "https://github.com/sarvesh",
    featured: true,
    icon: "🔍",
  },
  {
    id: 4,
    title: "SecretVault CLI",
    description: "Zero-trust secrets management CLI tool with envelope encryption, audit logs, and Vault/AWS KMS integration.",
    tech: ["Go", "HashiCorp Vault", "AWS KMS", "CLI"],
    github: "https://github.com/sarvesh",
    featured: false,
    icon: "🔐",
  },
]

function ProjectCard({ project, delay }) {
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
    <div
      ref={ref}
      className="glass-card glow-border"
      style={{
        borderRadius: '16px', padding: '32px',
        cursor: 'pointer', position: 'relative', overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s ease ${delay}s`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(0,245,255,0.35)'
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(0,245,255,0.12)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Corner accent */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '80px', height: '80px',
        background: 'radial-gradient(circle at top right, rgba(0,245,255,0.08), transparent)',
      }} />

      <div style={{ fontSize: '28px', marginBottom: '16px' }}>{project.icon}</div>

      {project.featured && (
        <div style={{
          display: 'inline-block',
          fontFamily: 'Space Mono', fontSize: '10px',
          color: 'var(--cyan)', border: '1px solid rgba(0,245,255,0.25)',
          borderRadius: '3px', padding: '3px 8px',
          letterSpacing: '2px', marginBottom: '12px',
        }}>FEATURED</div>
      )}

      <h3 style={{
        fontFamily: 'Syne', fontWeight: 700, fontSize: '1.3rem',
        color: '#e2e8f0', marginBottom: '12px',
      }}>{project.title}</h3>

      <p style={{
        fontSize: '14px', lineHeight: 1.7, color: 'rgba(226,232,240,0.55)',
        marginBottom: '24px',
      }}>{project.description}</p>

      {/* Tech stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
        {project.tech.map(t => (
          <span key={t} style={{
            fontFamily: 'Space Mono', fontSize: '11px',
            color: 'rgba(0,245,255,0.7)',
            background: 'rgba(0,245,255,0.06)',
            borderRadius: '4px', padding: '4px 10px',
          }}>{t}</span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '16px' }}>
        <a href={project.github} target="_blank" rel="noreferrer"
          style={{ fontFamily: 'Space Mono', fontSize: '12px', color: 'rgba(226,232,240,0.5)', textDecoration: 'none', letterSpacing: '1px' }}
          onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
          onMouseLeave={e => e.target.style.color = 'rgba(226,232,240,0.5)'}
        >
          GitHub ↗
        </a>
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer"
            style={{ fontFamily: 'Space Mono', fontSize: '12px', color: 'rgba(226,232,240,0.5)', textDecoration: 'none', letterSpacing: '1px' }}
            onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
            onMouseLeave={e => e.target.style.color = 'rgba(226,232,240,0.5)'}
          >
            Live Demo ↗
          </a>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const [titleVisible, setTitleVisible] = useState(false)
  const titleRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true) },
      { threshold: 0.2 }
    )
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" style={{ padding: '120px 48px', maxWidth: '1200px', margin: '0 auto' }}>
      <div ref={titleRef} style={{
        opacity: titleVisible ? 1 : 0,
        transform: titleVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.7s ease',
        marginBottom: '64px',
      }}>
        <div style={{
          fontFamily: 'Space Mono', fontSize: '12px', color: 'var(--cyan)',
          letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px',
        }}>02. Projects</div>
        <h2 style={{
          fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          color: '#e2e8f0', lineHeight: 1.1,
        }}>
          Things I've<br />
          <span className="gradient-text">shipped & scaled</span>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '24px',
      }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} delay={i * 0.1} />
        ))}
      </div>
    </section>
  )
}
