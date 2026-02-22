'use client'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { CrownIcon, VerifiedIcon, ShieldIcon, DiamondIcon } from '@/lib/icons'

export default function AboutPage() {
    return (
        <div style={{ background: '#fff', minHeight: '100vh' }}>
            <nav className="navbar" style={{ justifyContent: 'space-between' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src="/icon-512.png" alt="SM" style={{ width: 32, height: 32, borderRadius: 8 }} />
                    <span style={{ fontWeight: 800, fontSize: '1.1rem' }}><span className="gradient-text">Sugar Mingle</span> Extra</span>
                </Link>
                <Link href="/auth/register" className="btn btn-primary btn-sm">Join Now</Link>
            </nav>

            <main style={{ paddingTop: 100, paddingBottom: 80 }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <div className="section-tag" style={{ margin: '0 auto 16px', display: 'table' }}>Our Mission</div>
                    <h1 style={{ textAlign: 'center', marginBottom: 24 }}>About <span className="gradient-text">Sugar Mingle Extra</span></h1>

                    <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 40, textAlign: 'center' }}>
                        Sugar Mingle Extra was founded with a single goal: to redefine the sugar dating experience by creating a safe, elite, and genuinely rewarding environment for ambitious individuals worldwide.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 60 }}>
                        <div className="card">
                            <VerifiedIcon size={32} color="var(--primary)" />
                            <h3 style={{ marginTop: 16, marginBottom: 8, fontSize: '1.2rem' }}>Quality Over Quantity</h3>
                            <p style={{ fontSize: '0.9rem' }}>We don't just want members; we want the right members. Our strict verification process ensures that every profile you see belongs to a real person.</p>
                        </div>
                        <div className="card">
                            <ShieldIcon size={32} color="var(--primary)" />
                            <h3 style={{ marginTop: 16, marginBottom: 8, fontSize: '1.2rem' }}>Safety First</h3>
                            <p style={{ fontSize: '0.9rem' }}>Your privacy and security are our top priorities. We use advanced encryption and AI moderation to keep out bad actors and scammers.</p>
                        </div>
                    </div>

                    <h2 style={{ marginBottom: 24 }}>The Sugar Mingle Extra Difference</h2>
                    <p style={{ marginBottom: 20 }}>
                        Unlike generic dating apps, Sugar Mingle Extra understands the unique dynamics of sugar relationships. Whether you are a successful professional looking to spoil someone special or an ambitious individual seeking mentorship and luxury, we provide the tools to connect you with like-minded partners.
                    </p>
                    <p style={{ marginBottom: 40 }}>
                        Our platform is built on transparency, respect, and mutual benefit. We believe that everyone deserves a relationship that meets their needs and enhances their lifestyle.
                    </p>

                    <div style={{ background: 'var(--gradient-soft)', padding: 40, borderRadius: 24, textAlign: 'center' }}>
                        <DiamondIcon size={40} color="var(--primary)" />
                        <h3 style={{ marginTop: 12 }}>Ready for a Premium Experience?</h3>
                        <p style={{ marginBottom: 24, marginTop: 8 }}>Join the most exclusive community of verified sugar mummies, daddies, and babies.</p>
                        <Link href="/auth/register" className="btn btn-primary btn-lg">Create Your Profile</Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
