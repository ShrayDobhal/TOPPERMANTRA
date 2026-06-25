import { Reveal, CountUp } from './primitives.jsx'
import { STATS } from '../data.js'

const numberStyle = {
  fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 'clamp(34px,3.6vw,52px)',
  background: 'linear-gradient(120deg,#FF5722,#FE6D4D)', WebkitBackgroundClip: 'text',
  backgroundClip: 'text', color: 'transparent',
}

export default function Stats() {
  return (
    <section className="tm-stats tm-section" style={{ position: 'relative', zIndex: 1, maxWidth: '1180px', margin: '0 auto', padding: '74px 44px', display: 'grid', gap: '22px' }}>
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 60} style={{ textAlign: 'center' }}>
          <div style={numberStyle}><CountUp to={s.to} /></div>
          <div style={{ color: '#8C857F', fontSize: '15px', fontWeight: 500, marginTop: '4px' }}>{s.label}</div>
        </Reveal>
      ))}
    </section>
  )
}
