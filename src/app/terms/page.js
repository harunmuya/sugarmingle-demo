'use client'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function TermsPage() {
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
                    <h1 style={{ marginBottom: 32 }}>Terms of <span className="gradient-text">Service</span></h1>

                    <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        <p style={{ marginBottom: 20 }}>Last Updated: February 23, 2026</p>

                        <h3 style={{ color: 'var(--text-primary)', marginTop: 32, marginBottom: 12 }}>1. Acceptance of Terms</h3>
                        <p style={{ marginBottom: 16 }}>
                            By creating an account on SugarMingle, you agree to abide by these Terms of Service. If you do not agree, you must not use the platform.
                        </p>

                        <h3 style={{ color: 'var(--text-primary)', marginTop: 32, marginBottom: 12 }}>2. Eligibility</h3>
                        <p style={{ marginBottom: 16 }}>
                            You must be at least 18 years of age to use SugarMingle. By using the app, you represent and warrant that you have the right, authority, and capacity to enter into this agreement.
                        </p>

                        <h3 style={{ color: 'var(--text-primary)', marginTop: 32, marginBottom: 12 }}>3. User Conduct</h3>
                        <p style={{ marginBottom: 16 }}>
                            Users must treat each other with respect. Harassment, hate speech, and illegal activities are strictly prohibited. We reserve the right to ban any user who violates these standards.
                        </p>

                        <h3 style={{ color: 'var(--text-primary)', marginTop: 32, marginBottom: 12 }}>4. Arrangement Transparency</h3>
                        <p style={{ marginBottom: 16 }}>
                            SugarMingle facilitates connections. We do not participate in or guarantee any specific arrangements between users. All interactions are at the users' own risk and discretion.
                        </p>

                        <h3 style={{ color: 'var(--text-primary)', marginTop: 32, marginBottom: 12 }}>5. Payments & Refunds</h3>
                        <p style={{ marginBottom: 16 }}>
                            Subscriptions are billed on a recurring basis. Refunds are handled on a case-by-case basis through our support team.
                        </p>

                        <h3 style={{ color: 'var(--text-primary)', marginTop: 32, marginBottom: 12 }}>6. Account Termination</h3>
                        <p style={{ marginBottom: 16 }}>
                            We reserve the right to suspend or terminate accounts for violations of these terms or for any behavior that harms the community.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
