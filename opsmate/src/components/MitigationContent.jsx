import { useState } from 'react'
import { ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react'

export default function MitigationContent({ content, onMitigate, onOpenTask, isSevMitigated }) {
  const [mitigationStarted, setMitigationStarted] = useState(false)
  const [mitigationComplete, setMitigationComplete] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  // Tasks that will be shown when mitigation is complete
  const tasks = [
    { id: 'T251794065', title: 'Add retry logic to auth service calls', criticality: 'Short Term' },
    { id: 'T251794066', title: 'Implement circuit breaker pattern', criticality: 'Short Term' },
    { id: 'T251794067', title: 'Add comprehensive logging for auth failures', criticality: 'Medium Term' },
    { id: 'T251794068', title: 'Review and update SLO thresholds', criticality: 'Long Term' },
  ]

  const handleMitigate = async () => {
    setMitigationStarted(true)
    
    // Show loading state on button for 2 seconds first
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Then trigger the chat response (which has its own 5 second thinking state)
    if (onMitigate) {
      await onMitigate()
    }
    
    // Wait for chat message to display first
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Then show the detailed steps
    setMitigationComplete(true)
    setShowDetails(true)
  }

  const handleTaskClick = (task) => {
    if (onOpenTask) {
      onOpenTask(task)
    }
  }

  const getCriticalityBadgeStyles = (criticality) => {
    switch (criticality) {
      case 'Short Term':
        return 'text-green-700 bg-green-100 border-green-200'
      case 'Medium Term':
        return 'text-blue-700 bg-blue-50 border-blue-200'
      case 'Long Term':
        return 'text-purple-700 bg-purple-50 border-purple-200'
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200'
    }
  }

  // Parse and render text with SEV links
  const renderTextWithLinks = (text) => {
    const sevPattern = /(SEV\s*)(S\d+)/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = sevPattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }
      parts.push(match[1])
      parts.push(
        <a 
          key={match.index}
          href="#" 
          className="text-blue-600 hover:text-blue-700 hover:underline"
          onClick={(e) => e.preventDefault()}
        >
          {match[2]}
        </a>
      )
      lastIndex = match.index + match[0].length
    }
    
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts
  }

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Mitigation</h4>
        <p className="text-sm text-gray-700 leading-relaxed">
          {renderTextWithLinks(content.summary)}
        </p>
      </div>

      <ol className="space-y-3">
        {content.actions.map((action, index) => (
          <li key={action.id} className="flex items-start gap-3">
            <span className="text-sm text-gray-700 leading-relaxed">
              {index + 1}. {action.text}
            </span>
          </li>
        ))}
      </ol>

      {!mitigationComplete ? (
        <div>
          <button
            onClick={handleMitigate}
            disabled={mitigationStarted}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
              mitigationStarted 
                ? 'bg-blue-500 text-white cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {mitigationStarted && (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {mitigationStarted ? 'Running mitigation...' : 'Mitigate'}
          </button>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700">Detailed Steps</span>
            {showDetails ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
          
          {showDetails && (
            <div className="px-4 py-4 bg-white border-t border-gray-100 space-y-4">
              <div>
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Mitigation Summary</h5>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Enhanced monitoring and alerting has been successfully configured for all critical dependencies. 
                  The system is now actively tracking service health metrics with a 30-second polling interval.
                </p>
              </div>
              
              <div>
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Actions Taken</h5>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Deployed alerting rules for authorization_service latency thresholds</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Configured PagerDuty integration for critical dependency failures</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Enabled automatic circuit breaker with 5% error threshold</span>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-gray-900 mb-2">Next Review</h5>
                <p className="text-sm text-gray-600">
                  Scheduled follow-up review in 7 days to assess effectiveness of monitoring changes.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Follow-up Tasks - shown when mitigation is complete */}
      {mitigationComplete && (
        <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h5 className="text-sm font-semibold text-gray-900">Follow-up Tasks</h5>
          </div>
          <div className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <div 
                key={task.id}
                onClick={() => handleTaskClick(task)}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors group border-l-4 border-l-indigo-500"
              >
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded border ${getCriticalityBadgeStyles(task.criticality)}`}>
                    {task.criticality}
                  </span>
                  <img src="/opsmate-logo.svg" alt="Opsmate" className="w-4 h-4" />
                  <span className="text-sm font-medium text-gray-700">{task.id}</span>
                  <span className="text-sm text-gray-600">{task.title}</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <MoreHorizontal size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

