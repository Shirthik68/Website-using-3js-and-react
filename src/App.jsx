import { useEffect } from 'react'
import Navbar from './Sections/navbar'
import Hero from './Sections/Hero'
import 'leva/plugin'
import ErrorBoundary from './Components/ErrorBoundary'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  useEffect(() => {
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Optional: clean up if needed (usually not necessary unless navigating between pages)
    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
    }
  }, [])

  return (
    <main className="max-w-7xl mx-auto relative z-0">
      <ErrorBoundary>
        <Navbar />
        <Hero />
      </ErrorBoundary>
    </main>
  )
}

export default App
