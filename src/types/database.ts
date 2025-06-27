export interface Client {
  id: string
  name: string
  email: string
  advisor_id?: string
  created_at: string
  updated_at: string
}

export interface Asset {
  id: string
  client_id: string
  asset_type: 'residence' | 'rrsp' | 'tfsa' | 'investment' | 'savings'
  name: string
  current_value: number
  purchase_price?: number
  growth_rate: number
  projection_years: number
  created_at: string
  updated_at: string
}

export interface Portfolio {
  id: string
  client_id: string
  total_current_value: number
  total_future_value: number
  total_projected_growth: number
  growth_rate_overall: number
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
}

export interface ChatMessage {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: string
  client_id?: string
} 