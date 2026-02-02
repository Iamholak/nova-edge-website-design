'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LogOut, MessageSquare, FileText, BarChart3, BookOpen } from 'lucide-react'

interface User {
  id: string
  email: string
  fullName: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth')
        if (!response.ok) {
          router.push('/admin/login')
          return
        }
        const data = await response.json()
        setUser(data.user)
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/admin/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const menuItems = [
    {
      title: 'Contact Messages',
      description: 'View and manage contact form submissions',
      icon: MessageSquare,
      href: '/admin/contact-messages',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Project Inquiries',
      description: 'Manage project inquiry requests',
      icon: FileText,
      href: '/admin/project-inquiries',
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Blog Posts',
      description: 'Create, edit, and manage blog posts',
      icon: BookOpen,
      href: '/admin/blog',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Company Stats',
      description: 'Update clients, projects, team, and experience',
      icon: BarChart3,
      href: '/admin/stats',
      color: 'bg-orange-100 text-orange-600',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm">Welcome, {user.fullName || user.email}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <div className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer h-full">
                  <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
