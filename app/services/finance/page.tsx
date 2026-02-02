import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, PieChart, Shield, Zap } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Finance Services | NovaEdge Solutions",
  description: "Expert financial solutions that guide smart decisions, optimize resources, and drive sustainable growth."
}

export default function FinancePage() {
  return (
    <main className="min-h-screen w-full bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Financial Solutions That Work
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We provide expert financial guidance and strategic planning to help you make informed decisions, optimize resources, and achieve sustainable business growth.
            </p>
            <div className="flex gap-4">
              <Link href="/get-started">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Consult Our Experts
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">Our Financial Services</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                icon: PieChart,
                title: "Financial Planning",
                description: "We help you create comprehensive financial plans that align with your business goals, manage cash flow effectively, and build long-term wealth.",
              },
              {
                icon: Shield,
                title: "Risk Assessment",
                description: "Our experts identify financial risks in your business operations and develop strategies to mitigate them, protecting your assets and investments.",
              },
              {
                icon: TrendingUp,
                title: "Investment Strategy",
                description: "We analyze investment opportunities and develop tailored strategies that maximize returns while maintaining appropriate risk levels.",
              },
              {
                icon: Zap,
                title: "Financial Analytics",
                description: "Deep analysis of your financial statements and metrics provides actionable insights to improve profitability and operational efficiency.",
              },
            ].map((service, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all">
                <service.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">Why Choose Our Finance Team</h2>
          
          <div className="space-y-8">
            {[
              {
                title: "Certified Experts",
                description: "Our team includes certified financial advisors with decades of combined experience across various industries."
              },
              {
                title: "Strategic Guidance",
                description: "We go beyond basic accounting to provide strategic financial guidance that supports your business growth objectives."
              },
              {
                title: "Customized Approach",
                description: "Every financial plan is customized to your specific business model, industry challenges, and growth aspirations."
              },
              {
                title: "Transparent Communication",
                description: "We explain financial concepts clearly and keep you informed with regular updates and detailed reporting."
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary text-primary-foreground text-xl font-bold">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Take Control of Your Finances</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's work together to build a solid financial foundation for your business.
          </p>
          <Link href="/get-started">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Schedule Consultation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
