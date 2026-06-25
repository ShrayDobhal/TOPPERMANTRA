import { Reveal, Eyebrow, useTilt } from './primitives.jsx'
import { MENTORS } from '../data.js'

function MentorCard({ n, r, c, tags }) {
  const tilt = useTilt()
  return (
    <div
      {...tilt}
      style={{ position: 'relative', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,.09)', background: 'rgba(255,255,255,.025)', transition: 'transform .15s ease, border-color .3s', transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      <div style={{ width: '68px', height: '68px', borderRadius: '50%', marginBottom: '16px', background: 'repeating-linear-gradient(45deg,#2E241E,#2E241E 6px,#251D18 6px,#251D18 12px)', border: '1px solid rgba(255,255,255,.1)', display: 'grid', placeItems: 'center', fontSize: '9px', color: '#6E6862', fontFamily: 'monospace', textAlign: 'center' }}>photo</div>
      <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: '17px' }}>{n}</div>
      <div style={{ color: '#FFB59B', fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>{r}</div>
      <div style={{ color: '#8C857F', fontSize: '13px', marginTop: '2px' }}>{c}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '14px 0 18px' }}>
        {tags.map((t) => (
          <span key={t} style={{ fontSize: '11.5px', fontWeight: 600, color: '#C6BDB6', padding: '4px 9px', borderRadius: '8px', background: 'rgba(255,255,255,.05)' }}>{t}</span>
        ))}
      </div>
      <a
        href="#join"
        onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255,87,34,.22)')}
        onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(255,87,34,.1)')}
        style={{ display: 'block', textAlign: 'center', width: '100%', padding: '10px', borderRadius: '11px', border: '1px solid rgba(255,87,34,.4)', background: 'rgba(255,87,34,.1)', color: '#FFB59B', fontWeight: 700, fontSize: '14px', textDecoration: 'none', boxSizing: 'border-box', transition: 'background .2s' }}
      >
        Connect
      </a>
    </div>
  )
}

export default function Mentors() {
  return (
    <section id="mentors" className="tm-section" style={{ position: 'relative', zIndex: 1, maxWidth: '1180px', margin: '0 auto', padding: '60px 44px' }}>
      <Reveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '44px' }}>
        <div style={{ maxWidth: '560px' }}>
          <Eyebrow>Learn from the best</Eyebrow>
          <h2 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 'clamp(30px,3.8vw,46px)', lineHeight: 1.08, letterSpacing: '-.02em', margin: 0 }}>
            Mentors from companies you dream of joining
          </h2>
        </div>
        <a href="#join" style={{ textDecoration: 'none', color: '#FFB59B', fontWeight: 600, fontSize: '15px', whiteSpace: 'nowrap' }}>View all mentors →</a>
      </Reveal>

      <div className="tm-mentors" style={{ display: 'grid', gap: '18px' }}>
        {MENTORS.map((m, i) => (
          <Reveal key={m.n} delay={(i % 4) * 70}>
            <MentorCard {...m} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
