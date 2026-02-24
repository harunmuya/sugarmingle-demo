'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/lib/context'
import { DiamondIcon, CheckIcon, XIcon, ShieldIcon, StarIcon, CrownIcon, LockIcon } from '@/lib/icons'
import Footer from '@/components/Footer'

// Paystack public test key - replace with live key in production
const PAYSTACK_PUBLIC_KEY = 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

const PLANS = [
    {
        id: 'free', name: 'Free', price: 0, color: '#888',
        icon: <StarIcon size={28} color="#888" />,
        features: [
            { text: '20 likes per day', included: true },
            { text: 'Basic swipe & match', included: true },
            { text: '1 Super Like per day', included: true },
            { text: 'View profiles', included: true },
            { text: 'No ads', included: false },
            { text: 'Unlimited likes', included: false },
            { text: 'Rewind swipes', included: false },
            { text: 'Passport (change location)', included: false },
            { text: 'See who liked you', included: false },
            { text: 'Boost per month', included: false },
        ]
    },
    {
        id: 'silver', name: 'Silver', price: 15, color: '#C0C0C0',
        icon: <DiamondIcon size={28} color="#C0C0C0" />,
        features: [
            { text: 'Unlimited Likes', included: true },
            { text: '5 Super Likes per day', included: true },
            { text: 'Unlimited Rewinds', included: true },
            { text: 'No Ads', included: true },
            { text: 'Passport – swipe anywhere', included: true },
            { text: 'Incognito Mode', included: true },
            { text: 'See who liked you', included: false },
            { text: 'Top Picks daily', included: false },
            { text: '1 Boost per month', included: false },
        ]
    },
    {
        id: 'gold', name: 'Gold', price: 40, color: '#FFD700', popular: true,
        icon: <CrownIcon size={28} color="#FFD700" />,
        features: [
            { text: 'Everything in Silver', included: true },
            { text: 'See Who Liked You', included: true },
            { text: 'New Top Picks Daily', included: true },
            { text: '5 Weekly Super Likes', included: true },
            { text: '1 Free Boost per Month', included: true },
            { text: 'Gold Badge on Profile', included: true },
            { text: 'Priority Matching', included: false },
            { text: 'Message Before Matching', included: false },
            { text: 'Platinum VIP Badge', included: false },
        ]
    },
    {
        id: 'platinum', name: 'Platinum', price: 85, color: '#E5D3FF',
        icon: <DiamondIcon size={28} color="#E5D3FF" />,
        features: [
            { text: 'Everything in Gold', included: true },
            { text: 'Message Before Matching', included: true },
            { text: 'Priority Likes (shown first)', included: true },
            { text: 'See Likes Sent (7 days)', included: true },
            { text: 'Maximum Profile Visibility', included: true },
            { text: 'Platinum VIP Badge', included: true },
            { text: 'Dedicated Support', included: true },
            { text: 'Custom Passport Locations', included: true },
        ]
    }
]

function PricingContent() {
    const router = useRouter()
    const { user, tier, setTier, showToast } = useApp()
    const [localCurrency, setLocalCurrency] = useState({ code: 'USD', symbol: '$', rate: 1, country: 'US' })
    const [loadingPay, setLoadingPay] = useState(null)

    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(r => r.json())
            .then(data => {
                const rates = {
                    KE: { code: 'KES', symbol: 'KSh', rate: 130, country: 'Kenya' },
                    NG: { code: 'NGN', symbol: '₦', rate: 1600, country: 'Nigeria' },
                    GH: { code: 'GHS', symbol: 'GH₵', rate: 15, country: 'Ghana' },
                    ZA: { code: 'ZAR', symbol: 'R', rate: 18, country: 'South Africa' },
                    UG: { code: 'UGX', symbol: 'USh', rate: 3700, country: 'Uganda' },
                    TZ: { code: 'TZS', symbol: 'TSh', rate: 2600, country: 'Tanzania' },
                    GB: { code: 'GBP', symbol: '£', rate: 0.79, country: 'UK' },
                    EU: { code: 'EUR', symbol: '€', rate: 0.92, country: 'Europe' },
                    US: { code: 'USD', symbol: '$', rate: 1, country: 'USA' },
                }
                const curr = rates[data.country_code] || rates['US']
                setLocalCurrency(curr)
            })
            .catch(() => { })
    }, [])

    const formatPrice = (usd) => {
        if (usd === 0) return 'Free'
        const local = Math.round(usd * localCurrency.rate)
        return `${localCurrency.symbol}${local.toLocaleString()}`
    }

    const handlePurchase = (plan) => {
        if (!user) { router.push('/auth/register'); return }
        if (plan.id === 'free') return
        if (plan.id === tier) { showToast('You\'re already on this plan!', 'info'); return }

        setLoadingPay(plan.id)

        if (typeof window !== 'undefined' && window.PaystackPop) {
            const handler = window.PaystackPop.setup({
                key: PAYSTACK_PUBLIC_KEY,
                email: user?.email || 'user@sugarmingleextra.com',
                amount: plan.price * 100 * localCurrency.rate,
                currency: localCurrency.code,
                channels: ['card', 'mobile_money', 'bank_transfer', 'ussd', 'qr'],
                ref: `sm_${plan.id}_${Date.now()}`,
                metadata: {
                    custom_fields: [
                        { display_name: 'Plan', variable_name: 'plan', value: plan.name },
                        { display_name: 'User', variable_name: 'user_id', value: user?.id || 'guest' },
                    ]
                },
                callback: (response) => {
                    setTier(plan.id)
                    setLoadingPay(null)
                    showToast(`Welcome to ${plan.name}! Your plan is now active.`, 'success')
                    router.push('/discover')
                },
                onClose: () => {
                    setLoadingPay(null)
                    showToast('Payment cancelled', 'info')
                }
            })
            handler.openIframe()
        } else {
            setTimeout(() => {
                setTier(plan.id)
                setLoadingPay(null)
                showToast(`${plan.name} plan activated! (Demo mode)`, 'success')
                router.push('/discover')
            }, 1500)
        }
    }

    return (
        <div>
            <nav className="navbar" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => router.push('/')}>
                    <img src="/icon-512.png" alt="SM" style={{ width: 36, height: 36, borderRadius: 10, objectFit: 'contain' }} />
                    <span style={{ fontWeight: 800, fontSize: '1.2rem' }}><span className="gradient-text">Sugar Mingle</span> Extra</span>
                </div>
                {user && <button className="btn btn-ghost btn-sm" onClick={() => router.push('/discover')} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg> App
                </button>}
            </nav>

            <div style={{ paddingTop: 88, paddingBottom: 60, background: '#fff', minHeight: '100vh' }}>
                <div className="container">
                    {/* HEADER */}
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <div className="section-tag" style={{ marginBottom: 12 }}>Subscription Plans</div>
                        <h1 style={{ color: '#1a1a1a' }}>Choose Your <span className="gradient-text">Plan</span></h1>
                        <p style={{ maxWidth: 500, margin: '12px auto 0', fontSize: '1rem', color: '#4a4a4a' }}>
                            Unlock the premium features you deserve. Charged in{' '}
                            <strong style={{ color: 'var(--primary)' }}>{localCurrency.code}</strong>
                            {localCurrency.country !== 'USA' && ` (${localCurrency.country})`}
                        </p>
                        {tier !== 'free' && (
                            <div style={{ marginTop: 12 }} className="badge badge-gold">
                                <CheckIcon size={12} color="var(--accent)" /> Current plan: {tier.charAt(0).toUpperCase() + tier.slice(1)}
                            </div>
                        )}
                    </div>

                    {/* PLANS GRID */}
                    <div className="pricing-grid">
                        {PLANS.map(plan => (
                            <div key={plan.id} className={`pricing-card ${plan.popular ? 'popular' : ''} ${tier === plan.id ? 'selected' : ''}`}
                                style={{ borderColor: tier === plan.id ? plan.color : undefined }}>
                                {plan.popular && <div className="pricing-popular-badge"><StarIcon size={12} color="#fff" /> Most Popular</div>}
                                {tier === plan.id && <div style={{ position: 'absolute', top: 10, left: 16, fontSize: '0.7rem', color: plan.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}><CheckIcon size={12} color={plan.color} /> YOUR PLAN</div>}

                                <div style={{ marginBottom: 16 }}>
                                    <div style={{ marginBottom: 8 }}>{plan.icon}</div>
                                    <div className="pricing-name" style={{ color: plan.color }}>{plan.name}</div>
                                    <div className="pricing-price" style={{ color: plan.price === 0 ? '#1a1a1a' : plan.color }}>
                                        {formatPrice(plan.price)}
                                        {plan.price > 0 && <span>/mo</span>}
                                    </div>
                                    {plan.price > 0 && localCurrency.code !== 'USD' && (
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>${plan.price} USD/month</div>
                                    )}
                                </div>

                                <div style={{ marginBottom: 24, borderTop: '1px solid var(--dark-border)', paddingTop: 16 }}>
                                    {plan.features.map((f, i) => (
                                        <div key={i} className="pricing-feature">
                                            <span className={f.included ? 'pricing-feature-check' : 'pricing-feature-x'} style={{ display: 'inline-flex' }}>
                                                {f.included ? <CheckIcon size={14} color="var(--success)" /> : <XIcon size={14} color="var(--text-muted)" />}
                                            </span>
                                            <span style={{ color: f.included ? '#1a1a1a' : '#8e8e8e' }}>{f.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className={`btn w-full ${plan.id === 'free' || tier === plan.id ? 'btn-dark' : 'btn-primary'}`}
                                    disabled={tier === plan.id || plan.id === 'free' || loadingPay === plan.id}
                                    onClick={() => handlePurchase(plan)}
                                    style={{
                                        opacity: tier === plan.id || plan.id === 'free' ? 0.6 : 1,
                                        background: tier === plan.id ? 'rgba(255,255,255,0.05)' : undefined
                                    }}>
                                    {loadingPay === plan.id ? 'Processing...' :
                                        tier === plan.id ? 'Current Plan' :
                                            plan.id === 'free' ? 'Your Default' :
                                                `Get ${plan.name}`}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* PAYMENT METHODS */}
                    <div style={{ textAlign: 'center', marginTop: 48 }}>
                        <div style={{ fontSize: '0.85rem', color: '#4a4a4a', marginBottom: 16 }}>
                            Secure payments powered by Paystack
                        </div>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                            {[
                                { label: 'Visa', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg> },
                                { label: 'Mastercard', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg> },
                                { label: 'M-Pesa', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12" y2="18" /></svg> },
                                { label: 'Bank Transfer', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg> },
                            ].map(m => (
                                <span key={m.label} style={{
                                    background: 'rgba(255,255,255,0.05)', border: '1px solid var(--dark-border)',
                                    borderRadius: 8, padding: '6px 14px', fontSize: '0.8rem', color: 'var(--text-secondary)',
                                    display: 'flex', alignItems: 'center', gap: 6
                                }}>{m.icon} {m.label}</span>
                            ))}
                        </div>
                        <div style={{ marginTop: 16, fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                            <LockIcon size={13} color="var(--text-muted)" /> 256-bit SSL encryption · Cancel anytime · Billed monthly
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

// Pricing page now uses global ClientProviders from layout
export default function PricingPage() {
    return <PricingContent />
}
