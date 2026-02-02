import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Target, BarChart3, Users, Zap } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Marketing Services | NovaEdge Solutions",
  description: "Strategic, data-driven marketing solutions that strengthen brand presence and drive measurable growth."
}

export default function MarketingPage() {
  return (
    <main className="min-h-screen w-full bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Strategic Marketing Solutions
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We deliver comprehensive marketing strategies that amplify your brand presence, engage the right audience, and drive sustainable business growth through data-driven insights and creative excellence.
            </p>
            <div className="flex gap-4">
              <Link href="/get-started">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Start Your Campaign
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
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">Our Marketing Expertise</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                icon: Target,
                title: "Brand Strategy",
                description: "We develop comprehensive brand strategies that position your business uniquely in the market, define your value proposition, and create a compelling narrative that resonates with your target audience.",
              },
              {
                icon: BarChart3,
                title: "Digital Campaigns",
                description: "From social media to email marketing, we create integrated digital campaigns that reach your audience where they are, maximize engagement, and convert prospects into loyal customers.",
              },
              {
                icon: Users,
                title: "Audience Targeting",
                description: "Using advanced analytics and market research, we identify and reach your ideal customers with precision, ensuring your marketing budget is spent on high-value prospects.",
              },
              {
                icon: Zap,
                title: "Performance Analytics",
                description: "We track, measure, and optimize every campaign with detailed analytics and reporting, providing insights that drive continuous improvement and demonstrate clear ROI.",
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
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center">Why Choose Our Marketing Services</h2>
          
          <div className="space-y-8">
            {[
              {
                title: "Proven Track Record",
                description: "We've helped over 500 businesses achieve their marketing goals with average 300% ROI improvement."
              },
              {
                title: "Data-Driven Approach",
                description: "Every strategy is backed by comprehensive research, market analysis, and performance metrics to ensure effectiveness."
              },
              {
                title: "Customized Solutions",
                description: "We tailor our marketing strategies to your specific industry, target market, and business objectives."
              },
              {
                title: "Transparent Reporting",
                description: "Monthly reports show exactly how your campaigns are performing and what impact they're having on your bottom line."
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
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Grow Your Brand?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let's create a marketing strategy that drives real results for your business.
          </p>
          <Link href="/get-started">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started Today
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
