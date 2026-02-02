import StaticPageLayout from '@/components/static-page-layout'

export const metadata = {
  title: 'Privacy Policy - NovaEdge Solutions',
  description: 'Privacy policy for NovaEdge Solutions.',
}

export default function PrivacyPolicyPage() {
  return (
    <StaticPageLayout title="Privacy Policy">
      <section>
        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">1. Introduction</h3>
        <p>
          NovaEdge Solutions ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise process personal information in connection with our website and services.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">2. Information We Collect</h3>
        <p>We may collect the following information:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Contact information (name, email, phone number)</li>
          <li>Company information</li>
          <li>Project details and requirements</li>
          <li>Website usage data and analytics</li>
          <li>Cookies and tracking data</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">3. How We Use Your Information</h3>
        <p>We use collected information to:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Respond to your inquiries and provide services</li>
          <li>Send you communications about our services</li>
          <li>Improve our website and services</li>
          <li>Comply with legal obligations</li>
          <li>Analyze website usage patterns</li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">4. Information Sharing</h3>
        <p>
          We do not sell or rent your personal information to third parties. We may share information with service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">5. Security</h3>
        <p>
          We implement appropriate technical and organizational measures designed to protect personal information against unauthorized access, alteration, disclosure, or destruction. However, no security system is impenetrable.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">6. Cookies</h3>
        <p>
          Our website uses cookies to enhance your experience. You can control cookie settings through your browser preferences. Disabling cookies may affect website functionality.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">7. Your Rights</h3>
        <p>
          You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at privacy@novaedge.com.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">8. Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy periodically. Changes will be posted on this page with an updated last modified date.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-3">9. Contact Us</h3>
        <p>
          If you have questions about this Privacy Policy, please contact us at:
        </p>
        <p>
          Email: <strong>privacy@novaedge.com</strong>
        </p>
      </section>
    </StaticPageLayout>
  )
}
