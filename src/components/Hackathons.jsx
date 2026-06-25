import { Reveal, CtaButton, GhostButton, useCountdown, pad } from './primitives.jsx'

function Unit({ value, label, accent }) {
  return (
    <div style={{ background: 'rgba(16,13,12,.55)', border: '1px solid rgba(255,255,255,.1)', borderRadius: '14px', padding: '16px 8px', textAlign: 'center' }}>
      <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: '32px', color: accent ? '#FF7A52' : '#fff' }}>{pad(value)}</div>
      <div style={{ fontSize: '11px', color: '#8C857F', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: '2px' }}>{label}</div>
    </div>
  )
}

export default function Hackathons() {
  const { d, h, m, s } = useCountdown(14)
  return (
    <section id="hackathons" className="tm-section" style={{ position: 'relative', zIndex: 1, maxWidth: '1180px', margin: '0 auto', padding: '50px 44px 70px' }}>
      <Reveal style={{ position: 'relative', overflow: 'hidden', borderRadius: '26px', border: '1px solid rgba(255,87,34,.25)', background: 'linear-gradient(135deg,rgba(255,87,34,.14),rgba(254,109,77,.04))', padding: '46px' }}>
        <div style={{ position: 'absolute', right: '-80px', top: '-80px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,87,34,.35),transparent 65%)', filter: 'blur(30px)', animation: 'tmGlow 6s ease-in-out infinite' }} />
        <div className="tm-hack-grid" style={{ position: 'relative', display: 'grid', gap: '40px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 13px', borderRadius: '100px', background: 'rgba(255,87,34,.18)', border: '1px solid rgba(255,87,34,.4)', fontSize: '12.5px', fontWeight: 700, color: '#FFC2AC', letterSpacing: '.05em', marginBottom: '20px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#FF5722', boxShadow: '0 0 8px #FF5722', animation: 'tmPulse 1.6s ease-in-out infinite' }} />
              REGISTRATIONS OPEN
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 'clamp(28px,3.4vw,42px)', lineHeight: 1.06, letterSpacing: '-.02em', margin: '0 0 14px' }}>Build Bharat Hackathon '26</h2>
            <p style={{ color: '#C6BDB6', fontSize: '16px', lineHeight: 1.55, maxWidth: '440px', margin: '0 0 26px' }}>
              48 hours. 1000+ builders. Real mentors and ₹5L in prizes. Ship something that matters — then put it in front of founders and investors.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <CtaButton href="#join" style={{ fontSize: '15px', padding: '13px 24px', boxShadow: '0 10px 26px rgba(255,87,34,.42)' }}>Register your team</CtaButton>
              <GhostButton href="#join" style={{ fontSize: '15px', padding: '13px 24px', borderColor: 'rgba(255,255,255,.18)' }}>See past winners</GhostButton>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#A79F99', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '14px' }}>Kicks off in</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px' }}>
              <Unit value={d} label="Days" />
              <Unit value={h} label="Hrs" />
              <Unit value={m} label="Min" />
              <Unit value={s} label="Sec" accent />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
