'use client'

import { useEffect, useState } from 'react'
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
  // Original admin stats
  clients_satisfied: 'Client Satisfaction (%)',
  projects_delivered: 'Projects Delivered',
  team_members: 'Team Members',
  years_experience: 'Years of Excellence',
  // New homepage stats
  clients_served: 'Clients Served (Homepage)',
  success_rate: 'Success Rate (%) (Homepage)',
  team_experts: 'Team Experts (Homepage)',
  years_excellence: 'Years Excellence (Homepage)',
}

export default function CompanyStatsPage() {
  const [stats, setStats] = useState<CompanyStat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchStats = async () => {
    setIsLoading(true)
    setError(null)
    try {
      console.log('[v0] Fetching stats...')
      const response = await fetch('/api/admin/stats')
      console.log('[v0] Response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('[v0] API error:', errorData)
        setError(`API Error: ${response.status} - ${errorData?.error || 'Failed to load stats'}`)
        return
      }
      
      const data = await response.json()
      console.log('[v0] Data received:', data)
      
      // Use defaults if data is empty or not returned
      const defaultStats = [
        { id: 'clients_satisfied', stat_key: 'clients_satisfied', value: 89 },
        { id: 'projects_delivered', stat_key: 'projects_delivered', value: 149 },
        { id: 'team_members', stat_key: 'team_members', value: 23 },
        { id: 'years_experience', stat_key: 'years_experience', value: 6 },
        { id: 'clients_served', stat_key: 'clients_served', value: 500 },
        { id: 'success_rate', stat_key: 'success_rate', value: 98 },
        { id: 'team_experts', stat_key: 'team_experts', value: 50 },
        { id: 'years_excellence', stat_key: 'years_excellence', value: 10 },
      ]
      
      // If data is empty array or invalid, use defaults
      if (Array.isArray(data.data) && data.data.length > 0) {
        console.log('[v0] Using stats from API:', data.data)
        setStats(data.data)
      } else {
        console.log('[v0] API returned empty data, using defaults')
        setStats(defaultStats)
      }
    } catch (error) {
      console.error('[v0] Fetch error:', error)
      setError(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      // Set default values on error
      setStats([
        { id: 'clients_satisfied', stat_key: 'clients_satisfied', value: 89 },
        { id: 'projects_delivered', stat_key: 'projects_delivered', value: 149 },
        { id: 'team_members', stat_key: 'team_members', value: 23 },
        { id: 'years_experience', stat_key: 'years_experience', value: 6 },
        { id: 'clients_served', stat_key: 'clients_served', value: 500 },
        { id: 'success_rate', stat_key: 'success_rate', value: 98 },
        { id: 'team_experts', stat_key: 'team_experts', value: 50 },
        { id: 'years_excellence', stat_key: 'years_excellence', value: 10 },
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
        
        const result = await response.json()
        if (!result.success) {
          console.error(`Failed to update ${stat.stat_key}`)
        }
      }
      
      alert('Statistics saved successfully!')
      // Fetch fresh data from database
      await fetchStats()
    } catch (error) {
      console.error('[v0] Save error:', error)
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
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/50 rounded-xl text-destructive">
            <p className="font-medium">Error Loading Stats</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}
        
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
