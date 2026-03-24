import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { trackEvent } from '../utils/analytics'

const roles = [
  "Go Developer",
  "Cloud & DevOps Enthusiast",
  "Backend Engineer",
  "CS Undergrad @ LPU",
]

const shortBio =
  "Cloud and DevOps focused engineer in India who builds Go backend systems and deploys them on Kubernetes. Open to full-time roles and freelance backend or cloud projects."

const statusBadge = "Open to Opportunities"

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
      padding: '88px 24px 64px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <motion.div
        ref={containerRef}
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: '900px', width: '100%', position: 'relative', zIndex: 2, marginTop: '10px' }}
      >
        {/* Status badge */}
        <motion.div variants={childVariants} style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.06)', border: '1px solid rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.2)',
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
          {statusBadge}
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
          <span style={{ color: 'var(--cyan)' }}>Sarvesh</span>
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
          {shortBio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={childVariants} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <motion.button
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' })}
            onClickCapture={() => trackEvent('cta_view_projects_click', { section: 'hero' })}
            className="interactive-focus"
            aria-label="Scroll to projects section"
            style={{
              background: 'var(--cyan)', color: '#020818',
              border: 'none', borderRadius: '6px',
              padding: '14px 32px', cursor: 'pointer',
              fontFamily: 'Space Mono', fontSize: '13px',
              fontWeight: 700, letterSpacing: '1px',
              textTransform: 'uppercase',
              boxShadow: '0 0 20px rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.2)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 30px rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.35)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.2)'}
          >
            View Projects
          </motion.button>
          <motion.button
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' })}
            onClickCapture={() => trackEvent('cta_contact_click', { section: 'hero' })}
            className="interactive-focus"
            aria-label="Scroll to contact section"
            style={{
              background: 'transparent', color: 'var(--cyan)',
              border: '1px solid rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.4)',
              borderRadius: '6px', padding: '14px 32px',
              cursor: 'pointer', fontFamily: 'Space Mono',
              fontSize: '13px', letterSpacing: '1px',
              textTransform: 'uppercase', transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.08)'; e.target.style.borderColor = 'var(--cyan)' }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.4)' }}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        {/* Tech stack row */}
        <motion.div variants={childVariants} style={{
          marginTop: '56px', display: 'flex', alignItems: 'center', gap: '14px',
          flexWrap: 'wrap',
        }}>
          <span style={{ fontFamily: 'Space Mono', fontSize: '11px', color: 'rgba(226,232,240,0.3)', letterSpacing: '2px', marginRight: '4px' }}>
            TECH I USE
          </span>
          {['Go', 'Kubernetes', 'Docker', 'AWS', 'Azure'].map(tech => (
            <span key={tech} style={{
              fontFamily: 'Space Mono', fontSize: '12px',
              color: 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.78)',
              border: '1px solid rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.18)',
              borderRadius: '999px',
              padding: '6px 12px',
              background: 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.05)',
            }}>{tech}</span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        zIndex: 2,
      }}>
        <span style={{ fontFamily: 'Space Mono', fontSize: '10px', color: 'rgba(226,232,240,0.3)', letterSpacing: '2px' }}></span>
        <div style={{
          width: '1px', height: '50px',
          background: 'linear-gradient(to bottom, rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.5), transparent)',
          animation: 'float 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  )
}
