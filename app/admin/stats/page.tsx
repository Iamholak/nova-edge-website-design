'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface CompanyStat {
  id: string
  stat_key: string
  value: number
}

const statLabels: Record<string, string> = {
  clients_satisfied: 'Clients Served (500+)',
  projects_delivered: 'Success Rate (98%)',
  team_members: 'Team Experts (50+)',
  years_experience: 'Years Experience (10+)',
}

export default function CompanyStatsPage() {
  const router = useRouter()
  const [stats, setStats] = useState<CompanyStat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (!response.ok) {
        router.push('/admin/login')
        return
      }
      const data = await response.json()
      
      // Convert stats object to array if needed
      if (data.data && typeof data.data === 'object' && !Array.isArray(data.data)) {
        const statsArray = Object.entries(data.data).map(([key, value]) => ({
          id: key,
          stat_key: key,
          value: typeof value === 'number' ? value : 0
        }))
        setStats(statsArray)
      } else {
        setStats(Array.isArray(data.data) ? data.data : [])
      }
    } catch (error) {
      console.error('[v0] Error fetching stats:', error)
      // Set default values on error matching the image
      setStats([
        { id: 'clients_satisfied', stat_key: 'clients_satisfied', value: 500 },
        { id: 'projects_delivered', stat_key: 'projects_delivered', value: 98 },
        { id: 'team_members', stat_key: 'team_members', value: 50 },
        { id: 'years_experience', stat_key: 'years_experience', value: 10 },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStat = (id: string, newValue: number) => {
    setStats(stats.map(s => s.id === id ? { ...s, value: newValue } : s))
  }

  const handleSaveAll = async () => {
    setIsSaving(true)
    try {
      for (const stat of stats) {
        const response = await fetch(`/api/admin/stats/${stat.stat_key}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value: stat.value }),
        })
        
        if (!response.ok) {
          throw new Error(`Failed to update ${stat.stat_key}`)
        }
      }
      alert('Statistics updated successfully!')
      // Reload stats to confirm changes
      await fetchStats()
    } catch (error) {
      console.error('Error saving stats:', error)
      alert('Error saving statistics')
    } finally {
      setIsSaving(false)
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
            <h1 className="text-3xl font-bold text-foreground">Company Statistics</h1>
            <p className="text-muted-foreground">Update company metrics displayed on the home page</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading statistics...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-card rounded-2xl p-6 border border-border">
                <label className="block text-sm font-medium text-foreground mb-4">
                  {statLabels[stat.stat_key] || stat.stat_key}
                </label>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    value={stat.value}
                    onChange={(e) => handleUpdateStat(stat.id, parseInt(e.target.value) || 0)}
                    className="flex-1 text-lg py-3 rounded-xl"
                  />
                  <span className="text-3xl font-bold text-primary min-w-20 text-right">
                    {stat.value}
                  </span>
                </div>
              </div>
            ))}

            <div className="flex gap-4 pt-8">
              <Button
                onClick={handleSaveAll}
                disabled={isSaving}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl py-6 font-medium"
              >
                {isSaving ? 'Saving...' : 'Save All Changes'}
              </Button>
              <Link href="/admin/dashboard" className="flex-1">
                <Button
                  variant="outline"
                  className="w-full rounded-xl py-6"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
