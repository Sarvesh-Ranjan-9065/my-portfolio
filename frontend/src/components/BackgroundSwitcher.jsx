import { useState, useCallback } from 'react'

const STORAGE_KEY = 'portfolio-bg'
const BACKGROUNDS = [
  { name: 'Threads', value: 'threads' },
  { name: 'Dot Grid', value: 'dot-grid' },
  { name: 'Light Pillars', value: 'light-pillars' },
  { name: 'Light Rays', value: 'light-rays' },
]

export default function BackgroundSwitcher({ activeBg = 'threads', onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredBg, setHoveredBg] = useState(null)

  const selectBg = useCallback((bgValue) => {
    if (onChange) onChange(bgValue)
    localStorage.setItem(STORAGE_KEY, bgValue)
    setIsOpen(false)
  }, [onChange])

  const hoveredBgName = BACKGROUNDS.find(b => b.value === hoveredBg)?.name

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '6px',
      }}
    >
      {/* Tooltip */}
      <div
        style={{
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: '4px',
          opacity: hoveredBg && isOpen ? 1 : 0,
          transform: hoveredBg && isOpen ? 'translateY(0)' : 'translateY(4px)',
          transition: 'opacity 0.18s ease, transform 0.18s ease',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            fontFamily: 'Space Mono, monospace',
            letterSpacing: '1px',
            color: 'var(--cyan)',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {hoveredBgName}
        </span>
      </div>

      {/* Background options */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          opacity: isOpen ? 1 : 0,
          maxHeight: isOpen ? '500px' : 0,
          overflow: 'hidden',
          transition: 'opacity 0.2s ease, max-height 0.3s ease',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        {BACKGROUNDS.map(bg => (
          <button
            key={bg.value}
            type="button"
            onClick={() => selectBg(bg.value)}
            onMouseEnter={() => setHoveredBg(bg.value)}
            onMouseLeave={() => setHoveredBg(null)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              border: activeBg === bg.value ? '2px solid var(--cyan)' : '1px solid rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.25)',
              background: activeBg === bg.value ? 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.15)' : 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.05)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
            }}
            title={bg.name}
          >
            {BACKGROUNDS.indexOf(bg) + 1}
          </button>
        ))}
      </div>

      {/* Main toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          border: '1px solid rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.35)',
          background: 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.08)',
          color: 'var(--cyan)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Space Mono, monospace',
          fontSize: '16px',
          fontWeight: 'bold',
          backdropFilter: 'blur(8px)',
        }}
        onMouseEnter={(e) => {
          e.target.style.borderColor = 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.65)'
          e.target.style.background = 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.15)'
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.35)'
          e.target.style.background = 'rgba(var(--cyan-r), var(--cyan-g), var(--cyan-b), 0.08)'
        }}
        title="Background Switcher"
      >
        🎨
      </button>
    </div>
  )
}
