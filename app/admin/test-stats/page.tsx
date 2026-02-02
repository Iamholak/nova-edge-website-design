'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function TestStatsPage() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('[v0] Testing /api/admin/stats endpoint')
        const response = await fetch('/api/admin/stats')
        console.log('[v0] Response status:', response.status)
        
        const data = await response.json()
        console.log('[v0] Response data:', data)
        
        setStats(data)
      } catch (err) {
        console.error('[v0] Error:', err)
        setError(String(err))
      } finally {
        setLoading(false)
      }
    }

    testAPI()
  }, [])

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Stats API Test</h1>
        
        {loading && <p>Loading...</p>}
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-4">
            <p className="text-red-500 font-mono text-sm">{error}</p>
          </div>
        )}
        
        {stats && (
          <div className="bg-card border border-border rounded-lg p-6">
            <pre className="bg-background p-4 rounded overflow-auto">
              {JSON.stringify(stats, null, 2)}
            </pre>
          </div>
        )}
        
        <div className="mt-6">
          <Button onClick={() => window.location.href = '/admin/stats'}>
            Go to Stats Page
          </Button>
        </div>
      </div>
    </div>
  )
}
