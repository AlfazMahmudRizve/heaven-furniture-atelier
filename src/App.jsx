import { useEffect } from 'react'
import Lenis from 'lenis'
import Header from './components/Header'
import Hero from './components/Hero'
import TrustMarquee from './components/TrustMarquee'
import Manifesto from './components/Manifesto'
import BespokeStudio from './components/BespokeStudio'
import Collections from './components/Collections'
import Timeline from './components/Timeline'
import Showroom from './components/Showroom'
import CtaBlock from './components/CtaBlock'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import MobileActionBar from './components/MobileActionBar'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <div className="min-h-screen bg-obsidian text-ivory font-body">
      <Header />
      <main>
        <Hero />
        <TrustMarquee />
        <Manifesto />
        <BespokeStudio />
        <Collections />
        <Timeline />
        <Showroom />
        <CtaBlock />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileActionBar />
    </div>
  )
}
