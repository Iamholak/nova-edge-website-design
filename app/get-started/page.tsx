"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  ArrowLeft, 
  ArrowRight, 
  Rocket, 
  Bot, 
  Palette, 
  TrendingUp, 
  GraduationCap,
  Check,
  Send
} from "lucide-react"

const services = [
  {
    id: "marketing",
    icon: TrendingUp,
    title: "Marketing & Growth",
    description: "Strategic, data-driven marketing that strengthens brand presence and drives measurable growth.",
    features: ["Brand Strategy", "Digital Marketing", "SEO & Content", "Social Media"],
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    id: "finance",
    icon: Rocket,
    title: "Finance Solutions",
    description: "Expert financial solutions that guide smart decisions and drive sustainable growth.",
    features: ["Financial Planning", "Investment Strategy", "Risk Management", "Analytics"],
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    id: "design",
    icon: Palette,
    title: "Design & Creative",
    description: "Creative and user-focused design solutions that engage audiences and strengthen brand identity.",
    features: ["UI/UX Design", "Brand Identity", "Web Design", "Product Design"],
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    id: "tech",
    icon: Bot,
    title: "Tech & Automation",
    description: "Cutting-edge technology solutions and AI-powered automation to streamline your operations.",
    features: ["Web Development", "AI Integration", "Process Automation", "Custom Software"],
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    id: "training",
    icon: GraduationCap,
    title: "Training & Mentorship",
    description: "Expert guidance and training programs to upskill your team and drive innovation.",
    features: ["Team Workshops", "1-on-1 Mentoring", "Digital Skills", "Leadership"],
    color: "bg-pink-500/10 text-pink-600",
  },
]

export default function GetStartedPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
    timeline: "",
    budget: "",
  })

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
  }

  const handleNextStep = () => {
    if (selectedService) {
      setStep(2)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setStep(3)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`w-8 h-1 rounded-full transition-colors ${
                      s <= step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">Step {step} of 3</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step 1: Choose Service */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                What can we help you with?
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select the service that best fits your needs. We&apos;ll tailor our approach to deliver exactly what your business requires.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
              {services.map((service) => {
                const Icon = service.icon
                const isSelected = selectedService === service.id
                return (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      isSelected ? "ring-2 ring-primary shadow-lg" : "hover:border-primary/50"
                    }`}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-3`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="flex items-center justify-between">
                        {service.title}
                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-4 h-4 text-primary-foreground" />
                          </div>
                        )}
                      </CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature) => (
                          <span
                            key={feature}
                            className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={handleNextStep}
                disabled={!selectedService}
                className="rounded-full px-8 group"
              >
                Continue
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Project Details Form */}
        {step === 2 && (
          <div className="animate-fade-in max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Tell us about your project
              </h1>
              <p className="text-lg text-muted-foreground">
                Share some details so we can better understand your needs and provide a tailored solution.
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      placeholder="Your Company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">What do you want to build or solve? *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project, goals, and any specific requirements..."
                      rows={4}
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Timeline</Label>
                      <Input
                        id="timeline"
                        placeholder="e.g., 2-3 months"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range (Optional)</Label>
                      <Input
                        id="budget"
                        placeholder="e.g., $5,000 - $10,000"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1 bg-transparent"
                    >
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 group">
                      Submit Request
                      <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="animate-fade-in text-center max-w-xl mx-auto py-12">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              We&apos;ve received your request and will get back to you within 24 hours. 
              Our team is excited to help you achieve your goals!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full bg-transparent">
                <Link href="/#services">
                  Explore Our Services
                </Link>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
