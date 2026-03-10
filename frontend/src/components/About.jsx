import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function About() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  const valueRefs = useRef([])

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
    { label: "Projects Shipped", value: "2" },
    { label: "Python on HackerRank", value: "4★" },
    { label: "C++ & Java on HackerRank", value: "2★" },
    { label: "CGPA @ LPU", value: "6.96" },
  ]

  useEffect(() => {
    if (!visible) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      stats.forEach((stat, idx) => {
        const node = valueRefs.current[idx]
        if (node) node.textContent = `${stat.value.toFixed(stat.decimals)}${stat.suffix}`
      })
      return
    }

    const animations = stats.map((stat, idx) => {
      const node = valueRefs.current[idx]
      if (!node) return null

      const tweenState = { count: 0 }
      return gsap.to(tweenState, {
        count: stat.value,
        duration: 1.2,
        delay: 0.15 * idx,
        ease: 'power2.out',
        onUpdate: () => {
          node.textContent = `${tweenState.count.toFixed(stat.decimals)}${stat.suffix}`
        },
      })
    })

    return () => {
      animations.forEach((anim) => anim?.kill())
    }
  }, [visible])

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
            <p style={{
              fontSize: '17px', lineHeight: 1.9, color: 'rgba(226,232,240,0.65)',
              marginBottom: '32px',
            }}>
              {paragraphs[1]}
            </p>
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
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {stats.map((item) => (
              <div key={item.label} className="stat-card">
                <h3>{item.value ?? item.number ?? '-'}</h3>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
