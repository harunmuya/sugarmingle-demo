'use client'
import { useRouter } from 'next/navigation'
import { DiamondIcon, CheckIcon, CrownIcon } from '@/lib/icons'

export default function UpgradeModal({ feature, onClose }) {
    const router = useRouter()

    return (
        <div className="match-popup-overlay" onClick={onClose}>
            <div className="match-popup" style={{ maxWidth: 400, padding: 40 }} onClick={e => e.stopPropagation()}>
                <div style={{ background: 'rgba(233,30,144,0.1)', width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <DiamondIcon size={40} color="var(--primary)" />
                </div>
                <h2 className="gradient-text">{feature || 'Premium Feature'}</h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: 12, fontSize: '0.95rem' }}>
                    Upgrade to a premium plan to unlock this feature and many more premium benefits.
                </p>

                <div style={{ textAlign: 'left', margin: '24px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem' }}>
                        <CheckIcon size={16} color="var(--primary)" /> <span>Unlimited Swipes & Matches</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem' }}>
                        <CheckIcon size={16} color="var(--primary)" /> <span>Video & Audio Calling</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem' }}>
                        <CheckIcon size={16} color="var(--primary)" /> <span>Priority Placement</span>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => router.push('/pricing')}>
                        View Pricing
                    </button>
                    <button className="btn btn-ghost" style={{ width: '100%' }} onClick={onClose}>
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    )
}
