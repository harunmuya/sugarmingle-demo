'use client'
import { AppProvider, useApp } from '@/lib/context'
import LoadingScreen from '@/components/LoadingScreen'

function LoadingWrapper({ children }) {
    const { loading } = useApp()
    if (loading) return <LoadingScreen />
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
