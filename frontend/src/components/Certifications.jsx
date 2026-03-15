import { useEffect, useRef, useState } from 'react'

const certs = [
  {
    name: 'AWS Academy Cloud Foundation',
    issuer: 'AWS Academy',
    date: '2025',
    file: '/aws academy cloud foundation.pdf',
    featured: true,
  },
  {
    name: 'Bits and bytes certificates',
    issuer: 'Coursera',
    date: '2025',
    file: '/Bits and bytes certificate.pdf',
  },
  {
    name: 'Java Programming',
    issuer: 'Imneo',
    date: '2025',
    file: '/Java Programming.pdf',
  },
  {
    name: 'Privacy and security in online social Media',
    issuer: 'NPTEL',
    date: '2025',
    file: '/Privacy and security in online social Media.pdf',
  },
  {
    name: 'Fundamental of network communication',
    issuer: 'Coursera',
    date: '2025',
    file: '/fundamental of network communication.pdf',
  },
]

function CertCard({ cert }) {
  const isFeatured = cert.featured

  return (
    <article
      className="glass-card"
      style={{
        borderRadius: '14px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '200px',
        border: isFeatured ? '1px solid rgba(0,245,255,0.3)' : undefined,
        transition: 'all 0.3s ease',
        position: 'relative',
      }}
    >
      {isFeatured && (
        <span style={{
          position: 'absolute', top: '12px', right: '12px',
          fontFamily: 'Space Mono', fontSize: '9px', letterSpacing: '1px',
          color: '#020818', background: 'var(--cyan)',
          padding: '3px 8px', borderRadius: '4px', fontWeight: 700,
        }}>FEATURED</span>
      )}

      <div>
        <h3 style={{
          color: '#ecfeff', margin: '0 0 10px', fontSize: isFeatured ? '1.2rem' : '1.1rem',
        }}>{cert.name}</h3>
        <p style={{ color: 'rgba(226,232,240,0.67)', fontSize: '14px', marginBottom: '4px' }}>
          {cert.issuer}
        </p>
        <p style={{ color: 'rgba(226,232,240,0.45)', fontSize: '13px' }}>
          {cert.date}
        </p>
      </div>

      <a
        href={cert.file}
        target="_blank"
        rel="noreferrer"
        className="interactive-focus"
        style={{
          marginTop: '16px',
          fontFamily: 'Space Mono', fontSize: '11px', letterSpacing: '1px',
          color: 'var(--cyan)', textDecoration: 'none',
          display: 'inline-flex', alignItems: 'center', gap: '4px',
        }}
      >
        View Certificate →
      </a>
    </article>
  )
}

export default function Certifications() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="certifications" className="section-shell" style={{ padding: '80px 48px 40px', maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
      <h2 className="section-title slide-in-heading" style={{ marginBottom: '28px' }}>Certifications.</h2>

      <div className="cert-grid" style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease',
      }}>
        {certs.map((cert) => (
          <CertCard key={cert.name} cert={cert} />
        ))}
      </div>
    </section>
  )
}
