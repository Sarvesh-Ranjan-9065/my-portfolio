const education = [
  {
    title: 'B.Tech - Computer Science and Engineering',
    school: 'Lovely Professional University · Phagwara, Punjab',
    date: 'Aug 2023 - Present · CGPA: 6.96',
    badge: 'CURRENT',
  },
  {
    title: 'Intermediate - PCM',
    school: 'Dr. R.K.P.L.D Kisan College · Sitamarhi, Bihar',
    date: 'Jun 2021 - Mar 2023 · Percentage: 73%',
  },
  {
    title: 'Matriculation - Science',
    school: 'D.A.V Public School · RunniSaidpur, Bihar',
    date: 'Mar 2020 - May 2021 · Percentage: 58%',
  },
]

export default function Education() {
  return (
    <section id="education" className="section-shell" style={{ padding: '80px 48px 40px', maxWidth: '1200px', margin: '0 auto' }}>
      <p className="section-label">04. Education</p>
      <h2 className="section-title" style={{ marginBottom: '28px' }}>Academic Journey</h2>

      <div className="timeline-wrap">
        {education.map((item) => (
          <article key={item.title} className="timeline-item glass-card">
            <div className="timeline-dot" />
            <h3>{item.title}</h3>
            <p>{item.school}</p>
            <p className="timeline-date">{item.date}</p>
            {item.badge && <span className="current-badge">{item.badge}</span>}
          </article>
        ))}
      </div>
    </section>
  )
}
