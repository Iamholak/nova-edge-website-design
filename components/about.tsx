"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const highlights = [
    "Data-driven strategies for measurable growth",
    "Expert team with 10+ years of experience",
    "Customized solutions for every business",
    "Proven track record with 500+ clients",
  ]

  return (
    <section id="about" ref={sectionRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image/Visual */}
          <div 
            className={cn(
              "relative transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}
          >
            <div className="relative">
              {/* Main visual card */}
              <div className="bg-card rounded-3xl p-8 border border-border shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  {/* Stat cards */}
                  <div className="bg-primary/5 rounded-2xl p-6 hover:bg-primary/10 transition-colors duration-300">
                    <div className="text-4xl font-bold text-primary mb-2">98%</div>
                    <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                  </div>
                  <div className="bg-primary/5 rounded-2xl p-6 hover:bg-primary/10 transition-colors duration-300">
                    <div className="text-4xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-muted-foreground">Projects Delivered</div>
                  </div>
                  <div className="bg-primary/5 rounded-2xl p-6 hover:bg-primary/10 transition-colors duration-300">
                    <div className="text-4xl font-bold text-primary mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Team Members</div>
                  </div>
                  <div className="bg-primary/5 rounded-2xl p-6 hover:bg-primary/10 transition-colors duration-300">
                    <div className="text-4xl font-bold text-primary mb-2">10+</div>
                    <div className="text-sm text-muted-foreground">Years of Excellence</div>
                  </div>
                </div>
              </div>

              {/* Floating accent elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>

          {/* Right: Content */}
          <div 
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              A Cutting-Edge Firm Built for Growth
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              NovaEdge Solutions is a cutting-edge firm specializing in marketing, finance, 
              and design solutions. We deliver innovative strategies, creative designs, 
              and smart financial insights to help businesses grow, optimize operations, 
              and stand out in a competitive market.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our focus is on blending creativity with analytics to provide tailored solutions 
              that drive measurable results for our clients.
            </p>

            {/* Highlights */}
            <ul className="space-y-4">
              {highlights.map((item, index) => (
                <li 
                  key={index}
                  className={cn(
                    "flex items-center gap-3 transition-all duration-500",
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                  )}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
