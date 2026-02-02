"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Lightbulb, Target, Rocket, Users, ArrowUpRight } from "lucide-react"

const reasons = [
  {
    icon: Lightbulb,
    title: "Creative Excellence",
    description: "We combine creativity, strategy, and expertise to deliver impactful results that exceed expectations.",
  },
  {
    icon: Target,
    title: "Tailored Solutions",
    description: "We focus on understanding your business and providing efficient, customized solutions that fit your unique needs.",
  },
  {
    icon: Rocket,
    title: "Growth-Driven",
    description: "We work as a growth-driven partner, committed to innovation and delivering measurable success for your business.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our diverse team of specialists brings deep industry knowledge and fresh perspectives to every project.",
  },
]

export function WhyUs() {
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

  return (
    <section id="why-us" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Why Work With Us?
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Partner with a team that truly understands your vision and is dedicated to 
            turning your goals into reality.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className={cn(
                "group relative bg-card rounded-2xl p-8 border border-border shadow-sm transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Number indicator */}
              <div className="absolute top-6 right-6 text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors duration-300">
                0{index + 1}
              </div>

              <div className="relative z-10 flex items-start gap-5">
                {/* Icon */}
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                  <reason.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
                    {reason.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
