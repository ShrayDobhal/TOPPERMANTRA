import { useState } from 'react'
import { Reveal, Eyebrow } from './primitives.jsx'
import { WHY_CARDS } from '../data.js'

const SHAPE = {
  circle: { borderRadius: '50%' },
  square: {},
  diamond: { transform: 'rotate(45deg)' },
}

function WhyCard({ t, d, s }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', overflow: 'hidden', padding: '30px 26px', borderRadius: '20px',
        border: `1px solid ${hover ? 'rgba(255,87,34,.3)' : 'rgba(255,255,255,.09)'}`,
        background: hover ? 'rgba(255,87,34,.04)' : 'rgba(255,255,255,.02)',
        transform: hover ? 'translateY(-8px)' : 'none',
        transition: 'transform .35s ease, border-color .35s ease, background .35s ease',
      }}
    >
      <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '140px', height: '140px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,87,34,.16),transparent 65%)', opacity: hover ? 1 : 0, transition: 'opacity .35s' }} />
      <div style={{ width: '46px', height: '46px', borderRadius: '13px', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg,rgba(255,87,34,.22),rgba(254,109,77,.1))', border: '1px solid rgba(255,87,34,.3)', marginBottom: '20px' }}>
        <span style={{ display: 'block', width: '16px', height: '16px', background: '#FF7A52', ...(SHAPE[s] || {}) }} />
      </div>
      <h3 style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: '19px', margin: '0 0 9px', letterSpacing: '-.01em' }}>{t}</h3>
      <p style={{ color: '#9A938D', fontSize: '14.5px', lineHeight: 1.55, margin: 0 }}>{d}</p>
    </div>
  )
}

export default function WhySection() {
  return (
    <section id="why" className="tm-section" style={{ position: 'relative', zIndex: 1, maxWidth: '1180px', margin: '0 auto', padding: '60px 44px 30px' }}>
      <Reveal style={{ maxWidth: '680px', marginBottom: '46px' }}>
        <Eyebrow>Why Topper Mantra</Eyebrow>
        <h2 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 'clamp(30px,3.8vw,46px)', lineHeight: 1.08, letterSpacing: '-.02em', margin: 0 }}>
          Everything you need to grow — in one ecosystem
        </h2>
      </Reveal>
      <div className="tm-why-grid" style={{ display: 'grid', gap: '18px' }}>
        {WHY_CARDS.map((c, i) => (
          <Reveal key={c.t} delay={(i % 3) * 70}>
            <WhyCard {...c} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
