import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export default function GuitarHero() {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    el.style.setProperty('--rx', `${dy * -6}deg`);
    el.style.setProperty('--ry', `${dx * 10}deg`);
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', `0deg`);
    el.style.setProperty('--ry', `0deg`);
  };

  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-royal-radial px-4 py-16 pt-24">
      {/* Ambient light beams */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[60%] w-[40%] -translate-x-1/2 rounded-full bg-royal-gold/10 blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] h-[40%] w-[30%] rounded-full bg-royal-burgundy/30 blur-[100px]" />
        <div className="absolute left-[5%] top-[30%] h-[35%] w-[25%] rounded-full bg-royal-burgundy/20 blur-[90px]" />
      </div>

      {/* Floating music notes */}
      <FloatingNotes />

      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 w-full max-w-5xl"
        style={{ perspective: '1200px' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="guitar-glow relative mx-auto"
          style={{
            transformStyle: 'preserve-3d',
            transform:
              'rotateX(var(--rx,0)) rotateY(var(--ry,0))',
            transition: 'transform 0.2s ease-out',
          }}
        >
          <GuitarSVG />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1 text-royal-gold/60"
          >
            <span className="font-serif text-xs italic tracking-wide">Discover the realm</span>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingNotes() {
  const notes = ['♪', '♫', '♩', '♬', '♭', '♮'];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {notes.map((n, i) => (
        <motion.span
          key={i}
          className="absolute font-serif text-2xl text-royal-gold/20"
          style={{
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 3) * 25}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        >
          {n}
        </motion.span>
      ))}
    </div>
  );
}

function GuitarSVG() {
  return (
    <svg
      viewBox="0 0 600 760"
      className="mx-auto h-auto w-full max-w-[680px]"
      role="img"
      aria-label="Royal electric guitar with the headline Music That Touches The Heart"
    >
      <defs>
        {/* Body metallic gold gradient */}
        <radialGradient id="bodyGold" cx="35%" cy="30%" r="85%">
          <stop offset="0%" stopColor="#8a6a24" />
          <stop offset="30%" stopColor="#3a2a12" />
          <stop offset="60%" stopColor="#1c1410" />
          <stop offset="100%" stopColor="#0c0908" />
        </radialGradient>

        {/* Burgundy burst */}
        <radialGradient id="bodyBurst" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#551B2B" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#2a0d16" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0c0908" stopOpacity="0" />
        </radialGradient>

        {/* Neck wood gradient */}
        <linearGradient id="neckGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2a1d10" />
          <stop offset="50%" stopColor="#4a3318" />
          <stop offset="100%" stopColor="#2a1d10" />
        </linearGradient>

        {/* Headstock gradient */}
        <linearGradient id="headGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1c1410" />
          <stop offset="100%" stopColor="#0c0908" />
        </linearGradient>

        {/* Gold metallic for hardware */}
        <linearGradient id="goldMetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9a7b2e" />
          <stop offset="40%" stopColor="#E6C878" />
          <stop offset="55%" stopColor="#F5E6B0" />
          <stop offset="70%" stopColor="#C9A44C" />
          <stop offset="100%" stopColor="#9a7b2e" />
        </linearGradient>

        {/* Pickguard gradient */}
        <linearGradient id="pickguard" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a121d" />
          <stop offset="100%" stopColor="#1a080d" />
        </linearGradient>

        {/* Highlight sheen */}
        <linearGradient id="sheen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="50%" stopColor="#E6C878" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        {/* Fret inlay */}
        <radialGradient id="inlay" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F5E6B0" />
          <stop offset="100%" stopColor="#9a7b2e" />
        </radialGradient>

        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="dropSh" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* ===== Shadow under guitar ===== */}
      <ellipse cx="300" cy="730" rx="180" ry="14" fill="#000" opacity="0.4" />

      {/* ===== Headstock (top) ===== */}
      <g filter="url(#dropSh)">
        <path
          d="M250 30 Q255 18 270 16 L330 16 Q345 18 350 30 L352 78 L248 78 Z"
          fill="url(#headGrad)"
          stroke="url(#goldMetal)"
          strokeWidth="2"
        />
        {/* Headstock crown ornament */}
        <g stroke="url(#goldMetal)" strokeWidth="1.4" fill="none" opacity="0.9">
          <path d="M268 34 L268 46 M268 34 L263 40 L268 40 M278 32 L278 48 M278 32 L273 38 L278 38 M278 32 L283 38 L278 38" />
          <circle cx="300" cy="42" r="6" />
          <path d="M300 32 L300 52 M294 38 L306 38" />
          <path d="M322 34 L322 46 M322 34 L317 40 L322 40 M332 32 L332 48 M332 32 L327 38 L332 38 M332 32 L337 38 L332 38" />
        </g>

        {/* Tuning pegs */}
        {[28, 40, 52, 64].map((y, i) => (
          <g key={i}>
            <circle cx="258" cy={y} r="4.5" fill="url(#goldMetal)" stroke="#9a7b2e" strokeWidth="0.5" />
            <circle cx="342" cy={y} r="4.5" fill="url(#goldMetal)" stroke="#9a7b2e" strokeWidth="0.5" />
          </g>
        ))}

        {/* Nut */}
        <rect x="248" y="76" width="104" height="5" fill="url(#goldMetal)" />
      </g>

      {/* ===== Neck ===== */}
      <g filter="url(#dropSh)">
        <rect x="282" y="80" width="36" height="250" fill="url(#neckGrad)" stroke="#1a0f08" strokeWidth="1" />
        {/* Frets */}
        {[110, 135, 160, 185, 210, 235, 260, 285, 310, 325].map((y, i) => (
          <line
            key={i}
            x1="284"
            y1={y}
            x2="316"
            y2={y}
            stroke="url(#goldMetal)"
            strokeWidth="1.6"
          />
        ))}
        {/* Fret inlays (royal diamonds) */}
        {[122, 172, 222, 272].map((y, i) => (
          <g key={i}>
            <rect
              x="297"
              y={y - 2}
              width="6"
              height="6"
              fill="url(#inlay)"
              transform={`rotate(45 300 ${y})`}
              opacity="0.9"
            />
          </g>
        ))}

        {/* Fretboard join to body */}
        <rect x="278" y="328" width="44" height="6" fill="url(#goldMetal)" />
      </g>

      {/* ===== Body (Les-Paul-ish silhouette) ===== */}
      <g filter="url(#dropSh)">
        {/* Main body shape */}
        <path
          d="M300 330
             C 220 332, 160 370, 140 440
             C 120 510, 150 600, 220 660
             C 270 700, 330 700, 380 660
             C 450 600, 480 510, 460 440
             C 440 370, 380 332, 300 330
             Z"
          fill="url(#bodyGold)"
          stroke="url(#goldMetal)"
          strokeWidth="2.5"
        />
        {/* Burgundy burst overlay */}
        <path
          d="M300 330
             C 220 332, 160 370, 140 440
             C 120 510, 150 600, 220 660
             C 270 700, 330 700, 380 660
             C 450 600, 480 510, 460 440
             C 440 370, 380 332, 300 330
             Z"
          fill="url(#bodyBurst)"
        />

        {/* Ornamental gold rim ring */}
        <path
          d="M300 348
             C 228 350, 178 386, 160 448
             C 144 510, 170 590, 232 644
             C 276 678, 324 678, 368 644
             C 430 590, 456 510, 440 448
             C 422 386, 372 350, 300 348
             Z"
          fill="none"
          stroke="url(#goldMetal)"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Pickguard */}
        <path
          d="M250 380
             C 230 390, 220 420, 225 470
             C 230 520, 250 580, 290 610
             C 320 628, 345 620, 360 600
             C 345 570, 330 520, 330 470
             C 330 430, 320 390, 300 378
             C 280 372, 262 374, 250 380 Z"
          fill="url(#pickguard)"
          stroke="url(#goldMetal)"
          strokeWidth="1.4"
          opacity="0.9"
        />

        {/* Engraving flourish on pickguard */}
        <g stroke="url(#goldMetal)" strokeWidth="0.8" fill="none" opacity="0.55">
          <path d="M268 400 Q285 408 302 400 M260 420 Q285 432 310 420 M256 442 Q285 456 314 442" />
          <circle cx="285" cy="560" r="14" />
          <path d="M285 548 L285 572 M273 560 L297 560" />
        </g>

        {/* Pickups (humbuckers) */}
        <g>
          {[
            { y: 410, w: 56 },
            { y: 470, w: 56 },
          ].map((p, i) => (
            <g key={i}>
              <rect
                x={300 - p.w / 2}
                y={p.y - 7}
                width={p.w}
                height="14"
                rx="3"
                fill="#0c0908"
                stroke="url(#goldMetal)"
                strokeWidth="1.2"
              />
              {/* Pole pieces */}
              {[0, 1, 2, 3, 4, 5].map((j) => (
                <circle
                  key={j}
                  cx={300 - p.w / 2 + 6 + j * (p.w - 12) / 5}
                  cy={p.y}
                  r="1.6"
                  fill="url(#goldMetal)"
                />
              ))}
            </g>
          ))}
        </g>

        {/* Bridge */}
        <rect x="268" y="520" width="64" height="6" rx="2" fill="url(#goldMetal)" />
        {/* Bridge tailpiece */}
        <rect x="272" y="540" width="56" height="10" rx="2" fill="#0c0908" stroke="url(#goldMetal)" strokeWidth="1" />
        {/* Strings from tailpiece to nut */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={i}
            x1={286 + i * 4}
            y1="544"
            x2={288 + i * 3}
            y2="80"
            stroke="#F5EBD5"
            strokeWidth={i === 0 ? 0.5 : 0.7}
            opacity="0.45"
          />
        ))}

        {/* Control knobs */}
        {[580, 600, 620, 640].map((y, i) => (
          <g key={i}>
            <circle cx="345" cy={y} r="7" fill="#0c0908" stroke="url(#goldMetal)" strokeWidth="1.2" />
            <circle cx="345" cy={y} r="2.5" fill="url(#goldMetal)" />
          </g>
        ))}

        {/* Toggle switch */}
        <rect x="210" y="540" width="14" height="22" rx="3" fill="#0c0908" stroke="url(#goldMetal)" strokeWidth="1" />
        <circle cx="217" cy="548" r="2.5" fill="url(#goldMetal)" />

        {/* Royal emblem / seal on lower body */}
        <g transform="translate(300 640)" opacity="0.85">
          <circle r="22" fill="none" stroke="url(#goldMetal)" strokeWidth="1.2" />
          <circle r="16" fill="none" stroke="url(#goldMetal)" strokeWidth="0.6" opacity="0.6" />
          {/* Crown */}
          <path
            d="M-10 -2 L-10 6 L10 6 L10 -2 L6 -8 L2 -2 L-2 -8 L-6 -2 L-10 -8 L-10 -2 Z"
            fill="url(#goldMetal)"
            stroke="#9a7b2e"
            strokeWidth="0.5"
          />
          <circle cx="-10" cy="-8" r="1.5" fill="url(#goldMetal)" />
          <circle cx="0" cy="-10" r="1.5" fill="url(#goldMetal)" />
          <circle cx="10" cy="-8" r="1.5" fill="url(#goldMetal)" />
          <text
            x="0"
            y="20"
            textAnchor="middle"
            fontFamily="Cinzel, serif"
            fontSize="6"
            fill="url(#goldMetal)"
            letterSpacing="1"
          >
            ROYAL
          </text>
        </g>

        {/* Body sheen highlight */}
        <path
          d="M300 330 C 220 332, 160 370, 140 440 C 120 510, 150 600, 220 660"
          fill="none"
          stroke="url(#sheen)"
          strokeWidth="14"
          opacity="0.7"
        />
      </g>

      {/* ===== Headline integrated over body ===== */}
      <g>
        {/* Decorative top flourish */}
        <g stroke="url(#goldMetal)" strokeWidth="1" fill="none" opacity="0.7">
          <path d="M150 372 Q220 360 300 362 Q380 360 450 372" />
          <path d="M170 376 Q240 366 300 368 Q360 366 430 376" opacity="0.5" />
        </g>

        <text
          x="300"
          y="425"
          textAnchor="middle"
          fontFamily="Cinzel, serif"
          fontSize="26"
          fontWeight="700"
          fill="url(#goldMetal)"
          letterSpacing="1"
          filter="url(#softGlow)"
        >
          Music That
        </text>
        <text
          x="300"
          y="458"
          textAnchor="middle"
          fontFamily="Cinzel, serif"
          fontSize="26"
          fontWeight="700"
          fill="url(#goldMetal)"
          letterSpacing="1"
          filter="url(#softGlow)"
        >
          Touches The Heart
        </text>

        {/* Decorative bottom flourish */}
        <g stroke="url(#goldMetal)" strokeWidth="1" fill="none" opacity="0.7">
          <path d="M160 482 Q230 490 300 484 Q370 490 440 482" />
          <path d="M180 486 Q240 496 300 490 Q360 496 420 486" opacity="0.5" />
        </g>
      </g>
    </svg>
  );
}
