import ClientProviders from '@/components/ClientProviders'
import './globals.css'

export const metadata = {
    metadataBase: new URL('https://sugarmingleextra.com'),
    title: {
        default: 'SugarMingle – Premium Sugar Dating | Meet Sugar Mummies, Sugar Daddies & Sugar Babies',
        template: '%s | SugarMingle'
    },
    description: 'SugarMingle is the world\'s #1 premium sugar dating platform. Connect with verified sugar mummies, sugar daddies, sugar babies and sugarboys globally. Safe, secure, and scam-free.',
    keywords: ['sugar dating', 'sugar mummy', 'sugar daddy', 'sugar baby', 'dating app', 'luxury dating', 'sugarmingle', 'sugarmingleextra'],
    authors: [{ name: 'SugarMingle', url: 'https://sugarmingleextra.com' }],
    creator: 'SugarMingle',
    publisher: 'SugarMingle',
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://sugarmingleextra.com',
        siteName: 'SugarMingle',
        title: 'SugarMingle – Premium Sugar Dating',
        description: 'Meet verified sugar mummies, sugar daddies & sugar babies worldwide. Safe, real, luxury dating.',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'SugarMingle Dating' }]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SugarMingle – Premium Sugar Dating',
        description: 'Meet verified sugar mummies, daddies & babies worldwide.',
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
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
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
