import { useEffect, useMemo, useRef, useState } from 'react'

/* ============================================================
   Reveal — fades + lifts children in when scrolled into view
   ============================================================ */
export function Reveal({ children, delay = 0, style, className, as: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.unobserve(el)
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(26px)',
        transition: `opacity .7s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ============================================================
   CountUp — animates 0 → `to` once it enters the viewport
   ============================================================ */
export function CountUp({ to, suffix = '+', duration = 1500 }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.unobserve(el)
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setN(Math.round(to * eased))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  return (
    <span ref={ref}>
      {n.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

/* ============================================================
   useScrolled — true once the page is scrolled past `threshold`
   ============================================================ */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

/* ============================================================
   useCountdown — live { d, h, m, s } until `daysAhead` from now
   ============================================================ */
export function useCountdown(daysAhead = 14) {
  const target = useMemo(() => {
    const t = new Date()
    t.setDate(t.getDate() + daysAhead)
    t.setHours(9, 0, 0, 0)
    return t
  }, [daysAhead])

  const calc = () => {
    let diff = Math.max(0, target - new Date())
    const d = Math.floor(diff / 86400000); diff -= d * 86400000
    const h = Math.floor(diff / 3600000);  diff -= h * 3600000
    const m = Math.floor(diff / 60000);    diff -= m * 60000
    const s = Math.floor(diff / 1000)
    return { d, h, m, s }
  }

  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  return time
}

export const pad = (n) => String(n).padStart(2, '0')

/* ============================================================
   useTilt — pointer-driven 3D tilt handlers for a card
   ============================================================ */
export function useTilt() {
  const onMouseMove = (e) => {
    const c = e.currentTarget
    const r = c.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    c.style.transform = `perspective(700px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateY(-4px)`
    c.style.borderColor = 'rgba(255,87,34,.35)'
  }
  const onMouseLeave = (e) => {
    e.currentTarget.style.transform = 'none'
    e.currentTarget.style.borderColor = 'rgba(255,255,255,.09)'
  }
  return { onMouseMove, onMouseLeave }
}

/* ============================================================
   Buttons — primary (gradient) & ghost (outline), with hover
   ============================================================ */
export function CtaButton({ children, href = '#join', light = false, style, ...rest }) {
  const skin = light
    ? { background: '#fff', color: '#FF5722', boxShadow: '0 14px 30px rgba(0,0,0,.18)' }
    : { background: 'linear-gradient(135deg,#FF5722,#FE6D4D)', color: '#fff', boxShadow: '0 12px 30px rgba(255,87,34,.42)' }
  return (
    <a
      href={href}
      onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)' }}
      onMouseOut={(e) => { e.currentTarget.style.transform = 'none' }}
      style={{
        textDecoration: 'none', fontWeight: 700, fontSize: '16px', padding: '15px 28px',
        borderRadius: '13px', display: 'inline-block', transition: 'transform .2s, box-shadow .2s',
        ...skin, ...style,
      }}
      {...rest}
    >
      {children}
    </a>
  )
}

export function GhostButton({ children, href = '#join', style, ...rest }) {
  return (
    <a
      href={href}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,.08)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,.3)'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,.02)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,.16)'
      }}
      style={{
        textDecoration: 'none', color: '#F5F3F1', fontWeight: 600, fontSize: '16px',
        padding: '15px 28px', borderRadius: '13px', display: 'inline-block',
        border: '1px solid rgba(255,255,255,.16)', background: 'rgba(255,255,255,.02)',
        transition: 'background .2s, border-color .2s', ...style,
      }}
      {...rest}
    >
      {children}
    </a>
  )
}

/* Eyebrow label used above section headings */
export function Eyebrow({ children }) {
  return (
    <div style={{ color: '#FF5722', fontWeight: 700, fontSize: '14px', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: '14px' }}>
      {children}
    </div>
  )
}
