'use client'

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { WhyUs } from "@/components/why-us"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"

export default function Home() {
  const [error, setError] = useState<Error | null>(null)
  
  useEffect(() => {
    console.log("[v0] Home page mounted successfully")
  }, [])

  if (error) {
    return (
      <main className="min-h-screen w-full bg-background flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-muted-foreground mb-4">{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded"
          >
            Reload Page
          </button>
        </div>
      </main>
    )
  }

  try {
    return (
      <main className="min-h-screen w-full bg-background">
        <Header />
        <Hero />
        <Services />
        <About />
        <WhyUs />
        <Contact />
        <Footer />
      </main>
    )
  } catch (err) {
    setError(err as Error)
    return null
  }
}
