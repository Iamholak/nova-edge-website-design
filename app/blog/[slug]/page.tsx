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
            <div 
              className="text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
              }}
            />
          </div>

          <style jsx>{`
            :global(div[dangerously-set]) h1 {
              font-size: 32px;
              font-weight: bold;
              margin: 24px 0 16px 0;
              color: inherit;
            }
            :global(div[dangerously-set]) h2 {
              font-size: 24px;
              font-weight: bold;
              margin: 20px 0 12px 0;
              color: inherit;
            }
            :global(div[dangerously-set]) p {
              margin: 12px 0;
              color: inherit;
            }
            :global(div[dangerously-set]) ul {
              margin: 12px 0;
              padding-left: 24px;
              list-style-type: disc;
            }
            :global(div[dangerously-set]) ol {
              margin: 12px 0;
              padding-left: 24px;
              list-style-type: decimal;
            }
            :global(div[dangerously-set]) li {
              margin: 8px 0;
              color: inherit;
            }
            :global(div[dangerously-set]) a {
              color: hsl(var(--primary));
              text-decoration: underline;
              cursor: pointer;
              transition: opacity 0.2s ease;
            }
            :global(div[dangerously-set]) a:hover {
              opacity: 0.8;
            }
            :global(div[dangerously-set]) pre {
              background-color: hsl(var(--muted));
              color: hsl(var(--foreground));
              padding: 16px;
              border-radius: 8px;
              overflow-x: auto;
              margin: 16px 0;
              font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
              font-size: 14px;
              line-height: 1.5;
            }
            :global(div[dangerously-set]) code {
              background-color: hsl(var(--muted));
              color: hsl(var(--foreground));
              padding: 2px 6px;
              border-radius: 4px;
              font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
              font-size: 14px;
            }
            :global(div[dangerously-set]) pre code {
              background-color: transparent;
              padding: 0;
              color: inherit;
            }
            :global(div[dangerously-set]) img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              margin: 16px 0;
            }
            :global(div[dangerously-set]) b,
            :global(div[dangerously-set]) strong {
              font-weight: bold;
              color: inherit;
            }
          `}</style>

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
