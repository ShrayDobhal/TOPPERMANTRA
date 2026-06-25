import { Reveal, CtaButton } from './primitives.jsx'

export default function JoinCTA() {
  return (
    <section id="join" className="tm-section" style={{ position: 'relative', zIndex: 1, maxWidth: '1180px', margin: '0 auto', padding: '30px 44px 90px' }}>
      <Reveal style={{ position: 'relative', overflow: 'hidden', textAlign: 'center', borderRadius: '30px', padding: '72px 44px', background: 'linear-gradient(135deg,#FF5722,#FE6D4D)', boxShadow: '0 30px 80px rgba(255,87,34,.35)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 100% at 50% 0%,rgba(255,255,255,.22),transparent)' }} />
        <div style={{ position: 'relative' }}>
          <h2 style={{ fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: 'clamp(30px,4.4vw,56px)', lineHeight: 1.04, letterSpacing: '-.03em', color: '#fff', margin: '0 0 16px', textWrap: 'balance' }}>
            Finally — the community<br />you've been looking for.
          </h2>
          <p style={{ color: 'rgba(255,255,255,.9)', fontSize: '18px', maxWidth: '520px', margin: '0 auto 32px', lineHeight: 1.5 }}>
            It's free to join. Bring your ambition, we'll bring the ecosystem.
          </p>
          <CtaButton href="#home" light style={{ fontSize: '17px', padding: '16px 36px', borderRadius: '14px' }}>Join Topper Mantra →</CtaButton>
        </div>
      </Reveal>
    </section>
  )
}
