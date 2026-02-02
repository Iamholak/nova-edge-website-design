import StaticPageLayout from '@/components/static-page-layout'

export const metadata = {
  title: 'Press - NovaEdge Solutions',
  description: 'Latest news and press releases from NovaEdge Solutions.',
}

export default function PressPage() {
  return (
    <StaticPageLayout
      title="Press"
      description="News and announcements"
    >
      <section>
        <h2 className="text-2xl font-bold mb-4">Latest News</h2>
        <p>
          Stay updated with the latest announcements, press releases, and news from NovaEdge Solutions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Press Kit</h2>
        <p>
          For media inquiries, interviews, or press materials, please contact us at:
        </p>
        <p>
          <strong>Email:</strong> press@novaedge.com
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Featured In</h2>
        <p>
          Our work has been featured in leading industry publications and media outlets. Learn more about our impact and success stories.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Media Resources</h2>
        <p>
          Need our logo, company images, or other media assets? Contact our communications team for high-resolution files and brand guidelines.
        </p>
      </section>
    </StaticPageLayout>
  )
}
