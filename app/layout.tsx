import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Exam Playtform',
  description: 'Online Exam Platform',
  generator: 'Aditya Rawat',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
