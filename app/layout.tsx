import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/navbar'

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
      <body>
        <Navbar />{children}
      </body>
    </html>
  )
}
