import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/navbar'

export const metadata: Metadata = {
  title: 'Exam Simulator',
  description: 'Online Exam Platform by Aditya Rawat',
  generator: 'Aditya Rawat',
  keywords: "online exam platform, online tests, exam preparation, competitive exams, mock tests, exam simulator, test series, question bank, practice tests, online quiz, educational platform, learning management system, assessment platform, timed tests, subject-wise tests, online study tools, exam analysis, adaptive testing, result tracking, exam portal"
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
