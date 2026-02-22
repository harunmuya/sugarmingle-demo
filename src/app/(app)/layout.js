'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'
import { FireIcon, SearchIcon, HeartIcon, MessageIcon, UserIcon, DiamondIcon, CheckIcon, XIcon } from '@/lib/icons'

function AppShell({ children }) {
    const pathname = usePathname()
    const router = useRouter()
    const { user, matches, toast } = useApp()

    const navItems = [
        { href: '/discover', icon: <FireIcon size={22} />, label: 'Discover' },
        { href: '/explore', icon: <SearchIcon size={22} />, label: 'Explore' },
        { href: '/matches', icon: <HeartIcon size={22} />, label: 'Matches', badge: matches?.length },
        { href: '/messages', icon: <MessageIcon size={22} />, label: 'Messages' },
        { href: '/profile', icon: <UserIcon size={22} />, label: 'Profile' },
    ]

    return (
        <div>
            {/* TOP BAR */}
            <nav className="navbar" style={{ justifyContent: 'space-between', background: 'rgba(255,255,255,0.9)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => router.push('/discover')}>
                    <img src="/icon-512.png" alt="SM" style={{ width: 36, height: 36, borderRadius: 10, objectFit: 'contain' }} />
                    <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-primary)' }}><span className="gradient-text">Sugar</span>Mingle</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button onClick={() => router.push('/pricing')} className="btn btn-ghost btn-sm" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4, background: 'var(--gradient-soft)', border: 'none' }}>
                        <DiamondIcon size={14} color="var(--primary)" /> <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Upgrade</span>
                    </button>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', color: '#fff' }}
                        onClick={() => router.push('/profile')}>
                        {user?.name?.[0] || '?'}
                    </div>
                </div>
            </nav>

            {/* MAIN CONTENT */}
            <main style={{ paddingTop: 68, paddingBottom: 72 }}>
                {children}
            </main>

            {/* BOTTOM NAV */}
            <nav className="app-nav" style={{ background: 'rgba(255,255,255,0.98)', borderTop: '1px solid var(--border)' }}>
                {navItems.map(item => (
                    <button key={item.href} className={`app-nav-item ${pathname === item.href ? 'active' : ''}`}
                        onClick={() => router.push(item.href)}
                        style={{ color: pathname === item.href ? 'var(--primary)' : 'var(--text-muted)' }}>
                        <div style={{ position: 'relative', display: 'inline-flex' }}>
                            {item.icon}
                            {item.badge > 0 && (
                                <div style={{
                                    position: 'absolute', top: -4, right: -6, background: 'var(--primary)',
                                    color: '#fff', borderRadius: '50%', width: 16, height: 16,
                                    fontSize: '0.6rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>{item.badge > 9 ? '9+' : item.badge}</div>
                            )}
                        </div>
                        <span className="nav-label" style={{ fontWeight: pathname === item.href ? 700 : 500 }}>{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* TOAST */}
            {toast && (
                <div className="toast-container">
                    <div className={`toast ${toast.type}`}>
                        <span style={{ display: 'inline-flex' }}>
                            {toast.type === 'success' ? <CheckIcon size={16} color="var(--success)" /> :
                                toast.type === 'error' ? <XIcon size={16} color="var(--error)" /> :
                                    <DiamondIcon size={16} color="var(--primary)" />}
                        </span>
                        {toast.msg}
                    </div>
                </div>
            )}
        </div>
    )
}

export default function AppLayout({ children }) {
    return <AppShell>{children}</AppShell>
}
