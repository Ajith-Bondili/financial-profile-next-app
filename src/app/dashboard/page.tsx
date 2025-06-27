'use client'

import { useState } from 'react'
import SummaryMetrics from '@/app/components/charts/SummaryMetrics'
import AssetCard from '@/app/components/ui/AssetCard'
import Card from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'

// Mock data for development - following the database schema
const initialAssets = [
  {
    id: '1',
    name: 'Primary Residence',
    type: 'residence' as const,
    currentValue: 750000,
    futureValue: 900000,
    growthRate: 0.03,
    projectionYears: 5,
  },
  {
    id: '2', 
    name: 'RRSP Portfolio',
    type: 'rrsp' as const,
    currentValue: 125000,
    futureValue: 180000,
    growthRate: 0.07,
    projectionYears: 5,
  },
  {
    id: '3',
    name: 'TFSA Investments',
    type: 'tfsa' as const,
    currentValue: 45000,
    futureValue: 65000,
    growthRate: 0.06,
    projectionYears: 5,
  },
  {
    id: '4',
    name: 'Emergency Fund',
    type: 'savings' as const,
    currentValue: 25000,
    futureValue: 28000,
    growthRate: 0.025,
    projectionYears: 5,
  }
]

const mockClient = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  totalIncome: 95000,
  riskTolerance: 'moderate'
}

export default function DashboardPage() {
  const [assets, setAssets] = useState(initialAssets)

  const handleAssetUpdate = (assetId: string, updates: any) => {
    setAssets(prev => prev.map(asset => 
      asset.id === assetId ? { ...asset, ...updates } : asset
    ))
  }

  // Calculate totals
  const totalCurrent = assets.reduce((sum, asset) => sum + asset.currentValue, 0)
  const totalFuture = assets.reduce((sum, asset) => sum + asset.futureValue, 0)
  const totalGrowth = totalFuture - totalCurrent
  const growthRate = totalCurrent > 0 ? (totalFuture - totalCurrent) / totalCurrent : 0

  const PlusIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  )

  const ChartIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Dashboard</h1>
          <p className="text-gray-600 mt-1">Managing {mockClient.name}'s financial portfolio</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <ChartIcon />
            <span>Generate Report</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <PlusIcon />
            <span>Add Asset</span>
          </Button>
        </div>
      </div>

      {/* Client Quick Info */}
      <Card padding="sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-lg">
                {mockClient.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{mockClient.name}</h2>
              <p className="text-sm text-gray-500">{mockClient.email}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Annual Income</p>
            <p className="text-lg font-semibold text-gray-900">
              ${mockClient.totalIncome.toLocaleString()}
            </p>
          </div>
        </div>
      </Card>

      {/* Summary Metrics */}
      <SummaryMetrics
        totalCurrentValue={totalCurrent}
        totalFutureValue={totalFuture}
        totalProjectedGrowth={totalGrowth}
        growthRate={growthRate}
      />

      {/* Assets Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Asset Portfolio</h2>
          <div className="text-sm text-gray-500">
            {assets.length} asset{assets.length !== 1 ? 's' : ''}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {assets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onUpdate={handleAssetUpdate}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="sm">View Full Report</Button>
            <Button variant="outline" size="sm">Schedule Review</Button>
            <Button variant="outline" size="sm">Export Data</Button>
          </div>
        </div>
      </Card>

      {/* AI Assistant Preview */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">AI</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900">AI Financial Assistant</h3>
            <p className="text-blue-700">Ask questions about {mockClient.name}'s portfolio or run scenario planning.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Start Chat
          </Button>
        </div>
      </Card>
    </div>
  )
} 