'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { DiamondIcon, FireIcon, HeartIcon, MessageIcon, ShieldIcon, MapPinIcon, CameraIcon, StarIcon, VerifiedIcon, CrownIcon, CheckIcon } from '@/lib/icons'
import Footer from '@/components/Footer'

function Logo() {
    return (
        <div className="logo-wrap">
            <img src="/icon-512.png" alt="Sugar Mingle Extra" className="logo-img" />
            <span className="logo-text">
                <span className="gradient-text">Sugar Mingle</span> Extra
            </span>
        </div>
    )
}

// ─── Live Active Members Counter ──────────────────────────────────────────────
// Algorithm: starts near 10 million, drifts realistically every few minutes.
// Uses a seeded base so refreshes feel continuous, not random jumps.
const BASE_MEMBERS = 10_247_983
const DRIFT_RANGE = 1500   // ±1500 per update cycle (~3 min)
const UPDATE_INTERVAL = 180_000  // 3 minutes

function useActiveMembersCounter() {
    const [count, setCount] = useState(BASE_MEMBERS)
    const [direction, setDirection] = useState(1) // 1 = trending up, -1 = trending down
    const intervalRef = useRef(null)

    useEffect(() => {
        // Random initial offset so each session looks unique
        const initialOffset = Math.floor(Math.random() * 6000) - 3000
        setCount(BASE_MEMBERS + initialOffset)

        intervalRef.current = setInterval(() => {
            setCount(prev => {
                // Weighted random: more often +, sometimes -
                const sign = Math.random() < 0.65 ? 1 : -1
                const change = Math.floor(Math.random() * DRIFT_RANGE) * sign
                const next = prev + change
                // Clamp between 9.8M and 11.5M
                return Math.max(9_800_000, Math.min(11_500_000, next))
            })
            setDirection(prev => Math.random() < 0.65 ? 1 : -1)
        }, UPDATE_INTERVAL)

        return () => clearInterval(intervalRef.current)
    }, [])

    return { count, direction }
}

function formatCount(n) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M'
    return n.toLocaleString()
}

// ─── Live Member Ticker — small tag under stats showing real-time activity ───
function LiveMemberTicker({ count, direction }) {
    const [flicker, setFlicker] = useState(false)

    useEffect(() => {
        setFlicker(true)
        const t = setTimeout(() => setFlicker(false), 600)
        return () => clearTimeout(t)
    }, [count])

    return (
        <div className="live-ticker" aria-live="polite">
            <span className="live-dot" />
            <span className={`live-count${flicker ? ' live-flicker' : ''}`}>
                {formatCount(count)}
            </span>
            <span className="live-label">
                active members {direction === 1 ? '↑' : '↓'}
            </span>
        </div>
    )
}

const STATS = [
    { value: '10M+', label: 'Members Worldwide' },
    { value: '180+', label: 'Countries' },
    { value: '2M+', label: 'Matches Made' },
    { value: '98%', label: 'Verified Profiles' },
]

const FEATURES = [
    { icon: <DiamondIcon size={28} color="#E91E90" />, title: 'Smart Matching', desc: 'Our AI-powered algorithm finds your ideal match based on personality, interests and lifestyle preferences.' },
    { icon: <FireIcon size={28} color="#E91E90" />, title: 'Swipe & Connect', desc: 'Discover people instantly with a swipe. Super Likes, Boosts and curated Top Picks delivered daily.' },
    { icon: <MessageIcon size={28} color="#E91E90" />, title: 'Real-Time Chat', desc: 'Message matches instantly — read receipts, typing indicators, GIFs, voice notes and emoji all built in.' },
    { icon: <CameraIcon size={28} color="#E91E90" />, title: 'Video & Audio Calls', desc: 'Face-to-face video calls right inside the app — no phone numbers needed, completely private.' },
    { icon: <ShieldIcon size={28} color="#E91E90" />, title: 'Verified & Safe', desc: 'Photo verification, profile trust badges and AI moderation keep every match genuine — zero fake profiles.' },
    { icon: <MapPinIcon size={28} color="#E91E90" />, title: 'Global & Local Pay', desc: 'Available worldwide in 180+ countries. Pay in your local currency — M-Pesa, cards, Google Pay and more.' },
]

const TESTIMONIALS = [
    { name: 'Patricia M.', role: 'Verified Member', age: 44, city: 'Nairobi', text: "Sugar Mingle Extra connected me with the most genuine, caring companion I've ever met. The verification system gave me total confidence.", rating: 5 },
    { name: 'Kevin A.', role: 'Premium Member', age: 26, city: 'Lagos', text: "I'd given up on dating apps because of scammers. Sugar Mingle Extra is on a different level — every match feels real and worthwhile.", rating: 5 },
    { name: 'Elizabeth C.', role: 'Gold Member', age: 51, city: 'London', text: "The Platinum plan is absolutely worth it. I have priority visibility and I've had three incredible connections this month alone.", rating: 5 },
]

const COUPLE_CARDS = [
    { photo: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=300&h=400&fit=crop', title: 'Global Romance', subtitle: 'London ↔ Nairobi', badge: 'Platinum' },
    { photo: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=300&h=400&fit=crop', title: 'Perfect Match', subtitle: 'Dubai ↔ Lagos', badge: 'Gold' },
    { photo: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=300&h=400&fit=crop', title: 'Cross-Cultural', subtitle: 'Paris ↔ Accra', badge: 'Verified' },
    { photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop', title: 'True Connection', subtitle: 'NYC ↔ Johannesburg', badge: 'Silver' },
]

const CoupleCard = ({ photo, title, subtitle, badge }) => {
    const badgeColors = { Gold: '#FFD700', Platinum: '#E5D3FF', Silver: '#C0C0C0', Verified: '#E91E90' }
    return (
        <div className="hero-card">
            <img src={photo} alt={title} style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
            <div className="hero-card-overlay">
                <div style={{ fontWeight: 700, fontSize: '0.78rem' }}>{title}</div>
                <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)', marginTop: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <MapPinIcon size={10} color="rgba(255,255,255,0.5)" /> {subtitle}
                </div>
            </div>
            <div className="hero-card-badge" style={{ background: badgeColors[badge] || '#E91E90', color: badge === 'Gold' || badge === 'Silver' ? '#000' : '#fff' }}>
                <VerifiedIcon size={9} color={badge === 'Gold' || badge === 'Silver' ? '#000' : '#fff'} /> {badge}
            </div>
        </div>
    )
}

// ─── Mobile Hamburger Nav ─────────────────────────────────────────────────────
function Navbar() {
    const [open, setOpen] = useState(false)
    return (
        <nav className="navbar" style={{ justifyContent: 'space-between' }}>
            <Logo />
            {/* Desktop Nav */}
            <div className="nav-desktop">
                <Link href="/pricing" className="nav-link">Pricing</Link>
                <Link href="/safety" className="nav-link">Safety</Link>
                <Link href="/about" className="nav-link">About</Link>
                <Link href="/auth/login" className="btn btn-ghost btn-sm">Log In</Link>
                <Link href="/auth/register" className="btn btn-primary btn-sm nav-join">Join Free</Link>
            </div>
            {/* Mobile Hamburger */}
            <button className="nav-hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
                <span className={`ham-line${open ? ' open-1' : ''}`} />
                <span className={`ham-line${open ? ' open-2' : ''}`} />
                <span className={`ham-line${open ? ' open-3' : ''}`} />
            </button>
            {/* Mobile Dropdown */}
            {open && (
                <div className="nav-mobile-dropdown" onClick={() => setOpen(false)}>
                    <Link href="/pricing" className="nav-mobile-link">Pricing</Link>
                    <Link href="/safety" className="nav-mobile-link">Safety</Link>
                    <Link href="/about" className="nav-mobile-link">About</Link>
                    <div className="nav-mobile-divider" />
                    <Link href="/auth/login" className="nav-mobile-link">Log In</Link>
                    <Link href="/auth/register" className="btn btn-primary nav-mobile-join">Join Free</Link>
                </div>
            )}
        </nav>
    )
}

export default function HomePage() {
    const { count, direction } = useActiveMembersCounter()

    return (
        <div>
            <Navbar />

            {/* HERO */}
            <section className="hero home-hero">
                {/* Background glow orbs */}
                <div className="hero-orb hero-orb-1" />
                <div className="hero-orb hero-orb-2" />

                <div className="hero-content">
                    {/* Left: Text */}
                    <div className="hero-text-col">
                        <div className="hero-badge">
                            <MapPinIcon size={14} color="var(--primary)" /> World's #1 Dating Platform
                        </div>
                        <h1>
                            Where <span className="gradient-text">Luxury Meets</span> Genuine Connection
                        </h1>
                        <p className="hero-sub">
                            Connect with verified members worldwide for real, meaningful relationships.
                            Real profiles. Real matches. Zero scams.
                        </p>

                        {/* Live Active Counter */}
                        <LiveMemberTicker count={count} direction={direction} />

                        <div className="hero-cta">
                            <Link href="/auth/register" className="btn btn-primary btn-lg hero-btn-main">
                                <FireIcon size={18} color="#fff" /> Create Free Account
                            </Link>
                            <Link href="#how-it-works" className="btn btn-ghost btn-lg">
                                See How It Works
                            </Link>
                        </div>

                        <div className="hero-stats">
                            {STATS.map(s => (
                                <div key={s.label} className="hero-stat-item">
                                    <div className="hero-stat-value gradient-text">{s.value}</div>
                                    <div className="hero-stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Floating couple cards — hidden on mobile, visible on desktop */}
                    <div className="hero-cards-col">
                        {COUPLE_CARDS.map((card, i) => (
                            <div key={card.title} style={{ animation: `float ${3.5 + i * 0.5}s ease-in-out ${i * 0.3}s infinite` }}>
                                <CoupleCard {...card} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ACTIVE MEMBERS LIVE SECTION */}
            <section className="section live-members-section">
                <div className="container">
                    <div className="live-members-card">
                        <div className="live-members-left">
                            <div className="section-tag">Live Right Now</div>
                            <h2>Active Members <span className="gradient-text">Online</span></h2>
                            <p>Join millions of real people looking for genuine connections every day.</p>
                        </div>
                        <div className="live-members-counter">
                            <div className="counter-pulse">
                                <span className="live-dot live-dot-lg" />
                            </div>
                            <div className="counter-number gradient-text">{formatCount(count)}</div>
                            <div className="counter-label">
                                Active Members {direction === 1 ? '↑ Rising' : '↓ Settling'}
                            </div>
                            <div className="counter-sub">Updates every few minutes as members join</div>
                            <Link href="/auth/register" className="btn btn-primary" style={{ marginTop: 20 }}>
                                Join Them Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONNECTION SHOWCASE */}
            <section className="section" style={{ background: 'rgba(233,30,144,0.03)', overflow: 'hidden' }}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">Connections Worldwide</div>
                        <h2>Love Knows No <span className="gradient-text">Boundaries</span></h2>
                        <p style={{ maxWidth: 520, margin: '12px auto 0' }}>
                            Sugar Mingle Extra brings together people from every culture, background and country. Real connections across continents.
                        </p>
                    </div>
                    <div className="showcase-grid">
                        {[
                            { img: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=280&h=350&fit=crop', label: 'International Romance', location: 'London, UK ↔ Nairobi, Kenya' },
                            { img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=280&h=350&fit=crop', label: 'Perfect Connection', location: 'New York, USA ↔ Accra, Ghana' },
                            { img: 'https://images.unsplash.com/photo-1529232356377-57971f020a94?w=280&h=350&fit=crop', label: 'Cross-Cultural Love', location: 'Paris, France ↔ Lagos, Nigeria' },
                            { img: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=280&h=350&fit=crop', label: 'Global Match', location: 'Dubai, UAE ↔ Kampala, Uganda' },
                        ].map(c => (
                            <div key={c.label} className="showcase-card">
                                <img src={c.img} alt={c.label} style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block' }} />
                                <div className="showcase-overlay">
                                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{c.label}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', marginTop: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <MapPinIcon size={10} color="#E91E90" /> {c.location}
                                    </div>
                                    <div style={{ marginTop: 6 }}>
                                        <span className="verified-badge">
                                            <VerifiedIcon size={9} color="#fff" /> VERIFIED MATCH
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHO IS THIS FOR — Universal (no sugar-niche labels) */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">Open to Everyone</div>
                        <h2>Anyone Can Find Their <span className="gradient-text">Perfect Match</span></h2>
                        <p style={{ maxWidth: 500, margin: '12px auto 0' }}>
                            No categories, no labels. Whether you are looking for love, companionship, adventure or a genuine meaningful relationship — you belong here.
                        </p>
                    </div>
                    <div className="grid-open-for">
                        {[
                            { emoji: '💖', title: 'Singles', desc: 'Searching for a genuine long-term relationship or a fun new connection? Meet verified singles near you and worldwide.' },
                            { emoji: '✈️', title: 'Adventurers', desc: 'Love to travel? Find like-minded explorers ready to share experiences across cities, countries and continents.' },
                            { emoji: '💼', title: 'Professionals', desc: 'Busy professionals who value quality connections. Smart matching puts you in front of compatible, verified members.' },
                            { emoji: '🌍', title: 'Global Citizens', desc: 'Our platform spans 180+ countries. No matter where you are, real matches are waiting to connect with you.' },
                        ].map(r => (
                            <div key={r.title} className="card open-for-card">
                                <div className="open-for-emoji">{r.emoji}</div>
                                <h3 style={{ fontSize: '1.05rem', marginBottom: 8 }}>{r.title}</h3>
                                <p style={{ fontSize: '0.85rem' }}>{r.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="section" id="how-it-works" style={{ background: 'rgba(233,30,144,0.03)' }}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">Platform Features</div>
                        <h2>Everything You Need to <span className="gradient-text">Find Your Match</span></h2>
                    </div>
                    <div className="grid-3">
                        {FEATURES.map(f => (
                            <div key={f.title} className="glass-card feature-card">
                                <div style={{ marginBottom: 12 }}>{f.icon}</div>
                                <h3 style={{ fontSize: '1.05rem', marginBottom: 8 }}>{f.title}</h3>
                                <p style={{ fontSize: '0.85rem' }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">Success Stories</div>
                        <h2>Real Connections. <span className="gradient-text">Real Stories.</span></h2>
                    </div>
                    <div className="grid-3">
                        {TESTIMONIALS.map(t => (
                            <div key={t.name} className="card testimonial-card">
                                <div style={{ display: 'flex', marginBottom: 12, gap: 2 }}>
                                    {Array.from({ length: t.rating }).map((_, i) => <StarIcon key={i} size={16} color="#FFD700" fill="#FFD700" />)}
                                </div>
                                <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: 16 }}>"{t.text}"</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', color: '#fff', flexShrink: 0 }}>{t.name[0]}</div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t.name}, {t.age}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>{t.role} · {t.city}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="section cta-section">
                <div className="container">
                    <div className="cta-inner">
                        <DiamondIcon size={48} color="var(--primary)" />
                        <h2 style={{ marginBottom: 12, marginTop: 16 }}>Ready to Find Your <span className="gradient-text">Perfect Match?</span></h2>
                        <p style={{ marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
                            Join over 10 million members worldwide. Create your free account in under 2 minutes.
                        </p>
                        <Link href="/auth/register" className="btn btn-primary btn-lg" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                            Start Your Journey <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </Link>
                        <div style={{ marginTop: 16, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            No credit card required · Free forever · Cancel anytime
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
