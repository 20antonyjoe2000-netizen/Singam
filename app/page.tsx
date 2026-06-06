import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { Marquee } from "@/components/sections/Marquee"
import { About } from "@/components/sections/About"
import { Philosophy } from "@/components/sections/Philosophy"
import { Pricing } from "@/components/sections/Pricing"
import { Contact } from "@/components/sections/Contact"

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Marquee />
        <About />
        <Philosophy />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
