import { useEffect, useRef, useState } from 'react'

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
    <section id="education" className="section-shell" style={{ padding: '80px 48px', maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
      <h2 className="slide-in-heading" style={{
        fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        color: '#e2e8f0', lineHeight: 1.1, marginBottom: '28px',
      }}>
        Education
      </h2>

      <div className="timeline-wrap">
        {education.map((item, i) => (
          <article
            key={item.title}
            className="timeline-item glass-card"
            style={{
              borderLeft: '3px solid var(--cyan)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s ease ${i * 0.12}s`,
            }}
          >
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
