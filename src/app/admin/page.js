'use client'
import { useState, useEffect } from 'react'
import { useApp } from '@/lib/context'
import { ShieldIcon, UserIcon, VerifiedIcon, CrownIcon, MapPinIcon, SearchIcon, CheckIcon, StarIcon } from '@/lib/icons'

const ADMIN_PASSWORD = 'sugarmingle_admin_2026'
const ADMIN_EMAIL = 'marygagency' // Updated from sugarmingleextra@gmail.com

function AdminDashboard() {
    const { profiles } = useApp()
    const [authed, setAuthed] = useState(false)
    const [password, setPassword] = useState('')
    const [activeTab, setActiveTab] = useState('dashboard')
    const [search, setSearch] = useState('')
    const [userFilter, setUserFilter] = useState('all')

    // Auto-unlock for admin email
    useEffect(() => {
        try {
            const saved = localStorage.getItem('sm_user')
            if (saved) {
                const u = JSON.parse(saved)
                if (u.email === ADMIN_EMAIL) {
                    setAuthed(true)
                }
            }
        } catch (e) { }
    }, [])

    // Stats computed from actual profiles
    const totalUsers = profiles.length + 1247 // base + seed
    const verifiedUsers = profiles.filter(p => p.verified).length
    const premiumUsers = profiles.filter(p => p.premium && p.premium !== 'free').length
    const onlineNow = profiles.filter(p => p.online).length
    const reports = [
        { id: 1, reporter: 'Sarah K.', reported: 'FakeProfile99', reason: 'Fake photos', status: 'pending', date: '2026-02-22' },
        { id: 2, reporter: 'Kevin A.', reported: 'ScammerXYZ', reason: 'Financial scam attempt', status: 'resolved', date: '2026-02-21' },
        { id: 3, reporter: 'Victoria G.', reported: 'SpamBot12', reason: 'Spam / bot behavior', status: 'pending', date: '2026-02-20' },
        { id: 4, reporter: 'Amina B.', reported: 'Creepy_Dave', reason: 'Harassment', status: 'banned', date: '2026-02-19' },
    ]
    const recentSignups = [
        { name: 'New User 1', email: 'user1@test.com', date: '2026-02-22', role: 'Sugar Baby', tier: 'free' },
        { name: 'New User 2', email: 'user2@test.com', date: '2026-02-22', role: 'Sugarboy', tier: 'silver' },
        { name: 'New User 3', email: 'user3@test.com', date: '2026-02-21', role: 'Sugar Mummy', tier: 'gold' },
    ]
    const revenue = { daily: 1250, weekly: 8750, monthly: 35000, currency: 'USD' }

    const handleLogin = () => {
        if (password === ADMIN_PASSWORD) {
            setAuthed(true)
        } else {
            alert('Incorrect password')
        }
    }

    // Filter profiles for user management
    const filteredProfiles = profiles.filter(p => {
        if (search) {
            const q = search.toLowerCase()
            if (!p.name.toLowerCase().includes(q) && !p.location?.toLowerCase().includes(q) && !p.role?.toLowerCase().includes(q)) return false
        }
        if (userFilter === 'verified') return p.verified
        if (userFilter === 'premium') return p.premium && p.premium !== 'free'
        if (userFilter === 'online') return p.online
        return true
    })

    // LOGIN
    if (!authed) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="card" style={{ width: 400, maxWidth: '90vw', textAlign: 'center', padding: 40 }}>
                    <img src="/icon-512.png" alt="SugarMingle" style={{ width: 64, height: 64, borderRadius: 16, margin: '0 auto 16px', objectFit: 'contain' }} />
                    <h2 style={{ marginBottom: 4 }}>Admin Panel</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: '0.85rem' }}>Enter the admin password to continue</p>
                    <input className="input" type="password" placeholder="Admin Password" value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleLogin()}
                        style={{ marginBottom: 12 }} />
                    <button className="btn btn-primary w-full" onClick={handleLogin}>
                        <ShieldIcon size={16} color="#fff" /> Access Dashboard
                    </button>
                    <div style={{ marginTop: 16, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Admin email ({ADMIN_EMAIL}) auto-unlocks.
                    </div>
                </div>
            </div>
        )
    }

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg> },
        { id: 'users', label: 'Users', icon: <UserIcon size={16} /> },
        { id: 'reports', label: 'Reports', icon: <ShieldIcon size={16} /> },
        { id: 'revenue', label: 'Revenue', icon: <CrownIcon size={16} color="var(--primary)" /> },
    ]

    return (
        <div style={{ minHeight: '100vh', background: 'var(--dark)' }}>
            {/* TOP BAR */}
            <div style={{ background: 'var(--dark-card)', borderBottom: '1px solid var(--dark-border)', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src="/icon-512.png" alt="" style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'contain' }} />
                    <span style={{ fontWeight: 800, fontSize: '1.1rem' }}><span className="gradient-text">Sugar</span>Mingle Admin</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ADMIN_EMAIL}</span>
                    <button className="btn btn-ghost btn-sm" onClick={() => setAuthed(false)}>Logout</button>
                </div>
            </div>

            <div style={{ display: 'flex' }}>
                {/* SIDEBAR */}
                <div style={{ width: 200, borderRight: '1px solid var(--dark-border)', padding: '20px 0', minHeight: 'calc(100vh - 56px)' }}>
                    {tabs.map(t => (
                        <div key={t.id} onClick={() => setActiveTab(t.id)} style={{
                            display: 'flex', alignItems: 'center', gap: 8, padding: '12px 20px', cursor: 'pointer',
                            background: activeTab === t.id ? 'rgba(233,30,144,0.1)' : 'transparent',
                            borderRight: activeTab === t.id ? '3px solid var(--primary)' : '3px solid transparent',
                            color: activeTab === t.id ? 'var(--primary)' : 'var(--text-secondary)',
                            fontWeight: activeTab === t.id ? 600 : 400, fontSize: '0.9rem',
                            transition: 'all 0.2s'
                        }}>
                            {t.icon} {t.label}
                        </div>
                    ))}
                </div>

                {/* CONTENT */}
                <div style={{ flex: 1, padding: '24px 32px' }}>
                    {/* DASHBOARD TAB */}
                    {activeTab === 'dashboard' && (
                        <>
                            <h2 style={{ marginBottom: 20 }}>Dashboard Overview</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
                                {[
                                    { label: 'Total Users', value: totalUsers.toLocaleString(), icon: <UserIcon size={20} color="var(--primary)" />, change: '+12% this month' },
                                    { label: 'Verified Users', value: verifiedUsers, icon: <VerifiedIcon size={20} />, change: `${Math.round(verifiedUsers / profiles.length * 100)}% rate` },
                                    { label: 'Premium Members', value: premiumUsers, icon: <CrownIcon size={20} color="#FFD700" />, change: `${Math.round(premiumUsers / profiles.length * 100)}% conversion` },
                                    { label: 'Online Now', value: onlineNow, icon: <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--success)' }} />, change: 'Active users' },
                                    { label: 'Reports Pending', value: reports.filter(r => r.status === 'pending').length, icon: <ShieldIcon size={20} color="var(--warning)" />, change: `${reports.length} total` },
                                    { label: 'Monthly Revenue', value: `$${revenue.monthly.toLocaleString()}`, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>, change: '+18% MoM' },
                                ].map(stat => (
                                    <div key={stat.label} className="card" style={{ padding: '20px 16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{stat.label}</span>
                                            {stat.icon}
                                        </div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{stat.value}</div>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--success)', marginTop: 4 }}>{stat.change}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Recent */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                                <div className="card">
                                    <h3 style={{ fontSize: '0.95rem', marginBottom: 12 }}>Recent Signups</h3>
                                    {recentSignups.map((u, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--dark-border)' }}>
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{u.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.email} · {u.role}</div>
                                            </div>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{u.date}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="card">
                                    <h3 style={{ fontSize: '0.95rem', marginBottom: 12 }}>Subscription Breakdown</h3>
                                    {[
                                        { label: 'Free', count: profiles.filter(p => !p.premium || p.premium === 'free').length, color: 'var(--text-muted)', pct: 60 },
                                        { label: 'Silver', count: profiles.filter(p => p.premium === 'silver').length, color: '#C0C0C0', pct: 20 },
                                        { label: 'Gold', count: profiles.filter(p => p.premium === 'gold').length, color: '#FFD700', pct: 15 },
                                        { label: 'Platinum', count: profiles.filter(p => p.premium === 'platinum').length, color: '#E5D3FF', pct: 5 },
                                    ].map(t => (
                                        <div key={t.label} style={{ marginBottom: 12 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 4 }}>
                                                <span style={{ color: t.color, fontWeight: 600 }}>{t.label}</span>
                                                <span style={{ color: 'var(--text-muted)' }}>{t.count} users ({t.pct}%)</span>
                                            </div>
                                            <div style={{ height: 6, borderRadius: 3, background: 'var(--dark-surface)', overflow: 'hidden' }}>
                                                <div style={{ height: '100%', width: `${t.pct}%`, background: t.color, borderRadius: 3 }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* USERS TAB */}
                    {activeTab === 'users' && (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                <h2>User Management</h2>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}><SearchIcon size={14} color="var(--text-muted)" /></div>
                                        <input className="input" style={{ paddingLeft: 32, width: 200 }} placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
                                    </div>
                                    <select className="select" style={{ width: 'auto' }} value={userFilter} onChange={e => setUserFilter(e.target.value)}>
                                        <option value="all">All Users</option>
                                        <option value="verified">Verified</option>
                                        <option value="premium">Premium</option>
                                        <option value="online">Online</option>
                                    </select>
                                </div>
                            </div>
                            <div className="card" style={{ overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--dark-border)' }}>
                                            <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>User</th>
                                            <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem' }}>Role</th>
                                            <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem' }}>Location</th>
                                            <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem' }}>Tier</th>
                                            <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem' }}>Status</th>
                                            <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProfiles.map(p => (
                                            <tr key={p.id} style={{ borderBottom: '1px solid var(--dark-border)' }}>
                                                <td style={{ padding: '10px 12px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                        <img src={p.photos[0]} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                                                        <div>
                                                            <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                                                                {p.name} {p.verified && <VerifiedIcon size={12} />}
                                                            </div>
                                                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.age}y</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '10px 12px' }}>
                                                    <span style={{ fontSize: '0.8rem' }}>{p.role}</span>
                                                </td>
                                                <td style={{ padding: '10px 12px' }}>
                                                    <span style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}><MapPinIcon size={10} /> {p.location}</span>
                                                </td>
                                                <td style={{ padding: '10px 12px' }}>
                                                    <TierBadgeInline tier={p.premium} />
                                                </td>
                                                <td style={{ padding: '10px 12px' }}>
                                                    <span style={{
                                                        padding: '2px 8px', borderRadius: 10, fontSize: '0.7rem', fontWeight: 600,
                                                        background: p.online ? 'rgba(76,175,80,0.15)' : 'rgba(255,255,255,0.05)',
                                                        color: p.online ? 'var(--success)' : 'var(--text-muted)'
                                                    }}>{p.online ? 'Online' : 'Offline'}</span>
                                                </td>
                                                <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                                                    <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                                                        {!p.verified && (
                                                            <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem', padding: '4px 8px' }}
                                                                title="Verify"><VerifiedIcon size={12} /> Verify</button>
                                                        )}
                                                        <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem', padding: '4px 8px', color: 'var(--error)' }}
                                                            title="Ban">Ban</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {/* REPORTS TAB */}
                    {activeTab === 'reports' && (
                        <>
                            <h2 style={{ marginBottom: 20 }}>Reports & Moderation</h2>
                            <div className="card" style={{ overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--dark-border)' }}>
                                            <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem' }}>Reporter</th>
                                            <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem' }}>Reported</th>
                                            <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem' }}>Reason</th>
                                            <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem' }}>Date</th>
                                            <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem' }}>Status</th>
                                            <th style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.75rem' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reports.map(r => (
                                            <tr key={r.id} style={{ borderBottom: '1px solid var(--dark-border)' }}>
                                                <td style={{ padding: '10px 12px', fontWeight: 600 }}>{r.reporter}</td>
                                                <td style={{ padding: '10px 12px', color: 'var(--error)' }}>{r.reported}</td>
                                                <td style={{ padding: '10px 12px' }}>{r.reason}</td>
                                                <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{r.date}</td>
                                                <td style={{ padding: '10px 12px' }}>
                                                    <span style={{
                                                        padding: '2px 8px', borderRadius: 10, fontSize: '0.7rem', fontWeight: 700,
                                                        background: r.status === 'pending' ? 'rgba(255,193,7,0.15)' : r.status === 'banned' ? 'rgba(255,59,48,0.15)' : 'rgba(76,175,80,0.15)',
                                                        color: r.status === 'pending' ? 'var(--warning)' : r.status === 'banned' ? 'var(--error)' : 'var(--success)'
                                                    }}>{r.status}</span>
                                                </td>
                                                <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                                                    {r.status === 'pending' && (
                                                        <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                                                            <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem', padding: '4px 8px' }}>
                                                                <CheckIcon size={12} /> Resolve
                                                            </button>
                                                            <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem', padding: '4px 8px', color: 'var(--error)' }}>
                                                                Ban User
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {/* REVENUE TAB */}
                    {activeTab === 'revenue' && (
                        <>
                            <h2 style={{ marginBottom: 20 }}>Revenue & Subscriptions</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
                                {[
                                    { label: 'Today', value: `$${revenue.daily.toLocaleString()}`, change: '+8%' },
                                    { label: 'This Week', value: `$${revenue.weekly.toLocaleString()}`, change: '+12%' },
                                    { label: 'This Month', value: `$${revenue.monthly.toLocaleString()}`, change: '+18%' },
                                ].map(r => (
                                    <div key={r.label} className="card" style={{ padding: 20, textAlign: 'center' }}>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>{r.label}</div>
                                        <div style={{ fontSize: '1.6rem', fontWeight: 800 }} className="gradient-text">{r.value}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: 4 }}>{r.change}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="card">
                                <h3 style={{ fontSize: '0.95rem', marginBottom: 16 }}>Subscription Tiers</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                                    {[
                                        { label: 'Silver ($15/mo)', users: 312, revenue: 4680, color: '#C0C0C0' },
                                        { label: 'Gold ($40/mo)', users: 186, revenue: 7440, color: '#FFD700' },
                                        { label: 'Platinum ($85/mo)', users: 89, revenue: 7565, color: '#E5D3FF' },
                                        { label: 'Total Premium', users: 587, revenue: 19685, color: '#E91E90' },
                                    ].map(t => (
                                        <div key={t.label} style={{ textAlign: 'center', padding: 16, background: 'var(--dark-surface)', borderRadius: 12, border: `1px solid ${t.color}33` }}>
                                            <div style={{ fontSize: '0.8rem', color: t.color, fontWeight: 600, marginBottom: 8 }}>{t.label}</div>
                                            <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{t.users}</div>
                                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>users</div>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--success)', marginTop: 4 }}>${t.revenue.toLocaleString()}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

function TierBadgeInline({ tier }) {
    if (!tier || tier === 'free') return <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Free</span>
    const colors = { silver: '#C0C0C0', gold: '#FFD700', platinum: '#E5D3FF' }
    return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: '0.75rem', fontWeight: 700, color: colors[tier] }}><CrownIcon size={10} color={colors[tier]} /> {tier.charAt(0).toUpperCase() + tier.slice(1)}</span>
}

export default function AdminPage() {
    return <AdminDashboard />
}
