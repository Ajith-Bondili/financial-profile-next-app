'use client'

import { useState } from 'react'
import Card from '@/app/components/ui/Card'
import Button from '@/app/components/ui/Button'

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    portfolioReports: true,
    clientMeetings: true,
    marketUpdates: false
  })

  const [preferences, setPreferences] = useState({
    currency: 'CAD',
    language: 'English',
    timezone: 'America/Toronto',
    reportFrequency: 'Monthly'
  })

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handlePreferenceChange = (key: keyof typeof preferences, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="John Advisor"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="john.advisor@friedmannai.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  defaultValue="Senior Financial Advisor"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  License Number
                </label>
                <input
                  type="text"
                  defaultValue="FA-123456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <Button>Update Profile</Button>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
            
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, enabled]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {key === 'emailAlerts' && 'Receive email notifications for important updates'}
                      {key === 'portfolioReports' && 'Weekly portfolio performance reports'}
                      {key === 'clientMeetings' && 'Reminders for upcoming client meetings'}
                      {key === 'marketUpdates' && 'Daily market news and analysis'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(key as keyof typeof notifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      enabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Application Preferences */}
        <Card>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Preferences</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  value={preferences.currency}
                  onChange={(e) => handlePreferenceChange('currency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="CAD">Canadian Dollar (CAD)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">British Pound (GBP)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  value={preferences.language}
                  onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="English">English</option>
                  <option value="French">Français</option>
                  <option value="Spanish">Español</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timezone
                </label>
                <select
                  value={preferences.timezone}
                  onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="America/Toronto">Eastern Time</option>
                  <option value="America/Vancouver">Pacific Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Frequency
                </label>
                <select
                  value={preferences.reportFrequency}
                  onChange={(e) => handlePreferenceChange('reportFrequency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                </select>
              </div>
            </div>
            
            <Button>Save Preferences</Button>
          </div>
        </Card>

        {/* Security Settings */}
        <Card>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Security</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Change Password</h3>
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="Current password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button variant="outline" className="mt-3">Update Password</Button>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline">Enable 2FA</Button>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-2">API Access</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Manage API keys for integrations
                </p>
                <Button variant="outline">Manage API Keys</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 