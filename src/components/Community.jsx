import { Reveal, Eyebrow } from './primitives.jsx'
import { COMMUNITY_TILES } from '../data.js'

function Tile({ l, s, ph, big }) {
  return (
    <div
      className={big ? 'tm-community-big' : undefined}
      style={{
        position: 'relative', overflow: 'hidden', borderRadius: '18px', border: '1px solid rgba(255,255,255,.09)',
        background: 'repeating-linear-gradient(135deg,#1B1612,#1B1612 10px,#181310 10px,#181310 20px)',
        display: 'flex', alignItems: 'flex-end', padding: '20px',
        ...(big ? { gridColumn: '1', gridRow: '1 / span 2' } : {}),
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(16,13,12,.85),transparent 55%)' }} />
      <div style={{ position: 'absolute', top: '14px', left: '14px', fontFamily: 'monospace', fontSize: '10px', color: '#5E5853' }}>{ph}</div>
      <div style={{ position: 'relative' }}>
        <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: big ? '22px' : '16px' }}>{l}</div>
        <div style={{ color: '#9A938D', fontSize: big ? '14px' : '12.5px', marginTop: '3px' }}>{s}</div>
      </div>
    </div>
  )
}

export default function Community() {
  return (
    <section id="community" className="tm-section" style={{ position: 'relative', zIndex: 1, maxWidth: '1180px', margin: '0 auto', padding: '70px 44px' }}>
      <Reveal style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 48px' }}>
        <Eyebrow>Find your tribe</Eyebrow>
        <h2 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 'clamp(30px,3.8vw,46px)', lineHeight: 1.08, letterSpacing: '-.02em', margin: 0 }}>
          A community that shows up for each other
        </h2>
      </Reveal>
      <Reveal className="tm-community" style={{ display: 'grid', gap: '16px' }}>
        {COMMUNITY_TILES.map((t) => <Tile key={t.l} {...t} />)}
      </Reveal>
    </section>
  )
}
