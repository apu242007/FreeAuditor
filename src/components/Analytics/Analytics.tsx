import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Users, FileText, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

interface AnalyticsData {
  totalForms: number;
  totalSubmissions: number;
  uniqueUsers: number;
  averageCompletionTime: number;
  abandonmentRate: number;
  submissionsOverTime: Array<{ date: string; submissions: number }>;
  popularFields: Array<{ field: string; usage: number }>;
  deviceBreakdown: Array<{ device: string; count: number; percentage: number }>;
}

const Analytics: React.FC = () => {
  const [analyticsData] = useState<AnalyticsData>({
    totalForms: 12,
    totalSubmissions: 487,
    uniqueUsers: 324,
    averageCompletionTime: 3.5,
    abandonmentRate: 15.2,
    submissionsOverTime: [
      { date: '2024-01-01', submissions: 45 },
      { date: '2024-01-02', submissions: 52 },
      { date: '2024-01-03', submissions: 38 },
      { date: '2024-01-04', submissions: 61 },
      { date: '2024-01-05', submissions: 55 },
      { date: '2024-01-06', submissions: 47 },
      { date: '2024-01-07', submissions: 59 },
    ],
    popularFields: [
      { field: 'Text Input', usage: 85 },
      { field: 'Email', usage: 72 },
      { field: 'Select', usage: 58 },
      { field: 'Textarea', usage: 45 },
      { field: 'Checkbox', usage: 38 },
      { field: 'Signature', usage: 25 },
    ],
    deviceBreakdown: [
      { device: 'Desktop', count: 195, percentage: 60 },
      { device: 'Mobile', count: 130, percentage: 40 },
      { device: 'Tablet', count: 32, percentage: 10 },
    ],
  });

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    trend?: string;
    trendUp?: boolean;
  }> = ({ title, value, icon: Icon, trend, trendUp }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm flex items-center ${
              trendUp ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className={`w-4 h-4 mr-1 ${!trendUp && 'rotate-180'}`} />
              {trend}
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-full">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Form performance and user insights</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '90d')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Forms"
          value={analyticsData.totalForms}
          icon={FileText}
          trend="+2 this week"
          trendUp={true}
        />
        <StatCard
          title="Total Submissions"
          value={analyticsData.totalSubmissions.toLocaleString()}
          icon={TrendingUp}
          trend="+12.5%"
          trendUp={true}
        />
        <StatCard
          title="Unique Users"
          value={analyticsData.uniqueUsers.toLocaleString()}
          icon={Users}
          trend="+8.2%"
          trendUp={true}
        />
        <StatCard
          title="Avg. Completion Time"
          value={`${analyticsData.averageCompletionTime}m`}
          icon={Clock}
          trend="-0.5m"
          trendUp={true}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submissions Over Time */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Submissions Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.submissionsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Line 
                type="monotone" 
                dataKey="submissions" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Popular Fields */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Most Used Field Types
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.popularFields} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="field" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="usage" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Device Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={analyticsData.deviceBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="count"
              >
                {analyticsData.deviceBreakdown.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Abandonment Rate */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Form Abandonment
            </h3>
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {analyticsData.abandonmentRate}%
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Users who start but don't complete forms
            </p>
            
            <div className="bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full" 
                style={{ width: `${analyticsData.abandonmentRate}%` }}
              ></div>
            </div>
            
            <p className="text-xs text-gray-500">
              Industry average: 20-25%
            </p>
          </div>
        </div>

        {/* Real-time Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Real-time Activity
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Forms created today</span>
              <span className="font-semibold text-blue-600">3</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Active users</span>
              <span className="font-semibold text-green-600">12</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Submissions today</span>
              <span className="font-semibold text-purple-600">47</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Forms shared</span>
              <span className="font-semibold text-orange-600">8</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { action: 'Form "Customer Feedback" created', time: '2 minutes ago', user: 'John Doe' },
              { action: 'New submission received', time: '5 minutes ago', user: 'Jane Smith' },
              { action: 'Form "Event Registration" shared', time: '15 minutes ago', user: 'Mike Johnson' },
              { action: 'Analytics report generated', time: '1 hour ago', user: 'System' },
              { action: 'Form "Survey 2024" edited', time: '2 hours ago', user: 'Sarah Wilson' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">by {activity.user}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;