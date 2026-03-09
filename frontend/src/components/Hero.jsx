import { useEffect, useRef, useState } from 'react'

const roles = ['Backend Engineer', 'DevOps Architect', 'Cloud Native Builder', 'Go Developer']

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [visible, setVisible] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIdx]
    let timeout

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setRoleIdx((prev) => (prev + 1) % roles.length)
    } else {
      const speed = isDeleting ? 60 : 100
      timeout = setTimeout(() => {
        setDisplayText(isDeleting
          ? current.slice(0, displayText.length - 1)
          : current.slice(0, displayText.length + 1)
        )
      }, speed)
    }
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIdx])

  return (
    <section id="hero" className="grid-bg" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '120px 48px 80px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Scanline effect */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
        background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.02) 50%)',
        backgroundSize: '100% 4px',
        opacity: 0.3,
      }} />

      <div ref={containerRef} style={{
        maxWidth: '900px', width: '100%',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 1s ease',
      }}>
        {/* Status badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.2)',
          borderRadius: '100px', padding: '6px 16px',
          marginBottom: '32px',
          fontFamily: 'Space Mono', fontSize: '12px', color: 'var(--cyan)',
          letterSpacing: '1px',
        }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#00ff88',
            boxShadow: '0 0 8px #00ff88',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }} />
          AVAILABLE FOR OPPORTUNITIES
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: 'Syne', fontWeight: 800,
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          lineHeight: 1.0,
          marginBottom: '16px',
          letterSpacing: '-2px',
        }}>
          <span style={{ color: '#e2e8f0' }}>Hi, I'm </span>
          <span className="glow-text" style={{ color: 'var(--cyan)' }}>Sarvesh</span>
        </h1>

        {/* Typewriter role */}
        <div style={{
          fontFamily: 'Space Mono', fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          color: 'rgba(226,232,240,0.7)',
          marginBottom: '32px', minHeight: '48px',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          <span style={{ color: 'var(--cyan)', opacity: 0.5 }}>// </span>
          <span>{displayText}</span>
          <span style={{
            display: 'inline-block', width: '2px', height: '1.4em',
            background: 'var(--cyan)',
            animation: 'pulse-glow 1s ease-in-out infinite',
            verticalAlign: 'middle', marginLeft: '2px',
          }} />
        </div>

        {/* Description */}
        <p style={{
          fontSize: '18px', lineHeight: 1.8,
          color: 'rgba(226,232,240,0.55)',
          maxWidth: '580px',
          marginBottom: '48px',
          fontFamily: 'Syne',
        }}>
          Building resilient distributed systems, cloud-native infrastructure,
          and high-performance Go services. Obsessed with reliability, scalability,
          and clean architecture.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'var(--cyan)', color: '#020818',
              border: 'none', borderRadius: '6px',
              padding: '14px 32px', cursor: 'pointer',
              fontFamily: 'Space Mono', fontSize: '13px',
              fontWeight: 700, letterSpacing: '1px',
              textTransform: 'uppercase',
              boxShadow: '0 0 30px rgba(0,245,255,0.3)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => e.target.style.boxShadow = '0 0 50px rgba(0,245,255,0.6)'}
            onMouseLeave={e => e.target.style.boxShadow = '0 0 30px rgba(0,245,255,0.3)'}
          >
            View Projects
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'transparent', color: 'var(--cyan)',
              border: '1px solid rgba(0,245,255,0.4)',
              borderRadius: '6px', padding: '14px 32px',
              cursor: 'pointer', fontFamily: 'Space Mono',
              fontSize: '13px', letterSpacing: '1px',
              textTransform: 'uppercase', transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(0,245,255,0.08)'; e.target.style.borderColor = 'var(--cyan)' }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(0,245,255,0.4)' }}
          >
            Get In Touch
          </button>
        </div>

        {/* Tech stack row */}
        <div style={{
          marginTop: '80px', display: 'flex', alignItems: 'center', gap: '24px',
          flexWrap: 'wrap',
        }}>
          <span style={{ fontFamily: 'Space Mono', fontSize: '11px', color: 'rgba(226,232,240,0.3)', letterSpacing: '2px' }}>
            BUILT WITH
          </span>
          {['Go', 'Kubernetes', 'Docker', 'AWS', 'Terraform', 'Prometheus'].map(tech => (
            <span key={tech} style={{
              fontFamily: 'Space Mono', fontSize: '12px',
              color: 'rgba(0,245,255,0.5)',
              borderBottom: '1px solid rgba(0,245,255,0.15)',
              paddingBottom: '2px',
            }}>{tech}</span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
      }}>
        <span style={{ fontFamily: 'Space Mono', fontSize: '10px', color: 'rgba(226,232,240,0.3)', letterSpacing: '2px' }}>SCROLL</span>
        <div style={{
          width: '1px', height: '50px',
          background: 'linear-gradient(to bottom, rgba(0,245,255,0.5), transparent)',
          animation: 'float 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  )
}
