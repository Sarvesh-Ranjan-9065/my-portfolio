import { useState, useEffect, useCallback } from 'react'

const THEMES = [
  { name: 'Cyber Cyan',    color: '#00f5ff', dim: '#0891b2' },
  { name: 'Dark Violet',   color: '#a855f7', dim: '#7e22ce' },
  { name: 'Neon Hacker',   color: '#00ff88', dim: '#059669' },
  { name: 'Forest Nature', color: '#22c55e', dim: '#15803d' },
  { name: 'Ocean Calm',    color: '#14b8a6', dim: '#0f766e' },
  { name: 'Warm Amber',    color: '#f59e0b', dim: '#b45309' },
]

const STORAGE_KEY = 'portfolio-theme'

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function applyThemeToDom(theme) {
  document.documentElement.style.setProperty('--cyan', theme.color)
  document.documentElement.style.setProperty('--cyan-dim', theme.dim)
}

export default function ThemeSwitcher() {
  const [activeColor, setActiveColor] = useState(THEMES[0].color)
  const [hoveredColor, setHoveredColor] = useState(null)

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const theme = THEMES.find(t => t.color === saved)
      if (theme) {
        applyThemeToDom(theme)
        setActiveColor(theme.color)
      }
    }
  }, [])

  const selectTheme = useCallback((theme) => {
    applyThemeToDom(theme)
    setActiveColor(theme.color)
    localStorage.setItem(STORAGE_KEY, theme.color)
  }, [])

  const hoveredTheme = THEMES.find(t => t.color === hoveredColor)

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '6px',
      }}
    >
      {/* Tooltip */}
      <div
        style={{
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: '4px',
          opacity: hoveredTheme ? 1 : 0,
          transform: hoveredTheme ? 'translateY(0)' : 'translateY(4px)',
          transition: 'opacity 0.18s ease, transform 0.18s ease',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            background: 'rgba(2, 8, 24, 0.92)',
            border: `1px solid ${hexToRgba(hoveredColor || activeColor, 0.35)}`,
            borderRadius: '6px',
            padding: '4px 10px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            color: hoveredColor || activeColor,
            letterSpacing: '0.5px',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            transition: 'color 0.18s ease, border-color 0.18s ease',
          }}
        >
          {hoveredTheme ? hoveredTheme.name : '\u00a0'}
        </span>
      </div>

      {/* Glass pill */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.04)',
          border: `1px solid ${hexToRgba(activeColor, 0.22)}`,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '999px',
          padding: '10px 14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          boxShadow: `0 4px 24px rgba(0, 0, 0, 0.3), 0 0 20px ${hexToRgba(activeColor, 0.06)}`,
          transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        {/* Label */}
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '10px',
            color: hexToRgba(activeColor, 0.75),
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            lineHeight: 1,
            userSelect: 'none',
            transition: 'color 0.4s ease',
          }}
        >
          theme
        </span>

        {/* Color dots row */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {THEMES.map((theme) => {
            const isActive = activeColor === theme.color
            const isHovered = hoveredColor === theme.color

            return (
              <button
                key={theme.color}
                onClick={() => selectTheme(theme)}
                onMouseEnter={() => setHoveredColor(theme.color)}
                onMouseLeave={() => setHoveredColor(null)}
                aria-label={`Switch to ${theme.name} theme`}
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: theme.color,
                  border: isActive ? '2px solid rgba(255, 255, 255, 0.9)' : '2px solid transparent',
                  cursor: 'pointer',
                  padding: 0,
                  outline: 'none',
                  flexShrink: 0,
                  transform: isHovered && !isActive ? 'scale(1.2)' : isActive ? 'scale(1.15)' : 'scale(1)',
                  transition: 'transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
                  boxShadow: isActive
                    ? `0 0 0 2px ${hexToRgba(theme.color, 0.35)}, 0 0 10px ${hexToRgba(theme.color, 0.7)}`
                    : isHovered
                    ? `0 0 6px ${hexToRgba(theme.color, 0.6)}`
                    : 'none',
                }}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
