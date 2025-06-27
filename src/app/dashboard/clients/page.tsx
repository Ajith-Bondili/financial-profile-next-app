'use client'

import { useState } from 'react'
import Card from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

// Mock clients data
const mockClients = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    totalPortfolio: 945000,
    monthlyGrowth: 12500,
    riskProfile: 'Moderate',
    lastReview: '2024-01-15',
    assets: 4
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    totalPortfolio: 1250000,
    monthlyGrowth: 18750,
    riskProfile: 'Aggressive',
    lastReview: '2024-01-10',
    assets: 6
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    email: 'emma.rodriguez@email.com',
    totalPortfolio: 680000,
    monthlyGrowth: 8200,
    riskProfile: 'Conservative',
    lastReview: '2024-01-20',
    assets: 3
  },
  {
    id: '4',
    name: 'David Thompson',
    email: 'david.thompson@email.com',
    totalPortfolio: 2100000,
    monthlyGrowth: 25000,
    riskProfile: 'Moderate',
    lastReview: '2024-01-12',
    assets: 8
  }
]

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRisk, setSelectedRisk] = useState('All')

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk = selectedRisk === 'All' || client.riskProfile === selectedRisk
    return matchesSearch && matchesRisk
  })

  const PlusIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  )

  const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Conservative':
        return 'bg-green-100 text-green-800'
      case 'Moderate':
        return 'bg-blue-100 text-blue-800'
      case 'Aggressive':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
          <p className="text-gray-600 mt-1">Manage and review client portfolios</p>
        </div>
        <Button className="flex items-center space-x-2">
          <PlusIcon />
          <span>Add Client</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Risk Profiles</option>
            <option value="Conservative">Conservative</option>
            <option value="Moderate">Moderate</option>
            <option value="Aggressive">Aggressive</option>
          </select>
        </div>
      </Card>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="space-y-4">
              {/* Client Header */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-500">{client.email}</p>
                </div>
              </div>

              {/* Portfolio Value */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Total Portfolio</span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatCurrency(client.totalPortfolio)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Monthly Growth</span>
                  <span className="text-sm font-semibold text-green-600">
                    +{formatCurrency(client.monthlyGrowth)}
                  </span>
                </div>
              </div>

              {/* Risk Profile & Assets */}
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(client.riskProfile)}`}>
                  {client.riskProfile}
                </span>
                <span className="text-sm text-gray-500">
                  {client.assets} assets
                </span>
              </div>

              {/* Last Review */}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Last Review</span>
                  <span className="text-xs font-medium text-gray-900">
                    {new Date(client.lastReview).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Portfolio
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Schedule Meeting
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">{mockClients.length}</p>
            <p className="text-sm text-gray-600">Total Clients</p>
          </div>
        </Card>
        <Card className="text-center">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(mockClients.reduce((sum, client) => sum + client.totalPortfolio, 0))}
            </p>
            <p className="text-sm text-gray-600">Assets Under Management</p>
          </div>
        </Card>
        <Card className="text-center">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(mockClients.reduce((sum, client) => sum + client.monthlyGrowth, 0))}
            </p>
            <p className="text-sm text-gray-600">Monthly Growth</p>
          </div>
        </Card>
        <Card className="text-center">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">
              {(mockClients.reduce((sum, client) => sum + client.assets, 0))}
            </p>
            <p className="text-sm text-gray-600">Total Assets</p>
          </div>
        </Card>
      </div>
    </div>
  )
} 