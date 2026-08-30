import { useEffect } from 'react'
import Lenis from 'lenis'
import Header from './components/Header'
import Hero from './components/Hero'
import ArccaManifesto from './components/ArccaManifesto'
import ProductShowcase from './components/ProductShowcase'
import ArccaProjectsGrid from './components/ArccaProjectsGrid'
import BespokeStudio from './components/BespokeStudio'
import FloatingWhatsApp from './components/FloatingWhatsApp'
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
    <div className="min-h-screen bg-espresso text-linen font-body">
      <Header />
      <main>
        <Hero />
        <ArccaManifesto />
        <ProductShowcase />
        <ArccaProjectsGrid />
        <BespokeStudio />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
