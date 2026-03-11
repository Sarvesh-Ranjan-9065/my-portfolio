const topSkills = ['Go', 'Docker', 'Kubernetes', 'AWS', 'REST APIs']
const projectNames = ['Cloud-Native Portfolio', 'CLI Portfolio']
const certNames = ['AWS Academy Cloud Foundation', 'Java Programming', 'Privacy and security in online social Media']

export default function Resume() {
  return (
    <section id="resume" className="section-shell" style={{ padding: '90px 48px 40px', maxWidth: '1200px', margin: '0 auto' }}>
      <p className="section-label">07. Resume</p>
      <h2 className="section-title" style={{ marginBottom: '28px' }}>Profile Snapshot and Full Resume</h2>

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
          <h3>General CV Updated</h3>
          <p>Click below for direct download in one step.</p>
          <a
            href="/General_CV_Updated.pdf"
            download="Sarvesh_Ranjan_Resume.pdf"
            className="resume-download-btn interactive-focus"
          >
            Download Resume ↓
          </a>
        </article>
      </div>
    </section>
  )
}
