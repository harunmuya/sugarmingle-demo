import ClientProviders from '@/components/ClientProviders'
import './globals.css'

export const metadata = {
    metadataBase: new URL('https://sugarmingleextra.com'),
    title: {
        default: 'Sugar Mingle Extra – Premium Dating | Meet Real People Worldwide',
        template: '%s | Sugar Mingle Extra'
    },
    description: 'Sugar Mingle Extra is the world\'s #1 premium dating platform with over 10 million verified members. Connect with real people globally for genuine relationships. Safe, secure, and scam-free.',
    keywords: ['dating app', 'premium dating', 'meet people', 'real matches', 'global dating', 'sugar mingle extra', 'sugarmingleextra', 'verified profiles'],
    authors: [{ name: 'Sugar Mingle Extra', url: 'https://sugarmingleextra.com' }],
    creator: 'Sugar Mingle Extra',
    publisher: 'Sugar Mingle Extra',
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://sugarmingleextra.com',
        siteName: 'Sugar Mingle Extra',
        title: 'Sugar Mingle Extra – Premium Dating | Meet Real People Worldwide',
        description: 'Join 10M+ verified members worldwide. Find genuine connections, real relationships and meaningful matches. Safe, verified, global.',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Sugar Mingle Extra Dating' }]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sugar Mingle Extra – Premium Dating',
        description: 'Meet 10M+ verified members worldwide. Real matches, real connections.',
        images: ['/og-image.jpg']
    },
    icons: {
        icon: '/favicon.png',
        apple: '/apple-icon.png'
    },
    manifest: '/manifest.json'
}

export const viewport = {
    themeColor: '#E91E90'
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                {/* Viewport: allow user scaling for accessibility + smart TV browsers */}
                <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, viewport-fit=cover" />
                <script src="https://js.paystack.co/v1/inline.js" async></script>
            </head>
            <body suppressHydrationWarning>
                <ClientProviders>
                    {children}
                </ClientProviders>
            </body>
        </html>
    )
}
