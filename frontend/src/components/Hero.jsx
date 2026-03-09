import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const roles = ['Backend Engineer', 'DevOps Architect', 'Cloud Native Builder', 'Go Developer']

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef(null)

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
      if (shouldReduceMotion) {
        setDisplayText(current)
        return
      }
      timeout = setTimeout(() => {
        setDisplayText(isDeleting
          ? current.slice(0, displayText.length - 1)
          : current.slice(0, displayText.length + 1)
        )
      }, speed)
    }
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIdx, shouldReduceMotion])

  const heroVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.12 },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section id="hero" className="grid-bg" style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '120px 24px 80px',
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

      <motion.div
        ref={containerRef}
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: '900px', width: '100%' }}
      >
        {/* Status badge */}
        <motion.div variants={childVariants} style={{
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
        </motion.div>

        {/* Name */}
        <motion.h1 variants={childVariants} style={{
          fontFamily: 'Syne', fontWeight: 800,
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          lineHeight: 1.0,
          marginBottom: '16px',
          letterSpacing: '-2px',
        }}>
          <span style={{ color: '#e2e8f0' }}>Hi, I'm </span>
          <span className="glow-text" style={{ color: 'var(--cyan)' }}>Sarvesh</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div variants={childVariants} style={{
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
        </motion.div>

        {/* Description */}
        <motion.p variants={childVariants} style={{
          fontSize: '18px', lineHeight: 1.8,
          color: 'rgba(226,232,240,0.55)',
          maxWidth: '580px',
          marginBottom: '48px',
          fontFamily: 'Syne',
        }}>
          Building resilient distributed systems, cloud-native infrastructure,
          and high-performance Go services. Obsessed with reliability, scalability,
          and clean architecture.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={childVariants} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="interactive-focus"
            aria-label="Scroll to projects section"
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
          </motion.button>
          <motion.button
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="interactive-focus"
            aria-label="Scroll to contact section"
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
          </motion.button>
        </motion.div>

        {/* Tech stack row */}
        <motion.div variants={childVariants} style={{
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
        </motion.div>
      </motion.div>

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
