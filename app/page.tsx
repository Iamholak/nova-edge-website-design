import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { About } from "@/components/about"
import { WhyUs } from "@/components/why-us"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  console.log("[v0] Home page rendering")
  
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
}
