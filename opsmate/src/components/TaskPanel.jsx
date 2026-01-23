import { useState, useEffect } from 'react'
import { Star, ChevronDown, MoreHorizontal, User, Link2, ChevronUp } from 'lucide-react'

const TaskPanel = ({ isOpen, onClose, task, isSevMitigated }) => {
  const [taskTitle, setTaskTitle] = useState(task ? `${task.id}: ${task.title}` : 'S448319: fwefewf')
  const [progressStatus, setProgressStatus] = useState('No Progress')

  // Update progress status when task changes
  // Hardcode T251794065 to show as "Closed"
  useEffect(() => {
    if (task?.id === 'T251794065') {
      setProgressStatus('Closed')
    } else {
      setProgressStatus('No Progress')
    }
  }, [task])

  // Update task title when task prop changes
  useEffect(() => {
    if (task) {
      setTaskTitle(`${task.id}: ${task.title}`)
    }
  }, [task])
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [contentText, setContentText] = useState(`Criticality: Medium Term
12133 13e1e3e e 3 e 1e1e1121 dedw e ewd wedwedwed w12133 13e1e3e e 3 e 1e1e

Description
121313131313 wedwe. w`)
  const [isEditingContent, setIsEditingContent] = useState(false)
  const [isOwnerDropdownOpen, setIsOwnerDropdownOpen] = useState(false)
  const [isContactsListOpen, setIsContactsListOpen] = useState(false)
  const [ownerSearchQuery, setOwnerSearchQuery] = useState('')
  const [selectedOwner, setSelectedOwner] = useState(null)

  const contacts = [
    { name: 'Marcus Chen', username: 'mchen', team: 'IeX AI & Data Infra Product Design', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Sarah Mitchell', username: 'smitchell', team: 'Monitoring Interfaces', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'David Park', username: 'dpark', team: 'DevInfra Product Management', avatar: 'https://randomuser.me/api/portraits/men/75.jpg' },
    { name: 'Emily Rodriguez', username: 'erodriguez', team: 'Devices_ MR Devices PM Team', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { name: 'James Wilson', username: 'jwilson', team: 'Monitoring', avatar: 'https://randomuser.me/api/portraits/men/85.jpg' },
    { name: 'Rachel Kim', username: 'rkim', team: 'Observability Experiences', avatar: 'https://randomuser.me/api/portraits/women/90.jpg' },
    { name: 'Alex Thompson', username: 'athompson', team: 'IeX AI & Data Infra Product Design', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
    { name: 'Nicole Patel', username: 'npatel', team: 'IeX DevInfra Product Design', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
    { name: 'Michael Santos', username: 'msantos', team: 'Observability Experiences', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' },
    { name: 'Jennifer Lee', username: 'jlee', team: 'Reliability Foundation', avatar: 'https://randomuser.me/api/portraits/women/55.jpg' },
  ]

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(ownerSearchQuery.toLowerCase()) ||
    contact.username.toLowerCase().includes(ownerSearchQuery.toLowerCase()) ||
    contact.team.toLowerCase().includes(ownerSearchQuery.toLowerCase())
  )

  const handleSelectOwner = (contact) => {
    setSelectedOwner(contact)
    setIsOwnerDropdownOpen(false)
    setIsContactsListOpen(false)
    setOwnerSearchQuery('')
  }

  const handleClaimOwner = () => {
    setSelectedOwner(contacts[0])
    setIsOwnerDropdownOpen(false)
    setIsContactsListOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed right-0 top-0 h-full w-[850px] bg-white shadow-2xl flex flex-col z-50 border-l border-gray-200 animate-in slide-in-from-right duration-300">
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          {progressStatus === 'Closed' ? (
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-[#5C6670] rounded-full">
              Closed
            </span>
          ) : (
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors text-gray-600 bg-gray-100 hover:bg-gray-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {progressStatus}
              <ChevronDown size={14} />
            </button>
          )}
          <span className="text-sm font-medium text-gray-700">{task?.id || 'T251794064'}</span>
          <button className="p-1 text-gray-400 hover:text-yellow-500 transition-colors">
            <Star size={16} />
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
            <MoreHorizontal size={16} />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Title */}
        <div className="px-6 py-4 border-b border-gray-100">
          {isEditingTitle ? (
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setIsEditingTitle(false)
                if (e.key === 'Escape') setIsEditingTitle(false)
              }}
              autoFocus
              className="w-full text-xl font-semibold text-gray-900 bg-transparent border-b-2 border-blue-500 outline-none py-1"
            />
          ) : (
            <h1 
              className="text-xl font-semibold text-gray-900 cursor-text hover:bg-gray-50 rounded px-1 -mx-1 py-1 transition-colors"
              onClick={() => setIsEditingTitle(true)}
            >
              {taskTitle}
            </h1>
          )}
        </div>

        {/* Meta Row */}
        <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                <button 
                  onClick={() => setIsOwnerDropdownOpen(!isOwnerDropdownOpen)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-50 transition-colors ${selectedOwner ? 'text-gray-700' : 'text-gray-400'}`}
                >
                  {selectedOwner ? (
                    <>
                      <img 
                        src={selectedOwner.avatar} 
                        alt={selectedOwner.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="font-medium">{selectedOwner.name}</span>
                    </>
                  ) : (
                    <>
                      <User size={16} className="text-gray-300" />
                      Owner
                    </>
                  )}
                </button>
                <div className="w-px h-6 bg-gray-200"></div>
                <button 
                  onClick={() => setIsOwnerDropdownOpen(!isOwnerDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Owning Team
                  <ChevronDown size={12} />
                </button>
              </div>
              
              {/* Owner Dropdown */}
              {isOwnerDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10"
                    onClick={() => {
                      setIsOwnerDropdownOpen(false)
                      setIsContactsListOpen(false)
                      setOwnerSearchQuery('')
                    }}
                  />
                  <div className="absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    <div className="p-4">
                      {/* Assign to individual */}
                      <div className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Assign to individual</span>
                          <button 
                            onClick={handleClaimOwner}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Claim
                          </button>
                        </div>
                        <div 
                          onClick={() => setIsContactsListOpen(true)}
                          className="flex items-center gap-2 px-3 py-2.5 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
                        >
                          <User size={18} className="text-gray-300" />
                          <input 
                            type="text"
                            value={ownerSearchQuery}
                            onChange={(e) => setOwnerSearchQuery(e.target.value)}
                            onFocus={() => setIsContactsListOpen(true)}
                            placeholder="Enter owner (user or oncall)"
                            className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent cursor-pointer"
                          />
                        </div>
                        
                        {/* Contacts Dropdown */}
                        {isContactsListOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 max-h-72 overflow-y-auto">
                            {filteredContacts.map((contact, index) => (
                              <button
                                key={index}
                                onClick={() => handleSelectOwner(contact)}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                              >
                                <img 
                                  src={contact.avatar} 
                                  alt={contact.name}
                                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                                  <p className="text-xs text-gray-500 truncate">
                                    Employee ({contact.username}) - {contact.team}
                                  </p>
                                </div>
                              </button>
                            ))}
                            {filteredContacts.length === 0 && (
                              <div className="px-4 py-6 text-center text-sm text-gray-500">
                                No contacts found
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Divider */}
                      <div className="border-t border-gray-200 my-4"></div>
                      
                      {/* Set owning team */}
                      <div>
                        <div className="mb-2">
                          <span className="text-sm text-gray-600">Set owning team</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2.5 border border-gray-200 rounded-lg">
                          <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <input 
                            type="text"
                            placeholder="Enter an owning team"
                            className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <button className={`px-3 py-1 text-sm font-medium rounded transition-colors flex items-center gap-1 ${
              task?.criticality === 'Short Term' 
                ? 'text-green-700 bg-green-100 hover:bg-green-200'
                : task?.criticality === 'Long Term'
                ? 'text-purple-700 bg-purple-100 hover:bg-purple-200'
                : 'text-orange-700 bg-orange-100 hover:bg-orange-200'
            }`}>
              {task?.criticality === 'Short Term' ? 'Short' : task?.criticality === 'Long Term' ? 'Long' : 'Mid'}
              <ChevronDown size={12} />
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
              Size
              <ChevronDown size={12} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <span className="text-gray-400">+</span>
              Fields
              <ChevronDown size={12} />
            </button>
          </div>
        </div>

        {/* SEV Task Badge Row */}
        <div className="px-6 py-2 border-b border-gray-100 flex items-center justify-end gap-2">
          <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            SEV Task
          </span>
          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* SEVs Section */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-2 text-gray-500 w-24 flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span className="text-sm font-medium">SEVs</span>
            </div>
            <div className="flex-1">
              {/* Dropdowns Row */}
              <div className="flex items-center gap-3 mb-4">
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Set SEV Task Criticality
                  <ChevronDown size={14} />
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Set SEV Task Category
                  <ChevronDown size={14} />
                </button>
                <div className="flex-1"></div>
                <span className="text-sm font-medium text-gray-900">Outcome</span>
                <button className="flex items-center gap-1 px-2 py-1 text-sm text-gray-500 hover:bg-gray-50 rounded transition-colors">
                  ...
                  <ChevronDown size={14} />
                </button>
              </div>
              
              {/* SEV Item */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 text-xs font-bold text-white bg-orange-500 rounded">SEV 2</span>
                  <div className="w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center">
                    <User size={12} className="text-orange-700" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">S448319</span>
                  <a href="#" className="text-sm text-blue-600 hover:underline">jpeg Test SEV</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 text-xs font-medium rounded border ${
                    task?.criticality === 'Short Term' 
                      ? 'text-green-700 bg-green-100 border-green-200'
                      : task?.criticality === 'Long Term'
                      ? 'text-purple-700 bg-purple-50 border-purple-200'
                      : 'text-blue-700 bg-blue-50 border-blue-200'
                  }`}>{task?.criticality || 'Medium Term'}</span>
                  <span className="px-3 py-1 text-xs font-medium text-amber-800 bg-amber-100 rounded">DETECTION</span>
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
              
              {/* Time Remaining */}
              <div className="text-sm mt-2">
                <span className="font-medium text-gray-900">Time Remaining:</span>
                <span className="text-green-600 font-medium ml-2">90 Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rich Text Editor Toolbar */}
        <div className="px-6 py-2 border-b border-gray-200 flex items-center gap-1 flex-wrap">
          <button className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Write with AI
          </button>
          <div className="w-px h-5 bg-gray-200 mx-1"></div>
          <button className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors">
            Paragraph
            <ChevronDown size={12} />
          </button>
          <div className="w-px h-5 bg-gray-200 mx-1"></div>
          <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors font-bold">B</button>
          <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors italic">I</button>
          <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors line-through">S</button>
          <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors underline">U</button>
          <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
            <Link2 size={14} />
          </button>
          <div className="w-px h-5 bg-gray-200 mx-1"></div>
          <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h7" />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="px-6 py-4 border-b border-gray-200">
          {isEditingContent ? (
            <textarea
              value={contentText}
              onChange={(e) => setContentText(e.target.value)}
              onBlur={() => setIsEditingContent(false)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setIsEditingContent(false)
              }}
              autoFocus
              rows={8}
              className="w-full text-sm text-gray-700 bg-transparent border border-blue-500 rounded-lg outline-none p-3 resize-y min-h-[150px]"
            />
          ) : (
            <div 
              className="text-sm text-gray-700 cursor-text hover:bg-gray-50 rounded px-3 -mx-3 py-2 transition-colors whitespace-pre-wrap"
              onClick={() => setIsEditingContent(true)}
            >
              {contentText}
            </div>
          )}
        </div>

        {/* Tags Section */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-2 text-gray-500 w-24 flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="text-sm font-medium">Tags</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded">
                SEV Task
                <button className="hover:text-gray-900">×</button>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded">
                SEV Task: {task?.criticality?.replace(' Term', '-term') || 'Medium-term'}
                <button className="hover:text-gray-900">×</button>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded">
                SEV Task: Root cause
                <button className="hover:text-gray-900">×</button>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded">
                test
                <button className="hover:text-gray-900">×</button>
              </span>
              <button className="text-xs text-blue-600 hover:underline">+ 2 items</button>
            </div>
          </div>
        </div>

        {/* Subscribers Section */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500 w-24 flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-sm font-medium">Subscribers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded">
                <div className="w-5 h-5 rounded-full bg-orange-200 flex items-center justify-center">
                  <User size={10} className="text-orange-700" />
                </div>
                <span className="text-xs text-gray-700">Christian Gin</span>
              </div>
            </div>
          </div>
        </div>

        {/* SEV Manager Section */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-2 text-gray-500 w-24 flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-sm font-medium">SEV Manager</span>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Mentioned in 1 SEVs</h4>
              <p className="text-sm text-gray-600 mb-2">Find below a list of SEVs where this task was mentioned:</p>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">•</span>
                <span className="px-2 py-0.5 text-xs font-bold text-white bg-orange-500 rounded">SEV 2</span>
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">S448319</span>
                <a href="#" className="text-sm text-blue-600 hover:underline">jpeg Test SEV</a>
              </div>
            </div>
          </div>
        </div>

        {/* SEV Follow Up Plugin Section */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-2 text-gray-500 w-24 flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
              <span className="text-sm font-medium">SEV Follow Up Plugin</span>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Create PBA for contracts</h4>
              <ul className="text-sm text-gray-600 mb-4 list-disc list-inside space-y-1">
                <li>While defining contracts, you will be asked for SEV1/2 and SEV3 threshold. Only SEV1/2 threshold would be used to create PBA.</li>
                <li>Provide tenant information and use the <a href="#" className="text-blue-600 hover:underline">same approach</a> for creating PBA for your contracts.</li>
              </ul>
              <p className="text-sm text-gray-600 mb-2">Follow-up Information</p>
              <textarea 
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder=""
              />
              <button className="mt-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Activity & Comments Section */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">Activity & Comments</h3>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-orange-200 flex items-center justify-center">
                <User size={12} className="text-orange-700" />
              </div>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Activity Items */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">Christian Gin</span> made several changes
                </p>
                <p className="text-xs text-gray-500">
                  January 16, 3:52 PM · <a href="#" className="text-blue-600 hover:underline">Show all 2 updates</a>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">Christian Gin</span> created this task.
                </p>
                <p className="text-xs text-gray-500">
                  January 16, 3:52 PM · <a href="#" className="text-blue-600 hover:underline">Show all 7 updates</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskPanel


