import { useEffect, useState } from 'react'

const links = ['About', 'Achievements', 'Projects', 'Education', 'Training', 'Certifications', 'Skills', 'Resume', 'Fun', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('About')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = links.map((link) => link.toLowerCase())
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          const id = visible[0].target.id
          const match = links.find((l) => l.toLowerCase() === id)
          if (match) setActive(match)
        }
      },
      { rootMargin: '-40% 0px -45% 0px', threshold: [0.2, 0.5, 0.8] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMobileOpen(false)
    }

    const onEsc = (event) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('keydown', onEsc)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('keydown', onEsc)
    }
  }, [])

  const scrollTo = (id) => {
    setActive(id)
    setMobileOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  const resumeHref = '/General_CV_Updated.pdf'

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

        <div className="navbar-links" style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          {links.map((link) => (
            <button
              key={link}
              type="button"
              onClick={() => scrollTo(link)}
              aria-current={active === link ? 'page' : undefined}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Space Mono',
                fontSize: '13px',
                color: active === link ? 'var(--cyan)' : 'rgba(226,232,240,0.6)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                transition: 'color 0.3s',
                padding: '4px 0',
              }}
            >
              {link}
            </button>
          ))}

          <a
            href={resumeHref}
            download="Sarvesh_Ranjan_Resume.pdf"
            className="interactive-focus"
            style={{
              fontFamily: 'Space Mono',
              fontSize: '12px',
              color: 'var(--cyan)',
              border: '1px solid rgba(0,245,255,0.4)',
              padding: '8px 18px',
              borderRadius: '4px',
              textDecoration: 'none',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {links.map((link) => (
            <button
              key={link}
              type="button"
              onClick={() => scrollTo(link)}
              style={{
                background: 'none',
                border: 'none',
                textAlign: 'left',
                fontFamily: 'Space Mono',
                fontSize: '16px',
                letterSpacing: '1px',
                color: active === link ? 'var(--cyan)' : 'rgba(226,232,240,0.75)',
                textTransform: 'uppercase',
                cursor: 'pointer',
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
              marginTop: '8px',
              fontFamily: 'Space Mono',
              fontSize: '13px',
              color: 'var(--cyan)',
              border: '1px solid rgba(0,245,255,0.4)',
              borderRadius: '6px',
              textDecoration: 'none',
              padding: '10px 16px',
              width: 'fit-content',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Resume
          </a>
        </div>
      </aside>
    </>
  )
}
