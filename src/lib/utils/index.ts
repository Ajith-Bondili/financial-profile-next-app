import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(2)}%`
}

export function calculateFutureValue(
  presentValue: number,
  rate: number,
  years: number
): number {
  return presentValue * Math.pow(1 + rate, years)
}

export function calculateGrowthRate(
  currentValue: number,
  futureValue: number,
  years: number
): number {
  return Math.pow(futureValue / currentValue, 1 / years) - 1
} 