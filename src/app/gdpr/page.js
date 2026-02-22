'use client'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function GDPRPage() {
    return (
        <div style={{ background: '#fff', minHeight: '100vh' }}>
            <nav className="navbar" style={{ justifyContent: 'space-between' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src="/icon-512.png" alt="SM" style={{ width: 32, height: 32, borderRadius: 8 }} />
                    <span style={{ fontWeight: 800, fontSize: '1.1rem' }}><span className="gradient-text">Sugar</span>Mingle</span>
                </Link>
                <Link href="/auth/register" className="btn btn-primary btn-sm">Join Free</Link>
            </nav>

            <main style={{ paddingTop: 100, paddingBottom: 80 }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <h1 style={{ marginBottom: 32 }}>GDPR <span className="gradient-text">Compliance</span></h1>

                    <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        <p style={{ marginBottom: 20 }}>Last Updated: February 23, 2026</p>

                        <h3 style={{ color: 'var(--text-primary)', marginTop: 32, marginBottom: 12 }}>1. Your Data Rights</h3>
                        <p style={{ marginBottom: 16 }}>
                            Under the General Data Protection Regulation (GDPR), users within the European Economic Area (EEA) have strict rights concerning their personal data. SugarMingle extends these rights to all our global users for ultimate transparency.
                        </p>

                        <h3 style={{ color: 'var(--text-primary)', marginTop: 32, marginBottom: 12 }}>2. Data Portability & Access</h3>
                        <p style={{ marginBottom: 16 }}>
                            You have the right to request a complete copy of the personal data we hold about you. You may also request that we transfer this data directly to another service provider where technically feasible.
                        </p>

                        <h3 style={{ color: 'var(--text-primary)', marginTop: 32, marginBottom: 12 }}>3. Right to Erasure ("Right to be Forgotten")</h3>
                        <p style={{ marginBottom: 16 }}>
                            You can permanently delete your account and all associated personal data at any time via the "Danger Zone" in your account Settings. Once initiated, your data is irretrievably purged from our active databases.
                        </p>

                        <h3 style={{ color: 'var(--text-primary)', marginTop: 32, marginBottom: 12 }}>4. Consent & Processing</h3>
                        <p style={{ marginBottom: 16 }}>
                            We only process your data based on your explicit consent, which you provide during registration. You have the right to withdraw this consent at any time by deleting your account.
                        </p>

                        <p style={{ marginTop: 40, borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                            For any GDPR-related data requests, please contact our Data Protection Officer at <span style={{ color: 'var(--primary)' }}>privacy@sugarmingleextra.com</span>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
