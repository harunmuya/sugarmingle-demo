import Link from 'next/link'
import { DiamondIcon, FireIcon, HeartIcon, MessageIcon, ShieldIcon, MapPinIcon, CameraIcon, StarIcon, VerifiedIcon, CrownIcon, CheckIcon } from '@/lib/icons'
import Footer from '@/components/Footer'

function Logo() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/icon-512.png" alt="SugarMingle" style={{ width: 40, height: 40, borderRadius: 12, objectFit: 'contain', boxShadow: '0 4px 16px rgba(233,30,144,0.5)' }} />
            <span style={{ fontWeight: 800, fontSize: '1.3rem' }}>
                <span className="gradient-text">Sugar</span>Mingle
            </span>
        </div>
    )
}

const FEATURES = [
    { icon: <DiamondIcon size={28} color="#E91E90" />, title: 'Premium Sugar Matching', desc: 'Our algorithm connects verified sugar mummies, daddies and babies based on compatibility, proximity and lifestyle.' },
    { icon: <FireIcon size={28} color="#E91E90" />, title: 'Swipe & Match Instantly', desc: 'Tinder-style discovery with Super Likes, Boosts and curated Top Picks tailored to the sugar lifestyle.' },
    { icon: <MessageIcon size={28} color="#E91E90" />, title: 'Real-Time Messaging', desc: 'Chat with matches instantly. Read receipts, typing indicators, GIFs, emojis and voice notes built in.' },
    { icon: <CameraIcon size={28} color="#E91E90" />, title: 'Video & Audio Calls', desc: 'Face-to-face video calls completely inside SugarMingle — no phone numbers needed, fully private.' },
    { icon: <ShieldIcon size={28} color="#E91E90" />, title: 'Verified & Scam-Free', desc: 'Photo verification, profile badges and AI moderation ensure every match is genuine — zero fake profiles.' },
    { icon: <MapPinIcon size={28} color="#E91E90" />, title: 'Global & Local Pay', desc: 'Available worldwide. Payments in your local currency — M-Pesa, cards, Google Pay and more.' },
]

const STATS = [
    { value: '2M+', label: 'Active Members' },
    { value: '180+', label: 'Countries' },
    { value: '500K+', label: 'Matches Made' },
    { value: '98%', label: 'Verified Profiles' },
]

const TESTIMONIALS = [
    { name: 'Patricia M.', role: 'Sugar Mummy', age: 44, city: 'Nairobi', text: "SugarMingle connected me with the most genuine, caring companion I've ever met. The verification system gave me total confidence.", rating: 5 },
    { name: 'Kevin A.', role: 'Sugarboy', age: 26, city: 'Lagos', text: "I'd given up on sugar dating apps because of scammers. SugarMingle is on a different level — every match feels real and worthwhile.", rating: 5 },
    { name: 'Elizabeth C.', role: 'Sugar Mummy', age: 51, city: 'London', text: "The Platinum plan is absolutely worth it. I have priority visibility and I've had three incredible connections this month alone.", rating: 5 },
]

// Diverse couple photo cards for the hero — real Unsplash photos showing interracial/international connections
const COUPLE_CARDS = [
    {
        photo: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=300&h=400&fit=crop', // Mature woman + younger man (conceptual)
        title: 'Mummy + Sugarboy',
        subtitle: 'London ↔ Nairobi',
        badge: 'Platinum',
        niche: 'Interracial Harmony'
    },
    {
        photo: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=300&h=400&fit=crop', // Diverse couple
        title: 'Daddy + Sugar Baby',
        subtitle: 'Dubai ↔ Lagos',
        badge: 'Gold',
        niche: 'Elite Connection'
    },
    {
        photo: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=300&h=400&fit=crop', // Mixed couple
        title: 'International Match',
        subtitle: 'Paris ↔ Accra',
        badge: 'Verified',
        niche: 'Cross-Cultural'
    },
    {
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop', // Diverse couple
        title: 'Baby + Sugar Daddy',
        subtitle: 'NYC ↔ Johannesburg',
        badge: 'Silver',
        niche: 'Premium Link'
    },
]

const CoupleCard = ({ photo, title, subtitle, badge, niche }) => {
    const badgeColors = { Gold: '#FFD700', Platinum: '#E5D3FF', Silver: '#C0C0C0', Verified: '#E91E90' }
    return (
        <div style={{
            borderRadius: 16, overflow: 'hidden', position: 'relative', width: 170, flexShrink: 0,
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)', border: '1px solid rgba(233,30,144,0.2)'
        }}>
            <img src={photo} alt={title} style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }} />
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                padding: '28px 10px 10px'
            }}>
                <div style={{ fontWeight: 700, fontSize: '0.75rem' }}>{title}</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--primary)', fontWeight: 600, marginTop: 1 }}>{niche}</div>
                <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
                    <MapPinIcon size={10} color="rgba(255,255,255,0.5)" /> {subtitle}
                </div>
            </div>
            <div style={{
                position: 'absolute', top: 8, right: 8,
                background: badgeColors[badge] || '#E91E90', borderRadius: 12, padding: '2px 8px',
                fontSize: '0.6rem', fontWeight: 700, color: badge === 'Gold' || badge === 'Silver' ? '#000' : '#fff',
                display: 'flex', alignItems: 'center', gap: 3
            }}>
                {badge === 'Verified' ? <VerifiedIcon size={9} color="#fff" /> : <CrownIcon size={9} color={badge === 'Gold' || badge === 'Silver' ? '#000' : '#fff'} />}
                {badge}
            </div>
        </div>
    )
}

// Role icons as SVGs
const RoleIcon = ({ role }) => {
    if (role === 'Sugar Mummy') return <CrownIcon size={32} color="#E91E90" />
    if (role === 'Sugar Daddy') return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E91E90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" /></svg>
    if (role === 'Sugar Baby') return <HeartIcon size={32} color="#E91E90" />
    return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E91E90" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
}

// Social icon SVGs
const SocialIcons = () => (
    <div style={{ display: 'flex', gap: 16 }}>
        {/* Twitter/X */}
        <div style={{ cursor: 'pointer', opacity: 0.5 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        </div>
        {/* Facebook */}
        <div style={{ cursor: 'pointer', opacity: 0.5 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
        </div>
        {/* Instagram */}
        <div style={{ cursor: 'pointer', opacity: 0.5 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg>
        </div>
        {/* TikTok */}
        <div style={{ cursor: 'pointer', opacity: 0.5 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .55.04.81.1v-3.49a6.37 6.37 0 0 0-.81-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.8a8.24 8.24 0 0 0 4.77 1.52V6.87a4.83 4.83 0 0 1-1.01-.18z" /></svg>
        </div>
    </div>
)

export default function HomePage() {
    return (
        <div>
            {/* NAVBAR */}
            <nav className="navbar" style={{ justifyContent: 'space-between' }}>
                <Logo />
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }} className="nav-links">
                        <Link href="/pricing" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Pricing</Link>
                        <Link href="/safety" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Safety</Link>
                    </div>
                    <Link href="/auth/login" className="btn btn-ghost btn-sm">Log In</Link>
                    <Link href="/auth/register" className="btn btn-primary btn-sm" style={{ padding: '8px 20px', borderRadius: 99 }}>Join Free</Link>
                </div>
            </nav>

            {/* HERO */}
            <section className="hero" style={{ background: '#fff', pt: 120 }}>
                <div className="hero-content">
                    <div style={{ maxWidth: 640 }}>
                        <div className="hero-badge" style={{ background: 'var(--gradient-soft)', color: 'var(--primary)' }}>
                            <MapPinIcon size={14} color="var(--primary)" /> World's #1 Sugar Dating Platform
                        </div>
                        <h1 style={{ marginBottom: 16, color: 'var(--text-primary)' }}>
                            Where <span className="gradient-text">Luxury Meets</span> Genuine Connection
                        </h1>
                        <p style={{ fontSize: '1.1rem', maxWidth: 500, color: 'var(--text-secondary)' }}>
                            Connect with verified sugar mummies, sugar daddies, sugar babies and sugarboys globally.
                            Real profiles. Real matches. Zero scams.
                        </p>
                        <div className="hero-cta">
                            <Link href="/auth/register" className="btn btn-primary btn-lg" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <FireIcon size={18} color="#fff" /> Create Free Account
                            </Link>
                            <Link href="#how-it-works" className="btn btn-ghost btn-lg">
                                See How It Works
                            </Link>
                        </div>
                        <div style={{ display: 'flex', gap: 32, marginTop: 40, flexWrap: 'wrap' }}>
                            {STATS.map(s => (
                                <div key={s.label}>
                                    <div style={{ fontSize: '1.6rem', fontWeight: 800 }} className="gradient-text">{s.value}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Floating diverse couple photo cards */}
                    <div style={{
                        position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
                        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
                        pointerEvents: 'none', maxWidth: 370
                    }} className="floating-cards">
                        {COUPLE_CARDS.map((card, i) => (
                            <div key={card.title} style={{ animation: `float ${3.5 + i * 0.5}s ease-in-out ${i * 0.3}s infinite` }}>
                                <CoupleCard {...card} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONNECTION SHOWCASE — Diverse couples symbolizing unlimited global connections */}
            <section className="section" style={{ background: 'rgba(233,30,144,0.03)', overflow: 'hidden' }}>
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">Unlimited Connections Worldwide</div>
                        <h2>Love Knows No <span className="gradient-text">Boundaries</span></h2>
                        <p style={{ maxWidth: 520, margin: '12px auto 0' }}>SugarMingle brings together people from every background and country. Real connections across cultures and continents.</p>
                    </div>
                    <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
                        {[
                            { img: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=280&h=350&fit=crop', label: 'Sugar Mummy + Sugarboy', location: 'London, UK ↔ Nairobi, Kenya' },
                            { img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=280&h=350&fit=crop', label: 'Sugar Daddy + Sugar Baby', location: 'New York, USA ↔ Accra, Ghana' },
                            { img: 'https://images.unsplash.com/photo-1529232356377-57971f020a94?w=280&h=350&fit=crop', label: 'International Romance', location: 'Paris, France ↔ Lagos, Nigeria' },
                            { img: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=280&h=350&fit=crop', label: 'Cross-Cultural Match', location: 'Dubai, UAE ↔ Kampala, Uganda' },
                        ].map(c => (
                            <div key={c.label} style={{
                                borderRadius: 20, overflow: 'hidden', position: 'relative',
                                width: 250, flexShrink: 0, boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                                border: '1px solid var(--dark-border)'
                            }}>
                                <img src={c.img} alt={c.label} style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block' }} />
                                <div style={{
                                    position: 'absolute', bottom: 0, left: 0, right: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.95) 10%, transparent 100%)',
                                    padding: '40px 14px 14px'
                                }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{c.label}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', marginTop: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <MapPinIcon size={10} color="#E91E90" /> {c.location}
                                    </div>
                                    <div style={{ marginTop: 6 }}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: 'var(--gradient)', borderRadius: 10, padding: '2px 8px', fontSize: '0.6rem', fontWeight: 700, color: '#fff' }}>
                                            <VerifiedIcon size={9} color="#fff" /> VERIFIED MATCH
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ROLES SECTION */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-tag">Who Is SugarMingle For?</div>
                        <h2>Every Sugar <span className="gradient-text">Connection Type</span></h2>
                        <p style={{ maxWidth: 500, margin: '12px auto 0' }}>Whether you're wealthy, seeking, or simply looking for a genuine mutual arrangement</p>
                    </div>
                    <div className="grid-4">
                        {[
                            { role: 'Sugar Mummy', title: 'Sugar Mummies', desc: 'Confident, successful women who love to spoil their ideal companion.' },
                            { role: 'Sugar Daddy', title: 'Sugar Daddies', desc: 'Wealthy men offering generous arrangements and authentic connections.' },
                            { role: 'Sugar Baby', title: 'Sugar Babies', desc: 'Young, vibrant partners seeking luxury, mentorship and genuine romance.' },
                            { role: 'Sugarboy', title: 'Sugarboys', desc: 'Charming, attentive gentlemen ready to provide companionship and care.' },
                        ].map(r => (
                            <div key={r.title} className="card" style={{ textAlign: 'center', padding: '32px 20px' }}>
                                <div style={{ marginBottom: 16 }}><RoleIcon role={r.role} /></div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: 8 }}>{r.title}</h3>
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
                            <div key={f.title} className="glass-card" style={{ padding: '28px 24px' }}>
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
                            <div key={t.name} className="card">
                                <div style={{ display: 'flex', marginBottom: 12, gap: 2 }}>
                                    {Array.from({ length: t.rating }).map((_, i) => <StarIcon key={i} size={16} color="#FFD700" fill="#FFD700" />)}
                                </div>
                                <p style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: 16 }}>"{t.text}"</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: '50%',
                                        background: 'var(--gradient)', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem'
                                    }}>{t.name[0]}</div>
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
            <section className="section" style={{ background: '#fff' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{
                        background: 'var(--gradient-soft)',
                        border: '1px solid var(--border-light)', borderRadius: 24, padding: '60px 40px',
                        maxWidth: 700, margin: '0 auto'
                    }}>
                        <DiamondIcon size={48} color="var(--primary)" />
                        <h2 style={{ marginBottom: 12, marginTop: 16, color: 'var(--text-primary)' }}>Ready to Find Your <span className="gradient-text">Perfect Match?</span></h2>
                        <p style={{ marginBottom: 32, maxWidth: 480, margin: '0 auto 32px', color: 'var(--text-secondary)' }}>
                            Join over 2 million members worldwide. Create your free account in under 2 minutes.
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
