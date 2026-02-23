'use client'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
    const [phase, setPhase] = useState('pulse') // pulse | fade-out

    useEffect(() => {
        // After 3.2s start fading out
        const t = setTimeout(() => setPhase('fade-out'), 3200)
        return () => clearTimeout(t)
    }, [])

    return (
        <div className={`loading-screen loading-home${phase === 'fade-out' ? ' loading-fade-out' : ''}`}>
            {/* Background gradient */}
            <div className="loading-bg" />

            {/* Animated rings */}
            <div className="loading-rings">
                <div className="loading-ring ring-1" />
                <div className="loading-ring ring-2" />
                <div className="loading-ring ring-3" />
            </div>

            {/* Logo + brand */}
            <div className="loading-center">
                <img
                    src="/icon-512.png"
                    alt="Sugar Mingle Extra"
                    className="loading-logo loading-logo-hero"
                />
                <div className="loading-brand">
                    <span className="gradient-text">Sugar Mingle</span> Extra
                </div>
                <div className="loading-tagline">Where Luxury Meets Genuine Connection</div>

                {/* Loading progress bar */}
                <div className="loading-bar-wrap">
                    <div className="loading-bar-fill" />
                </div>
            </div>

            {/* Bottom tagline */}
            <div className="loading-footer-text">
                10M+ Members · 180+ Countries · Verified Profiles
            </div>
        </div>
    )
}
