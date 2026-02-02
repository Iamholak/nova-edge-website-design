"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingUp, PieChart, Palette, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const services = [
  {
    icon: TrendingUp,
    title: "Marketing",
    description: "We deliver strategic, data-driven marketing that strengthens brand presence, engages the right audience, and drives measurable growth.",
    features: ["Brand Strategy", "Digital Campaigns", "Analytics & Insights"],
    href: "/services/marketing",
  },
  {
    icon: PieChart,
    title: "Finance",
    description: "We provide expert financial solutions that guide smart decisions, optimize resources, and drive sustainable growth.",
    features: ["Financial Planning", "Risk Assessment", "Investment Strategy"],
    href: "/services/finance",
  },
  {
    icon: Palette,
    title: "Design",
    description: "We deliver creative and user-focused design solutions that engage audiences and strengthen brand identity.",
    features: ["UI/UX Design", "Brand Identity", "Visual Systems"],
    href: "/services/design",
  },
]

export function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
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
    <section id="services" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary/5 dark:bg-cyan-950/20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent dark:via-cyan-500/30" />
      {/* Cyber grid for dark mode */}
      <div className="hidden dark:block absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={cn(
          "text-center mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Solutions That Drive Results
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Our focus is on blending creativity with analytics to provide tailored solutions 
            that help your business thrive.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={cn(
                "group relative bg-card rounded-2xl p-8 border border-border shadow-sm transition-all duration-500 cursor-pointer overflow-hidden",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                activeIndex === index && "border-primary shadow-lg shadow-primary/10"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 shadow-lg shadow-primary/25">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <Link href={service.href} className="inline-block">
                  <div className="flex items-center gap-2 text-primary font-medium text-sm group/link">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1 group-hover:translate-x-1" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
