const achievements = [
  {
    title: '112 Problems Solved',
    icon: '💻',
    platform: 'LeetCode',
    line: 'Consistent DSA problem solver',
    link: 'https://leetcode.com/u/sarvesh69/',
  },
  {
    title: '4-Star Python',
    icon: '⭐',
    platform: 'HackerRank',
    line: 'Algorithmic challenges and data handling',
    link: 'https://www.hackerrank.com/profile/sarveshbhai587',
  },
  {
    title: '2-Star C++ and Java',
    icon: '⭐',
    platform: 'HackerRank',
    line: 'Language fundamentals and OOP concepts',
    link: 'https://www.hackerrank.com/profile/roysarvesh5220',
  },
]

export default function Achievements() {
  return (
    <section id="achievements" className="section-shell" style={{ padding: '110px 48px 40px', maxWidth: '1200px', margin: '0 auto' }}>
      <p className="section-label">02. Achievements</p>
      <h2 className="section-title" style={{ marginBottom: '28px' }}>Competitive Coding Highlights</h2>

      <div className="achievements-grid">
        {achievements.map((item) => (
          <article key={item.title} className="glass-card achievement-card">
            <div className="achievement-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p className="achievement-platform">Platform: {item.platform}</p>
            <p className="achievement-line">{item.line}</p>
            <a href={item.link} target="_blank" rel="noreferrer" className="achievement-link">View Profile →</a>
          </article>
        ))}
      </div>
    </section>
  )
}
