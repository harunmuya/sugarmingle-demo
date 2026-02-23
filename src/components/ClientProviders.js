'use client'
import { AppProvider, useApp } from '@/lib/context'
import LoadingScreen from '@/components/LoadingScreen'
import { useEffect, useState } from 'react'

// TV FIX: On TVs/slow browsers, the context `loading` state might never become false
// because localStorage/JS execution is slow. We use a hard max time of 5s.
function LoadingWrapper({ children }) {
    const { loading } = useApp()
    const [show, setShow] = useState(true)

    useEffect(() => {
        // Minimum: 3.6s (animation duration)
        // Maximum: 5s (TV / slow browser hard cutoff)
        const minTimer = setTimeout(() => {
            // After 3.6s, hide as soon as loading is false
            if (!loading) setShow(false)
        }, 3600)

        // Hard cutoff: always hide after 5 seconds regardless of loading state
        const maxTimer = setTimeout(() => setShow(false), 5000)

        return () => { clearTimeout(minTimer); clearTimeout(maxTimer) }
    }, [])

    // If loading becomes false after mount, hide if min time already met
    useEffect(() => {
        if (!loading) {
            const t = setTimeout(() => setShow(false), 400)
            return () => clearTimeout(t)
        }
    }, [loading])

    if (show) return <LoadingScreen />
    return children
}

export default function ClientProviders({ children }) {
    return (
        <AppProvider>
            <LoadingWrapper>
                {children}
            </LoadingWrapper>
        </AppProvider>
    )
}
