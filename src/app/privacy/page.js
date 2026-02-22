'use client'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
    return (
        <div style={{ background: '#fff', minHeight: '100vh' }}>
            <nav className="navbar" style={{ justifyContent: 'space-between' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src="/icon-512.png" alt="SM" style={{ width: 32, height: 32, borderRadius: 8 }} />
                    <span style={{ fontWeight: 800, fontSize: '1.1rem' }}><span className="gradient-text">Sugar</span>Mingle</span>
                </Link>
                <Link href="/auth/login" className="btn btn-ghost btn-sm">Log In</Link>
            </nav>

            <main style={{ paddingTop: 100, paddingBottom: 80 }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <h1 style={{ marginBottom: 32 }}>Privacy <span className="gradient-text">Policy</span></h1>

                    <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        <p style={{ marginBottom: 20 }}>Last Updated: February 23, 2026</p>

                        <h3 style={{ color: 'var(--text-primary)', marginTop: 32, marginBottom: 12 }}>1. Information We Collect</h3>
                        <p style={{ marginBottom: 16 }}>
                            We collect information that you provide directly to us when you create an account, update your profile, and use our messaging features. This includes your name, email address, age, gender, location, and photos.
                        </p>

                        <h3 style={{ color: 'var(--text-primary)', marginTop: 32, marginBottom: 12 }}>2. How We Use Your Information</h3>
                        <p style={{ marginBottom: 16 }}>
                            We use your information to provide our services, facilitate matches, ensure platform safety, and improve your user experience. Your location data is used to show you nearby profiles.
                        </p>

                        <h3 style={{ color: 'var(--text-primary)', marginTop: 32, marginBottom: 12 }}>3. Data Security</h3>
                        <p style={{ marginBottom: 16 }}>
                            We implement robust security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                        </p>

                        <h3 style={{ color: 'var(--text-primary)', marginTop: 32, marginBottom: 12 }}>4. Third-Party Sharing</h3>
                        <p style={{ marginBottom: 16 }}>
                            We do not sell your personal data. We may share information with service providers (like payment processors) only as necessary to provide our services.
                        </p>

                        <h3 style={{ color: 'var(--text-primary)', marginTop: 32, marginBottom: 12 }}>5. Your Rights</h3>
                        <p style={{ marginBottom: 16 }}>
                            You have the right to access, correct, or delete your personal information at any time through your account settings. For data deletion requests, please contact our support team.
                        </p>

                        <p style={{ marginTop: 40, borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                            If you have any questions about this Privacy Policy, please contact us at <span style={{ color: 'var(--primary)' }}>privacy@sugarmingleextra.com</span>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
