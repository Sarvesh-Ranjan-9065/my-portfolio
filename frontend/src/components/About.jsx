import { useEffect, useRef, useState } from 'react'

export default function About() {
  const [visible, setVisible] = useState(false)
  const [imgHover, setImgHover] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const paragraphs = [
    "Hey, I'm Sarvesh — a CS undergrad at LPU. I spend most of my time writing Go, containerizing things with Docker, and figuring out Kubernetes. Backend development is what I enjoy the most.",
    "I picked up an AWS Cloud Foundations cert recently and now I'm learning Azure too. I like understanding how cloud infrastructure works instead of just using it.",
    "Outside of building stuff, I solve problems on LeetCode and HackerRank. It helps me think better when I'm writing real code. I learn by doing — building things, breaking them, then fixing them.",
  ]

  const tags = ["4-Star Python on HackerRank", "Open Source Learner"]

  const stats = [
    { label: "LeetCode", value: "100+" },
    { label: "CGPA", value: "6.96" },
  ]

  return (
    <section id="about" className="section-shell" style={{ padding: '80px 48px', maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s ease',
      }}>
        <h2 className="slide-in-heading" style={{
          fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          color: '#e2e8f0', marginBottom: '64px', lineHeight: 1.1,
        }}>
          About
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
                border: imgHover ? '1px solid rgba(0,245,255,0.3)' : '1px solid rgba(0,245,255,0.2)',
                boxShadow: imgHover
                  ? '0 0 10px rgba(0,245,255,0.08)'
                  : 'none',
                transition: 'all 0.4s ease',
              }}
            >
              <img
                src="/sarvesh.jpg"
                alt="Sarvesh portrait"
                loading="lazy"
                style={{
                  width: '100%', height: '320px', objectFit: 'cover',
                  objectPosition: 'center 18%',
                  borderRadius: '12px',
                  border: '1px solid rgba(0,245,255,0.15)',
                  transition: 'all 0.4s ease',
                  filter: imgHover ? 'brightness(1.05)' : 'brightness(1)',
                  transform: imgHover ? 'scale(0.84)' : 'scale(0.8)',
                  transformOrigin: 'center top',
                  background: '#03111f',
                }}
              />
            </div>

            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {stats.map((item) => (
                <div key={item.label} className="stat-card glass-card" style={{
                  padding: '16px', borderRadius: '12px', textAlign: 'center',
                  transition: 'all 0.3s ease',
                }}>
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
