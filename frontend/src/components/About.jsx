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

  const sectionLabel = "01. About"
  const heading = "Engineer who thinks in containers and clusters"

  const paragraphs = [
    "I'm Sarvesh Ranjan, a Computer Science undergrad at Lovely Professional University with a hands-on obsession for cloud-native infrastructure and backend systems. I deploy things on Kubernetes before most people finish reading the docs.",
    "My work lives at the intersection of backend development and DevOps — containerizing applications with Docker, orchestrating them on Kubernetes, and wiring up autoscaling and ingress controllers to make everything production-ready. I hold an AWS Cloud Foundations certification and I'm actively deepening my skills in cloud architecture.",
    "When I'm not building, I'm grinding DSA problems on HackerRank and picking up new tools. I'm a strong believer in learning by shipping.",
  ]

  const tags = ["AWS Certified", "4★ Python on HackerRank", "Open Source Learner"]

  const stats = [
    { label: "Projects", value: "2" },
    { label: "LeetCode", value: "100+" },
    { label: "Python", value: "4★" },
    { label: "CGPA", value: "6.96" },
  ]

  return (
    <section id="about" className="section-shell" style={{ padding: '120px 48px', maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
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
          {sectionLabel}
        </div>
        <h2 style={{
          fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          color: '#e2e8f0', marginBottom: '64px', lineHeight: 1.1,
        }}>
          {heading}
        </h2>

        <div className="split-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          {/* Left: Text */}
          <div>
            <p style={{
              fontSize: '17px', lineHeight: 1.9, color: 'rgba(226,232,240,0.65)',
              marginBottom: '24px',
            }}>
              {paragraphs[0]}
            </p>
            <p style={{ fontSize: '17px', lineHeight: 1.9, color: 'rgba(226,232,240,0.65)', marginBottom: '24px' }}>{paragraphs[1]}</p>
            <p style={{ fontSize: '17px', lineHeight: 1.9, color: 'rgba(226,232,240,0.65)', marginBottom: '32px' }}>{paragraphs[2]}</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {tags.map(tag => (
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
          <div>
            <div className="glass-card" style={{
              borderRadius: '18px',
              padding: '16px',
              marginBottom: '20px',
              boxShadow: '0 0 24px rgba(0,245,255,0.22)',
            }}>
              <img
                src="/sarvesh.jpg"
                alt="Sarvesh portrait"
                style={{
                  width: '100%',
                  height: '320px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  border: '1px solid rgba(0,245,255,0.35)',
                }}
              />
            </div>

            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {stats.map((item) => (
                <div key={item.label} className="stat-card">
                  <h3>{item.value}</h3>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
