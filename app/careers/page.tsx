import StaticPageLayout from '@/components/static-page-layout'

export const metadata = {
  title: 'Careers - NovaEdge Solutions',
  description: 'Join our team and help transform businesses worldwide.',
}

export default function CareersPage() {
  return (
    <StaticPageLayout
      title="Careers"
      description="Join our growing team"
    >
      <section>
        <h2 className="text-2xl font-bold mb-4">Work With Us</h2>
        <p>
          We're always looking for talented, passionate individuals to join our team. If you share our values and are excited about helping businesses succeed, we'd love to hear from you.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Current Opportunities</h2>
        <p>
          Check back soon for exciting career opportunities in:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Marketing Strategy & Consulting</li>
          <li>Financial Analysis & Planning</li>
          <li>Design & Creative Services</li>
          <li>Business Development</li>
          <li>Project Management</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Why Join NovaEdge?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Collaborative and innovative work environment</li>
          <li>Opportunities for professional growth and development</li>
          <li>Competitive compensation and benefits</li>
          <li>Work on challenging, meaningful projects</li>
          <li>Flexible work arrangements</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Ready to Apply?</h2>
        <p>
          Send us your resume and a brief cover letter at <strong>careers@novaedge.com</strong>. We review all applications and will be in touch if there's a good fit.
        </p>
      </section>
    </StaticPageLayout>
  )
}
