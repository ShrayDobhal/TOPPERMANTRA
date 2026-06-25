import { useState } from 'react'
import { useScrolled } from './primitives.jsx'

const LINKS = [
  { href: '#why', label: 'Why us' },
  { href: '#journey', label: 'Journey' },
  { href: '#mentors', label: 'Mentors' },
  { href: '#community', label: 'Community' },
  { href: '#hackathons', label: 'Hackathons' },
]

function Logo() {
  return (
    <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '11px', textDecoration: 'none', color: 'inherit' }}>
      <span style={{ display: 'grid', placeItems: 'center', width: '34px', height: '34px', borderRadius: '10px', background: 'linear-gradient(135deg,#FF5722,#FE6D4D)', fontFamily: "'Space Grotesk'", fontWeight: 700, fontSize: '18px', color: '#fff', boxShadow: '0 6px 18px rgba(255,87,34,.45)' }}>T</span>
      <span style={{ fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: '18px', letterSpacing: '-.02em' }}>Topper Mantra</span>
    </a>
  )
}

export default function Nav() {
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav
        className="tm-nav"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 90,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: scrolled ? '13px 44px' : '20px 44px',
          background: scrolled ? 'rgba(16,13,12,.78)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,.08)' : 'transparent'}`,
          transition: 'padding .35s ease, background .35s ease, border-color .35s ease, backdrop-filter .35s ease',
        }}
      >
        <Logo />

        <div className="tm-desk-menu" style={{ display: 'flex', alignItems: 'center', gap: '34px' }}>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onMouseOver={(e) => (e.currentTarget.style.color = '#F5F3F1')}
              onMouseOut={(e) => (e.currentTarget.style.color = '#C9C2BC')}
              style={{ textDecoration: 'none', color: '#C9C2BC', fontSize: '14.5px', fontWeight: 500, transition: 'color .2s' }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a
            href="#join"
            className="tm-desk-menu"
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.3)' }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.14)' }}
            style={{ textDecoration: 'none', color: '#F5F3F1', fontSize: '14.5px', fontWeight: 600, padding: '10px 18px', borderRadius: '11px', border: '1px solid rgba(255,255,255,.14)', transition: 'background .2s, border-color .2s' }}
          >
            Sign in
          </a>
          <a
            href="#join"
            onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'none')}
            style={{ textDecoration: 'none', color: '#fff', fontSize: '14.5px', fontWeight: 700, padding: '11px 20px', borderRadius: '11px', background: 'linear-gradient(135deg,#FF5722,#FE6D4D)', boxShadow: '0 8px 22px rgba(255,87,34,.4)', transition: 'transform .2s, box-shadow .2s' }}
          >
            Join Community
          </a>
          <button
            className="tm-burger"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{ background: 'none', border: '1px solid rgba(255,255,255,.14)', borderRadius: '10px', width: '42px', height: '42px', color: '#fff', cursor: 'pointer', fontSize: '18px', placeItems: 'center' }}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {open && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 89, display: 'flex', flexDirection: 'column', gap: '6px', padding: '88px 24px 24px', background: 'rgba(16,13,12,.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ textDecoration: 'none', color: '#E7E1DC', fontSize: '18px', fontWeight: 600, padding: '13px 8px', borderRadius: '10px' }}>
              {l.label}
            </a>
          ))}
          <a href="#join" onClick={() => setOpen(false)} style={{ marginTop: '8px', textAlign: 'center', textDecoration: 'none', color: '#fff', fontSize: '17px', fontWeight: 700, padding: '14px', borderRadius: '12px', background: 'linear-gradient(135deg,#FF5722,#FE6D4D)' }}>
            Join Community
          </a>
        </div>
      )}
    </>
  )
}
