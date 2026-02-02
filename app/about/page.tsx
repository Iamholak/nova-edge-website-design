import StaticPageLayout from '@/components/static-page-layout'

export const metadata = {
  title: 'About Us - NovaEdge Solutions',
  description: 'Learn about NovaEdge Solutions and our mission to transform businesses.',
}

export default function AboutPage() {
  return (
    <StaticPageLayout
      title="About Us"
      description="Discover who we are and what drives us"
    >
      <section>
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p>
          NovaEdge Solutions was founded with a simple but powerful mission: to help businesses thrive in the digital age. We believe that every company, regardless of size, deserves access to world-class solutions in marketing, finance, and design.
        </p>
        <p>
          With years of experience and a passionate team, we've helped hundreds of businesses transform their operations and achieve their goals.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p>
          To deliver innovative, results-driven solutions that empower businesses to reach their full potential in an ever-changing market.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Our Values</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Innovation:</strong> We constantly push boundaries to find better solutions</li>
          <li><strong>Integrity:</strong> We operate with transparency and honesty in all dealings</li>
          <li><strong>Excellence:</strong> We strive for excellence in everything we do</li>
          <li><strong>Collaboration:</strong> We believe in the power of teamwork and partnership</li>
          <li><strong>Client Success:</strong> Your success is our success</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
        <p>
          We're not just a service provider; we're your strategic partner. We take time to understand your business, your goals, and your challenges. Then, we craft customized solutions that deliver real results.
        </p>
        <p>
          Our team combines deep industry expertise with creative thinking to solve complex business problems. We're committed to your long-term success.
        </p>
      </section>
    </StaticPageLayout>
  )
}
