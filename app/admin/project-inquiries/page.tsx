'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Archive, CheckCircle, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'

interface ProjectInquiry {
  id: string
  name: string
  email: string
  company: string
  phone: string
  project_description: string
  budget: string
  timeline: string
  status: string
  created_at: string
}

export default function ProjectInquiriesPage() {
  const router = useRouter()
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedInquiry, setSelectedInquiry] = useState<ProjectInquiry | null>(null)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/admin/project-inquiries')
      if (!response.ok) {
        router.push('/admin/login')
        return
      }
      const data = await response.json()
      setInquiries(data.data || [])
    } catch (error) {
      console.error('Error fetching inquiries:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateInquiryStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/project-inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      setInquiries(inquiries.map(i => i.id === id ? { ...i, status } : i))
    } catch (error) {
      console.error('Error updating inquiry:', error)
    }
  }

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return
    try {
      await fetch(`/api/admin/project-inquiries/${id}`, { method: 'DELETE' })
      setInquiries(inquiries.filter(i => i.id !== id))
    } catch (error) {
      console.error('Error deleting inquiry:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Project Inquiries</h1>
            <p className="text-muted-foreground">Manage project request submissions</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading inquiries...</p>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No project inquiries yet</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">{inquiry.name}</h3>
                    <p className="text-muted-foreground text-sm mb-1">
                      Email: <span className="font-medium">{inquiry.email}</span>
                    </p>
                    {inquiry.company && (
                      <p className="text-muted-foreground text-sm mb-1">
                        Company: <span className="font-medium">{inquiry.company}</span>
                      </p>
                    )}
                    {inquiry.phone && (
                      <p className="text-muted-foreground text-sm mb-1">
                        Phone: <span className="font-medium">{inquiry.phone}</span>
                      </p>
                    )}
                    <p className="text-muted-foreground text-sm">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    inquiry.status === 'new'
                      ? 'bg-blue-100 text-blue-700'
                      : inquiry.status === 'reviewing'
                      ? 'bg-yellow-100 text-yellow-700'
                      : inquiry.status === 'quoted'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                  </span>
                </div>

                <div className="mb-6 p-4 bg-muted rounded-lg">
                  <p className="text-foreground font-medium mb-2">Project Details:</p>
                  <p className="text-foreground leading-relaxed">{inquiry.project_description}</p>
                  {inquiry.budget && (
                    <p className="text-muted-foreground text-sm mt-3">Budget: {inquiry.budget}</p>
                  )}
                  {inquiry.timeline && (
                    <p className="text-muted-foreground text-sm">Timeline: {inquiry.timeline}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {inquiry.status !== 'reviewing' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateInquiryStatus(inquiry.id, 'reviewing')}
                      className="gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Reviewing
                    </Button>
                  )}
                  {inquiry.status !== 'quoted' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateInquiryStatus(inquiry.id, 'quoted')}
                      className="gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Quoted
                    </Button>
                  )}
                  {inquiry.status !== 'completed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateInquiryStatus(inquiry.id, 'completed')}
                      className="gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Complete
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteInquiry(inquiry.id)}
                    className="gap-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
