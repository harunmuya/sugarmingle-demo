'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'
import { SettingsIcon, ShieldIcon, LockIcon, CrownIcon, MapPinIcon, UserIcon } from '@/lib/icons'

export default function SettingsPage() {
    const router = useRouter()
    const { user, setUser, tier, showToast } = useApp()
    const [showDelete, setShowDelete] = useState(false)
    const [settings, setSettings] = useState({
        pushNotifications: user?.settings?.pushNotifications ?? true,
        emailNotifications: user?.settings?.emailNotifications ?? true,
        newMatchAlert: user?.settings?.newMatchAlert ?? true,
        messageAlert: user?.settings?.messageAlert ?? true,
        likeAlert: user?.settings?.likeAlert ?? true,
        profileVisibility: user?.settings?.profileVisibility ?? 'everyone',
        showDistance: user?.settings?.showDistance ?? true,
        showOnline: user?.settings?.showOnline ?? true,
        incognito: user?.settings?.incognito ?? false,
        readReceipts: user?.settings?.readReceipts ?? true,
        ageRange: user?.settings?.ageRange ?? [18, 60],
        maxDistance: user?.settings?.maxDistance ?? 100,
    })

    const updateSetting = (key, value) => {
        const updated = { ...settings, [key]: value }
        setSettings(updated)
        setUser({ ...user, settings: updated })
        showToast('Setting updated', 'success')
    }

    const ToggleSwitch = ({ checked, onChange, disabled }) => (
        <div style={{
            width: 44, height: 24, borderRadius: 12, padding: 2, cursor: disabled ? 'not-allowed' : 'pointer',
            background: checked ? 'var(--gradient)' : 'var(--dark-border)',
            transition: 'background 0.2s', opacity: disabled ? 0.5 : 1
        }} onClick={() => !disabled && onChange(!checked)}>
            <div style={{
                width: 20, height: 20, borderRadius: '50%', background: '#fff',
                transition: 'transform 0.2s', transform: checked ? 'translateX(20px)' : 'translateX(0)'
            }} />
        </div>
    )

    const SettingRow = ({ label, desc, children }) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--dark-border)' }}>
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{label}</div>
                {desc && <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>{desc}</div>}
            </div>
            {children}
        </div>
    )

    if (!user) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 140px)', textAlign: 'center', padding: 40 }}>
                <SettingsIcon size={64} color="var(--text-muted)" />
                <h2 style={{ marginTop: 20 }}>Settings</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Sign in to manage your settings.</p>
                <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => router.push('/auth/login')}>Sign In</button>
            </div>
        )
    }

    return (
        <div style={{ padding: '16px 20px', maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <SettingsIcon size={22} color="var(--primary)" /> Settings
            </h2>

            {/* ACCOUNT */}
            <div className="card" style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: '0.95rem', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <UserIcon size={16} color="var(--primary)" /> Account
                </h3>
                <div style={{ padding: '10px 0', borderBottom: '1px solid var(--dark-border)' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Email</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user.email || 'Not set'}</div>
                </div>
                <div style={{ padding: '10px 0', borderBottom: '1px solid var(--dark-border)' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Membership</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                        {tier === 'free' ? <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Free</span> : (
                            <span style={{ color: { silver: '#C0C0C0', gold: '#FFD700', platinum: '#E5D3FF' }[tier], fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <CrownIcon size={14} color={{ silver: '#C0C0C0', gold: '#FFD700', platinum: '#E5D3FF' }[tier]} /> {tier.charAt(0).toUpperCase() + tier.slice(1)}
                            </span>
                        )}
                        {tier === 'free' && <button className="btn btn-primary btn-sm" onClick={() => router.push('/pricing')}>Upgrade</button>}
                    </div>
                </div>
                <div style={{ padding: '10px 0' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Member Since</div>
                    <div style={{ fontSize: '0.9rem' }}>{new Date(user.joinedAt || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </div>
            </div>

            {/* NOTIFICATIONS */}
            <div className="card" style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: '0.95rem', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                    Notifications
                </h3>
                <SettingRow label="Push Notifications" desc="Get notified about activity">
                    <ToggleSwitch checked={settings.pushNotifications} onChange={v => updateSetting('pushNotifications', v)} />
                </SettingRow>
                <SettingRow label="Email Notifications" desc="Receive email updates">
                    <ToggleSwitch checked={settings.emailNotifications} onChange={v => updateSetting('emailNotifications', v)} />
                </SettingRow>
                <SettingRow label="New Match Alerts">
                    <ToggleSwitch checked={settings.newMatchAlert} onChange={v => updateSetting('newMatchAlert', v)} />
                </SettingRow>
                <SettingRow label="Message Alerts">
                    <ToggleSwitch checked={settings.messageAlert} onChange={v => updateSetting('messageAlert', v)} />
                </SettingRow>
                <SettingRow label="Likes Received">
                    <ToggleSwitch checked={settings.likeAlert} onChange={v => updateSetting('likeAlert', v)} />
                </SettingRow>
            </div>

            {/* PRIVACY */}
            <div className="card" style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: '0.95rem', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ShieldIcon size={16} color="var(--primary)" /> Privacy
                </h3>
                <SettingRow label="Profile Visibility" desc="Who can see your profile">
                    <select className="select" style={{ width: 'auto', minWidth: 130 }} value={settings.profileVisibility}
                        onChange={e => updateSetting('profileVisibility', e.target.value)}>
                        <option value="everyone">Everyone</option>
                        <option value="matches">Matches Only</option>
                        <option value="verified">Verified Only</option>
                    </select>
                </SettingRow>
                <SettingRow label="Show Distance">
                    <ToggleSwitch checked={settings.showDistance} onChange={v => updateSetting('showDistance', v)} />
                </SettingRow>
                <SettingRow label="Show Online Status">
                    <ToggleSwitch checked={settings.showOnline} onChange={v => updateSetting('showOnline', v)} />
                </SettingRow>
                <SettingRow label="Read Receipts" desc="Let others see when you've read their messages">
                    <ToggleSwitch checked={settings.readReceipts} onChange={v => updateSetting('readReceipts', v)} />
                </SettingRow>
                <SettingRow label="Incognito Mode" desc={tier === 'free' || tier === 'silver' ? 'Gold+ feature' : 'Browse without appearing in discovery'}>
                    <ToggleSwitch
                        checked={settings.incognito}
                        onChange={v => {
                            if (tier === 'free' || tier === 'silver') { showToast('Incognito Mode is a Gold+ feature', 'error'); return }
                            updateSetting('incognito', v)
                        }}
                        disabled={tier === 'free' || tier === 'silver'}
                    />
                </SettingRow>
            </div>

            {/* DISCOVERY PREFERENCES */}
            <div className="card" style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: '0.95rem', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <MapPinIcon size={16} color="var(--primary)" /> Discovery Preferences
                </h3>
                <SettingRow label="Age Range" desc={`${settings.ageRange[0]} - ${settings.ageRange[1]}`}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <input type="number" className="input" style={{ width: 60, textAlign: 'center' }}
                            min="18" max="80" value={settings.ageRange[0]}
                            onChange={e => updateSetting('ageRange', [Number(e.target.value), settings.ageRange[1]])} />
                        <span style={{ color: 'var(--text-muted)' }}>to</span>
                        <input type="number" className="input" style={{ width: 60, textAlign: 'center' }}
                            min="18" max="80" value={settings.ageRange[1]}
                            onChange={e => updateSetting('ageRange', [settings.ageRange[0], Number(e.target.value)])} />
                    </div>
                </SettingRow>
                <SettingRow label="Max Distance" desc={`${settings.maxDistance} km`}>
                    <input type="range" min="1" max="500" value={settings.maxDistance}
                        onChange={e => updateSetting('maxDistance', Number(e.target.value))}
                        style={{ width: 150, accentColor: '#E91E90' }} />
                </SettingRow>
            </div>

            {/* DANGER ZONE */}
            <div className="card" style={{ marginBottom: 20, borderColor: 'rgba(255,59,48,0.3)' }}>
                <h3 style={{ fontSize: '0.95rem', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <LockIcon size={16} color="var(--error)" /> Danger Zone
                </h3>
                <button className="btn btn-ghost w-full" style={{ marginBottom: 8, justifyContent: 'flex-start', color: 'var(--text-secondary)' }}
                    onClick={() => {
                        localStorage.removeItem('sm_user')
                        localStorage.removeItem('sm_tier')
                        localStorage.removeItem('sm_matches')
                        localStorage.removeItem('sm_convos')
                        window.location.href = '/'
                    }}>
                    Log Out
                </button>
                <button className="btn btn-ghost w-full" style={{ justifyContent: 'flex-start', color: 'var(--error)' }}
                    onClick={() => setShowDelete(true)}>
                    Delete Account
                </button>
            </div>

            {/* DELETE CONFIRMATION */}
            {showDelete && (
                <div className="modal-overlay" onClick={() => setShowDelete(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h3>Delete Account?</h3>
                        <p style={{ color: 'var(--text-muted)', margin: '12px 0', fontSize: '0.9rem' }}>
                            This action is permanent and cannot be reversed. All your data, matches, and conversations will be lost.
                        </p>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button className="btn btn-ghost" onClick={() => setShowDelete(false)}>Cancel</button>
                            <button className="btn" style={{ background: 'var(--error)', color: '#fff', border: 'none' }}
                                onClick={() => {
                                    localStorage.clear()
                                    window.location.href = '/'
                                }}>Delete Forever</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
