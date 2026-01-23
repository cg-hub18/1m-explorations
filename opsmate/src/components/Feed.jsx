import { useState } from 'react'
import { ChevronDown, Link2, MoreVertical, X, SlidersHorizontal, MessageSquare, Bot, Plus, Search, Home, Users, Target, Activity, AlertTriangle, Shield, Flame, BarChart3, ChevronRight } from 'lucide-react'

// Sample data matching the screenshot
const initialFeedItems = [
  {
    id: 1,
    type: 'SEV3',
    title: 'S448319 Taylor Swift - Life of a Showgirl - Only In Polish',
    comments: 2,
    newComments: true,
    hasBot: false,
    priority: 'Medium',
    status: 'Investigating',
    owner: 'David Kim',
  },
  {
    id: 2,
    type: 'ALERT',
    title: 'High memory usage on cache cluster',
    comments: 1,
    newComments: false,
    hasBot: true,
    botCount: 30,
    priority: 'High',
    status: 'Active',
    owner: 'Sarah Miller',
  },
  {
    id: 3,
    type: 'SEV3',
    title: 'S512847 Super Bowl LVIII - Halftime Show - Audio Sync Failures',
    comments: 3,
    newComments: true,
    hasBot: false,
    priority: 'High',
    status: 'Mitigating',
    owner: 'Michael Chen',
  },
  {
    id: 4,
    type: 'ALERT',
    title: 'API latency threshold exceeded',
    comments: 4,
    newComments: true,
    hasBot: true,
    priority: 'High',
    status: 'Acknowledged',
    owner: 'Emily Rodriguez',
  },
  {
    id: 5,
    type: 'TASK',
    title: 'Task regression: Mobile Release protection setup',
    comments: 5,
    newComments: false,
    hasBot: false,
    priority: 'High',
    status: 'In Progress',
    owner: 'Alex Kumar',
  },
  {
    id: 6,
    type: 'REGRESSION',
    title: 'Performance degradation in checkout flow',
    comments: 2,
    newComments: true,
    hasBot: true,
    botCount: 10,
    priority: 'Medium',
    status: 'Investigating',
    owner: 'Lisa Wong',
  },
  {
    id: 7,
    type: 'ALERT',
    title: 'Disk space warning on analytics cluster',
    comments: 1,
    newComments: false,
    hasBot: true,
    acked: true,
    priority: 'Medium',
    status: 'Active',
    owner: 'James Taylor',
  },
  {
    id: 8,
    type: 'SEV3',
    title: 'S623914 Grammy Awards - Live Stream - Buffer Overflow Issues',
    comments: 3,
    newComments: true,
    hasBot: false,
    priority: 'High',
    status: 'Investigating',
    owner: 'Nina Patel',
  },
  {
    id: 9,
    type: 'TASK',
    title: 'Update monitoring dashboard thresholds',
    comments: 0,
    newComments: false,
    hasBot: false,
    priority: 'Low',
    status: 'To Do',
    owner: 'Rachel Park',
  },
  {
    id: 10,
    type: 'ALERT',
    title: 'SSL certificate expiring soon',
    comments: 2,
    newComments: false,
    hasBot: false,
    priority: 'High',
    status: 'Active',
    owner: 'Tom Wilson',
  },
  {
    id: 11,
    type: 'TASK',
    title: 'Task regression: Database connection pool tuning',
    comments: 0,
    newComments: false,
    hasBot: false,
    priority: 'High',
    status: 'To Do',
    owner: 'Maria Garcia',
  },
  {
    id: 12,
    type: 'RECOMMENDATION',
    title: 'Missing detector for rb_app_responsiveness',
    comments: 0,
    newComments: false,
    hasBot: false,
    priority: 'High',
    status: 'Auto-apply',
    owner: 'System',
  },
]

// Type badge colors
const typeBadgeStyles = {
  SEV3: 'bg-red-100 text-red-700',
  ALERT: 'bg-amber-100 text-amber-700',
  TASK: 'bg-blue-100 text-blue-700',
  REGRESSION: 'bg-purple-100 text-purple-700',
  RECOMMENDATION: 'bg-gray-100 text-gray-600',
}

// Priority dropdown styles
const priorityStyles = {
  High: 'bg-red-50 text-red-700 border-red-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  Low: 'bg-green-50 text-green-700 border-green-200',
}

// Status dot colors
const statusDotColors = {
  'Investigating': 'bg-blue-500',
  'Active': 'bg-red-500',
  'Mitigating': 'bg-orange-500',
  'Acknowledged': 'bg-gray-400',
  'In Progress': 'bg-blue-500',
  'To Do': 'bg-gray-400',
  'Auto-apply': 'bg-gray-400',
}

// Status text colors
const statusTextColors = {
  'Investigating': 'text-blue-600',
  'Active': 'text-red-600',
  'Mitigating': 'text-orange-600',
  'Acknowledged': 'text-gray-600',
  'In Progress': 'text-blue-600',
  'To Do': 'text-gray-600',
  'Auto-apply': 'text-gray-600',
}

// Navigation items for the sidebar
const navItems = [
  { name: 'Feed', icon: Activity, active: true },
  { name: 'Quality Home', icon: Home },
  { name: 'Entities', icon: Target, expandable: true, expanded: true, subnav: [{ name: 'Agents' }] },
  { name: 'Metrics', icon: BarChart3 },
  { name: 'Incidents', icon: AlertTriangle },
  { type: 'divider' },
  { name: 'Data Exploration', icon: Search },
  { type: 'divider' },
  { name: 'Protections', icon: Shield },
  { name: 'SEV Criteria', icon: Flame },
]

// OneMonitoring Logo
const OneMonitoringLogo = () => (
  <svg width="32" height="25" viewBox="0 0 73 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M72.186 51.1272C72.1736 53.2786 70.4189 55.0136 68.2676 55.0026C66.1153 54.991 64.3775 53.2364 64.3889 51.0842L72.186 51.1272ZM38.9722 49.4096C38.9722 51.5244 37.9538 53.3139 36.7714 54.4963C35.5892 55.6781 33.8019 56.6968 31.6881 56.6971H7.28743C2.85296 56.697 0 52.9988 0 49.4096V44.5216C0 42.6195 0.653047 40.7314 2.07503 39.3092C3.4973 37.8869 5.38518 37.2342 7.28743 37.2341H7.37348L7.66471 21.4513H7.53564C3.10105 21.4513 0.24821 17.7531 0.24821 14.1639V12.1319C0.24821 8.62572 2.46487 5.08602 5.74523 3.77216L5.74854 3.76885C5.76119 3.76364 5.7869 3.75369 5.82134 3.73907C5.89055 3.70968 6.00052 3.66121 6.14236 3.59676C6.42935 3.46632 6.8386 3.27125 7.29736 3.02422C8.27229 2.49921 9.24118 1.86467 9.8622 1.24373L10.1567 0.975668C11.6875 -0.273454 13.9454 -0.183336 15.3724 1.24373C16.8942 2.76571 16.8943 5.23209 15.3724 6.75399C13.9604 8.16601 12.2182 9.22714 10.9907 9.88805C10.3485 10.2338 9.78088 10.5051 9.36909 10.6922C9.16319 10.7858 8.99302 10.8581 8.86936 10.9107C8.80737 10.937 8.75506 10.9612 8.71712 10.9769C8.69904 10.9843 8.68299 10.9885 8.67079 10.9934C8.66494 10.9958 8.65866 10.9982 8.65424 11L8.64762 11.0033L8.64431 11.0066C8.6152 11.0259 8.4665 11.1236 8.30344 11.374C8.11148 11.6693 8.04199 11.9594 8.04199 12.1319V13.6575H8.21077C11.6797 13.6575 15.4717 16.3006 15.4717 20.8457C15.4717 20.8697 15.4722 20.8945 15.4717 20.9185L15.1573 37.8629L15.154 37.8596C15.129 40.1366 13.8817 41.9223 12.6785 42.9992C11.4834 44.0686 9.75188 44.9677 7.79709 45.018V48.9033H31.1784V45.0014C27.0626 44.7443 24.9344 41.3929 24.6753 38.4057L24.6489 37.7901V5.35409C24.6489 4.73218 24.7012 3.93382 24.96 3.14006C25.165 2.51143 25.8844 0.755852 27.9418 0.168159C30.0295 -0.427717 31.5792 0.719272 32.1051 1.17754C32.7364 1.72795 33.2087 2.39686 33.5546 2.96796L48.5399 27.2131L63.5251 2.96796C63.8709 2.39709 64.3404 1.72772 64.9714 1.17754C65.4965 0.719697 67.0486 -0.428646 69.138 0.168159C71.1952 0.755913 71.9115 2.51145 72.1165 3.14006C72.3754 3.93402 72.4309 4.73202 72.4309 5.35409V5.37394L72.186 51.1272L64.3889 51.0842L64.5775 16.0867L53.5504 33.9346L53.5471 33.9313C52.7411 35.256 51.1239 37.0518 48.5399 37.0521C45.9565 37.0521 44.3357 35.2592 43.5294 33.9346L32.4427 15.994V37.2672C34.0824 37.4189 35.6669 38.0755 36.9005 39.3092C38.3222 40.7314 38.9722 42.6196 38.9722 44.5216V49.4096Z" fill="url(#paint0_linear_feed)"/>
    <defs>
      <linearGradient id="paint0_linear_feed" x1="4.93846" y1="52.8314" x2="51.527" y2="-5.07724" gradientUnits="userSpaceOnUse">
        <stop stopColor="#222AEC"/>
        <stop offset="1" stopColor="#3C7CF1"/>
      </linearGradient>
    </defs>
  </svg>
)

export default function Feed({ onAskOpsmate }) {
  const [feedItems, setFeedItems] = useState(initialFeedItems)
  const [activeFilters, setActiveFilters] = useState(['Alerts', 'Regressions', 'SEVs', 'Tasks'])
  const [oncallFilter, setOncallFilter] = useState('MSE, DSE...')
  const [showUnacknowledged, setShowUnacknowledged] = useState(false)
  const [showForMe, setShowForMe] = useState(false)
  const [openPriorityDropdown, setOpenPriorityDropdown] = useState(null)
  const [openActionDropdown, setOpenActionDropdown] = useState(null)
  const [expandedNavItems, setExpandedNavItems] = useState({ 'Entities': true })
  const [selectedItem, setSelectedItem] = useState(null)

  const handleRowClick = (item) => {
    setSelectedItem(item)
    // Close any open dropdowns when selecting a row
    setOpenPriorityDropdown(null)
    setOpenActionDropdown(null)
  }

  const closeFlyout = () => {
    setSelectedItem(null)
  }

  const typeFilters = ['Alerts', 'Regressions', 'SEVs', 'Tasks']

  const toggleTypeFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter))
    } else {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const handlePriorityChange = (itemId, newPriority) => {
    setFeedItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, priority: newPriority } : item
      )
    )
    setOpenPriorityDropdown(null)
  }

  const filteredItems = feedItems.filter(item => {
    // Type filter logic
    const typeMapping = {
      'SEV3': 'SEVs',
      'ALERT': 'Alerts',
      'TASK': 'Tasks',
      'REGRESSION': 'Regressions',
      'RECOMMENDATION': 'Tasks', // Group recommendations with tasks
    }
    return activeFilters.includes(typeMapping[item.type]) || item.type === 'RECOMMENDATION'
  })

  const toggleNavExpand = (name) => {
    setExpandedNavItems(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const handleNavClick = (item) => {
    if (item.name === 'Incidents') {
      // Navigate back to main dashboard
      window.location.href = window.location.pathname.includes('dist') 
        ? '../../../index.html' 
        : '/index.html'
    }
  }

  return (
    <div className="h-screen flex bg-[#f5f6f8] overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-[260px] h-full bg-white border-r border-gray-200 flex flex-col p-4 shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-gray-200">
          <OneMonitoringLogo />
          <span className="text-lg font-semibold text-gray-900">OneMonitoring</span>
        </div>

        {/* Create Button */}
        <button className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-gradient-to-r from-[#222AEC] to-[#3C7CF1] text-white text-sm font-medium rounded-lg mb-3 hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          Create
        </button>

        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg mb-4">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Discover" 
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-400"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-0.5">
          {navItems.map((item, index) => {
            if (item.type === 'divider') {
              return <div key={index} className="h-px bg-gray-200 my-3" />
            }

            const Icon = item.icon
            const isExpanded = expandedNavItems[item.name]

            return (
              <div key={item.name}>
                <button
                  onClick={() => item.expandable ? toggleNavExpand(item.name) : handleNavClick(item)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    item.active 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.expandable && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? '' : '-rotate-90'}`} />
                  )}
                </button>
                
                {/* Subnav */}
                {item.expandable && item.subnav && isExpanded && (
                  <div className="ml-7 mt-0.5">
                    {item.subnav.map(subitem => (
                      <button
                        key={subitem.name}
                        className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {subitem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${selectedItem ? 'mr-0' : ''}`}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">Feed</h1>
          <button 
            onClick={onAskOpsmate}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#222AEC] to-[#3C7CF1] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C17.52 2 22 6.48 22 12s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm.86 4.56c-.32-.75-1.38-.75-1.7 0l-1.23 2.85c-.09.22-.27.39-.49.48l-2.89 1.23c-.74.32-.75 1.38 0 1.7l2.77 1.22c.21.09.38.26.47.46l1.34 2.95c.33.73 1.38.72 1.7.02l1.25-2.91c.09-.22.27-.39.49-.49l2.86-1.22c.75-.32.75-1.38 0-1.7l-2.86-1.22c-.22-.09-.39-.27-.49-.49l-1.22-2.85z"/>
            </svg>
            Ask Opsmate
          </button>
        </div>

        {/* Filters Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Oncall Filter */}
            <span className="text-sm text-gray-500">Filters:</span>
            <div className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700">
              <span>Oncall: {oncallFilter}</span>
              <button 
                onClick={() => setOncallFilter('')}
                className="ml-1 p-0.5 hover:bg-blue-100 rounded"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Type Filters */}
            <span className="text-sm text-gray-500 ml-2">Types:</span>
            {typeFilters.map(filter => (
              <button
                key={filter}
                onClick={() => toggleTypeFilter(filter)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeFilters.includes(filter)
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Right side filters */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowUnacknowledged(!showUnacknowledged)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                showUnacknowledged
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Unacknowledged
            </button>
            <button
              onClick={() => setShowForMe(!showForMe)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                showForMe
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              For me
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-3 text-sm text-gray-500">
          {filteredItems.length} results
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[45%]">
                  <div className="flex items-center gap-1">
                    Title
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[12%]">
                  <div className="flex items-center gap-1">
                    Priority
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[15%]">
                  <div className="flex items-center gap-1">
                    Status
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[15%]">
                  <div className="flex items-center gap-1">
                    Owner
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[13%]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => handleRowClick(item)}
                  className={`hover:bg-gray-50 transition-colors cursor-pointer ${selectedItem?.id === item.id ? 'bg-blue-50' : ''}`}
                >
                  {/* Title Column */}
                  <td className="px-4 py-3">
                    <div className="flex items-start gap-3">
                      {/* Type Badge */}
                      <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded ${typeBadgeStyles[item.type]}`}>
                        {item.type}
                      </span>
                      
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {item.type === 'SEV3' ? (
                            <a 
                              href="http://localhost:8888/sev-detail.html"
                              onClick={(e) => e.stopPropagation()}
                              className="hover:underline text-gray-900"
                            >
                              {item.title}
                            </a>
                          ) : item.type === 'RECOMMENDATION' ? (
                            <a 
                              href="http://localhost:8888/opsmate-protection/?mode=protection"
                              onClick={(e) => e.stopPropagation()}
                              className="hover:underline text-gray-900"
                            >
                              {item.title}
                            </a>
                          ) : (
                            item.title
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          {/* Comments indicator - always shown */}
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MessageSquare className="w-3.5 h-3.5" />
                            {item.newComments && item.comments > 0 && <span className="text-blue-600">{item.comments} new</span>}
                            {(!item.newComments || item.comments === 0) && <span>{item.comments}</span>}
                          </div>
                          
                          {/* Bot indicator */}
                          {item.hasBot && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Bot className="w-3.5 h-3.5 text-green-600" />
                              <span>Bot</span>
                              {item.botCount && <span className="ml-1">{item.botCount} more</span>}
                            </div>
                          )}

                          {/* Acked indicator */}
                          {item.acked && (
                            <div className="flex items-center gap-1 text-xs text-green-600">
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Acked
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Priority Column */}
                  <td className="px-4 py-3">
                    <div className="relative">
                      <button
                        onClick={() => setOpenPriorityDropdown(openPriorityDropdown === item.id ? null : item.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border transition-colors ${priorityStyles[item.priority]}`}
                      >
                        {item.priority}
                        <ChevronDown className="w-3 h-3" />
                      </button>

                      {openPriorityDropdown === item.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-20" 
                            onClick={() => setOpenPriorityDropdown(null)}
                          />
                          <div className="absolute left-0 top-full mt-1 w-28 bg-white rounded-lg shadow-lg border border-gray-200 z-30 py-1">
                            {['High', 'Medium', 'Low'].map((priority) => (
                              <button
                                key={priority}
                                onClick={() => handlePriorityChange(item.id, priority)}
                                className="w-full px-3 py-1.5 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                              >
                                <span className={`w-2 h-2 rounded-full ${
                                  priority === 'High' ? 'bg-red-500' :
                                  priority === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
                                }`} />
                                {priority}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${statusDotColors[item.status]}`} />
                      <span className={`text-sm font-medium ${statusTextColors[item.status]}`}>
                        {item.status}
                      </span>
                    </div>
                  </td>

                  {/* Owner Column */}
                  <td className="px-4 py-3">
                    <button className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium">
                      {item.owner}
                    </button>
                  </td>

                  {/* Actions Column */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {/* Start Button */}
                      <div className="relative">
                        <button
                          onClick={() => setOpenActionDropdown(openActionDropdown === item.id ? null : item.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-md transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          Start
                          <ChevronDown className="w-3 h-3" />
                        </button>

                        {openActionDropdown === item.id && (
                          <>
                            <div 
                              className="fixed inset-0 z-20" 
                              onClick={() => setOpenActionDropdown(null)}
                            />
                            <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 z-30 py-1">
                              <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors">
                                Start working
                              </button>
                              <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors">
                                Assign to me
                              </button>
                              <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors">
                                View details
                              </button>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Link Icon */}
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        <Link2 className="w-4 h-4" />
                      </button>

                      {/* More Options */}
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>

      {/* Flyout Panel */}
      <div 
        className={`h-full bg-white border-l border-gray-200 flex flex-col shrink-0 transition-all duration-300 ease-in-out ${
          selectedItem ? 'w-[480px] opacity-100' : 'w-0 opacity-0 overflow-hidden'
        }`}
      >
        {selectedItem && (
          <>
            {/* Flyout Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded ${typeBadgeStyles[selectedItem.type]}`}>
                  {selectedItem.type}
                </span>
                <span className={`flex items-center gap-1.5 text-sm font-medium ${statusTextColors[selectedItem.status]}`}>
                  <span className={`w-2 h-2 rounded-full ${statusDotColors[selectedItem.status]}`} />
                  {selectedItem.status}
                </span>
              </div>
              <button 
                onClick={closeFlyout}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Flyout Title */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedItem.type === 'SEV3' ? (
                  <a 
                    href="http://localhost:8888/sev-detail.html"
                    className="hover:underline"
                  >
                    {selectedItem.title}
                  </a>
                ) : (
                  selectedItem.title
                )}
              </h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {selectedItem.owner}
                </span>
                {selectedItem.comments > 0 && (
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {selectedItem.comments} comments
                  </span>
                )}
              </div>
            </div>

            {/* Flyout Content - Blank for now */}
            <div className="flex-1 overflow-auto p-6">
              {/* Content will go here */}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

