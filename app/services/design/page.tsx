import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Palette, Layout, Sparkles, Users } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Design Services | NovaEdge Solutions",
  description: "Creative and user-focused design solutions that engage audiences and strengthen brand identity."
}

export default function DesignPage() {
  return (
    <main className="min-h-screen w-full bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Design That Creates Impact
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We create beautiful, intuitive designs that tell your brand story, engage users, and drive meaningful interactions across all digital and physical touchpoints.
            </p>
            <div className="flex gap-4">
              <Link href="/get-started">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Start Your Project
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
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">Our Design Services</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                icon: Layout,
                title: "UI/UX Design",
                description: "We design intuitive user interfaces and seamless user experiences that make your products a pleasure to use and keep users coming back.",
              },
              {
                icon: Palette,
                title: "Brand Identity",
                description: "From logos to complete visual systems, we create distinctive brand identities that communicate your values and resonate with your target audience.",
              },
              {
                icon: Sparkles,
                title: "Visual Systems",
                description: "We develop comprehensive design systems that ensure consistency across all your digital and physical properties while maintaining scalability.",
              },
              {
                icon: Users,
                title: "User Research",
                description: "We conduct in-depth user research and testing to ensure our designs meet real user needs and deliver measurable business results.",
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
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">Why Choose Our Design Team</h2>
          
          <div className="space-y-8">
            {[
              {
                title: "Award-Winning Designers",
                description: "Our team has won numerous design awards and been featured in leading design publications worldwide."
              },
              {
                title: "User-Centered Approach",
                description: "We always start with user research and feedback to ensure designs are not just beautiful, but functional and intuitive."
              },
              {
                title: "Modern & Timeless",
                description: "We create designs that are contemporary and engaging while maintaining timeless principles that won't feel dated quickly."
              },
              {
                title: "End-to-End Solutions",
                description: "From concept to implementation, we handle every aspect of the design process, working seamlessly with your development team."
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
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready for Beautiful Design?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's create something remarkable that elevates your brand and delights your users.
          </p>
          <Link href="/get-started">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Start Design Project
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
