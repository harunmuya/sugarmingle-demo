'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/lib/context'
import { ShieldIcon, HeartIcon, VerifiedIcon } from '@/lib/icons'

// Diverse couple images for the auth panel — all races, ages, countries
const SIDE_PHOTOS = [
    { img: 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?w=600&h=800&fit=crop', caption: 'London × Nairobi' },
    { img: 'https://images.unsplash.com/photo-1529232356377-57971f020a94?w=600&h=800&fit=crop', caption: 'Paris × Lagos' },
    { img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop', caption: 'New York × Accra' },
    { img: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=800&fit=crop', caption: 'Dubai × Cape Town' },
    { img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=800&fit=crop', caption: 'Florence × Mumbai' },
    { img: 'https://images.unsplash.com/photo-1501901609772-df0848060b33?w=600&h=800&fit=crop', caption: 'Toronto × Johannesburg' },
]

function AuthSidePanel() {
    const [current, setCurrent] = useState(0)
    const photo = SIDE_PHOTOS[current]

    return (
        <div className="auth-side-panel">
            {/* Stack of photos with blur behind */}
            <div className="auth-side-photos">
                {SIDE_PHOTOS.map((p, i) => (
                    <img
                        key={i}
                        src={p.img}
                        alt={p.caption}
                        className={`auth-side-photo${i === current ? ' auth-side-photo-active' : ''}`}
                    />
                ))}
            </div>
            {/* Overlay */}
            <div className="auth-side-overlay">
                <div className="auth-side-brand">
                    <img src="/icon-512.png" alt="SME" className="auth-side-logo" />
                    <span className="auth-side-name"><span className="gradient-text">Sugar Mingle</span> Extra</span>
                </div>
                <div className="auth-side-stats">
                    <div className="auth-stat"><div className="auth-stat-val">10M+</div><div className="auth-stat-lbl">Members</div></div>
                    <div className="auth-stat"><div className="auth-stat-val">180+</div><div className="auth-stat-lbl">Countries</div></div>
                    <div className="auth-stat"><div className="auth-stat-val">98%</div><div className="auth-stat-lbl">Verified</div></div>
                </div>
                <div className="auth-side-caption">
                    <div className="auth-side-verified">✓ Verified Match · {photo.caption}</div>
                    <div className="auth-side-dots">
                        {SIDE_PHOTOS.map((_, i) => (
                            <button key={i} className={`auth-dot${i === current ? ' auth-dot-active' : ''}`} onClick={() => setCurrent(i)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function LoginForm() {
    const router = useRouter()
    const { setUser, showToast } = useApp()
    const [form, setForm] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.email || !form.password) { showToast('Please fill all fields', 'error'); return }
        setLoading(true)
        setTimeout(() => {
            const saved = localStorage.getItem('sm_user')
            if (saved) {
                const existing = JSON.parse(saved)
                if (existing.email === form.email) {
                    setUser(existing)
                    showToast(`Welcome back, ${existing.name}!`, 'success')
                    router.push('/discover')
                    return
                }
            }
            const newUser = {
                id: 'u_' + Date.now(),
                email: form.email,
                name: form.email.split('@')[0],
                photos: [],
                interests: [],
                verified: false,
                joinedAt: Date.now(),
                onboarded: false,
            }
            setUser(newUser)
            showToast('Welcome! Complete your profile to start matching.', 'success')
            router.push('/onboarding')
        }, 600)
    }

    return (
        <div className="auth-page">
            <AuthSidePanel />
            <div className="auth-form-col">
                <div className="auth-form-inner">
                    <div style={{ textAlign: 'center', marginBottom: 28 }}>
                        <img src="/icon-512.png" alt="SME" style={{ width: 52, height: 52, borderRadius: 14, objectFit: 'contain', marginBottom: 10 }} />
                        <h1 style={{ fontSize: '1.6rem', marginBottom: 4 }}>Welcome Back</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Log in to continue your matches</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div className="input-group">
                            <label className="input-label">Email</label>
                            <input className="input" type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Password</label>
                            <input className="input" type="password" required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Your password" />
                        </div>
                        <div style={{ textAlign: 'right', marginTop: -8 }}>
                            <Link href="#" style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Forgot password?</Link>
                        </div>
                        <button type="submit" className="btn btn-primary w-full" disabled={loading} style={{ marginTop: 4 }}>
                            {loading ? 'Signing In...' : 'Log In'}
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: 20, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        No account? <Link href="/auth/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>Join Free</Link>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 20, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        <ShieldIcon size={12} color="#E91E90" /> Your data is encrypted and secure · NexMingle Limited
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return <LoginForm />
}
