import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

import type { Metadata } from 'next'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin']
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: 'ASYNC Race',
    description: 'Race between async operations'
}

const RootLayout = ({
    children
}: Readonly<{
    children: React.ReactNode
}>): React.ReactElement => (
    <html
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        lang="en"
    >
        <body className="min-h-full flex flex-col">{children}</body>
    </html>
)

export default RootLayout
