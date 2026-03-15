import { useEffect, useRef } from 'react'
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
  const cursorGlowRef = useRef(null)

  // Cursor glow effect
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const isSlowDevice = (navigator.hardwareConcurrency || 4) <= 4
    const glow = cursorGlowRef.current

    if (prefersReducedMotion || !canHover || isSlowDevice || !glow) return

    let raf = 0
    let x = -200
    let y = -200

    const render = () => {
      glow.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`
      raf = 0
    }

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY

      if (!raf) {
        raf = requestAnimationFrame(render)
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
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
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )
    headings.forEach(h => observer.observe(h))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Cursor glow */}
      <div
        ref={cursorGlowRef}
        className="cursor-glow"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,245,255,0.05) 0%, rgba(0,245,255,0.015) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate3d(-200px, -200px, 0)',
          willChange: 'transform',
        }}
      />

      {/* Single subtle ambient orb */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="ambient-orb" style={{
          position: 'absolute', top: '-20%', left: '-10%',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)',
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
