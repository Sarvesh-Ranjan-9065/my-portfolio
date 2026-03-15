export default function Footer() {
  const socials = [
    { label: 'GitHub', href: 'https://github.com/Sarvesh-Ranjan-9065' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/sarvesh-ranjan' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/sarvesh69/' },
    { label: 'HackerRank', href: 'https://www.hackerrank.com/profile/sarveshbhai587' },
  ]

  return (
    <footer style={{
      padding: '48px',
      borderTop: '1px solid rgba(0,245,255,0.08)',
      maxWidth: '1200px', margin: '0 auto',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '16px', marginBottom: '20px',
      }}>
        <div style={{ fontFamily: 'Space Mono', fontSize: '14px' }}>
          <span style={{ color: '#e2e8f0' }}>Sarvesh Ranjan</span>
        </div>

        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: 'Space Mono', fontSize: '11px', letterSpacing: '1px',
                color: 'rgba(226,232,240,0.4)', textDecoration: 'none',
                transition: 'color 0.3s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
              onMouseLeave={e => e.target.style.color = 'rgba(226,232,240,0.4)'}
            >
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '16px',
      }}>
        <p style={{
          fontFamily: 'Space Mono', fontSize: '11px',
          color: 'rgba(226,232,240,0.3)', letterSpacing: '1px',
        }}>
          Built with <span style={{ color: 'var(--cyan)' }}>Go + Gin</span> · <span style={{ color: 'var(--cyan)' }}>React + Vite</span> · Deployed on <span style={{ color: 'var(--cyan)' }}>K8s</span>
        </p>

        <p style={{
          fontFamily: 'Space Mono', fontSize: '11px',
          color: 'rgba(226,232,240,0.3)',
        }}>
          © {new Date().getFullYear()} Sarvesh Ranjan.
        </p>
      </div>
    </footer>
  )
}
