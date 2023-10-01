import './globals.css'
import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import {GlobalProvider} from '@/app/utils/globalProvider/GlobalProvider'
const inter = Work_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <body className={inter.className}>
      <GlobalProvider>
      {children}
      </GlobalProvider>
      </body>
    </html>

  )
}
