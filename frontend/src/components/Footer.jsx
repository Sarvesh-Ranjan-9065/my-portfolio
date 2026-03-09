export default function Footer() {
  return (
    <footer style={{
      padding: '48px',
      borderTop: '1px solid rgba(0,245,255,0.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      maxWidth: '1200px', margin: '0 auto',
      flexWrap: 'wrap', gap: '16px',
    }}>
      <div style={{ fontFamily: 'Space Mono', fontSize: '14px' }}>
        <span style={{ color: 'var(--cyan)' }}>&lt;</span>
        <span style={{ color: '#e2e8f0' }}>Sarvesh</span>
        <span style={{ color: 'var(--cyan)' }}> /&gt;</span>
      </div>

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
        © {new Date().getFullYear()} Sarvesh. All systems operational.
      </p>
    </footer>
  )
}
