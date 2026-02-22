'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/lib/context'
import { ShieldIcon } from '@/lib/icons'

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
            // Check localStorage for existing user
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
            // New login — create minimal user
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
            showToast(`Welcome! Complete your profile to start matching.`, 'success')
            router.push('/onboarding')
        }, 600)
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div style={{ width: '100%', maxWidth: 400 }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <img src="/icon-512.png" alt="SugarMingle" style={{ width: 56, height: 56, borderRadius: 16, objectFit: 'contain', marginBottom: 12 }} />
                    <h1 style={{ fontSize: '1.5rem', marginBottom: 4 }}>Welcome Back</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Log in to continue your matches</p>
                </div>

                <div className="card" style={{ padding: 28 }}>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group" style={{ marginBottom: 16 }}>
                            <label className="input-label">Email</label>
                            <input className="input" type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" />
                        </div>
                        <div className="input-group" style={{ marginBottom: 8 }}>
                            <label className="input-label">Password</label>
                            <input className="input" type="password" required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Your password" />
                        </div>
                        <div style={{ textAlign: 'right', marginBottom: 20 }}>
                            <Link href="#" style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Forgot password?</Link>
                        </div>
                        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                            {loading ? 'Signing In...' : 'Log In'}
                        </button>
                    </form>
                </div>

                <div style={{ textAlign: 'center', marginTop: 16, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Don't have an account? <Link href="/auth/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign Up Free</Link>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 24, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <ShieldIcon size={12} color="#E91E90" /> Your data is encrypted and secure
                </div>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return <LoginForm />
}
