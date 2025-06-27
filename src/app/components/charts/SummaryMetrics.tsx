import Card from '@/app/components/ui/Card'
import { formatCurrency, formatPercentage } from '@/lib/utils'

interface SummaryMetricsProps {
  totalCurrentValue: number
  totalFutureValue: number
  totalProjectedGrowth: number
  growthRate: number
}

export default function SummaryMetrics({
  totalCurrentValue,
  totalFutureValue,
  totalProjectedGrowth,
  growthRate
}: SummaryMetricsProps) {
  const isPositiveGrowth = totalProjectedGrowth >= 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="text-center">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">Current Value</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(totalCurrentValue)}
          </p>
        </div>
      </Card>

      <Card className="text-center">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">Future Value</p>
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(totalFutureValue)}
          </p>
        </div>
      </Card>

      <Card className="text-center">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">Projected Growth</p>
          <p className={`text-2xl font-bold ${isPositiveGrowth ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(totalProjectedGrowth)}
          </p>
        </div>
      </Card>

      <Card className="text-center">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">Growth Rate</p>
          <p className={`text-2xl font-bold ${isPositiveGrowth ? 'text-green-600' : 'text-red-600'}`}>
            {formatPercentage(growthRate)}
          </p>
        </div>
      </Card>
    </div>
  )
} 