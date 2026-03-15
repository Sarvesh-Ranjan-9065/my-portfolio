import { useEffect, useRef, useState } from 'react'

function useCountUp(target, duration, start) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) {
      setCount(0)
      return
    }

    let startTime = null
    let raf = 0

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      }
    }

    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
    }
  }, [start, target, duration])

  return count
}

const achievements = [
  {
    title: '50-Day Streak',
    countTarget: 50,
    suffix: ' days',
    icon: null,
    badge: '/leetcode-50days-badge.png',
    platform: 'LeetCode',
    line: 'Consistent daily problem solving streak in 2026',
    link: 'https://leetcode.com/u/sarvesh69/',
  },
  {
    title: '112 Problems Solved',
    countTarget: 112,
    suffix: '',
    icon: null,
    platform: 'LeetCode',
    line: 'DSA practice across arrays, trees, graphs, and more',
    link: 'https://leetcode.com/u/sarvesh69/',
  },
  {
    title: '4-Star Python',
    countTarget: 4,
    suffix: '-Star',
    icon: null,
    platform: 'HackerRank',
    line: 'Algorithms and problem solving in Python',
    link: 'https://www.hackerrank.com/profile/sarveshbhai587',
  },
  {
    title: '2-Star C++ and Java',
    countTarget: 2,
    suffix: '-Star',
    icon: null,
    platform: 'HackerRank',
    line: 'OOP fundamentals and language basics',
    link: 'https://www.hackerrank.com/profile/roysarvesh5220',
  },
]

export default function Achievements() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="achievements" className="section-shell" style={{ padding: '110px 48px 40px', maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
      <h2 className="section-title slide-in-heading" style={{ marginBottom: '28px' }}>Achievements.</h2>

      <div className="achievements-grid">
        {achievements.map((item) => (
          <AchievementCard key={item.title} item={item} visible={visible} />
        ))}
      </div>
    </section>
  )
}

function AchievementCard({ item, visible }) {
  const count = useCountUp(item.countTarget, 900, visible)

  return (
    <article className="glass-card achievement-card" style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s ease',
    }}>
      {item.badge ? (
        <img
          src={item.badge}
          alt={`${item.title} badge`}
          loading="lazy"
          style={{
            width: '48px', height: '48px', objectFit: 'contain',
            marginBottom: '12px', borderRadius: '8px',
          }}
        />
      ) : (
        <div style={{ marginBottom: '12px', width: '48px', height: '48px' }} />
      )}
      <h3 style={{ fontFamily: 'Space Mono' }}>
        {count}{item.suffix}
      </h3>
      <p className="achievement-platform">{item.platform}</p>
      <p className="achievement-line">{item.line}</p>
      <a href={item.link} target="_blank" rel="noreferrer" className="achievement-link">View Profile →</a>
    </article>
  )
}
