'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'
import { rankProfiles } from '@/lib/algorithm'
import { HeartIcon, XIcon, StarIcon, UndoIcon, RocketIcon, VerifiedIcon, MapPinIcon, BriefcaseIcon, CrownIcon, ZapIcon, SearchIcon, NavigationIcon } from '@/lib/icons'
import UpgradeModal from '@/components/UpgradeModal'

// Tier badge component
function TierBadge({ tier }) {
    if (!tier || tier === 'free') return null
    const config = {
        silver: { label: 'Silver', bg: 'rgba(192,192,192,0.2)', color: '#C0C0C0', border: 'rgba(192,192,192,0.4)' },
        gold: { label: 'Gold', bg: 'rgba(255,215,0,0.2)', color: '#FFD700', border: 'rgba(255,215,0,0.4)' },
        platinum: { label: 'Platinum', bg: 'rgba(229,211,255,0.2)', color: '#E5D3FF', border: 'rgba(229,211,255,0.4)' },
    }
    const c = config[tier]
    if (!c) return null
    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, padding: '2px 8px', borderRadius: 20, background: c.bg, border: `1px solid ${c.border}`, fontSize: '0.65rem', fontWeight: 700, color: c.color }}>
            <CrownIcon size={10} color={c.color} /> {c.label}
        </span>
    )
}

export default function DiscoverPage() {
    const router = useRouter()
    const { user, profiles, tier, dailyLikes, swipeIndex, setSwipeIndex, handleLike, matchPopup, setMatchPopup, showToast, DAILY_LIMIT } = useApp()
    const [dragX, setDragX] = useState(0)
    const [dragStart, setDragStart] = useState(null)
    const [swiping, setSwiping] = useState(false)
    const [animDir, setAnimDir] = useState(null) // 'left' | 'right'
    const [upgradeType, setUpgradeType] = useState(null)
    const [showDetail, setShowDetail] = useState(false)
    const [coords, setCoords] = useState(null)
    const [expandSearch, setExpandSearch] = useState(false)
    const cardRef = useRef(null)

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(pos => {
                setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude })
            }, err => {
                console.log("Location denied")
            })
        }
    }, [])

    const ranked = rankProfiles(profiles, user)

    // Neary Filtering Logic
    const filtered = ranked.filter(p => {
        if (expandSearch) return true
        if (!coords) return true // Fallback to all if no coords
        // Simple mock location for SEED profiles (they have location names, not coords)
        // In a real app we'd compare lat/lon. For this demo, we'll randomize distance if expanding, or keep it close.
        return p.distance < 50 // Show only profiles within 50km if not expanded
    })

    const remaining = filtered.slice(swipeIndex)
    const current = remaining[0]
    const next = remaining[1]

    const freeLeft = Math.max(0, DAILY_LIMIT.free - dailyLikes)

    const animateOut = (dir, cb) => {
        setAnimDir(dir)
        setTimeout(() => {
            setAnimDir(null)
            cb()
        }, 300)
    }

    const reject = () => {
        if (!current) return
        animateOut('left', () => setSwipeIndex(swipeIndex + 1))
    }

    const like = () => {
        if (!current) return
        const success = handleLike(current.id)
        if (success) animateOut('right', () => setSwipeIndex(swipeIndex + 1))
        else {
            setUpgradeType('Unlimited Swipes')
        }
    }

    const superLike = () => {
        if (!current) return
        if (tier === 'free') {
            setUpgradeType('Super Like')
            return
        }
        const success = handleLike(current.id)
        if (success) {
            showToast(`Super Liked ${current.name}!`, 'success')
            animateOut('right', () => setSwipeIndex(swipeIndex + 1))
        }
    }

    const rewind = () => {
        if (tier === 'free') {
            setUpgradeType('Rewind')
            return
        }
        if (swipeIndex > 0) setSwipeIndex(swipeIndex - 1)
    }

    const boost = () => {
        if (tier === 'free' || tier === 'silver') {
            setUpgradeType('Profile Boost')
            return
        }
        showToast('Profile boosted for 30 minutes!', 'success')
    }

    // Drag handlers
    const onPointerDown = (e) => { setDragStart(e.clientX); setSwiping(true) }
    const onPointerMove = (e) => { if (swiping && dragStart !== null) setDragX(e.clientX - dragStart) }
    const onPointerUp = () => {
        if (Math.abs(dragX) > 100) {
            if (dragX > 0) like(); else reject()
        }
        setDragX(0); setDragStart(null); setSwiping(false)
    }

    if (!user) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 140px)', textAlign: 'center', padding: 40 }}>
                <HeartIcon size={64} color="var(--primary)" />
                <h2 style={{ marginTop: 20 }}>Welcome to Sugar Mingle Extra</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: 8, maxWidth: 360 }}>Create an account to start discovering amazing connections worldwide.</p>
                <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => router.push('/auth/register')}>Get Started</button>
            </div>
        )
    }

    return (
        <div style={{ padding: '16px 0' }}>
            {/* DAILY LIKES COUNTER */}
            {tier === 'free' && (
                <div style={{ textAlign: 'center', padding: '0 20px', marginBottom: 12, display: 'flex', justifyContent: 'center', gap: 8 }}>
                    <div style={{
                        background: 'rgba(233,30,144,0.1)',
                        padding: '6px 12px',
                        borderRadius: 20,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        border: '1px solid rgba(233,30,144,0.2)'
                    }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: freeLeft <= 1 ? 'var(--error)' : 'var(--primary)' }}>
                            {freeLeft} Swipes Left
                        </span>
                        <RocketIcon size={12} color="var(--primary)" />
                    </div>
                    <button onClick={() => setExpandSearch(!expandSearch)} style={{
                        background: expandSearch ? 'var(--primary)' : '#fff',
                        color: expandSearch ? '#fff' : 'var(--text-secondary)',
                        padding: '6px 12px',
                        borderRadius: 20,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        border: '1px solid var(--border)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}>
                        <NavigationIcon size={12} color={expandSearch ? '#fff' : 'var(--primary)'} />
                        {expandSearch ? 'Global Search On' : 'Nearby Only'}
                    </button>
                </div>
            )}

            {/* SWIPE STACK */}
            <div className="swipe-container">
                {!current ? (
                    <div style={{ textAlign: 'center', padding: 40 }}>
                        <SearchIcon size={64} color="var(--text-muted)" />
                        <h3 style={{ marginTop: 16 }}>No More Profiles</h3>
                        <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Check back later for new connections.</p>
                        <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => { setSwipeIndex(0) }}>Reset Discovery</button>
                    </div>
                ) : (
                    <>
                        {/* Next card preview */}
                        {next && (
                            <div className="swipe-card" style={{ transform: 'scale(0.94) translateY(12px)', opacity: 0.5, zIndex: 0 }}>
                                <img src={next.photos[0]} alt={next.name} style={{ filter: 'blur(2px)' }} />
                            </div>
                        )}

                        {/* Current card */}
                        <div className="swipe-card" ref={cardRef}
                            style={{
                                transform: animDir === 'left' ? 'translateX(-120vw) rotate(-20deg)' :
                                    animDir === 'right' ? 'translateX(120vw) rotate(20deg)' :
                                        `translateX(${dragX}px) rotate(${dragX * 0.06}deg)`,
                                transition: animDir || !swiping ? 'transform 0.3s ease' : 'none',
                                zIndex: 1
                            }}
                            onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
                            onPointerLeave={() => { if (swiping) onPointerUp() }}>

                            {/* LIKE/PASS overlay */}
                            <div className="swipe-label swipe-label-like" style={{ opacity: dragX > 40 ? Math.min((dragX - 40) / 60, 1) : 0 }}>LIKE</div>
                            <div className="swipe-label swipe-label-pass" style={{ opacity: dragX < -40 ? Math.min((-dragX - 40) / 60, 1) : 0 }}>NOPE</div>

                            <img src={current.photos[0]} alt={current.name} draggable={false} />

                            {/* Online dot */}
                            {current.online && <div className="online-dot" />}

                            <div className="swipe-card-info">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span className="swipe-card-name">{current.name}, {current.age}</span>
                                    {current.verified && <VerifiedIcon size={18} color="#E91E90" />}
                                    <TierBadge tier={current.premium} />
                                </div>
                                <div className="swipe-card-details" style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}><MapPinIcon size={12} /> {current.location}</span>
                                    <span>·</span>
                                    <span>{current.distance} km</span>
                                </div>
                                <div className="swipe-card-role">{current.role}</div>
                                {current.job && (
                                    <div style={{ fontSize: '0.8rem', marginTop: 6, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <BriefcaseIcon size={12} color="rgba(255,255,255,0.7)" /> {current.job}
                                    </div>
                                )}
                                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)', marginTop: 8, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {current.bio}
                                </p>
                                {current.interests && (
                                    <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                                        {current.interests.slice(0, 4).map(i => (
                                            <span key={i} style={{ padding: '2px 8px', borderRadius: 12, background: 'rgba(255,255,255,0.15)', fontSize: '0.7rem', fontWeight: 600 }}>{i}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* Tap to view details button */}
                            <button onClick={(e) => { e.stopPropagation(); setShowDetail(true) }} style={{
                                position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.5)',
                                border: 'none', borderRadius: '50%', width: 36, height: 36,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', zIndex: 5, backdropFilter: 'blur(8px)'
                            }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* ACTION BUTTONS */}
            {current && (
                <div className="swipe-actions">
                    <button className="swipe-btn swipe-btn-pass" onClick={() => reject()} style={{ background: '#fff', border: '1px solid var(--border)' }}>
                        <XIcon size={28} color="var(--error)" />
                    </button>
                    <button className="swipe-btn swipe-btn-rewind" onClick={() => rewind()} style={{ background: '#fff', border: '1px solid var(--border)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
                    </button>
                    <button className="swipe-btn swipe-btn-like" onClick={() => like()}>
                        <HeartIcon size={34} color="#fff" fill="#fff" />
                    </button>
                    <button className="swipe-btn swipe-btn-super" onClick={() => superLike()} style={{ background: '#fff', border: '1px solid var(--border)' }}>
                        <StarIcon size={24} color="#4ECDC4" fill="#4ECDC4" />
                    </button>
                    <button className="swipe-btn swipe-btn-boost" onClick={() => boost()} style={{ background: '#fff', border: '1px solid var(--border)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                    </button>
                </div>
            )}

            {/* UPGRADE MODAL */}
            {upgradeType && (
                <UpgradeModal feature={upgradeType} onClose={() => setUpgradeType(null)} />
            )}

            {/* MATCH POPUP */}
            {matchPopup && (
                <div className="match-popup-overlay" onClick={() => setMatchPopup(null)}>
                    <div className="match-popup" onClick={e => e.stopPropagation()}>
                        <h1 className="gradient-text">It's a Match!</h1>
                        <p style={{ color: 'var(--text-secondary)' }}>You and {matchPopup.name} liked each other</p>
                        <div className="match-avatars">
                            <img src={user?.photos?.[0] || '/icon-512.png'} alt="You" />
                            <HeartIcon size={32} color="var(--primary)" fill="var(--primary)" />
                            <img src={matchPopup.photos[0]} alt={matchPopup.name} />
                        </div>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
                            <button className="btn btn-primary" onClick={() => { setMatchPopup(null); router.push(`/messages?chat=${matchPopup.id}`) }}>Send Message</button>
                            <button className="btn btn-dark" onClick={() => setMatchPopup(null)}>Keep Swiping</button>
                        </div>
                    </div>
                </div>
            )}

            {/* PROFILE DETAIL MODAL */}
            {showDetail && current && (
                <div className="modal-overlay" onClick={() => setShowDetail(false)} style={{ zIndex: 100 }}>
                    <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 420, maxHeight: '85vh', overflow: 'auto', padding: 0 }}>
                        <img src={current.photos[0]} alt={current.name} style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
                        <div style={{ padding: '20px 24px 24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                <h2 style={{ fontSize: '1.3rem' }}>{current.name}, {current.age}</h2>
                                {current.verified && <VerifiedIcon size={18} color="#E91E90" />}
                                <TierBadge tier={current.premium} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 12 }}>
                                <MapPinIcon size={12} /> {current.location} · {current.distance} km
                            </div>
                            <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 12, background: 'rgba(233,30,144,0.1)', color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 600, marginBottom: 16 }}>
                                {current.role}
                            </div>

                            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: 20 }}>{current.bio}</p>

                            {/* Details Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                                {current.job && <div style={{ fontSize: '0.82rem' }}><strong>Job:</strong> {current.job}</div>}
                                {current.height && <div style={{ fontSize: '0.82rem' }}><strong>Height:</strong> {current.height}</div>}
                                {current.zodiac && <div style={{ fontSize: '0.82rem' }}><strong>Zodiac:</strong> {current.zodiac}</div>}
                                {current.smoke && <div style={{ fontSize: '0.82rem' }}><strong>Smokes:</strong> {current.smoke}</div>}
                                {current.drink && <div style={{ fontSize: '0.82rem' }}><strong>Drinks:</strong> {current.drink}</div>}
                                {current.kids && <div style={{ fontSize: '0.82rem' }}><strong>Kids:</strong> {current.kids}</div>}
                            </div>

                            {/* Interests */}
                            {current.interests && (
                                <div style={{ marginBottom: 20 }}>
                                    <strong style={{ fontSize: '0.85rem', marginBottom: 8, display: 'block' }}>Interests</strong>
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                        {current.interests.map(i => (
                                            <span key={i} style={{ padding: '4px 12px', borderRadius: 16, background: 'rgba(233,30,144,0.08)', fontSize: '0.78rem', fontWeight: 600, color: 'var(--primary)' }}>{i}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: 12 }}>
                                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { setShowDetail(false); like() }}>
                                    <HeartIcon size={16} color="#fff" /> Like
                                </button>
                                <button className="btn btn-dark" style={{ flex: 1 }} onClick={() => setShowDetail(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
