import { useState } from 'react'
import { ChevronDown, Plus, Search, Home, Target, Activity, AlertTriangle, Shield, Flame, BarChart3 } from 'lucide-react'

// Navigation items for the sidebar
const navItems = [
  { name: 'Feed', icon: Activity },
  { name: 'Quality Home', icon: Home },
  { name: 'Entities', icon: Target, expandable: true, expanded: true, subnav: [{ name: 'Agents' }] },
  { name: 'Metrics', icon: BarChart3, active: true },
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
    <path d="M72.186 51.1272C72.1736 53.2786 70.4189 55.0136 68.2676 55.0026C66.1153 54.991 64.3775 53.2364 64.3889 51.0842L72.186 51.1272ZM38.9722 49.4096C38.9722 51.5244 37.9538 53.3139 36.7714 54.4963C35.5892 55.6781 33.8019 56.6968 31.6881 56.6971H7.28743C2.85296 56.697 0 52.9988 0 49.4096V44.5216C0 42.6195 0.653047 40.7314 2.07503 39.3092C3.4973 37.8869 5.38518 37.2342 7.28743 37.2341H7.37348L7.66471 21.4513H7.53564C3.10105 21.4513 0.24821 17.7531 0.24821 14.1639V12.1319C0.24821 8.62572 2.46487 5.08602 5.74523 3.77216L5.74854 3.76885C5.76119 3.76364 5.7869 3.75369 5.82134 3.73907C5.89055 3.70968 6.00052 3.66121 6.14236 3.59676C6.42935 3.46632 6.8386 3.27125 7.29736 3.02422C8.27229 2.49921 9.24118 1.86467 9.8622 1.24373L10.1567 0.975668C11.6875 -0.273454 13.9454 -0.183336 15.3724 1.24373C16.8942 2.76571 16.8943 5.23209 15.3724 6.75399C13.9604 8.16601 12.2182 9.22714 10.9907 9.88805C10.3485 10.2338 9.78088 10.5051 9.36909 10.6922C9.16319 10.7858 8.99302 10.8581 8.86936 10.9107C8.80737 10.937 8.75506 10.9612 8.71712 10.9769C8.69904 10.9843 8.68299 10.9885 8.67079 10.9934C8.66494 10.9958 8.65866 10.9982 8.65424 11L8.64762 11.0033L8.64431 11.0066C8.6152 11.0259 8.4665 11.1236 8.30344 11.374C8.11148 11.6693 8.04199 11.9594 8.04199 12.1319V13.6575H8.21077C11.6797 13.6575 15.4717 16.3006 15.4717 20.8457C15.4717 20.8697 15.4722 20.8945 15.4717 20.9185L15.1573 37.8629L15.154 37.8596C15.129 40.1366 13.8817 41.9223 12.6785 42.9992C11.4834 44.0686 9.75188 44.9677 7.79709 45.018V48.9033H31.1784V45.0014C27.0626 44.7443 24.9344 41.3929 24.6753 38.4057L24.6489 37.7901V5.35409C24.6489 4.73218 24.7012 3.93382 24.96 3.14006C25.165 2.51143 25.8844 0.755852 27.9418 0.168159C30.0295 -0.427717 31.5792 0.719272 32.1051 1.17754C32.7364 1.72795 33.2087 2.39686 33.5546 2.96796L48.5399 27.2131L63.5251 2.96796C63.8709 2.39709 64.3404 1.72772 64.9714 1.17754C65.4965 0.719697 67.0486 -0.428646 69.138 0.168159C71.1952 0.755913 71.9115 2.51145 72.1165 3.14006C72.3754 3.93402 72.4309 4.73202 72.4309 5.35409V5.37394L72.186 51.1272L64.3889 51.0842L64.5775 16.0867L53.5504 33.9346L53.5471 33.9313C52.7411 35.256 51.1239 37.0518 48.5399 37.0521C45.9565 37.0521 44.3357 35.2592 43.5294 33.9346L32.4427 15.994V37.2672C34.0824 37.4189 35.6669 38.0755 36.9005 39.3092C38.3222 40.7314 38.9722 42.6196 38.9722 44.5216V49.4096Z" fill="url(#paint0_linear_metrics)"/>
    <defs>
      <linearGradient id="paint0_linear_metrics" x1="4.93846" y1="52.8314" x2="51.527" y2="-5.07724" gradientUnits="userSpaceOnUse">
        <stop stopColor="#222AEC"/>
        <stop offset="1" stopColor="#3C7CF1"/>
      </linearGradient>
    </defs>
  </svg>
)

export default function MetricsPage() {
  const [expandedNavItems, setExpandedNavItems] = useState({ 'Entities': true })

  const toggleNavExpand = (name) => {
    setExpandedNavItems(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const handleNavClick = (item) => {
    if (item.name === 'Feed') {
      window.location.href = window.location.pathname.replace(/\/[^/]*$/, '/') + '?page=feed'
    } else if (item.name === 'Entities') {
      window.location.href = window.location.pathname.replace(/\/[^/]*$/, '/') + '?page=entities'
    } else if (item.name === 'Incidents') {
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

      {/* Main Content - Empty */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Metrics</h1>
        </div>

        {/* Empty Content Area */}
        <div className="flex-1 overflow-auto px-6 py-4">
          {/* Content will go here */}
        </div>
      </div>
    </div>
  )
}

