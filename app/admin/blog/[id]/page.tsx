'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RichTextEditor } from '@/components/rich-text-editor'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  status: string
  featured_image: string | null
}

export default function BlogEditorPage() {
  const router = useRouter()
  const params = useParams()
  const postId = params?.id as string
  const isNew = postId === 'new'

  const [post, setPost] = useState<BlogPost>({
    id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    status: 'draft',
    featured_image: null,
  })
  const [isLoading, setIsLoading] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isNew) {
      fetchPost()
    }
  }, [postId])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/blog/${postId}`)
      if (!response.ok) {
        router.push('/admin/blog')
        return
      }
      const data = await response.json()
      setPost(data.data)
    } catch (error) {
      console.error('Error fetching post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setPost({
      ...post,
      title,
      slug: generateSlug(title),
    })
  }

  const handleSave = async (status: 'draft' | 'published') => {
    setIsSaving(true)
    try {
      const method = isNew ? 'POST' : 'PATCH'
      const url = isNew ? '/api/admin/blog' : `/api/admin/blog/${post.id}`

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...post,
          status,
        }),
      })

      if (!response.ok) {
        alert('Error saving post')
        return
      }

      alert(`Post ${status === 'published' ? 'published' : 'saved'} successfully!`)
      router.push('/admin/blog')
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Error saving post')
    } finally {
      setIsSaving(false)
    }
  }

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/blog">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isNew ? 'Create New Post' : 'Edit Post'}
              </h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleSave('draft')}
              disabled={isSaving}
            >
              Save as Draft
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => handleSave('published')}
              disabled={isSaving}
            >
              Publish
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Title */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <label className="block text-sm font-medium text-foreground mb-2">
              Post Title
            </label>
            <Input
              type="text"
              value={post.title}
              onChange={handleTitleChange}
              placeholder="Enter post title..."
              className="rounded-xl text-lg"
            />
          </div>

          {/* Slug */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <label className="block text-sm font-medium text-foreground mb-2">
              URL Slug
            </label>
            <Input
              type="text"
              value={post.slug}
              onChange={(e) => setPost({ ...post, slug: e.target.value })}
              placeholder="url-slug"
              className="rounded-xl"
            />
            <p className="text-muted-foreground text-sm mt-2">
              Auto-generated from title. You can customize it.
            </p>
          </div>

          {/* Excerpt */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <label className="block text-sm font-medium text-foreground mb-2">
              Excerpt
            </label>
            <Textarea
              value={post.excerpt}
              onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
              placeholder="Brief summary of the post (appears in blog list)..."
              className="rounded-xl min-h-24 resize-none"
            />
          </div>

          {/* Featured Image */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <label className="block text-sm font-medium text-foreground mb-2">
              Featured Image URL
            </label>
            <Input
              type="text"
              value={post.featured_image || ''}
              onChange={(e) => setPost({ ...post, featured_image: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="rounded-xl"
            />
            <p className="text-muted-foreground text-sm mt-2">
              Enter the URL of the image to display as the post thumbnail and header.
            </p>
            {post.featured_image && (
              <div className="mt-4 border border-border rounded-xl overflow-hidden h-48">
                <img 
                  src={post.featured_image} 
                  alt="Featured image preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EInvalid Image%3C/text%3E%3C/svg%3E'
                  }}
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="bg-card rounded-2xl p-6 border border-border">
            <label className="block text-sm font-medium text-foreground mb-2">
              Content
            </label>
            <RichTextEditor
              value={post.content}
              onChange={(content) => setPost({ ...post, content })}
              placeholder="Write your post content here... Use the toolbar for formatting!"
              minHeight="500px"
            />
            <p className="text-muted-foreground text-sm mt-3">
              Use the toolbar above to format text with bold, italic, headings, lists, alignment, and images.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={() => handleSave('draft')}
              disabled={isSaving}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl py-6 font-medium"
            >
              {isSaving ? 'Saving...' : 'Save as Draft'}
            </Button>
            <Button
              onClick={() => handleSave('published')}
              disabled={isSaving}
              className="flex-1 bg-green-600 text-white hover:bg-green-700 rounded-xl py-6 font-medium"
            >
              {isSaving ? 'Publishing...' : 'Publish Post'}
            </Button>
            <Link href="/admin/blog" className="flex-1">
              <Button variant="outline" className="w-full rounded-xl py-6">
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
