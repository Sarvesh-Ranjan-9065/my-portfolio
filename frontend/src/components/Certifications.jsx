import { useEffect, useRef, useState } from 'react'
import SpotlightCard from '../extra_UI/compo/spotlight_card'

const certs = [
  {
    name: 'AWS Academy Cloud Foundation',
    issuer: 'AWS Academy',
    date: '2025',
    file: '/aws%20academy%20cloud%20foundation.pdf',
    preview: '/aws academy cloud foundation.png',
  },
  {
    name: 'Bits and bytes certificates',
    issuer: 'Coursera',
    date: '2025',
    file: '/Bits%20and%20bytes%20certificate.pdf',
    preview: '/Bits and bytes certificate.png',
  },
  {
    name: 'Java Programming',
    issuer: 'Imneo',
    date: '2025',
    file: '/Java%20Programming.pdf',
    preview: '/Java Programming.png',
  },
  {
    name: 'Privacy and security in online social Media',
    issuer: 'NPTEL',
    date: '2025',
    file: '/Privacy%20and%20security%20in%20online%20social%20Media.pdf',
    preview: '/Privacy and security in online social Media.png',
  },
  {
    name: 'Fundamental of network communication',
    issuer: 'Coursera',
    date: '2025',
    file: '/fundamental%20of%20network%20communication.pdf',
    preview: '/fundamental of network communication.png',
  },
]

function CertCard({ cert }) {
  const isFeatured = cert.featured
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <SpotlightCard className="!p-0 !bg-transparent !border-0 h-full" spotlightColor="rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.24)">
      <article
        className="glass-card"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        style={{
          borderRadius: '14px',
          minHeight: '260px',
          border: isFeatured ? '1px solid rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.3)' : undefined,
          transition: 'all 0.3s ease',
          position: 'relative',
          perspective: '1000px',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            minHeight: '260px',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.35s ease',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >


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
          </div>

          <a
            href={cert.file}
            target="_blank"
            rel="noreferrer"
            className="interactive-focus"
            style={{
              position: 'absolute',
              inset: 0,
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              textDecoration: 'none',
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <img
              src={cert.preview}
              alt={`${cert.name} preview`}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%',
                height: '100%',
                minHeight: '168px',
                border: '1px solid rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.24)',
                borderRadius: '10px',
                objectFit: 'contain',
                objectPosition: 'center',
                display: 'block',
                background: '#ffffff',
              }}
            />
            <span style={{ color: 'var(--cyan)', fontFamily: 'Space Mono', fontSize: '11px', letterSpacing: '1px' }}>
              Click to open full certificate →
            </span>
          </a>
        </div>
      </article>
    </SpotlightCard>
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
    <section id="certificates" className="section-shell" style={{ padding: '80px 48px', maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
      <h2 className="slide-in-heading" style={{
        fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        color: '#e2e8f0', lineHeight: 1.1, marginBottom: '28px',
      }}>
        Certificates
      </h2>

      <div style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease',
      }}>
        <div className="cert-grid">
          {certs.map((cert) => (
            <CertCard key={cert.name} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  )
}
