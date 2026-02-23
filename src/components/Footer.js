'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function Logo() {
    return (
        <div className="logo-wrap">
            <img src="/icon-512.png" alt="Sugar Mingle Extra" className="logo-img" />
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>
                <span style={{ background: 'linear-gradient(135deg, #E91E90 0%, #FF8C42 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sugar Mingle</span> Extra
            </span>
        </div>
    )
}

export default function Footer() {
    const router = useRouter()

    const columns = [
        {
            title: 'Company',
            links: [
                { text: 'About Us', href: '/about' },
                { text: 'How it Works', href: '/#how-it-works' },
                { text: 'Pricing Plans', href: '/pricing' },
                { text: 'Success Stories', href: '/#' },
            ]
        },
        {
            title: 'Support',
            links: [
                { text: 'Safety Center', href: '/safety' },
                { text: 'Contact Us', href: '/contact' },
                { text: 'Help Center', href: '/contact' },
                { text: 'Report a Scam', href: '/contact' },
            ]
        },
        {
            title: 'Legal',
            links: [
                { text: 'Privacy Policy', href: '/privacy' },
                { text: 'Terms of Service', href: '/terms' },
                { text: 'Cookie Policy', href: '/cookies' },
                { text: 'GDPR Compliance', href: '/gdpr' },
            ]
        }
    ]

    return (
        <footer style={{
            background: '#0a0004',
            color: '#fff',
            padding: '60px 24px 30px',
            borderTop: '1px solid rgba(233,18,144,0.1)'
        }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 40 }}>
                    <div style={{ maxWidth: 280 }}>
                        <Logo />
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: 16, lineHeight: 1.6 }}>
                            Sugar Mingle Extra is the world's leading premium dating platform, connecting real, verified people across 180+ countries worldwide. Love has no limits.
                        </p>
                        {/* Stats row */}
                        <div style={{ display: 'flex', gap: 20, marginTop: 20, flexWrap: 'wrap' }}>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '1rem', background: 'linear-gradient(135deg, #E91E90, #FF8C42)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>10M+</div>
                                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)' }}>Members</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '1rem', background: 'linear-gradient(135deg, #E91E90, #FF8C42)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>180+</div>
                                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)' }}>Countries</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '1rem', background: 'linear-gradient(135deg, #E91E90, #FF8C42)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>98%</div>
                                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)' }}>Verified</div>
                            </div>
                        </div>
                    </div>

                    {columns.map(col => (
                        <div key={col.title}>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 20, color: '#fff' }}>{col.title}</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {col.links.map(link => (
                                    <Link key={link.text} href={link.href} style={{
                                        color: 'rgba(255,255,255,0.4)',
                                        fontSize: '0.82rem',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s'
                                    }} onMouseOver={e => e.target.style.color = '#E91E90'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>
                                        {link.text}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: 30,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 20
                }}>
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
                        © 2026 Sugar Mingle Extra. All rights reserved. Powered &amp; Regulated by <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>NexMingle Limited</span>.
                    </div>
                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                        {[
                            { label: 'X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                            { label: 'F', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                        ].map(s => (
                            <div key={s.label} style={{
                                width: 34, height: 34, borderRadius: '50%',
                                background: 'rgba(255,255,255,0.05)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', transition: 'background 0.2s'
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)">
                                    <path d={s.path} />
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
