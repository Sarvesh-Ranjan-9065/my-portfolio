import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Achievements from './components/Achievements'
import Projects from './components/Projects'
import Education from './components/Education'
import Training from './components/Training'
import Certifications from './components/Certifications'
import Resume from './components/Resume'
import Skills from './components/Skills'
import Fun from './components/Fun'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const lenisRef = useRef(null)
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 })

  // Smooth scrolling
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    import('@studio-freight/lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      })
      lenisRef.current = lenis
      function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
      requestAnimationFrame(raf)
    }).catch(() => {})

    return () => { if (lenisRef.current) lenisRef.current.destroy() }
  }, [])

  // Cursor glow effect
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let raf
    const onMove = (e) => {
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setCursorPos({ x: e.clientX, y: e.clientY })
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => { window.removeEventListener('mousemove', onMove); if (raf) cancelAnimationFrame(raf) }
  }, [])

  // Scroll-triggered slide-in for section headings
  useEffect(() => {
    const headings = document.querySelectorAll('.slide-in-heading')
    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-in-visible')
          }
        })
      },
      { threshold: 0.15 }
    )
    headings.forEach(h => observer.observe(h))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="noise relative min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Cursor glow */}
      <div
        className="cursor-glow"
        style={{
          position: 'fixed',
          left: cursorPos.x - 200,
          top: cursorPos.y - 200,
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,245,255,0.07) 0%, rgba(0,245,255,0.02) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'left 0.15s ease-out, top 0.15s ease-out',
        }}
      />

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '-15%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: '400px', height: '400px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(0,245,255,0.03) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Achievements />
        <Projects />
        <Education />
        <Training />
        <Certifications />
        <Resume />
        <Skills />
        <Fun />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}
