import { useState } from 'react'

const topSkills = ['Go', 'Docker', 'Kubernetes', 'AWS', 'REST APIs']
const projectNames = ['Cloud-Native Portfolio', 'CLI Portfolio', 'AI Virtual Mall', 'Air Quality Monitor']
const certNames = ['AWS Academy Cloud Foundation', 'Java Programming', 'Privacy and security in online social Media']

export default function Resume() {
  const [view, setView] = useState('brief')

  return (
    <section id="resume" className="section-shell" style={{ padding: '80px 48px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 className="slide-in-heading" style={{
        fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        color: '#e2e8f0', lineHeight: 1.1, marginBottom: '20px',
      }}>
        Resume
      </h2>

      {/* View toggle */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
        {[{ key: 'brief', label: 'Brief View' }, { key: 'full', label: 'Full Preview' }].map(tab => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setView(tab.key)}
            style={{
              fontFamily: 'Space Mono', fontSize: '11px', letterSpacing: '1px',
              textTransform: 'uppercase', cursor: 'pointer',
              padding: '8px 18px', borderRadius: '6px',
              border: view === tab.key ? '1px solid var(--cyan)' : '1px solid rgba(0,245,255,0.12)',
              background: view === tab.key ? 'rgba(0,245,255,0.1)' : 'transparent',
              color: view === tab.key ? 'var(--cyan)' : 'rgba(226,232,240,0.5)',
              transition: 'all 0.3s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {view === 'brief' ? (
        <div className="resume-grid">
          <article className="glass-card resume-panel">
            <h3>Brief Resume</h3>
            <p><strong>Name:</strong> Sarvesh Ranjan</p>
            <p><strong>Role:</strong> Go Developer and Cloud Enthusiast</p>
            <p><strong>University:</strong> Lovely Professional University</p>

            <p className="resume-subtitle">Top 5 Tech Skills</p>
            <div className="resume-chip-row">
              {topSkills.map((skill) => <span key={skill} className="chip">{skill}</span>)}
            </div>

            <p className="resume-subtitle">Projects</p>
            <ul className="resume-list">
              {projectNames.map((project) => <li key={project}>{project}</li>)}
            </ul>

            <p className="resume-subtitle">Certificates</p>
            <ul className="resume-list">
              {certNames.map((cert) => <li key={cert}>{cert}</li>)}
            </ul>

            <p className="resume-subtitle">Education Snapshot</p>
            <p>B.Tech CSE (2023 - Present) · CGPA 6.96</p>
          </article>

          <article className="glass-card resume-download-panel">
            <p className="resume-preview-label">Full Resume</p>
            <h3 style={{ marginBottom: '8px' }}>Sarvesh Ranjan</h3>
            <p style={{ color: 'var(--cyan)', fontFamily: 'Space Mono', fontSize: '12px', marginBottom: '16px' }}>
              Go Developer · Cloud & DevOps Enthusiast
            </p>

            <div style={{ marginBottom: '20px' }}>
              <p className="resume-subtitle" style={{ marginTop: 0 }}>Highlights</p>
              <ul className="resume-list" style={{ lineHeight: 1.8 }}>
                <li>Built and deployed containerized apps on Kubernetes</li>
                <li>AWS Cloud Foundations certified</li>
                <li>112+ problems solved on LeetCode</li>
              </ul>
            </div>

            <p style={{
              fontFamily: 'Space Mono', fontSize: '10px', letterSpacing: '1px',
              color: 'rgba(226,232,240,0.35)', marginBottom: '16px',
            }}>
              LAST UPDATED: MARCH 2026
            </p>

            <a
              href="/Sarvesh_Resume.pdf"
              download="Sarvesh_Ranjan_Resume.pdf"
              className="resume-download-btn interactive-focus"
            >
              Download Resume ↓
            </a>
          </article>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '32px', borderRadius: '16px' }}>
          <div style={{ width: '100%', height: '80vh', borderRadius: '10px', overflow: 'hidden' }}>
            <iframe
              src="/Sarvesh_Resume.pdf"
              title="Resume Preview"
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: '10px' }}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <a
              href="/Sarvesh_Resume.pdf"
              download="Sarvesh_Ranjan_Resume.pdf"
              className="resume-download-btn interactive-focus"
            >
              Download Resume ↓
            </a>
          </div>
        </div>
      )}
    </section>
  )
}
