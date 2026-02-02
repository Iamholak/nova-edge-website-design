'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Archive, CheckCircle, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: string
  created_at: string
}

export default function ContactMessagesPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/contact-messages')
      if (!response.ok) {
        router.push('/admin/login')
        return
      }
      const data = await response.json()
      setMessages(data.data || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateMessageStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/contact-messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      setMessages(messages.map(m => m.id === id ? { ...m, status } : m))
    } catch (error) {
      console.error('Error updating message:', error)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return
    try {
      await fetch(`/api/admin/contact-messages/${id}`, { method: 'DELETE' })
      setMessages(messages.filter(m => m.id !== id))
    } catch (error) {
      console.error('Error deleting message:', error)
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
            <h1 className="text-3xl font-bold text-foreground">Contact Messages</h1>
            <p className="text-muted-foreground">Manage incoming contact form submissions</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No contact messages yet</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {messages.map((message) => (
              <div key={message.id} className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">{message.subject}</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      From: <span className="font-medium">{message.name}</span> ({message.email})
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {new Date(message.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    message.status === 'new'
                      ? 'bg-blue-100 text-blue-700'
                      : message.status === 'read'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                  </span>
                </div>

                <p className="text-foreground mb-6 leading-relaxed">{message.message}</p>

                <div className="flex items-center gap-2">
                  {message.status !== 'read' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateMessageStatus(message.id, 'read')}
                      className="gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Read
                    </Button>
                  )}
                  {message.status !== 'archived' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateMessageStatus(message.id, 'archived')}
                      className="gap-2"
                    >
                      <Archive className="w-4 h-4" />
                      Archive
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteMessage(message.id)}
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
