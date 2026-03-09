import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else setStatus('error')
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus(null), 4000)
  }

  const inputStyle = {
    width: '100%', padding: '14px 18px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(0,245,255,0.15)',
    borderRadius: '8px', color: '#e2e8f0',
    fontFamily: 'Space Mono', fontSize: '13px',
    outline: 'none', transition: 'all 0.3s',
    boxSizing: 'border-box',
  }

  return (
    <section id="contact" style={{ padding: '120px 48px', maxWidth: '1200px', margin: '0 auto' }}>
      <div ref={ref}>
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease',
          marginBottom: '64px',
        }}>
          <div style={{
            fontFamily: 'Space Mono', fontSize: '12px', color: 'var(--cyan)',
            letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px',
          }}>04. Contact</div>
          <h2 style={{
            fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: '#e2e8f0', lineHeight: 1.1,
          }}>
            Let's build something<br />
            <span className="gradient-text">extraordinary together</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          {/* Left */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.2s',
          }}>
            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(226,232,240,0.55)', marginBottom: '48px' }}>
              Whether you're looking to build cloud-native infrastructure, scale your backend systems,
              or automate your DevOps pipeline — I'd love to hear about your project.
            </p>

            {[
              { label: 'Email', value: 'sarvesh@example.com', href: 'mailto:sarvesh@example.com' },
              { label: 'GitHub', value: 'github.com/sarvesh', href: 'https://github.com/sarvesh' },
              { label: 'LinkedIn', value: 'linkedin.com/in/sarvesh', href: 'https://linkedin.com/in/sarvesh' },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'Space Mono', fontSize: '11px', color: 'var(--cyan)', letterSpacing: '2px', minWidth: '80px' }}>
                  {item.label.toUpperCase()}
                </span>
                <a href={item.href} target="_blank" rel="noreferrer"
                  style={{ fontFamily: 'Space Mono', fontSize: '13px', color: 'rgba(226,232,240,0.6)', textDecoration: 'none' }}
                  onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
                  onMouseLeave={e => e.target.style.color = 'rgba(226,232,240,0.6)'}
                >
                  {item.value} ↗
                </a>
              </div>
            ))}
          </div>

          {/* Right: Form */}
          <div
            className="glass-card"
            style={{
              padding: '40px', borderRadius: '16px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s ease 0.3s',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontFamily: 'Space Mono', fontSize: '11px', color: 'rgba(0,245,255,0.7)', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
                  NAME
                </label>
                <input
                  name="name" value={form.name} onChange={handleChange}
                  placeholder="Your name"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,245,255,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(0,245,255,0.15)'}
                />
              </div>
              <div>
                <label style={{ fontFamily: 'Space Mono', fontSize: '11px', color: 'rgba(0,245,255,0.7)', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
                  EMAIL
                </label>
                <input
                  name="email" value={form.email} onChange={handleChange}
                  placeholder="your@email.com" type="email"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,245,255,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(0,245,255,0.15)'}
                />
              </div>
              <div>
                <label style={{ fontFamily: 'Space Mono', fontSize: '11px', color: 'rgba(0,245,255,0.7)', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
                  MESSAGE
                </label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,245,255,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(0,245,255,0.15)'}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={status === 'sending'}
                style={{
                  padding: '14px 32px',
                  background: status === 'success' ? '#00ff88' : 'var(--cyan)',
                  color: '#020818', border: 'none', borderRadius: '8px',
                  fontFamily: 'Space Mono', fontSize: '13px', fontWeight: 700,
                  letterSpacing: '2px', textTransform: 'uppercase',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 0 30px rgba(0,245,255,0.25)',
                  opacity: status === 'sending' ? 0.7 : 1,
                }}
                onMouseEnter={e => { if (status !== 'sending') e.target.style.boxShadow = '0 0 50px rgba(0,245,255,0.5)' }}
                onMouseLeave={e => e.target.style.boxShadow = '0 0 30px rgba(0,245,255,0.25)'}
              >
                {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent ✓' : 'Send Message'}
              </button>

              {status === 'error' && (
                <p style={{ fontFamily: 'Space Mono', fontSize: '12px', color: '#ff4757', textAlign: 'center' }}>
                  Something went wrong. Try again.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
