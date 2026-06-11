import type { Metadata } from "next"
import { Anton, Archivo } from "next/font/google"
import "./globals.css"

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
})

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Singam Ironman Academy — Marathon & Ironman Coaching",
  description:
    "Marathon & Ironman coaching from Singam's Marathon Village — running, cycling, swimming, strength and recovery, engineered to put you on the start line ready and across the line proud.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${anton.variable} ${archivo.variable}`} suppressHydrationWarning>
      <body className="font-body">{children}</body>
    </html>
  )
}
