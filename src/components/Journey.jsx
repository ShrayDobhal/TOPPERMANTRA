import { Reveal, Eyebrow, pad } from './primitives.jsx'
import { JOURNEY } from '../data.js'

export default function Journey() {
  return (
    <section id="journey" className="tm-section" style={{ position: 'relative', zIndex: 1, maxWidth: '1180px', margin: '0 auto', padding: '80px 44px' }}>
      <Reveal style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto 56px' }}>
        <Eyebrow>The student journey</Eyebrow>
        <h2 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 'clamp(30px,3.8vw,46px)', lineHeight: 1.08, letterSpacing: '-.02em', margin: 0 }}>
          From your first login to launching what's next
        </h2>
      </Reveal>

      <div style={{ position: 'relative' }}>
        <div className="tm-journey-line" style={{ position: 'absolute', left: 0, right: 0, top: '27px', height: '2px', background: 'linear-gradient(90deg,transparent,rgba(255,87,34,.5),rgba(255,87,34,.5),transparent)' }} />
        <div className="tm-journey" style={{ display: 'grid', gap: '14px', position: 'relative' }}>
          {JOURNEY.map((s, i) => (
            <Reveal key={s.t} delay={i * 70} style={{ textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', margin: '0 auto 16px', borderRadius: '50%', display: 'grid', placeItems: 'center', background: '#100D0C', border: '2px solid rgba(255,87,34,.55)', fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: '18px', color: '#FF7A52', boxShadow: '0 0 0 6px rgba(16,13,12,1), 0 0 24px rgba(255,87,34,.3)' }}>
                {pad(i + 1)}
              </div>
              <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: '17px', marginBottom: '6px' }}>{s.t}</div>
              <p style={{ color: '#8C857F', fontSize: '13px', lineHeight: 1.45, margin: 0, padding: '0 4px' }}>{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
