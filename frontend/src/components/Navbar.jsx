import { useEffect, useState, useRef } from 'react'

const mainLinks = ['About', 'Projects', 'Skills', 'Contact']
const moreLinks = ['Achievements', 'Education', 'Training', 'Certifications', 'Fun']
const allLinks = ['About', 'Achievements', 'Projects', 'Education', 'Training', 'Certifications', 'Skills', 'Resume', 'Fun', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('About')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = allLinks.map((link) => link.toLowerCase())
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) {
          const id = visible[0].target.id
          const match = allLinks.find((l) => l.toLowerCase() === id)
          if (match) setActive(match)
        }
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0.2, 0.5, 0.8] }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMobileOpen(false) }
    const onEsc = (event) => {
      if (event.key === 'Escape') { setMobileOpen(false); setMoreOpen(false) }
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onEsc)
    return () => { window.removeEventListener('resize', onResize); window.removeEventListener('keydown', onEsc) }
  }, [])

  useEffect(() => {
    if (!moreOpen) return
    const onClick = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [moreOpen])

  const scrollTo = (id) => {
    setActive(id)
    setMobileOpen(false)
    setMoreOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  const resumeHref = '/Sarvesh_Resume.pdf'

  return (
    <>
      <nav
        className="navbar-shell"
        style={{
          background: scrolled ? 'rgba(2,8,24,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,245,255,0.08)' : '1px solid transparent',
        }}
      >
        <div style={{ fontFamily: 'Space Mono', fontSize: '18px', fontWeight: 700 }}>
          <span style={{ color: 'var(--cyan)' }}>&lt;</span>
          <span style={{ color: '#e2e8f0' }}>Sarvesh</span>
          <span style={{ color: 'var(--cyan)' }}> /&gt;</span>
        </div>

        <button
          type="button"
          className="mobile-menu-button"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? 'Close' : 'Menu'}
        </button>

        <div className="navbar-links" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {mainLinks.map((link) => (
            <button
              key={link}
              type="button"
              onClick={() => scrollTo(link)}
              aria-current={active === link ? 'page' : undefined}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Space Mono', fontSize: '13px',
                color: active === link ? 'var(--cyan)' : 'rgba(226,232,240,0.6)',
                textTransform: 'uppercase', letterSpacing: '2px',
                transition: 'color 0.3s', padding: '4px 0',
              }}
            >
              {link}
            </button>
          ))}

          {/* More dropdown */}
          <div ref={moreRef} style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setMoreOpen((p) => !p)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Space Mono', fontSize: '13px',
                color: moreLinks.includes(active) ? 'var(--cyan)' : 'rgba(226,232,240,0.6)',
                textTransform: 'uppercase', letterSpacing: '2px',
                transition: 'color 0.3s', padding: '4px 0',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}
            >
              More <span style={{ fontSize: '10px', transition: 'transform 0.2s', display: 'inline-block', transform: moreOpen ? 'rotate(180deg)' : 'rotate(0)' }}>▼</span>
            </button>
            {moreOpen && (
              <div style={{
                position: 'absolute', top: '100%', right: 0, marginTop: '12px',
                background: 'rgba(2,8,24,0.95)', border: '1px solid rgba(0,245,255,0.15)',
                borderRadius: '10px', padding: '12px 8px', minWidth: '180px',
                backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                zIndex: 200,
              }}>
                {moreLinks.map((link) => (
                  <button
                    key={link}
                    type="button"
                    onClick={() => scrollTo(link)}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      background: active === link ? 'rgba(0,245,255,0.08)' : 'none',
                      border: 'none', cursor: 'pointer',
                      fontFamily: 'Space Mono', fontSize: '12px',
                      color: active === link ? 'var(--cyan)' : 'rgba(226,232,240,0.6)',
                      textTransform: 'uppercase', letterSpacing: '1px',
                      padding: '8px 12px', borderRadius: '6px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.target.style.background = 'rgba(0,245,255,0.06)'; e.target.style.color = 'var(--cyan)' }}
                    onMouseLeave={e => { if (active !== link) { e.target.style.background = 'none'; e.target.style.color = 'rgba(226,232,240,0.6)' }}}
                  >
                    {link}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href={resumeHref}
            download="Sarvesh_Ranjan_Resume.pdf"
            className="interactive-focus"
            style={{
              fontFamily: 'Space Mono', fontSize: '12px', color: 'var(--cyan)',
              border: '1px solid rgba(0,245,255,0.4)', padding: '8px 18px',
              borderRadius: '4px', textDecoration: 'none',
              letterSpacing: '1px', textTransform: 'uppercase',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(0,245,255,0.1)'; e.target.style.boxShadow = '0 0 20px rgba(0,245,255,0.3)' }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.boxShadow = 'none' }}
          >
            Resume
          </a>
        </div>
      </nav>

      {mobileOpen && (
        <button
          type="button"
          className="mobile-backdrop"
          aria-label="Close menu overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`mobile-panel ${mobileOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {allLinks.map((link) => (
            <button
              key={link}
              type="button"
              onClick={() => scrollTo(link)}
              style={{
                background: 'none', border: 'none', textAlign: 'left',
                fontFamily: 'Space Mono', fontSize: '15px', letterSpacing: '1px',
                color: active === link ? 'var(--cyan)' : 'rgba(226,232,240,0.75)',
                textTransform: 'uppercase', cursor: 'pointer',
              }}
            >
              {link}
            </button>
          ))}
          <a
            href={resumeHref}
            download="Sarvesh_Ranjan_Resume.pdf"
            onClick={() => setMobileOpen(false)}
            style={{
              marginTop: '8px', fontFamily: 'Space Mono', fontSize: '13px',
              color: 'var(--cyan)', border: '1px solid rgba(0,245,255,0.4)',
              borderRadius: '6px', textDecoration: 'none',
              padding: '10px 16px', width: 'fit-content',
              textTransform: 'uppercase', letterSpacing: '1px',
            }}
          >
            Resume
          </a>
        </div>
      </aside>
    </>
  )
}
