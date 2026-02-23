'use client'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { VerifiedIcon, ShieldIcon, DiamondIcon, HeartIcon, MapPinIcon } from '@/lib/icons'

export default function AboutPage() {
    return (
        <div style={{ background: '#fff', minHeight: '100vh' }}>
            <nav className="navbar" style={{ justifyContent: 'space-between' }}>
                <Link href="/" className="logo-wrap">
                    <img src="/icon-512.png" alt="SM" className="logo-img" />
                    <span className="logo-text"><span className="gradient-text">Sugar Mingle</span> Extra</span>
                </Link>
                <Link href="/auth/register" className="btn btn-primary btn-sm">Join Now</Link>
            </nav>

            <main style={{ paddingTop: 100, paddingBottom: 80 }}>
                <div className="container" style={{ maxWidth: 820 }}>
                    <div className="section-tag" style={{ margin: '0 auto 16px', display: 'table' }}>Our Story</div>
                    <h1 style={{ textAlign: 'center', marginBottom: 24 }}>About <span className="gradient-text">Sugar Mingle Extra</span></h1>

                    <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 40, textAlign: 'center' }}>
                        Sugar Mingle Extra was built with one goal: to create a genuinely safe, premium, and rewarding space where real people can find meaningful connections — without any limits or labels.
                    </p>

                    {/* Active Users Banner */}
                    <div style={{
                        background: 'var(--gradient-soft)',
                        border: '1px solid rgba(233,30,144,0.15)',
                        borderRadius: 20,
                        padding: '32px 28px',
                        textAlign: 'center',
                        marginBottom: 60,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 8,
                    }}>
                        <div className="section-tag" style={{ margin: 0 }}>Global Reach</div>
                        <div style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900 }} className="gradient-text">10M+</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Active Members Worldwide</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: 400 }}>
                            People from all walks of life — professionals, adventurers, creatives — finding genuine connections in 180+ countries.
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 60 }}>
                        <div className="card">
                            <VerifiedIcon size={32} color="var(--primary)" />
                            <h3 style={{ marginTop: 16, marginBottom: 8, fontSize: '1.15rem' }}>Quality Over Quantity</h3>
                            <p style={{ fontSize: '0.9rem' }}>Our strict verification ensures every profile is real. No bots, no fakes — only genuine people ready to connect.</p>
                        </div>
                        <div className="card">
                            <ShieldIcon size={32} color="var(--primary)" />
                            <h3 style={{ marginTop: 16, marginBottom: 8, fontSize: '1.15rem' }}>Safety First</h3>
                            <p style={{ fontSize: '0.9rem' }}>Your privacy and security are our top priorities. Advanced encryption and AI moderation keep bad actors out.</p>
                        </div>
                        <div className="card">
                            <HeartIcon size={32} color="var(--primary)" />
                            <h3 style={{ marginTop: 16, marginBottom: 8, fontSize: '1.15rem' }}>Open to Everyone</h3>
                            <p style={{ fontSize: '0.9rem' }}>No labels, no categories. Every adult is welcome to find the kind of connection that suits them best.</p>
                        </div>
                        <div className="card">
                            <MapPinIcon size={32} color="var(--primary)" />
                            <h3 style={{ marginTop: 16, marginBottom: 8, fontSize: '1.15rem' }}>Truly Global</h3>
                            <p style={{ fontSize: '0.9rem' }}>Available in 180+ countries with local payment support, so distance is never a barrier to finding your match.</p>
                        </div>
                    </div>

                    <h2 style={{ marginBottom: 20 }}>The Sugar Mingle Extra Difference</h2>
                    <p style={{ marginBottom: 20 }}>
                        Unlike traditional dating apps, Sugar Mingle Extra understands that modern relationships come in all forms. Whether you are looking for love, companionship, adventure or a genuine long-term connection, our platform gives you the tools to find it — safely, privately, and anywhere in the world.
                    </p>
                    <p style={{ marginBottom: 48 }}>
                        Our platform is built on transparency, respect, and mutual benefit. We believe everyone deserves a relationship that enhances their lifestyle and meets their needs — whatever those may be.
                    </p>

                    <div style={{ background: 'var(--gradient-soft)', padding: 40, borderRadius: 24, textAlign: 'center' }}>
                        <DiamondIcon size={40} color="var(--primary)" />
                        <h3 style={{ marginTop: 12 }}>Ready for a Premium Experience?</h3>
                        <p style={{ marginBottom: 24, marginTop: 8, maxWidth: 400, margin: '8px auto 24px' }}>
                            Join over 10 million verified members worldwide — it's free to get started.
                        </p>
                        <Link href="/auth/register" className="btn btn-primary btn-lg">Create Your Profile</Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
