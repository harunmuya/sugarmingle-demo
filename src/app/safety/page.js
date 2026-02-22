'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { ShieldIcon, LockIcon, VerifiedIcon, CheckIcon, StarIcon, CameraIcon, MapPinIcon } from '@/lib/icons'

function SafetyContent() {
    const router = useRouter()
    const { user, showToast } = useApp()
    const [reportForm, setReportForm] = useState({ name: '', reason: '', details: '' })
    const [submitted, setSubmitted] = useState(false)

    const rules = [
        { icon: <ShieldIcon size={32} color="var(--primary)" />, title: 'Zero Tolerance for Scams', desc: 'Any user found attempting to scam, extort, or deceive others will be permanently banned within 24 hours. We actively monitor and prosecute fraudulent behaviour.' },
        { icon: <CameraIcon size={32} color="var(--primary)" />, title: 'Photo Verification', desc: "Our AI-assisted photo verification ensures your matches' photos are real. Verified badges mean the profile has passed our review." },
        { icon: <LockIcon size={32} color="var(--primary)" />, title: 'Private by Default', desc: 'Your location is only shown as approximate distance. Your phone number is never shared. Video calls happen inside our app only.' },
        { icon: <VerifiedIcon size={32} color="var(--primary)" />, title: 'Moderation Team', desc: 'Our 24/7 trust & safety team reviews every report within 24 hours. Serious violations are escalated within 2 hours.' },
        { icon: <MapPinIcon size={32} color="var(--primary)" />, title: 'Location Privacy', desc: 'Your exact location is never shared. We only show approximate distance to protect your privacy.' },
        { icon: <CheckIcon size={32} color="var(--primary)" />, title: 'Legal Compliance', desc: "We comply with GDPR, Kenya's Data Protection Act, Nigeria's NDPR, and other regional data privacy laws." },
    ]

    const handleReport = (e) => {
        e.preventDefault()
        setSubmitted(true)
        showToast('Report submitted. Our team will review within 24 hours.', 'success')
    }

    return (
        <div>
            <nav className="navbar" style={{ justifyContent: 'space-between' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                    <img src="/icon-512.png" alt="SM" style={{ width: 36, height: 36, borderRadius: 10, objectFit: 'contain' }} />
                    <span style={{ fontWeight: 800, fontSize: '1.2rem' }}><span className="gradient-text">Sugar Mingle</span> Extra</span>
                </Link>
                {user && <Link href="/discover" className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg> App
                </Link>}
            </nav>

            <main className="main-content">
                <div className="container-md">
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <div className="section-tag">Safety Center</div>
                        <h1>Your Safety is Our <span className="gradient-text">Priority</span></h1>
                        <p style={{ maxWidth: 500, margin: '12px auto 0' }}>
                            Sugar Mingle Extra was built to be the scam-free alternative. Here's how we protect you.
                        </p>
                    </div>

                    <div className="grid-3" style={{ marginBottom: 48 }}>
                        {rules.map(r => (
                            <div key={r.title} className="glass-card">
                                <div style={{ marginBottom: 10 }}>{r.icon}</div>
                                <h3 style={{ fontSize: '1rem', marginBottom: 8 }}>{r.title}</h3>
                                <p style={{ fontSize: '0.82rem' }}>{r.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* TIPS */}
                    <div className="card" style={{ marginBottom: 32 }}>
                        <h2 style={{ fontSize: '1.2rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <StarIcon size={20} color="#FFD700" />
                            Safe Dating Tips
                        </h2>
                        {[
                            "Never send money to someone you haven't met in person — regardless of their story.",
                            "Use Sugar Mingle Extra's in-app video call before agreeing to meet. It's free for all users.",
                            'Share your date location with a trusted friend using our Share Date feature.',
                            'Report any requests for gift cards, wire transfers, or cryptocurrency immediately.',
                            'Trust your instincts — if something feels off, block and report.',
                            'Verified badge means the user has passed photo verification. Always prefer verified profiles.',
                        ].map((tip, i) => (
                            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                                <span style={{ color: 'var(--primary)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{tip}</span>
                            </div>
                        ))}
                    </div>

                    {/* REPORT FORM */}
                    <div className="card">
                        <h2 style={{ fontSize: '1.2rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <ShieldIcon size={20} color="var(--primary)" />
                            Report a User or Issue
                        </h2>
                        {submitted ? (
                            <div style={{ textAlign: 'center', padding: '32px 20px' }}>
                                <div style={{ marginBottom: 12 }}><CheckIcon size={48} color="var(--success)" /></div>
                                <h3>Report Submitted</h3>
                                <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Our safety team will review within 24 hours. Thank you for helping keep Sugar Mingle Extra safe.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleReport}>
                                <div className="input-group">
                                    <label className="input-label">Username or Profile Name to Report</label>
                                    <input className="input" type="text" placeholder="Reported user's name" value={reportForm.name} onChange={e => setReportForm(f => ({ ...f, name: e.target.value }))} required />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Reason</label>
                                    <select className="select" value={reportForm.reason} onChange={e => setReportForm(f => ({ ...f, reason: e.target.value }))} required>
                                        <option value="">Select reason...</option>
                                        <option>Fake profile / catfish</option>
                                        <option>Money scam attempt</option>
                                        <option>Inappropriate content</option>
                                        <option>Harassment or abuse</option>
                                        <option>Underage user</option>
                                        <option>Spam / bot</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Details</label>
                                    <textarea className="textarea" placeholder="Describe what happened..." value={reportForm.details} onChange={e => setReportForm(f => ({ ...f, details: e.target.value }))} rows={4} />
                                </div>
                                <button type="submit" className="btn btn-primary w-full" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <ShieldIcon size={16} color="#fff" /> Submit Report
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default function SafetyPage() {
    return <SafetyContent />
}
