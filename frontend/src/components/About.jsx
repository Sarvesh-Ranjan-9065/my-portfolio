import { useEffect, useRef, useState } from 'react'

export default function About() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '20+', label: 'Projects Shipped' },
    { value: '5+', label: 'Cloud Platforms' },
    { value: '99.9%', label: 'Uptime SLA' },
  ]

  return (
    <section id="about" style={{ padding: '120px 48px', maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s ease',
      }}>
        {/* Section label */}
        <div style={{
          fontFamily: 'Space Mono', fontSize: '12px', color: 'var(--cyan)',
          letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px',
        }}>
          01. About
        </div>
        <h2 style={{
          fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          color: '#e2e8f0', marginBottom: '64px', lineHeight: 1.1,
        }}>
          Engineer who speaks<br />
          <span className="gradient-text">infrastructure fluently</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          {/* Left: Text */}
          <div>
            <p style={{
              fontSize: '17px', lineHeight: 1.9, color: 'rgba(226,232,240,0.65)',
              marginBottom: '24px',
            }}>
              I'm Sarvesh, a Backend & DevOps engineer with a deep obsession for
              building systems that <span style={{ color: 'var(--cyan)' }}>scale, survive, and perform</span> under pressure.
              My toolkit of choice is Go — fast, explicit, and built for the cloud.
            </p>
            <p style={{
              fontSize: '17px', lineHeight: 1.9, color: 'rgba(226,232,240,0.65)',
              marginBottom: '32px',
            }}>
              I architect cloud-native solutions on Kubernetes, automate everything with
              Terraform, and instrument systems with full observability. Whether it's a
              distributed tracing pipeline or a zero-downtime deployment strategy — I live
              in the infrastructure layer.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {['Open Source Contributor', 'CNCF Member', 'CKA Certified'].map(tag => (
                <span key={tag} style={{
                  fontFamily: 'Space Mono', fontSize: '11px',
                  color: 'var(--cyan)', background: 'rgba(0,245,255,0.06)',
                  border: '1px solid rgba(0,245,255,0.15)',
                  borderRadius: '4px', padding: '6px 12px',
                  letterSpacing: '1px',
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Right: Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="glass-card glow-border"
                style={{
                  padding: '32px 24px', borderRadius: '12px',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.6s ease ${0.2 + i * 0.1}s`,
                }}
              >
                <div style={{
                  fontFamily: 'Syne', fontWeight: 800,
                  fontSize: '2.5rem', color: 'var(--cyan)',
                  textShadow: '0 0 20px rgba(0,245,255,0.4)',
                  marginBottom: '8px',
                }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: 'Space Mono', fontSize: '11px', color: 'rgba(226,232,240,0.4)', letterSpacing: '1px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
