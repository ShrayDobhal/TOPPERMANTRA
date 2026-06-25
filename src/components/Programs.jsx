import { Reveal, Eyebrow } from './primitives.jsx'
import { INCUBATOR } from '../data.js'

export default function Programs() {
  return (
    <section className="tm-programs tm-section" style={{ position: 'relative', zIndex: 1, maxWidth: '1180px', margin: '0 auto', padding: '30px 44px 70px', display: 'grid', gap: '18px' }}>
      <Reveal style={{ border: '1px solid rgba(255,255,255,.09)', borderRadius: '24px', padding: '38px', background: 'rgba(255,255,255,.02)' }}>
        <Eyebrow>Entrepreneurship Program</Eyebrow>
        <h2 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 'clamp(26px,3vw,38px)', lineHeight: 1.08, letterSpacing: '-.02em', margin: '0 0 24px' }}>From idea to incubation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {INCUBATOR.map((t) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '11px', padding: '15px 16px', borderRadius: '13px', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF5722', boxShadow: '0 0 8px #FF5722', flexShrink: 0 }} />
              <span style={{ fontWeight: 600, fontSize: '14.5px', color: '#E7E1DC' }}>{t}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={120} style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,.09)', borderRadius: '24px', padding: '38px', background: 'radial-gradient(120% 120% at 80% 0%,rgba(255,87,34,.16),rgba(16,13,12,0))', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ position: 'absolute', left: '50%', bottom: '-60px', transform: 'translateX(-50%)', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,87,34,.3),transparent 60%)', filter: 'blur(26px)', animation: 'tmGlow 5s ease-in-out infinite' }} />
        <div style={{ position: 'relative' }}>
          <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '100px', border: '1px solid rgba(255,87,34,.4)', background: 'rgba(255,87,34,.12)', fontSize: '11.5px', fontWeight: 700, letterSpacing: '.1em', color: '#FFC2AC' }}>COMING SOON</span>
          <h3 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: '26px', letterSpacing: '-.02em', margin: '18px 0 12px' }}>Drone Technology Lab</h3>
          <p style={{ color: '#A79F99', fontSize: '14.5px', lineHeight: 1.55, margin: 0 }}>
            Drone innovation, competitions, research projects and startup incubation — a brand-new frontier opening up for our builders.
          </p>
        </div>
        <div style={{ position: 'relative', display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '24px' }}>
          {['Competitions', 'Research', 'Incubation'].map((t) => (
            <span key={t} style={{ fontSize: '12px', fontWeight: 600, color: '#C6BDB6', padding: '6px 11px', borderRadius: '9px', background: 'rgba(255,255,255,.05)' }}>{t}</span>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
