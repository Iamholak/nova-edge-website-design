"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { VideoModal } from "@/components/video-modal"

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 20
      const y = (clientY / innerHeight - 0.5) * 20
      heroRef.current.style.setProperty("--mouse-x", `${x}px`)
      heroRef.current.style.setProperty("--mouse-y", `${y}px`)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 dark:cyber-grid"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs - Futuristic in dark mode */}
        <div 
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 dark:bg-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: "translate(var(--mouse-x, 0), var(--mouse-y, 0))" }}
        />
        <div 
          className="absolute bottom-1/4 -right-32 w-80 h-80 bg-primary/15 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s", transform: "translate(calc(var(--mouse-x, 0) * -1), calc(var(--mouse-y, 0) * -1))" }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 dark:bg-pink-500/10 rounded-full blur-3xl"
        />
        
        {/* Grid pattern - Cyber grid in dark mode */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] dark:bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)]" />
        
        {/* Scanline effect for dark mode */}
        <div className="hidden dark:block absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 mb-8 shadow-sm animate-fade-in dark:border-cyan-500/30 dark:shadow-[0_0_15px_rgba(6,182,212,0.2)] dark:bg-card/80">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary dark:bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary dark:bg-cyan-400" />
          </span>
          <span className="text-sm font-medium text-muted-foreground dark:text-cyan-300/80">
            Transforming businesses since 2020
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
          <span className="text-foreground dark:text-cyan-50 dark:drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">We Make</span>
          <br />
          <span className="relative inline-block">
            <span className="relative z-10 bg-primary text-primary-foreground px-4 py-2 rounded-lg inline-block transform -rotate-1 hover:rotate-0 transition-transform duration-300 dark:shadow-[0_0_30px_rgba(6,182,212,0.5)] dark:bg-gradient-to-r dark:from-cyan-500 dark:to-blue-600">
              Your Business
            </span>
          </span>
          <br />
          <span className="text-foreground dark:text-cyan-50 dark:drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">Better Than Others</span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          NovaEdge Solutions delivers innovative strategies in marketing, finance, and design 
          to help your business grow and stand out in a competitive market.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Button 
            asChild
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-lg shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 group dark:bg-gradient-to-r dark:from-cyan-500 dark:to-blue-600 dark:shadow-[0_0_25px_rgba(6,182,212,0.4)] dark:hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] glow-pulse"
          >
            <Link href="/get-started">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full px-8 py-6 text-lg border-2 hover:bg-secondary transition-all duration-300 group bg-transparent dark:border-cyan-500/50 dark:text-cyan-300 dark:hover:bg-cyan-500/10 dark:hover:border-cyan-400"
            onClick={() => setIsVideoOpen(true)}
          >
            <Play className="mr-2 w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            Watch Demo
          </Button>
        </div>

        {/* Video Modal */}
        <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          {[
            { value: "500+", label: "Clients Served" },
            { value: "98%", label: "Success Rate" },
            { value: "50+", label: "Team Experts" },
            { value: "10+", label: "Years Experience" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1 transition-transform duration-300 group-hover:scale-110 dark:text-cyan-300 dark:drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground dark:text-cyan-100/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
