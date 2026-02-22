'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/lib/context'
import { HeartIcon, ShieldIcon, VerifiedIcon, MapPinIcon } from '@/lib/icons'



function RegisterForm() {
    const router = useRouter()
    const { setUser, showToast } = useApp()
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', age: '', role: 'Sugar Baby', gender: 'Woman', agree: false })
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1) // 2-step form

    const update = (key, value) => setForm(f => ({ ...f, [key]: value }))

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.agree) { showToast('Please agree to the Terms of Service', 'error'); return }
        if (form.password !== form.confirmPassword) { showToast('Passwords do not match', 'error'); return }
        if (form.password.length < 6) { showToast('Password must be at least 6 characters', 'error'); return }
        if (Number(form.age) < 18) { showToast('You must be 18 or older to join', 'error'); return }

        setLoading(true)
        setTimeout(() => {
            const newUser = {
                id: 'u_' + Date.now(),
                name: form.name,
                email: form.email,
                age: Number(form.age),
                role: form.role,
                gender: form.gender,
                photos: [],
                interests: [],
                verified: false,
                bio: '',
                location: '',
                joinedAt: Date.now(),
                onboarded: false,
            }
            setUser(newUser)
            showToast(`Welcome to SugarMingle, ${form.name}!`, 'success')
            router.push('/onboarding')
        }, 800)
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div style={{ width: '100%', maxWidth: 440 }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <img src="/icon-512.png" alt="SugarMingle" style={{ width: 56, height: 56, borderRadius: 16, objectFit: 'contain', marginBottom: 12 }} />
                    <h1 style={{ fontSize: '1.5rem', marginBottom: 4 }}>Create Your Account</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Join 2M+ members worldwide</p>
                </div>

                <div className="card" style={{ padding: 28 }}>
                    {/* Progress */}
                    <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                        <div style={{ flex: 1, height: 3, borderRadius: 2, background: 'var(--gradient)' }} />
                        <div style={{ flex: 1, height: 3, borderRadius: 2, background: step >= 2 ? 'var(--gradient)' : 'var(--dark-border)' }} />
                    </div>

                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <>
                                <div className="input-group" style={{ marginBottom: 16 }}>
                                    <label className="input-label">Full Name</label>
                                    <input className="input" required value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your full name" />
                                </div>
                                <div className="input-group" style={{ marginBottom: 16 }}>
                                    <label className="input-label">Email</label>
                                    <input className="input" type="email" required value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" />
                                </div>
                                <div className="input-group" style={{ marginBottom: 16 }}>
                                    <label className="input-label">Age</label>
                                    <input className="input" type="number" required min="18" max="80" value={form.age} onChange={e => update('age', e.target.value)} placeholder="Must be 18+" />
                                </div>
                                <button type="button" className="btn btn-primary w-full" onClick={() => {
                                    if (!form.name || !form.email || !form.age) { showToast('Please fill all fields', 'error'); return }
                                    if (Number(form.age) < 18) { showToast('You must be 18+', 'error'); return }
                                    setStep(2)
                                }}>Continue</button>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div className="input-group" style={{ marginBottom: 16 }}>
                                    <label className="input-label">I Am</label>
                                    <select className="select" value={form.role} onChange={e => update('role', e.target.value)}>
                                        <option>Sugar Baby</option>
                                        <option>Sugarboy</option>
                                        <option>Sugar Mummy</option>
                                        <option>Sugar Daddy</option>
                                    </select>
                                </div>
                                <div className="input-group" style={{ marginBottom: 16 }}>
                                    <label className="input-label">Gender</label>
                                    <select className="select" value={form.gender} onChange={e => update('gender', e.target.value)}>
                                        <option>Woman</option>
                                        <option>Man</option>
                                        <option>Non-binary</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="input-group" style={{ marginBottom: 16 }}>
                                    <label className="input-label">Password</label>
                                    <input className="input" type="password" required minLength="6" value={form.password} onChange={e => update('password', e.target.value)} placeholder="Min 6 characters" />
                                </div>
                                <div className="input-group" style={{ marginBottom: 16 }}>
                                    <label className="input-label">Confirm Password</label>
                                    <input className="input" type="password" required value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} placeholder="Re-enter password" />
                                </div>
                                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 20, cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    <input type="checkbox" checked={form.agree} onChange={e => update('agree', e.target.checked)} style={{ accentColor: '#E91E90', marginTop: 2 }} />
                                    I agree to the <Link href="/terms" style={{ color: 'var(--primary)' }}>Terms of Service</Link> and <Link href="/privacy" style={{ color: 'var(--primary)' }}>Privacy Policy</Link>. I confirm I am 18+.
                                </label>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>Back</button>
                                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
                                        {loading ? 'Creating Account...' : 'Create Account'}
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </div>

                <div style={{ textAlign: 'center', marginTop: 16, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Already have an account? <Link href="/auth/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Log In</Link>
                </div>

                {/* Trust badges */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 24 }}>
                    {[
                        { icon: <ShieldIcon size={16} color="#E91E90" />, text: 'Scam-Free' },
                        { icon: <VerifiedIcon size={16} />, text: 'Verified Profiles' },
                        { icon: <MapPinIcon size={16} color="#E91E90" />, text: '180+ Countries' },
                    ].map(b => (
                        <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            {b.icon} {b.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function RegisterPage() {
    return <RegisterForm />
}
