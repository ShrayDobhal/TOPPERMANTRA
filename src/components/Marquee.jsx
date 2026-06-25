import { MARQUEE } from '../data.js'

export default function Marquee() {
  // Duplicated once so the -50% keyframe loops seamlessly.
  const sequence = [...MARQUEE, ...MARQUEE]
  return (
    <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,.06)', borderBottom: '1px solid rgba(255,255,255,.06)', padding: '20px 0', overflow: 'hidden', marginTop: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: 'max-content', gap: '64px', animation: 'tmMarquee 28s linear infinite', color: '#5E5853', fontFamily: "'Space Grotesk'", fontWeight: 600, fontSize: '17px', whiteSpace: 'nowrap' }}>
        {sequence.map((word, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
            <span>{word}</span>
            <span aria-hidden>•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
