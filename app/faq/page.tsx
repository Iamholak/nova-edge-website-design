import StaticPageLayout from '@/components/static-page-layout'

export const metadata = {
  title: 'FAQ - NovaEdge Solutions',
  description: 'Frequently asked questions about NovaEdge Solutions services.',
}

export default function FAQPage() {
  const faqs = [
    {
      question: 'What services does NovaEdge Solutions offer?',
      answer:
        'We provide comprehensive solutions in three key areas: marketing strategy and consulting, financial planning and analysis, and design services. Our integrated approach ensures your business receives cohesive, strategic guidance.',
    },
    {
      question: 'How can I request a project quote?',
      answer:
        'Simply fill out our project inquiry form on the home page with details about your project, budget, and timeline. Our team will review your request and get back to you within 24-48 hours with a customized quote.',
    },
    {
      question: 'What is your typical project timeline?',
      answer:
        "Project timelines vary based on scope and complexity. Small projects might take 2-4 weeks, while larger initiatives can take several months. During your consultation, we'll provide a detailed timeline specific to your needs.",
    },
    {
      question: 'Do you offer ongoing support?',
      answer:
        'Yes! We offer both project-based work and ongoing partnership models. Many clients choose to work with us continuously for strategic guidance, monitoring, and optimization.',
    },
    {
      question: 'How do you determine pricing?',
      answer:
        'Our pricing depends on project scope, complexity, required resources, and timeline. We provide transparent, customized quotes based on your specific needs. No hidden fees.',
    },
    {
      question: 'Can you work with remote teams?',
      answer:
        'Absolutely. We have extensive experience working with clients across different locations and time zones. Our remote collaboration process is seamless and efficient.',
    },
    {
      question: 'What if I need to make changes during a project?',
      answer:
        "We understand that needs can change. We build in flexibility for reasonable adjustments. Any significant scope changes may affect timeline and cost, which we'll discuss transparently.",
    },
    {
      question: 'How do I get started?',
      answer:
        "Contact us through our website or email hello@novaedge.com. We'll schedule an initial consultation to understand your business and discuss how we can help.",
    },
  ]

  return (
    <StaticPageLayout
      title="Frequently Asked Questions"
      description="Find answers to common questions about our services"
    >
      <section className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="border-l-4 border-primary pl-6">
            <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p>
          Can't find the answer you're looking for? Feel free to reach out to us at{' '}
          <strong>hello@novaedge.com</strong> or use our contact form.
        </p>
      </section>
    </StaticPageLayout>
  )
}
