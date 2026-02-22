'use client'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'
import { HeartIcon, MessageIcon, VerifiedIcon, MapPinIcon, CrownIcon, StarIcon } from '@/lib/icons'

function TierBadge({ tier }) {
    if (!tier || tier === 'free') return null
    const c = { silver: { l: 'Silver', c: '#C0C0C0' }, gold: { l: 'Gold', c: '#FFD700' }, platinum: { l: 'Platinum', c: '#E5D3FF' } }[tier]
    if (!c) return null
    return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, background: `${c.c}22`, border: `1px solid ${c.c}44`, borderRadius: 10, padding: '1px 6px', fontSize: '0.6rem', fontWeight: 700, color: c.c }}><CrownIcon size={8} color={c.c} /> {c.l}</span>
}

export default function MatchesPage() {
    const router = useRouter()
    const { matches, profiles, user, showToast } = useApp()

    // Use actual matches from context
    const matchedProfiles = matches.map(m => {
        const profile = profiles.find(p => p.id === m.id)
        return profile ? { ...profile, matchedAt: m.matchedAt || Date.now() } : null
    }).filter(Boolean)

    // Split into new matches (last 24h) and older
    const now = Date.now()
    const newMatches = matchedProfiles.filter(p => now - p.matchedAt < 86400000)
    const olderMatches = matchedProfiles.filter(p => now - p.matchedAt >= 86400000)

    const timeAgo = (ts) => {
        const diff = now - ts
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
        return `${Math.floor(diff / 86400000)}d ago`
    }

    return (
        <div style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontSize: '1.3rem' }}>
                    <span className="gradient-text">Matches</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: 8 }}>({matchedProfiles.length})</span>
                </h2>
            </div>

            {matchedProfiles.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <HeartIcon size={64} color="var(--text-muted)" />
                    <h3 style={{ marginTop: 16 }}>No Matches Yet</h3>
                    <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Start swiping on the Discover page to find your matches!</p>
                    <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => router.push('/discover')}>Start Swiping</button>
                </div>
            ) : (
                <>
                    {/* NEW MATCHES */}
                    {newMatches.length > 0 && (
                        <div style={{ marginBottom: 28 }}>
                            <h3 style={{ fontSize: '0.9rem', color: 'var(--primary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                                <StarIcon size={14} color="var(--primary)" fill="var(--primary)" /> New Matches
                            </h3>
                            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
                                {newMatches.map(p => (
                                    <div key={p.id} onClick={() => router.push(`/messages?chat=${p.id}`)} style={{
                                        flexShrink: 0, width: 100, textAlign: 'center', cursor: 'pointer',
                                        animation: 'slideUp 0.4s ease'
                                    }}>
                                        <div style={{ position: 'relative', display: 'inline-block' }}>
                                            <img src={p.photos[0]} alt={p.name} style={{
                                                width: 80, height: 80, borderRadius: '50%', objectFit: 'cover',
                                                border: '3px solid var(--primary)', padding: 2
                                            }} />
                                            {p.online && <div style={{
                                                position: 'absolute', bottom: 4, right: 4, width: 14, height: 14,
                                                borderRadius: '50%', background: 'var(--success)', border: '2px solid var(--dark)'
                                            }} />}
                                        </div>
                                        <div style={{ fontWeight: 600, fontSize: '0.8rem', marginTop: 6 }}>{p.name.split(' ')[0]}</div>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{timeAgo(p.matchedAt)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ALL MATCHES GRID */}
                    <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <HeartIcon size={14} color="var(--text-secondary)" /> All Matches
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
                        {matchedProfiles.map(p => (
                            <div key={p.id} className="card" style={{
                                display: 'flex', gap: 14, padding: 14, cursor: 'pointer',
                                alignItems: 'center'
                            }} onClick={() => router.push(`/messages?chat=${p.id}`)}>
                                <div style={{ position: 'relative', flexShrink: 0 }}>
                                    <img src={p.photos[0]} alt={p.name} className="avatar avatar-lg avatar-ring" />
                                    {p.online && <div style={{
                                        position: 'absolute', bottom: 2, right: 2, width: 12, height: 12,
                                        borderRadius: '50%', background: 'var(--success)', border: '2px solid var(--dark-card)'
                                    }} />}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{p.name}, {p.age}</span>
                                        {p.verified && <VerifiedIcon size={14} />}
                                    </div>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                                        <MapPinIcon size={10} /> {p.location}
                                    </div>
                                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 4 }}>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--primary)' }}>{p.role}</span>
                                        <TierBadge tier={p.premium} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{timeAgo(p.matchedAt)}</span>
                                    <button className="btn btn-primary btn-sm" style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                                        onClick={(e) => { e.stopPropagation(); router.push(`/messages?chat=${p.id}`) }}>
                                        <MessageIcon size={12} color="#fff" /> Chat
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
