'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  featured_image?: string
  published_at: string
  author_id: string
}

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string

  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}`)
        if (!response.ok) {
          router.push('/blog')
          return
        }
        const data = await response.json()
        setPost(data.data)
      } catch (error) {
        console.error('Error fetching post:', error)
        router.push('/blog')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [slug, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/blog">
            <Button variant="outline" size="sm" className="gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article>
          {/* Featured Image */}
          {post.featured_image && (
            <div className="mb-8 rounded-2xl overflow-hidden border border-border h-96 bg-muted">
              <img 
                src={post.featured_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {post.title}
            </h1>
            <p className="text-muted-foreground">
              Published on{' '}
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </header>

          <div className="prose prose-invert max-w-none bg-card rounded-2xl p-8 border border-border">
            <div className="text-foreground leading-relaxed whitespace-pre-wrap break-words">
              {post.content}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/blog">
              <Button variant="outline">← Back to Blog</Button>
            </Link>
          </div>
        </article>
      </main>
    </div>
  )
}
