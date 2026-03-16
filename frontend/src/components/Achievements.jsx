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

const platformConfig = {
  LeetCode:   { color: '#FFA116', bg: 'rgba(255,161,22,0.1)',  abbr: 'LC' },
  HackerRank: { color: '#2EC866', bg: 'rgba(46,200,102,0.1)', abbr: 'HR' },
}

const achievements = [
  {
    title: '50-Day Streak',
    countTarget: 50,
    suffix: ' days',
    badge: '/leetcode-50days-badge.png',
    platform: 'LeetCode',
    line: 'Consistent daily problem solving streak in 2026',
    link: 'https://leetcode.com/u/sarvesh69/',
  },
  {
    title: '112 Problems Solved',
    countTarget: 112,
    suffix: '',
    platform: 'LeetCode',
    line: 'DSA practice across arrays, trees, graphs, and more',
    link: 'https://leetcode.com/u/sarvesh69/',
  },
  {
    title: '4-Star Python',
    countTarget: 4,
    suffix: '-Star',
    platform: 'HackerRank',
    line: 'Algorithms and problem solving in Python',
    link: 'https://www.hackerrank.com/profile/sarveshbhai587',
  },
  {
    title: '2-Star C++ and Java',
    countTarget: 2,
    suffix: '-Star',
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
    <section id="achievements" className="section-shell" style={{ padding: '80px 48px', maxWidth: '1200px', margin: '0 auto' }} ref={ref}>
      <h2 className="slide-in-heading" style={{
        fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        color: '#e2e8f0', lineHeight: 1.1, marginBottom: '28px',
      }}>
        Achievements
      </h2>

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
  const cfg = platformConfig[item.platform] ?? { color: 'var(--cyan)', bg: 'rgba(0,245,255,0.08)', abbr: '??' }

  return (
    <article className="glass-card achievement-card" style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s ease',
      borderTop: `2px solid ${cfg.color}`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* top accent fade */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '40px',
        background: `linear-gradient(180deg, ${cfg.bg} 0%, transparent 100%)`,
        pointerEvents: 'none',
      }} />

      {item.badge ? (
        <img
          src={item.badge}
          alt={`${item.title} badge`}
          loading="lazy"
          style={{ width: '44px', height: '44px', objectFit: 'contain', marginBottom: '14px', borderRadius: '8px' }}
        />
      ) : (
        <div style={{
          width: '44px', height: '44px', borderRadius: '10px',
          background: cfg.bg,
          border: `1px solid ${cfg.color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '14px',
          fontFamily: 'Space Mono', fontWeight: 700, fontSize: '13px',
          color: cfg.color, letterSpacing: '0.5px',
        }}>
          {cfg.abbr}
        </div>
      )}

      <h3 style={{ fontFamily: 'Space Mono' }}>
        {count}{item.suffix}
      </h3>
      <p className="achievement-platform" style={{ color: cfg.color }}>{item.platform}</p>
      <p className="achievement-line">{item.line}</p>
      <a href={item.link} target="_blank" rel="noreferrer" className="achievement-link">View Profile →</a>
    </article>
  )
}
