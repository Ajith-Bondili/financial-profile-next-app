'use client'

import { useState } from 'react'
import Card from './Card'
import { formatCurrency, formatPercentage, calculateFutureValue } from '@/lib/utils'

interface AssetCardProps {
  asset: {
    id: string
    name: string
    type: 'residence' | 'rrsp' | 'tfsa' | 'investment' | 'savings'
    currentValue: number
    futureValue: number
    growthRate: number
    projectionYears: number
  }
  onUpdate: (assetId: string, updates: Partial<AssetCardProps['asset']>) => void
}

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

const getAssetIcon = (type: string) => {
  switch (type) {
    case 'residence':
      return '🏠'
    case 'rrsp':
      return '📈'
    case 'tfsa':
      return '💰'
    case 'investment':
      return '📊'
    case 'savings':
      return '🏦'
    default:
      return '💼'
  }
}

const getAssetColor = (type: string) => {
  switch (type) {
    case 'residence':
      return 'bg-blue-50 text-blue-700 border-blue-200'
    case 'rrsp':
      return 'bg-green-50 text-green-700 border-green-200'
    case 'tfsa':
      return 'bg-purple-50 text-purple-700 border-purple-200'
    case 'investment':
      return 'bg-orange-50 text-orange-700 border-orange-200'
    case 'savings':
      return 'bg-gray-50 text-gray-700 border-gray-200'
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200'
  }
}

export default function AssetCard({ asset, onUpdate }: AssetCardProps) {
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [tempValue, setTempValue] = useState<string>('')

  const handleEdit = (field: string, currentValue: number) => {
    setIsEditing(field)
    setTempValue(currentValue.toString())
  }

  const handleSave = (field: string) => {
    const numValue = parseFloat(tempValue)
    if (!isNaN(numValue)) {
      if (field === 'currentValue') {
        const newFutureValue = calculateFutureValue(numValue, asset.growthRate, asset.projectionYears)
        onUpdate(asset.id, { 
          currentValue: numValue,
          futureValue: newFutureValue 
        })
      } else if (field === 'growthRate') {
        const rate = numValue / 100 // Convert percentage to decimal
        const newFutureValue = calculateFutureValue(asset.currentValue, rate, asset.projectionYears)
        onUpdate(asset.id, { 
          growthRate: rate,
          futureValue: newFutureValue 
        })
      } else if (field === 'projectionYears') {
        const newFutureValue = calculateFutureValue(asset.currentValue, asset.growthRate, numValue)
        onUpdate(asset.id, { 
          projectionYears: numValue,
          futureValue: newFutureValue 
        })
      }
    }
    setIsEditing(null)
  }

  const handleKeyPress = (e: React.KeyboardEvent, field: string) => {
    if (e.key === 'Enter') {
      handleSave(field)
    } else if (e.key === 'Escape') {
      setIsEditing(null)
    }
  }

  const growth = asset.futureValue - asset.currentValue
  const isPositiveGrowth = growth >= 0

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${getAssetColor(asset.type)}`}>
              {getAssetIcon(asset.type)}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{asset.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{asset.type}</p>
            </div>
          </div>
        </div>

        {/* Current Value */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Current Value</span>
            <button
              onClick={() => handleEdit('currentValue', asset.currentValue)}
              className="text-gray-400 hover:text-gray-600"
            >
              <EditIcon />
            </button>
          </div>
          {isEditing === 'currentValue' ? (
            <input
              type="number"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onBlur={() => handleSave('currentValue')}
              onKeyPress={(e) => handleKeyPress(e, 'currentValue')}
              className="w-full text-xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-500 focus:outline-none"
              autoFocus
            />
          ) : (
            <p className="text-xl font-bold text-gray-900">{formatCurrency(asset.currentValue)}</p>
          )}
        </div>

        {/* Growth Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-600">Growth Rate</span>
              <button
                onClick={() => handleEdit('growthRate', asset.growthRate * 100)}
                className="text-gray-400 hover:text-gray-600"
              >
                <EditIcon />
              </button>
            </div>
            {isEditing === 'growthRate' ? (
              <input
                type="number"
                step="0.1"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={() => handleSave('growthRate')}
                onKeyPress={(e) => handleKeyPress(e, 'growthRate')}
                className="w-full text-sm font-semibold bg-transparent border-b border-blue-500 focus:outline-none"
                autoFocus
              />
            ) : (
              <p className="text-sm font-semibold text-gray-900">{formatPercentage(asset.growthRate)}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-600">Years</span>
              <button
                onClick={() => handleEdit('projectionYears', asset.projectionYears)}
                className="text-gray-400 hover:text-gray-600"
              >
                <EditIcon />
              </button>
            </div>
            {isEditing === 'projectionYears' ? (
              <input
                type="number"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={() => handleSave('projectionYears')}
                onKeyPress={(e) => handleKeyPress(e, 'projectionYears')}
                className="w-full text-sm font-semibold bg-transparent border-b border-blue-500 focus:outline-none"
                autoFocus
              />
            ) : (
              <p className="text-sm font-semibold text-gray-900">{asset.projectionYears}y</p>
            )}
          </div>
        </div>

        {/* Future Value & Growth */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Future Value</span>
            <span className="text-lg font-bold text-blue-600">{formatCurrency(asset.futureValue)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Projected Growth</span>
            <span className={`text-sm font-bold ${isPositiveGrowth ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(growth)}
            </span>
          </div>
        </div>

        {/* Simple Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((asset.currentValue / asset.futureValue) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Current</span>
            <span>Target ({asset.projectionYears}y)</span>
          </div>
        </div>
      </div>
    </Card>
  )
} 