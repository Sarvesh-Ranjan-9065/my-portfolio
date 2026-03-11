const certs = [
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
    name: 'AWS Academy Cloud Foundation',
    issuer: 'AWS Academy',
    date: '2025',
    file: '/aws academy cloud foundation.pdf',
  },
  {
    name: 'Fundamental of network communication',
    issuer: 'Coursera',
    date: '2025',
    file: '/fundamental of network communication.pdf',
  },
]

export default function Certifications() {
  return (
    <section id="certifications" className="section-shell" style={{ padding: '80px 48px 40px', maxWidth: '1200px', margin: '0 auto' }}>
      <p className="section-label">06. Certifications</p>
      <h2 className="section-title" style={{ marginBottom: '28px' }}>Certificates and Credentials</h2>

      <div className="cert-grid">
        {certs.map((cert) => (
          <article key={cert.name} className="glass-card cert-card">
            <h3>{cert.name}</h3>
            <p>Issuer: {cert.issuer}</p>
            <p>Date: {cert.date}</p>
            <a href={cert.file} target="_blank" rel="noreferrer" className="achievement-link">View →</a>
          </article>
        ))}
      </div>
    </section>
  )
}
