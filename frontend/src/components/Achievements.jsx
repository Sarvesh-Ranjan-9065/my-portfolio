import { useEffect, useRef, useState } from 'react'

function useCountUp(target, duration, start) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

const achievements = [
  {
    title: '112 Problems Solved',
    countTarget: 112,
    suffix: '',
    icon: '💻',
    platform: 'LeetCode',
    line: 'Grinding DSA because it makes the real code better',
    link: 'https://leetcode.com/u/sarvesh69/',
  },
  {
    title: '4-Star Python',
    countTarget: 4,
    suffix: '★',
    icon: '⭐',
    platform: 'HackerRank',
    line: 'Algorithms, data handling, and plenty of edge cases',
    link: 'https://www.hackerrank.com/profile/sarveshbhai587',
  },
  {
    title: '2-Star C++ and Java',
    countTarget: 2,
    suffix: '★',
    icon: '⭐',
    platform: 'HackerRank',
    line: 'OOP fundamentals and language basics covered',
    link: 'https://www.hackerrank.com/profile/roysarvesh5220',
  },
]

export default function Achievements() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="achievements" className="section-shell" style={{ padding: '110px 48px 40px', maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
      <p className="section-label slide-in-heading">02. Achievements</p>
      <h2 className="section-title slide-in-heading" style={{ marginBottom: '28px' }}>Numbers that actually mean something.</h2>

      <div className="achievements-grid">
        {achievements.map((item) => (
          <AchievementCard key={item.title} item={item} visible={visible} />
        ))}
      </div>
    </section>
  )
}

function AchievementCard({ item, visible }) {
  const count = useCountUp(item.countTarget, 1500, visible)

  return (
    <article className="glass-card achievement-card" style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s ease',
    }}>
      <div className="achievement-icon">{item.icon}</div>
      <h3 style={{ fontFamily: 'Space Mono' }}>
        {count}{item.suffix}
      </h3>
      <p className="achievement-platform">Platform: {item.platform}</p>
      <p className="achievement-line">{item.line}</p>
      <a href={item.link} target="_blank" rel="noreferrer" className="achievement-link">View Profile →</a>
    </article>
  )
}
