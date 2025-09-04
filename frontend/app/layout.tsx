import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Toaster } from 'react-hot-toast'  // 👈 import your Providers
import { AuthProvider } from '@/Authcontext'

export const metadata: Metadata = {
  title: 'service-hub',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        {/* 👇 wrap children with Providers so AuthContext works */}
        <AuthProvider>
          {children}
        </AuthProvider>
        
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  )
}

