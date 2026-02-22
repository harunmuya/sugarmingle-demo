'use client'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { MessageIcon, MapPinIcon, ShieldIcon } from '@/lib/icons'

export default function ContactPage() {
    return (
        <div style={{ background: '#fff', minHeight: '100vh' }}>
            <nav className="navbar" style={{ justifyContent: 'space-between' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src="/icon-512.png" alt="SM" style={{ width: 32, height: 32, borderRadius: 8 }} />
                    <span style={{ fontWeight: 800, fontSize: '1.1rem' }}><span className="gradient-text">Sugar Mingle</span> Extra</span>
                </Link>
                <Link href="/" className="btn btn-ghost btn-sm">Back Home</Link>
            </nav>

            <main style={{ paddingTop: 100, paddingBottom: 80 }}>
                <div className="container" style={{ maxWidth: 900 }}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <h1 style={{ marginBottom: 16 }}>Get in <span className="gradient-text">Touch</span></h1>
                        <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}>
                            Have questions or need assistance? Our support team is here to help 24/7.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: 40 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <div className="card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                <div style={{ background: 'var(--gradient-soft)', p: 10, borderRadius: 12 }}>
                                    <MessageIcon size={24} color="var(--primary)" />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: 4 }}>Email Support</h4>
                                    <p style={{ fontSize: '0.85rem' }}>support@sugarmingleextra.com</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Response time: Under 2 hours</p>
                                </div>
                            </div>

                            <div className="card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                <div style={{ background: 'var(--gradient-soft)', p: 10, borderRadius: 12 }}>
                                    <ShieldIcon size={24} color="var(--primary)" />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: 4 }}>Safety & Reporting</h4>
                                    <p style={{ fontSize: '0.85rem' }}>safety@sugarmingleextra.com</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Urgent security matters</p>
                                </div>
                            </div>

                            <div className="card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                <div style={{ background: 'var(--gradient-soft)', p: 10, borderRadius: 12 }}>
                                    <MapPinIcon size={24} color="var(--primary)" />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: 4 }}>Global Office</h4>
                                    <p style={{ fontSize: '0.85rem' }}>London, United Kingdom</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sugar Mingle Extra Global HQ</p>
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ padding: 40 }}>
                            <h3 style={{ marginBottom: 24 }}>Send us a Message</h3>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }} onSubmit={e => { e.preventDefault(); alert('Message sent! We will get back to you soon.') }}>
                                <div className="input-group">
                                    <label className="input-label">Your Name</label>
                                    <input className="input" placeholder="Enter your name" required />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Email Address</label>
                                    <input className="input" type="email" placeholder="Enter your email" required />
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Subject</label>
                                    <select className="select">
                                        <option>Account Support</option>
                                        <option>Billing Question</option>
                                        <option>Safety Report</option>
                                        <option>Partnership Inquiry</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label className="input-label">Message</label>
                                    <textarea className="textarea" placeholder="How can we help you?" required></textarea>
                                </div>
                                <button className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
