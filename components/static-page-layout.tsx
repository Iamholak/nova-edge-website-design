import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function StaticPageLayout({
  children,
  title,
  description,
}: {
  children: React.ReactNode
  title: string
  description?: string
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
          {description && (
            <p className="text-muted-foreground text-lg">{description}</p>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-invert max-w-none text-foreground leading-relaxed space-y-6">
          {children}
        </div>
      </main>
    </div>
  )
}
