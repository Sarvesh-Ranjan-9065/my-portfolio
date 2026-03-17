import { useEffect, useRef, useState } from 'react'
import Magnet from '../extra_UI/animations/magnet'

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

  const handleSubmit = async (e) => {
    e.preventDefault()
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
    border: '1px solid rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.15)',
    borderRadius: '8px', color: '#e2e8f0',
    fontFamily: 'Space Mono', fontSize: '13px',
    outline: 'none', transition: 'all 0.3s',
    boxSizing: 'border-box',
  }

  const contact = {
    email: "roysarvesh5220@gmail.com",
    github: "https://github.com/Sarvesh-Ranjan-9065",
    linkedin: "https://linkedin.com/in/sarvesh-ranjan",
    // mobile: "", // keep hidden unless you want to show it
  }

  return (
    <section id="contact" className="section-shell" style={{ padding: '80px 48px', maxWidth: '1200px', margin: '0 auto' }}>
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
          }}></div>
          <h2 className="slide-in-heading" style={{
            fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: '#e2e8f0', lineHeight: 1.1,
          }}>
            Get in touch
          </h2>
        </div>

        <div className="split-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          {/* Left */}
          <div className="glass-card" style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.2s',
            borderRadius: '16px',
            padding: '28px',
          }}>
            <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'rgba(226,232,240,0.55)', marginBottom: '32px' }}>
              Have a project idea, want to collaborate, or just want to say hi? Feel free to reach out.
            </p>

            {[
              { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
              { label: 'GitHub', value: contact.github, href: contact.github },
              { label: 'LinkedIn', value: contact.linkedin, href: contact.linkedin },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'Space Mono', fontSize: '11px', color: 'var(--cyan)', letterSpacing: '2px', minWidth: '80px' }}>
                  {item.label.toUpperCase()}
                </span>
                <Magnet padding={64} magnetStrength={2.1}>
                  <a href={item.href} target="_blank" rel="noreferrer"
                    className="interactive-focus"
                    style={{ fontFamily: 'Space Mono', fontSize: '13px', color: 'rgba(226,232,240,0.6)', textDecoration: 'none' }}
                    onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
                    onMouseLeave={e => e.target.style.color = 'rgba(226,232,240,0.6)'}
                  >
                    {item.value} ↗
                  </a>
                </Magnet>
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
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label htmlFor="contact-name" style={{ fontFamily: 'Space Mono', fontSize: '11px', color: 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.7)', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
                  NAME
                </label>
                <input
                  id="contact-name"
                  name="name" value={form.name} onChange={handleChange}
                  placeholder="Your name"
                  style={inputStyle}
                  required
                  className="interactive-focus"
                  onFocus={e => e.target.style.borderColor = 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.15)'}
                />
              </div>
              <div>
                <label htmlFor="contact-email" style={{ fontFamily: 'Space Mono', fontSize: '11px', color: 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.7)', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
                  EMAIL
                </label>
                <input
                  id="contact-email"
                  name="email" value={form.email} onChange={handleChange}
                  placeholder="your@email.com" type="email"
                  style={inputStyle}
                  required
                  className="interactive-focus"
                  onFocus={e => e.target.style.borderColor = 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.15)'}
                />
              </div>
              <div>
                <label htmlFor="contact-message" style={{ fontFamily: 'Space Mono', fontSize: '11px', color: 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.7)', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
                  MESSAGE
                </label>
                <textarea
                  id="contact-message"
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
                  required
                  className="interactive-focus"
                  onFocus={e => e.target.style.borderColor = 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.15)'}
                />
              </div>

              <Magnet padding={90} magnetStrength={2.4}>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="interactive-focus"
                  style={{
                    padding: '14px 32px',
                    background: status === 'success' ? '#00ff88' : 'var(--cyan)',
                    color: '#020818', border: 'none', borderRadius: '8px',
                    fontFamily: 'Space Mono', fontSize: '13px', fontWeight: 700,
                    letterSpacing: '2px', textTransform: 'uppercase',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 0 30px rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.25)',
                    opacity: status === 'sending' ? 0.7 : 1,
                  }}
                  onMouseEnter={e => { if (status !== 'sending') e.target.style.boxShadow = '0 0 50px rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.5)' }}
                  onMouseLeave={e => e.target.style.boxShadow = '0 0 30px rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.25)'}
                >
                  {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent ✓' : 'Send Message'}
                </button>
              </Magnet>

              <p aria-live="polite" style={{ fontFamily: 'Space Mono', fontSize: '12px', color: 'rgba(226,232,240,0.55)', textAlign: 'center', minHeight: '18px' }}>
                {status === 'sending' ? 'Sending your message...' : ''}
                {status === 'success' ? 'Message sent successfully.' : ''}
              </p>

              {status === 'error' && (
                <p style={{ fontFamily: 'Space Mono', fontSize: '12px', color: '#ff4757', textAlign: 'center' }}>
                  Something went wrong. Try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
