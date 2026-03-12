import { useEffect, useRef, useState } from 'react'

const previewCache = new Map()

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
  const [previewRequested, setPreviewRequested] = useState(false)
  const isFeatured = cert.featured

  const showPreview = () => {
    setPreviewRequested(true)
    setFlipped(true)
  }

  const hidePreview = () => {
    setFlipped(false)
  }

  const togglePreview = (event) => {
    if (event.target.closest('a')) return
    setPreviewRequested(true)
    setFlipped((current) => !current)
  }

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    setPreviewRequested(true)
    setFlipped((current) => !current)
  }

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setFlipped(false)
    }
  }

  return (
    <div
      style={{
        perspective: '1000px',
        minHeight: isFeatured ? '360px' : '320px',
        gridColumn: isFeatured ? 'span 1' : undefined,
      }}
      onMouseEnter={showPreview}
      onMouseLeave={hidePreview}
      onFocus={showPreview}
      onBlur={handleBlur}
      onClick={togglePreview}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Preview certificate ${cert.name}`}
    >
      <div style={{
        position: 'relative', width: '100%', height: '100%', minHeight: 'inherit',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.45s ease',
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
          }}>{flipped ? 'CERTIFICATE PREVIEW READY' : 'HOVER OR TAP TO FLIP'}</p>
        </div>

        {/* Back */}
        <div className="glass-card" style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: '14px', padding: '14px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch',
          gap: '14px', overflow: 'hidden',
          border: isFeatured ? '1px solid rgba(0,245,255,0.4)' : undefined,
        }}>
          <div style={{
            minHeight: isFeatured ? '248px' : '208px',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '1px solid rgba(0,245,255,0.14)',
            background: 'rgba(2,8,24,0.72)',
          }}>
            <CertificatePreview
              file={cert.file}
              active={previewRequested || flipped}
              title={cert.name}
            />
          </div>

          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            gap: '12px', flexWrap: 'wrap',
          }}>
            <div>
              <p style={{ color: 'rgba(226,232,240,0.67)', fontSize: '13px', marginBottom: '4px' }}>
                Issued: {cert.date}
              </p>
              <p style={{ color: '#ecfeff', fontSize: '14px' }}>
                {cert.issuer}
              </p>
            </div>
            <a
              href={cert.file}
              target="_blank"
              rel="noreferrer"
              className="interactive-focus"
              style={{
                fontFamily: 'Space Mono', fontSize: '11px', letterSpacing: '1px',
                color: '#020818', background: 'var(--cyan)',
                padding: '8px 16px', borderRadius: '6px', textDecoration: 'none',
                fontWeight: 700, boxShadow: '0 0 20px rgba(0,245,255,0.3)',
              }}
            >
              Open PDF →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function CertificatePreview({ file, active, title }) {
  const [previewUrl, setPreviewUrl] = useState(() => previewCache.get(file) || '')
  const [status, setStatus] = useState(() => (previewCache.has(file) ? 'ready' : 'idle'))

  useEffect(() => {
    if (!active || previewCache.has(file)) {
      if (previewCache.has(file)) {
        setPreviewUrl(previewCache.get(file))
        setStatus('ready')
      }
      return
    }

    let cancelled = false
    let loadingTask
    let pdfDocument

    const renderPreview = async () => {
      try {
        setStatus('loading')
        const [{ GlobalWorkerOptions, getDocument }, workerModule] = await Promise.all([
          import('pdfjs-dist'),
          import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
        ])

        GlobalWorkerOptions.workerSrc = workerModule.default
        loadingTask = getDocument(file)
        pdfDocument = await loadingTask.promise

        const page = await pdfDocument.getPage(1)
        const viewport = page.getViewport({ scale: 1.1 })
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d', { alpha: false })

        if (!context) {
          throw new Error('Canvas context not available')
        }

        canvas.width = viewport.width
        canvas.height = viewport.height

        await page.render({ canvasContext: context, viewport }).promise

        const nextPreviewUrl = canvas.toDataURL('image/png')
        previewCache.set(file, nextPreviewUrl)

        if (!cancelled) {
          setPreviewUrl(nextPreviewUrl)
          setStatus('ready')
        }
      } catch {
        if (!cancelled) {
          setStatus('error')
        }
      } finally {
        pdfDocument?.cleanup?.()
        pdfDocument?.destroy?.()
      }
    }

    renderPreview()

    return () => {
      cancelled = true
      loadingTask?.destroy?.()
    }
  }, [active, file])

  if (previewUrl) {
    return (
      <img
        src={previewUrl}
        alt={`${title} preview`}
        loading="lazy"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          background: '#031122',
        }}
      />
    )
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '10px',
      color: 'rgba(226,232,240,0.7)',
      fontFamily: 'Space Mono',
      fontSize: '11px',
      letterSpacing: '1px',
      textAlign: 'center',
      padding: '20px',
    }}>
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: '1px solid rgba(0,245,255,0.18)',
        background: 'rgba(0,245,255,0.04)',
        display: 'grid',
        placeItems: 'center',
        color: 'var(--cyan)',
        fontSize: '16px',
      }}>
        {status === 'error' ? '!' : 'PDF'}
      </div>
      <span>
        {status === 'loading' ? 'Rendering certificate preview...' : 'Flip to load certificate preview'}
      </span>
    </div>
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
