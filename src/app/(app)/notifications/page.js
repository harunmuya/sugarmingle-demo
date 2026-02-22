'use client'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'
import { HeartIcon, MessageIcon, StarIcon, CheckIcon } from '@/lib/icons'

function BellIcon({ size = 22, color = 'currentColor' }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
}

function ThumbsUpIcon({ size = 16, color = 'currentColor' }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
}

export default function NotificationsPage() {
    const router = useRouter()
    const { notifications, user, profiles } = useApp()

    const markAllRead = () => {
        const updated = notifications.map(n => ({ ...n, read: true }))
        localStorage.setItem('sm_notifications', JSON.stringify(updated))
        window.location.reload()
    }

    const formatTime = (ts) => {
        const diff = Date.now() - ts
        if (diff < 60000) return 'Just now'
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
        return `${Math.floor(diff / 86400000)}d ago`
    }

    const getIcon = (type) => {
        switch (type) {
            case 'match': return <HeartIcon size={20} color="#E91E90" fill="#E91E90" />
            case 'message': return <MessageIcon size={20} color="#4A90D9" />
            case 'like': return <ThumbsUpIcon size={20} color="#FFD700" />
            case 'verification': return <CheckIcon size={20} color="#22C55E" />
            default: return <BellIcon size={20} color="var(--primary)" />
        }
    }

    const getPhoto = (relatedId) => {
        const p = profiles.find(pr => pr.id === relatedId)
        return p?.photos?.[0] || null
    }

    if (!user) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 140px)', textAlign: 'center', padding: 40 }}>
                <BellIcon size={64} color="var(--text-muted)" />
                <h2 style={{ marginTop: 20 }}>Notifications</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Sign in to see your activity.</p>
                <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => router.push('/auth/login')}>Sign In</button>
            </div>
        )
    }

    return (
        <div style={{ padding: '16px 20px', maxWidth: 600, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontSize: '1.3rem' }}>
                    <span className="gradient-text">Notifications</span>
                    {notifications.filter(n => !n.read).length > 0 && (
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: 8 }}>
                            ({notifications.filter(n => !n.read).length} new)
                        </span>
                    )}
                </h2>
                {notifications.length > 0 && (
                    <button className="btn btn-ghost btn-sm" onClick={markAllRead} style={{ fontSize: '0.78rem' }}>
                        Mark all read
                    </button>
                )}
            </div>

            {notifications.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <BellIcon size={64} color="var(--text-muted)" />
                    <h3 style={{ marginTop: 16 }}>No Activity Yet</h3>
                    <p style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: '0.9rem' }}>
                        Start swiping and matching to see your notifications here!
                    </p>
                    <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => router.push('/discover')}>
                        Start Swiping
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {notifications.map(notif => {
                        const photo = getPhoto(notif.relatedId)
                        return (
                            <div key={notif.id} className="card" style={{
                                display: 'flex', gap: 14, padding: '14px 16px', cursor: 'pointer',
                                alignItems: 'center',
                                background: notif.read ? 'var(--dark-card)' : 'rgba(233,30,144,0.04)',
                                borderLeft: notif.read ? 'none' : '3px solid var(--primary)',
                                transition: 'all 0.2s',
                            }} onClick={() => {
                                if (notif.type === 'match' || notif.type === 'message') {
                                    router.push(`/messages?chat=${notif.relatedId}`)
                                } else if (notif.type === 'like') {
                                    router.push('/matches')
                                }
                            }}>
                                {photo ? (
                                    <img src={photo} alt="" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                                ) : (
                                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--dark-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        {getIcon(notif.type)}
                                    </div>
                                )}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                                        {getIcon(notif.type)}
                                        <span style={{ fontWeight: notif.read ? 400 : 600, fontSize: '0.9rem' }}>{notif.message}</span>
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{formatTime(notif.timestamp)}</div>
                                </div>
                                {!notif.read && (
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }} />
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
