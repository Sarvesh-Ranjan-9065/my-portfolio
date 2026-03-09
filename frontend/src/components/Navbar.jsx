import { useState, useEffect } from 'react'

const links = ['About', 'Projects', 'Skills', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setActive(id)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 100,
      padding: '16px 48px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'all 0.4s ease',
      background: scrolled ? 'rgba(2,8,24,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,245,255,0.08)' : '1px solid transparent',
    }}>
      {/* Logo */}
      <div style={{ fontFamily: 'Space Mono', fontSize: '18px', fontWeight: 700 }}>
        <span style={{ color: 'var(--cyan)' }}>&lt;</span>
        <span style={{ color: '#e2e8f0' }}>Sarvesh</span>
        <span style={{ color: 'var(--cyan)' }}> /&gt;</span>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        {links.map(link => (
          <button
            key={link}
            onClick={() => scrollTo(link)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Space Mono', fontSize: '13px',
              color: active === link ? 'var(--cyan)' : 'rgba(226,232,240,0.6)',
              textTransform: 'uppercase', letterSpacing: '2px',
              transition: 'color 0.3s',
              position: 'relative',
              padding: '4px 0',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
            onMouseLeave={e => e.target.style.color = active === link ? 'var(--cyan)' : 'rgba(226,232,240,0.6)'}
          >
            {link}
          </button>
        ))}
        <a
          href="/Sarvesh_Resume.pdf"
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: 'Space Mono', fontSize: '12px',
            color: 'var(--cyan)', border: '1px solid rgba(0,245,255,0.4)',
            padding: '8px 18px', borderRadius: '4px',
            textDecoration: 'none', letterSpacing: '1px',
            transition: 'all 0.3s',
            textTransform: 'uppercase',
          }}
          onMouseEnter={e => {
            e.target.style.background = 'rgba(0,245,255,0.1)'
            e.target.style.boxShadow = '0 0 20px rgba(0,245,255,0.2)'
          }}
          onMouseLeave={e => {
            e.target.style.background = 'transparent'
            e.target.style.boxShadow = 'none'
          }}
        >
          Resume
        </a>
      </div>
    </nav>
  )
}
