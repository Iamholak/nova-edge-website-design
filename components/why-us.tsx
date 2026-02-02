"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Lightbulb, Target, Rocket, Users, ArrowUpRight, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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
  const [isSubmittingForm, setIsSubmittingForm] = useState(false)

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

  const handleProjectSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmittingForm(true)

    try {
      const formData = new FormData(e.currentTarget)
      const response = await fetch('/api/project-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          company: formData.get('company'),
          phone: formData.get('phone'),
          projectDescription: formData.get('projectDescription'),
          budget: formData.get('budget'),
          timeline: formData.get('timeline'),
        }),
      })

      if (response.ok) {
        alert('Project inquiry submitted successfully! We will get back to you soon.')
        ;(e.target as HTMLFormElement).reset()
      } else {
        alert('Failed to submit inquiry. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting project inquiry:', error)
      alert('Error submitting inquiry. Please try again.')
    } finally {
      setIsSubmittingForm(false)
    }
  }

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

        {/* Project Inquiry Form */}
        <div className={cn(
          "mt-20 max-w-3xl mx-auto transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Tell Us About Your Project</h3>
            <p className="text-muted-foreground">
              Ready to get started? Share your project details and let's create something amazing together.
            </p>
          </div>

          <form onSubmit={handleProjectSubmit} className="bg-card rounded-3xl p-8 border border-border shadow-xl">
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="John Doe" 
                    className="rounded-xl border-border focus:border-primary focus:ring-primary/20"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input 
                    id="email"
                    name="email"
                    type="email" 
                    placeholder="john@example.com" 
                    className="rounded-xl border-border focus:border-primary focus:ring-primary/20"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    Company
                  </label>
                  <Input 
                    id="company"
                    name="company"
                    placeholder="Your Company" 
                    className="rounded-xl border-border focus:border-primary focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone (Optional)
                  </label>
                  <Input 
                    id="phone"
                    name="phone"
                    placeholder="+1 (555) 123-4567" 
                    className="rounded-xl border-border focus:border-primary focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="projectDescription" className="block text-sm font-medium text-foreground mb-2">
                  Project Details
                </label>
                <Textarea 
                  id="projectDescription"
                  name="projectDescription"
                  placeholder="Tell us about your project, goals, and requirements..." 
                  className="rounded-xl border-border focus:border-primary focus:ring-primary/20 min-h-[150px] resize-none"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
                    Budget Range (Optional)
                  </label>
                  <Input 
                    id="budget"
                    name="budget"
                    placeholder="$5,000 - $10,000" 
                    className="rounded-xl border-border focus:border-primary focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-foreground mb-2">
                    Timeline (Optional)
                  </label>
                  <Input 
                    id="timeline"
                    name="timeline"
                    placeholder="2-3 months" 
                    className="rounded-xl border-border focus:border-primary focus:ring-primary/20"
                  />
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isSubmittingForm}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl py-6 text-lg shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-70"
              >
                {isSubmittingForm ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Submit Project Inquiry
                    <Send className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
