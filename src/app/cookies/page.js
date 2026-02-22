'use client'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function CookiesPage() {
    return (
        <div style={{ background: '#fff', minHeight: '100vh' }}>
            <nav className="navbar" style={{ justifyContent: 'space-between' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src="/icon-512.png" alt="SM" style={{ width: 32, height: 32, borderRadius: 8 }} />
                    <span style={{ fontWeight: 800, fontSize: '1.1rem' }}><span className="gradient-text">Sugar Mingle</span> Extra</span>
                </Link>
                <Link href="/auth/register" className="btn btn-primary btn-sm">Join Free</Link>
            </nav>

            <main style={{ paddingTop: 100, paddingBottom: 80 }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <h1 style={{ marginBottom: 32 }}>Cookie <span className="gradient-text">Policy</span></h1>

                    <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        <p style={{ marginBottom: 20 }}>Last Updated: February 23, 2026</p>

                        <h3 style={{ color: 'var(--text-primary)', marginTop: 32, marginBottom: 12 }}>1. What Are Cookies?</h3>
                        <p style={{ marginBottom: 16 }}>
                            Cookies are small text files that are placed on your device when you visit our website. They help us remember your preferences, understand how you interact with our platform, and improve your overall experience.
                        </p>

                        <h3 style={{ color: 'var(--text-primary)', marginTop: 32, marginBottom: 12 }}>2. How We Use Cookies</h3>
                        <p style={{ marginBottom: 16 }}>
                            We use essential cookies to keep you logged in and secure your account. We also use analytics cookies to understand traffic patterns and performance, which allows us to continually optimize Sugar Mingle Extra.
                        </p>

                        <h3 style={{ color: 'var(--text-primary)', marginTop: 32, marginBottom: 12 }}>3. Managing Your Preferences</h3>
                        <p style={{ marginBottom: 16 }}>
                            You can control and manage cookies through your browser settings. Please note that disabling essential cookies may impact your ability to use certain features of Sugar Mingle Extra, such as staying logged in.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
