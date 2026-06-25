import { CtaButton, GhostButton } from './primitives.jsx'
import { ECOSYSTEM } from '../data.js'

function EcoNode({ glyph, label, pos, anim }) {
  return (
    <div style={{ position: 'absolute', ...pos, animation: anim }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 16px 11px 12px', borderRadius: '14px', background: 'rgba(26,22,19,.85)', border: '1px solid rgba(255,255,255,.1)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0,0,0,.4)', whiteSpace: 'nowrap' }}>
        <span style={{ width: '30px', height: '30px', borderRadius: '9px', display: 'grid', placeItems: 'center', background: 'rgba(255,87,34,.15)', border: '1px solid rgba(255,87,34,.35)', fontSize: '15px' }}>{glyph}</span>
        <span style={{ fontWeight: 700, fontSize: '14px', fontFamily: "'Space Grotesk'", color: '#F5F3F1' }}>{label}</span>
      </div>
    </div>
  )
}

function Ecosystem() {
  return (
    <div className="tm-eco" style={{ position: 'relative', height: '480px' }}>
      <svg width="100%" height="100%" viewBox="0 0 460 480" fill="none" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <g stroke="#FF5722" strokeWidth="1.5" strokeDasharray="5 7" style={{ animation: 'tmDash 4s linear infinite' }}>
          <line x1="230" y1="240" x2="92" y2="92" />
          <line x1="230" y1="240" x2="372" y2="118" />
          <line x1="230" y1="240" x2="392" y2="320" />
          <line x1="230" y1="240" x2="120" y2="388" />
          <line x1="230" y1="240" x2="62" y2="250" />
        </g>
      </svg>

      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '128px', height: '128px', borderRadius: '50%', display: 'grid', placeItems: 'center', textAlign: 'center', background: 'radial-gradient(circle at 35% 30%,#FF7A52,#FF5722)', boxShadow: '0 0 0 8px rgba(255,87,34,.12), 0 0 60px rgba(255,87,34,.55)' }}>
        <div style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: '15px', color: '#fff', lineHeight: 1.1 }}>Topper<br />Mantra</div>
      </div>

      <div style={{ position: 'absolute', left: '50%', top: '50%', width: '200px', height: '200px', transform: 'translate(-50%,-50%)', borderRadius: '50%', border: '1px dashed rgba(255,87,34,.3)', animation: 'tmSpin 36s linear infinite' }} />

      {ECOSYSTEM.map((n) => <EcoNode key={n.label} {...n} />)}
    </div>
  )
}

export default function Hero() {
  return (
    <header id="home" className="tm-hero tm-section" style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '152px 44px 70px', display: 'grid', gap: '48px', alignItems: 'center' }}>
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', padding: '7px 14px 7px 9px', borderRadius: '100px', background: 'rgba(255,87,34,.1)', border: '1px solid rgba(255,87,34,.28)', fontSize: '13px', fontWeight: 600, color: '#FFB59B', marginBottom: '26px' }}>
          <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#FF5722', boxShadow: '0 0 10px #FF5722' }} />
          Built for Tier 2 &amp; Tier 3 students across India
        </div>

        <h1 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 'clamp(38px,5.1vw,68px)', lineHeight: 1.02, letterSpacing: '-.03em', margin: '0 0 22px', textWrap: 'balance' }}>
          Where ambitious students become{' '}
          <span style={{ background: 'linear-gradient(120deg,#FF5722,#FE6D4D 60%,#FFB59B)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>builders, innovators</span>{' '}
          &amp; future leaders
        </h1>

        <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#A79F99', maxWidth: '540px', margin: '0 0 34px' }}>
          Join India's fastest-growing student ecosystem — gain mentorship, build real projects, win hackathons, network with leaders, and unlock opportunities that used to be out of reach.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '40px' }}>
          <CtaButton href="#join">Join the Community →</CtaButton>
          <GhostButton href="#hackathons">Explore Opportunities</GhostButton>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{ display: 'flex' }}>
            <span style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'repeating-linear-gradient(45deg,#2A211C,#2A211C 5px,#241C18 5px,#241C18 10px)', border: '2px solid #100D0C' }} />
            <span style={{ width: '38px', height: '38px', borderRadius: '50%', marginLeft: '-12px', background: 'repeating-linear-gradient(45deg,#3A2A22,#3A2A22 5px,#2E211B 5px,#2E211B 10px)', border: '2px solid #100D0C' }} />
            <span style={{ width: '38px', height: '38px', borderRadius: '50%', marginLeft: '-12px', background: 'repeating-linear-gradient(45deg,#4A2E20,#4A2E20 5px,#3A241A 5px,#3A241A 10px)', border: '2px solid #100D0C' }} />
            <span style={{ width: '38px', height: '38px', borderRadius: '50%', marginLeft: '-12px', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg,#FF5722,#FE6D4D)', border: '2px solid #100D0C', fontSize: '12px', fontWeight: 700, color: '#fff' }}>5k+</span>
          </div>
          <span style={{ fontSize: '14px', color: '#8C857F', lineHeight: 1.4 }}>Students already building<br />their future with us</span>
        </div>
      </div>

      <Ecosystem />
    </header>
  )
}
