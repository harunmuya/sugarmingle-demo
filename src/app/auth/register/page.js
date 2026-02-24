'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/lib/context'
import { ShieldIcon, VerifiedIcon, MapPinIcon, HeartIcon } from '@/lib/icons'

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
            <div className="auth-side-photos">
                {SIDE_PHOTOS.map((p, i) => (
                    <img key={i} src={p.img} alt={p.caption} className={`auth-side-photo${i === current ? ' auth-side-photo-active' : ''}`} />
                ))}
            </div>
            <div className="auth-side-overlay">
                <Link href="/" className="auth-side-brand" style={{ textDecoration: 'none' }}>
                    <img src="/icon-512.png" alt="SME" className="auth-side-logo" />
                    <span className="auth-side-name"><span className="gradient-text">Sugar Mingle</span> Extra</span>
                </Link>
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

function RegisterForm() {
    const router = useRouter()
    const { setUser, showToast } = useApp()
    const [form, setForm] = useState({
        name: '', email: '', password: '', confirmPassword: '',
        age: '', gender: 'Woman', lookingFor: 'Everyone', agree: false
    })
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1)

    const update = (key, value) => setForm(f => ({ ...f, [key]: value }))

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.agree) { showToast('Please agree to the Terms of Service', 'error'); return }
        if (form.password !== form.confirmPassword) { showToast('Passwords do not match', 'error'); return }
        if (form.password.length < 6) { showToast('Password must be at least 6 characters', 'error'); return }
        if (Number(form.age) < 18) { showToast('You must be 18 or older to join', 'error'); return }

        setLoading(true)
        setTimeout(() => {
            // Check for duplicate email
            const accounts = JSON.parse(localStorage.getItem('sm_accounts') || '{}')
            if (accounts[form.email]) {
                setLoading(false)
                showToast('An account with this email already exists. Please log in.', 'error')
                return
            }
            // Store account credentials
            accounts[form.email] = form.password
            localStorage.setItem('sm_accounts', JSON.stringify(accounts))

            const newUser = {
                id: 'u_' + Date.now(),
                name: form.name,
                email: form.email,
                age: Number(form.age),
                gender: form.gender,
                lookingFor: form.lookingFor,
                photos: [],
                interests: [],
                verified: false,
                bio: '',
                location: '',
                joinedAt: Date.now(),
                onboarded: false,
            }
            setUser(newUser)
            showToast(`Welcome, ${form.name}! Let's set up your profile.`, 'success')
            router.push('/onboarding')
        }, 800)
    }

    return (
        <div className="auth-page">
            <AuthSidePanel />
            <div className="auth-form-col">
                <div className="auth-form-inner">
                    <div style={{ textAlign: 'center', marginBottom: 28 }}>
                        <Link href="/" style={{ display: 'inline-block' }}>
                            <img src="/icon-512.png" alt="SME" style={{ width: 52, height: 52, borderRadius: 14, objectFit: 'contain', marginBottom: 10 }} />
                        </Link>
                        <h2 style={{ fontSize: '1.6rem', marginBottom: 8 }}>Create Account</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Join 10M+ members worldwide — it's free</p>
                    </div>

                    {/* Step indicator */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 22 }}>
                        <div style={{ flex: 1, height: 3, borderRadius: 2, background: 'var(--gradient)' }} />
                        <div style={{ flex: 1, height: 3, borderRadius: 2, background: step >= 2 ? 'var(--gradient)' : 'rgba(233,30,144,0.15)' }} />
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {step === 1 && (
                            <>
                                <div className="input-group">
                                    <label className="input-label">Full Name</label>
                                    <input className="input" required value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your full name" />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Email</label>
                                    <input className="input" type="email" required value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Age</label>
                                    <input className="input" type="number" required min="18" max="100" value={form.age} onChange={e => update('age', e.target.value)} placeholder="Must be 18+" />
                                </div>
                                <button type="button" className="btn btn-primary w-full" style={{ marginTop: 4 }} onClick={() => {
                                    if (!form.name || !form.email || !form.age) { showToast('Please fill all fields', 'error'); return }
                                    if (Number(form.age) < 18) { showToast('You must be 18+', 'error'); return }
                                    setStep(2)
                                }}>Continue →</button>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div className="input-group">
                                    <label className="input-label">I am</label>
                                    <select className="select" value={form.gender} onChange={e => update('gender', e.target.value)}>
                                        <option>Woman</option>
                                        <option>Man</option>
                                        <option>Non-binary</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Looking for</label>
                                    <select className="select" value={form.lookingFor} onChange={e => update('lookingFor', e.target.value)}>
                                        <option>Everyone</option>
                                        <option>Women</option>
                                        <option>Men</option>
                                        <option>Non-binary people</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Password</label>
                                    <input className="input" type="password" required minLength="6" value={form.password} onChange={e => update('password', e.target.value)} placeholder="Min 6 characters" />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Confirm Password</label>
                                    <input className="input" type="password" required value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} placeholder="Re-enter password" />
                                </div>
                                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                    <input type="checkbox" checked={form.agree} onChange={e => update('agree', e.target.checked)} style={{ accentColor: '#E91E90', marginTop: 2, flexShrink: 0 }} />
                                    I agree to the <Link href="/terms" style={{ color: 'var(--primary)' }}>Terms</Link> &amp; <Link href="/privacy" style={{ color: 'var(--primary)' }}>Privacy Policy</Link>. I confirm I am 18+.
                                </label>
                                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                                    <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
                                        {loading ? 'Creating Account...' : 'Create Account 🎉'}
                                    </button>
                                </div>
                            </>
                        )}
                    </form>

                    <div style={{ textAlign: 'center', marginTop: 18, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Already have an account? <Link href="/auth/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>Log In</Link>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 18, flexWrap: 'wrap' }}>
                        {[
                            { icon: <ShieldIcon size={14} color="#E91E90" />, text: 'Scam-Free' },
                            { icon: <VerifiedIcon size={14} />, text: 'Verified Profiles' },
                            { icon: <MapPinIcon size={14} color="#E91E90" />, text: '180+ Countries' },
                        ].map(b => (
                            <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                                {b.icon} {b.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function RegisterPage() {
    return <RegisterForm />
}
