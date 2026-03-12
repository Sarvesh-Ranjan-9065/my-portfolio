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

function FlipCard({ cert }) {
  const [flipped, setFlipped] = useState(false)
  const isFeatured = cert.featured

  return (
    <div
      style={{
        perspective: '1000px',
        minHeight: isFeatured ? '220px' : '180px',
        gridColumn: isFeatured ? 'span 1' : undefined,
      }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s ease',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
      }}>
        {/* Front */}
        <div className="glass-card" style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          borderRadius: '14px', padding: '24px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          border: isFeatured ? '1px solid rgba(0,245,255,0.4)' : undefined,
          boxShadow: isFeatured ? '0 0 30px rgba(0,245,255,0.2)' : undefined,
        }}>
          {isFeatured && (
            <span style={{
              position: 'absolute', top: '12px', right: '12px',
              fontFamily: 'Space Mono', fontSize: '9px', letterSpacing: '1px',
              color: '#020818', background: 'var(--cyan)',
              padding: '3px 8px', borderRadius: '4px', fontWeight: 700,
            }}>FEATURED</span>
          )}
          <h3 style={{
            color: '#ecfeff', margin: '0 0 10px', fontSize: isFeatured ? '1.2rem' : '1.1rem',
          }}>{cert.name}</h3>
          <p style={{ color: 'rgba(226,232,240,0.67)', fontSize: '14px' }}>
            {cert.issuer}
          </p>
          <p style={{
            fontFamily: 'Space Mono', fontSize: '10px', color: 'rgba(0,245,255,0.4)',
            marginTop: '12px', letterSpacing: '1px',
          }}>HOVER TO FLIP</p>
        </div>

        {/* Back */}
        <div className="glass-card" style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: '14px', padding: '24px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          border: isFeatured ? '1px solid rgba(0,245,255,0.4)' : undefined,
        }}>
          <p style={{ color: 'rgba(226,232,240,0.67)', fontSize: '14px', marginBottom: '8px' }}>
            Issued: {cert.date}
          </p>
          <p style={{ color: '#ecfeff', fontSize: '15px', marginBottom: '16px', textAlign: 'center' }}>
            {cert.name}
          </p>
          <a
            href={cert.file}
            target="_blank"
            rel="noreferrer"
            className="interactive-focus"
            style={{
              fontFamily: 'Space Mono', fontSize: '12px', letterSpacing: '1px',
              color: '#020818', background: 'var(--cyan)',
              padding: '8px 20px', borderRadius: '6px', textDecoration: 'none',
              fontWeight: 700, boxShadow: '0 0 20px rgba(0,245,255,0.3)',
            }}
          >
            View Certificate →
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Certifications() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="certifications" className="section-shell" style={{ padding: '80px 48px 40px', maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
      <p className="section-label slide-in-heading">06. Certifications</p>
      <h2 className="section-title slide-in-heading" style={{ marginBottom: '28px' }}>Certificates I actually earned.</h2>

      <div className="cert-grid" style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease',
      }}>
        {certs.map((cert) => (
          <FlipCard key={cert.name} cert={cert} />
        ))}
      </div>
    </section>
  )
}
