import { useEffect, useRef, useState } from 'react'

const techSkillGroups = [
  { category: 'Languages', items: ['Go', 'C++', 'Python', 'Java', 'C'] },
  { category: 'Cloud and DevOps', items: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Minikube', 'NGINX', 'Apache CloudStack'] },
  { category: 'Backend and Tools', items: ['net/http', 'REST APIs', 'Git', 'GitHub', 'Linux'] },
  { category: 'Currently Learning', items: ['Azure (AZ-900 to AZ-104)', 'Go Advanced Patterns', 'Docker', 'Kubernetes'] },
]

const nonTechSkills = ['Problem Solver', 'Adaptability', 'Logical Thinking', 'Fast Learner', 'Team Player', 'Self-Motivated']

export default function Skills() {
  const [visible, setVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('tech')
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
    <section id="skills" style={{
      padding: '120px 48px',
      background: 'rgba(0,245,255,0.01)',
      borderTop: '1px solid rgba(0,245,255,0.06)',
      borderBottom: '1px solid rgba(0,245,255,0.06)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease',
          marginBottom: '40px',
        }}>
          <div className="slide-in-heading" style={{
            fontFamily: 'Space Mono', fontSize: '12px', color: 'var(--cyan)',
            letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '16px',
          }}>08. Skills</div>
          <h2 className="slide-in-heading" style={{
            fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: '#e2e8f0', lineHeight: 1.1,
          }}>
            What I work with.
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
          {[{ key: 'tech', label: 'Tech Skills' }, { key: 'soft', label: 'Soft Skills' }].map(tab => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              style={{
                fontFamily: 'Space Mono', fontSize: '12px', letterSpacing: '1px',
                textTransform: 'uppercase', cursor: 'pointer',
                padding: '10px 24px', borderRadius: '8px',
                border: activeTab === tab.key ? '1px solid var(--cyan)' : '1px solid rgba(0,245,255,0.12)',
                background: activeTab === tab.key ? 'rgba(0,245,255,0.1)' : 'transparent',
                color: activeTab === tab.key ? 'var(--cyan)' : 'rgba(226,232,240,0.5)',
                transition: 'all 0.3s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tech skills */}
        {activeTab === 'tech' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
            {techSkillGroups.map((group, gi) => (
              <div
                key={group.category}
                className="glass-card"
                style={{
                  padding: '32px', borderRadius: '16px',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease ${gi * 0.1 + 0.2}s`,
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
                  background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
                  opacity: 0.4,
                }} />

                <div style={{
                  fontSize: '11px', marginBottom: '12px', letterSpacing: '2px',
                  color: 'rgba(0,245,255,0.55)', fontFamily: 'Space Mono', textTransform: 'uppercase',
                }}>Category</div>
                <h3 style={{
                  fontFamily: 'Syne', fontWeight: 700, fontSize: '1rem',
                  color: 'var(--cyan)', marginBottom: '20px',
                  letterSpacing: '1px', textTransform: 'uppercase',
                }}>{group.category}</h3>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {group.items.map((skill, si) => (
                    <span
                      key={skill}
                      className="skill-pill"
                      style={{
                        fontFamily: 'Space Mono', fontSize: '12px',
                        color: '#9df8ff',
                        background: 'rgba(0,245,255,0.08)',
                        border: '1px solid rgba(0,245,255,0.2)',
                        borderRadius: '4px', padding: '5px 12px',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'scale(1)' : 'scale(0.7)',
                        transition: `all 0.3s ease ${gi * 0.1 + si * 0.05 + 0.4}s`,
                        cursor: 'default',
                      }}
                      onMouseEnter={e => {
                        e.target.style.color = '#dafeff'
                        e.target.style.borderColor = 'rgba(0,245,255,0.45)'
                        e.target.style.background = 'rgba(0,245,255,0.12)'
                        e.target.style.boxShadow = '0 0 12px rgba(0,245,255,0.2)'
                      }}
                      onMouseLeave={e => {
                        e.target.style.color = '#9df8ff'
                        e.target.style.borderColor = 'rgba(0,245,255,0.2)'
                        e.target.style.background = 'rgba(0,245,255,0.08)'
                        e.target.style.boxShadow = 'none'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Soft skills */}
        {activeTab === 'soft' && (
          <div className="glass-card" style={{ padding: '40px', borderRadius: '16px' }}>
            <p style={{
              fontFamily: 'Space Mono', fontSize: '11px', letterSpacing: '2px',
              color: 'rgba(198,173,255,0.8)', textTransform: 'uppercase', marginBottom: '24px',
            }}>
              Non-Technical Strengths
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {nonTechSkills.map((skill, i) => (
                <span
                  key={skill}
                  style={{
                    fontFamily: 'Space Mono', fontSize: '13px',
                    color: '#ddc8ff',
                    background: 'rgba(124,58,237,0.14)',
                    border: '1px solid rgba(196,181,253,0.25)',
                    borderRadius: '999px', padding: '8px 18px',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'scale(1)' : 'scale(0.7)',
                    transition: `all 0.3s ease ${i * 0.08 + 0.2}s`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
