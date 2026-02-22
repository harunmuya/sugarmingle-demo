'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function Logo() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/icon-512.png" alt="SugarMingle" style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'contain' }} />
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>
                <span style={{ background: 'linear-gradient(135deg, #E91E90 0%, #FF8C42 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sugar</span>Mingle
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
                    <div style={{ maxWidth: 280 }}>
                        <Logo />
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: 16, lineHeight: 1.6 }}>
                            SugarMingle is the leading premium sugar dating platform connecting verified sugar mummies, daddies, and babies worldwide.
                        </p>
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
                        © 2026 SugarMingle. All rights reserved. Registered trademark of SugarMingle Global.
                    </div>
                    <div style={{ display: 'flex', gap: 20 }}>
                        {/* Social placeholders as simple CSS circles or icons */}
                        {['T', 'F', 'I', 'L'].map(s => (
                            <div key={s} style={{
                                width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.05)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem',
                                color: 'rgba(255,255,255,0.4)', cursor: 'pointer'
                            }}>{s}</div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
