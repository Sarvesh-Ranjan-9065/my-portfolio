import { useEffect, useRef, useState, useMemo } from 'react'
import ThemeSwitcher from './components/ThemeSwitcher'
import BackgroundSwitcher from './components/BackgroundSwitcher'
import Threads from './extra_UI/background/threads'
import DotGrid from './extra_UI/background/dot_grid'
import LightPillar from './extra_UI/background/light_pillers'
import LightRays from './extra_UI/background/light_rays'
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
  const [activeBg, setActiveBg] = useState('threads')

  // Load background preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-bg')
    if (saved) setActiveBg(saved)
  }, [])

  // Theme-reactive color for Threads background (0-1 range)
  const [themeRgb, setThemeRgb] = useState([0, 245 / 255, 255 / 255])
  const [themeHex, setThemeHex] = useState('#00f5ff')
  const [themeDimHex, setThemeDimHex] = useState('#0891b2')

  useEffect(() => {
    const readColor = () => {
      const s = document.documentElement.style
      const r = parseInt(s.getPropertyValue('--cyan-r')) || 0
      const g = parseInt(s.getPropertyValue('--cyan-g')) || 245
      const b = parseInt(s.getPropertyValue('--cyan-b')) || 255
      const currentHex = (s.getPropertyValue('--cyan') || '').trim() || '#00f5ff'
      const currentDimHex = (s.getPropertyValue('--cyan-dim') || '').trim() || '#0891b2'
      setThemeRgb([r / 255, g / 255, b / 255])
      setThemeHex(currentHex)
      setThemeDimHex(currentDimHex)
    }
    readColor()
    const obs = new MutationObserver(readColor)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] })
    return () => obs.disconnect()
  }, [])

  const threadColor = useMemo(() => themeRgb, [themeRgb])

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
          background: 'radial-gradient(circle, rgba(var(--cyan-r),var(--cyan-g),var(--cyan-b),0.05) 0%, rgba(var(--cyan-r),var(--cyan-g),var(--cyan-b),0.015) 40%, transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(var(--cyan-r),var(--cyan-g),var(--cyan-b),0.04) 0%, transparent 70%)',
        }} />
      </div>

      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {activeBg === 'threads' && (
          <div className="absolute inset-0" style={{ opacity: 0.15 }}>
            <Threads color={threadColor} amplitude={0.8} distance={0.3} enableMouseInteraction={false} />
          </div>
        )}
        {activeBg === 'dot-grid' && (
          <div className="absolute inset-0" style={{ opacity: 0.32 }}>
            <DotGrid
              dotSize={10}
              gap={36}
              baseColor={themeDimHex}
              activeColor={themeHex}
              proximity={130}
              speedTrigger={140}
              shockStrength={3.5}
            />
          </div>
        )}
        {activeBg === 'light-pillars' && (
          <div className="absolute inset-0" style={{ opacity: 0.42 }}>
            <LightPillar
              topColor={themeHex}
              bottomColor={themeDimHex}
              intensity={0.35}
              glowAmount={0.002}
              noiseIntensity={0.35}
              interactive={false}
            />
          </div>
        )}
        {activeBg === 'light-rays' && (
          <div className="absolute inset-0" style={{ opacity: 0.5 }}>
            <LightRays
              raysOrigin="top-center"
              raysColor={themeHex}
              raysSpeed={1}
              pulsating={false}
            />
          </div>
        )}
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

      <ThemeSwitcher />
      <BackgroundSwitcher activeBg={activeBg} onChange={setActiveBg} />
    </div>
  )
}
