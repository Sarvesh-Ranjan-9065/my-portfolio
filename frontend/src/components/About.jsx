import { useEffect, useRef, useState } from 'react'

export default function About() {
  const [visible, setVisible] = useState(false)
  const [imgHover, setImgHover] = useState(false)
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
    "Hey — I'm Sarvesh. I'm a CS undergrad at LPU who'd rather be deploying pods on Kubernetes than sitting through lectures. I got into backend development because I like building things that actually run, not just look pretty in a slide deck.",
    "Most of my time goes into writing Go, containerizing stuff with Docker, and figuring out how to make things scale without catching fire. I picked up an AWS Cloud Foundations cert along the way and now I'm going deeper into Azure because one cloud provider is never enough, apparently.",
    "When I'm not shipping code, I'm solving DSA problems on LeetCode and HackerRank — not because I love grinding, but because it makes me a sharper engineer. I learn best by building, breaking, and fixing things.",
  ]

  const tags = ["AWS Certified", "4★ Python on HackerRank", "Open Source Learner"]

  const stats = [
    { label: "Projects", value: "2" },
    { label: "LeetCode", value: "112" },
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
        <div className="slide-in-heading" style={{
          fontFamily: 'Space Mono', fontSize: '12px', color: 'var(--cyan)',
          letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px',
        }}>
          {sectionLabel}
        </div>
        <h2 className="slide-in-heading" style={{
          fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          color: '#e2e8f0', marginBottom: '64px', lineHeight: 1.1,
        }}>
          {heading}
        </h2>

        <div className="split-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          {/* Left: Text */}
          <div>
            {paragraphs.map((p, i) => (
              <p key={i} style={{
                fontSize: '17px', lineHeight: 1.9, color: 'rgba(226,232,240,0.65)',
                marginBottom: i < paragraphs.length - 1 ? '24px' : '32px',
              }}>{p}</p>
            ))}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: 'Space Mono', fontSize: '11px',
                  color: 'var(--cyan)', background: 'rgba(0,245,255,0.06)',
                  border: '1px solid rgba(0,245,255,0.15)',
                  borderRadius: '4px', padding: '6px 12px', letterSpacing: '1px',
                }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Right: Photo + Stats */}
          <div>
            <div
              className="glass-card"
              onMouseEnter={() => setImgHover(true)}
              onMouseLeave={() => setImgHover(false)}
              style={{
                borderRadius: '18px', padding: '16px', marginBottom: '20px',
                border: imgHover ? '1px solid rgba(0,245,255,0.6)' : '1px solid rgba(0,245,255,0.25)',
                boxShadow: imgHover
                  ? '0 0 40px rgba(0,245,255,0.4), 0 0 80px rgba(0,245,255,0.15), inset 0 0 30px rgba(0,245,255,0.08)'
                  : '0 0 24px rgba(0,245,255,0.22)',
                transition: 'all 0.4s ease',
              }}
            >
              <img
                src="/sarvesh.jpg"
                alt="Sarvesh portrait"
                loading="lazy"
                style={{
                  width: '100%', height: '320px', objectFit: 'cover',
                  borderRadius: '12px',
                  border: imgHover ? '1px solid rgba(0,245,255,0.5)' : '1px solid rgba(0,245,255,0.35)',
                  transition: 'all 0.4s ease',
                  filter: imgHover ? 'brightness(1.05)' : 'brightness(1)',
                }}
              />
            </div>

            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {stats.map((item) => (
                <div key={item.label} className="stat-card glass-card" style={{
                  padding: '16px', borderRadius: '12px', textAlign: 'center',
                  transition: 'all 0.3s ease',
                }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(0,245,255,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <h3>{item.value}</h3>
                  <p style={{ fontSize: '12px', fontFamily: 'Space Mono', color: 'rgba(226,232,240,0.5)', letterSpacing: '1px', marginTop: '4px' }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
