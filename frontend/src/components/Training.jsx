import { useEffect, useState } from 'react'
import SpotlightCard from '../extra_UI/compo/spotlight_card'

function TrainingCertificatePreview() {
  const [previewUrl, setPreviewUrl] = useState('')
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    let cancelled = false
    let loadingTask
    let pdfDocument

    const loadPreview = async () => {
      try {
        setStatus('loading')

        const [{ GlobalWorkerOptions, getDocument }, workerModule] = await Promise.all([
          import('pdfjs-dist'),
          import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
        ])

        GlobalWorkerOptions.workerSrc = workerModule.default
        loadingTask = getDocument('/training.pdf')
        pdfDocument = await loadingTask.promise

        const page = await pdfDocument.getPage(1)
        const viewport = page.getViewport({ scale: 1.15 })
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d', { alpha: false })

        if (!context) {
          throw new Error('Canvas context not available')
        }

        canvas.width = viewport.width
        canvas.height = viewport.height

        await page.render({ canvasContext: context, viewport }).promise

        if (!cancelled) {
          setPreviewUrl(canvas.toDataURL('image/png'))
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

    loadPreview()

    return () => {
      cancelled = true
      loadingTask?.destroy?.()
    }
  }, [])

  return (
    <a
      href="/training.pdf"
      target="_blank"
      rel="noreferrer"
      className="interactive-focus"
      aria-label="Open training certificate"
      style={{
        display: 'block',
        width: '100%',
        textDecoration: 'none',
      }}
    >
      <div
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.18)',
          background: 'rgba(3,17,31,0.94)',
          boxShadow: '0 0 12px rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.06)',
          minHeight: '320px',
        }}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Training certificate preview"
            loading="lazy"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              background: '#03111f',
            }}
          />
        ) : (
          <div
            style={{
              minHeight: '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '10px',
              padding: '24px',
              color: 'rgba(226,232,240,0.7)',
              fontFamily: 'Space Mono',
              fontSize: '11px',
              letterSpacing: '1px',
              textAlign: 'center',
            }}
          >
            <span style={{ color: 'var(--cyan)', fontSize: '16px' }}>PDF</span>
            <span>
              {status === 'error' ? 'Unable to load preview' : 'Loading training certificate preview...'}
            </span>
            <span style={{ color: 'rgba(226,232,240,0.45)' }}>Click the preview to open the full certificate</span>
          </div>
        )}
      </div>
    </a>
  )
}

export default function Training() {
  return (
    <section id="training" className="section-shell" style={{ padding: '80px 48px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 className="slide-in-heading" style={{
        fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        color: '#e2e8f0', lineHeight: 1.1, marginBottom: '28px',
      }}>
        Training
      </h2>

      <div className="timeline-wrap">
        <SpotlightCard
          className="!p-0 !bg-transparent !border-0"
          spotlightColor="rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.28)"
        >
          <article className="timeline-item glass-card">
            <div className="timeline-dot" />
            <div className="split-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(280px, 0.85fr)', gap: '28px', alignItems: 'start' }}>
              <div>
                <h3>CSE Pathshala · Jun 2025 - Jul 2025</h3>
                <p>C++ Programming: OOPs and Data Structures</p>
                <ul className="timeline-bullets">
                  <li>Learned OOP: classes, objects, inheritance, polymorphism, abstraction.</li>
                  <li>Practiced DSA: arrays, linked lists, stacks, queues, and tree fundamentals.</li>
                  <li>Built problem-solving ability through structured coding practice.</li>
                </ul>
              </div>

              <div>
                <TrainingCertificatePreview />
              </div>
            </div>
          </article>
        </SpotlightCard>
      </div>
    </section>
  )
}
