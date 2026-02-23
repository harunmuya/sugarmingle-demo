'use client'
import { AppProvider, useApp } from '@/lib/context'
import LoadingScreen from '@/components/LoadingScreen'
import { useEffect, useState } from 'react'

// Shows loading screen for AT LEAST 3.6 seconds on home screen
function LoadingWrapper({ children }) {
    const { loading } = useApp()
    const [minTimeMet, setMinTimeMet] = useState(false)
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        // Minimum display time: 3.6 seconds for the loading animation
        const timer = setTimeout(() => setMinTimeMet(true), 3600)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        // Once both loading is done AND min time met, hide with slight delay for fade
        if (!loading && minTimeMet) {
            const t = setTimeout(() => setVisible(false), 500)
            return () => clearTimeout(t)
        }
    }, [loading, minTimeMet])

    if (visible) return <LoadingScreen />
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
