import { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import { FileText, Clock, Paperclip, ArrowUp, List, CornerDownRight, X, Loader2 } from 'lucide-react'

function OpsmateLogo({ className }) {
  return (
    <svg 
      className={className}
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M10.0206 15.0256C10.3164 15.8619 11.1136 16.4613 12.0513 16.4615C12.9891 16.4613 13.7863 15.8619 14.0821 15.0256H15.1493C14.8242 16.4359 13.5606 17.4872 12.0514 17.4872C10.5427 17.4872 9.27906 16.4359 8.95341 15.0256H10.0206ZM12.0508 16.4615H12.0519C12.0517 16.4615 12.0515 16.4615 12.0513 16.4615C12.0512 16.4615 12.051 16.4615 12.0508 16.4615Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M8.12879 7.38461C9.61545 7.38462 10.8211 8.59026 10.8211 10.0769C10.8211 11.5636 9.61545 12.7692 8.12879 12.7692C6.64213 12.7692 5.43649 11.5636 5.43649 10.0769C5.43649 8.59026 6.64213 7.38461 8.12879 7.38461ZM8.12879 8.41026C7.20828 8.41026 6.46213 9.15641 6.46213 10.0769C6.46213 10.9974 7.20828 11.7436 8.12879 11.7436C9.0493 11.7436 9.79546 10.9974 9.79546 10.0769C9.79546 9.15641 9.0493 8.41026 8.12879 8.41026Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.8724 7.38461C17.359 7.38462 18.5647 8.59026 18.5647 10.0769C18.5647 11.5636 17.359 12.7692 15.8724 12.7692C14.3857 12.7692 13.1801 11.5636 13.1801 10.0769C13.1801 8.59026 14.3857 7.38461 15.8724 7.38461ZM15.8724 8.41026C14.9519 8.41026 14.2057 9.15641 14.2057 10.0769C14.2057 10.9974 14.9519 11.7436 15.8724 11.7436C16.7929 11.7436 17.5391 10.9974 17.5391 10.0769C17.5391 9.15641 16.7929 8.41026 15.8724 8.41026Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M14.6673 0C15.177 6.43207e-06 15.5903 0.413337 15.5903 0.923077V5.22922C15.9447 5.2087 16.2862 5.18513 16.616 5.16001V0.98152L18.7175 1.42874C20.2498 1.75489 21.3893 3.00361 21.6047 4.51848C21.6688 4.50617 21.7293 4.49385 21.7867 4.48257C22.019 4.43591 22.1944 4.39746 22.3103 4.37079C22.3683 4.35746 22.4114 4.34716 22.439 4.34049C22.4529 4.33742 22.4631 4.33487 22.4693 4.33333C22.4724 4.33282 22.4744 4.33178 22.4755 4.33178H22.476C22.8877 4.22614 23.3067 4.47435 23.4123 4.88562H23.4113C23.517 5.29741 23.2688 5.71642 22.8575 5.82206C22.8483 5.82463 22.8185 5.83178 22.8016 5.83589C22.7673 5.84409 22.718 5.85592 22.6534 5.87079C22.5247 5.90002 22.3354 5.94154 22.0888 5.99129C21.9442 6.02 21.7795 6.05179 21.5954 6.08564C21.6252 6.27487 21.6411 6.46923 21.6411 6.66667V17.7436C21.6411 19.7667 20.0139 21.4103 17.9965 21.4359H14.9744C14.7406 21.7472 14.3683 21.9487 13.9488 21.9487H10.0514C9.63189 21.9487 9.25958 21.7472 9.02573 21.4359H6.00364C3.98621 21.4108 2.35906 19.7672 2.35906 17.7441V6.66717C2.35906 6.46922 2.37494 6.27536 2.40469 6.08614C2.22058 6.05229 2.05596 6.02102 1.91135 5.99179C1.66469 5.94256 1.47597 5.90104 1.34674 5.87129C1.28213 5.85642 1.23287 5.84459 1.19851 5.83639C1.18158 5.83228 1.15184 5.82513 1.14262 5.82257C0.731345 5.71692 0.483149 5.29744 0.58878 4.88617C0.694421 4.47489 1.1139 4.2267 1.52518 4.33233H1.52573C1.52676 4.33235 1.5288 4.33332 1.53184 4.33383C1.53799 4.33537 1.54829 4.33746 1.56214 4.34105C1.58983 4.34771 1.63291 4.35796 1.69084 4.37129C1.80623 4.39796 1.98213 4.43641 2.21443 4.48307C2.27187 4.49487 2.33237 4.50667 2.39647 4.51898C2.61186 3.00411 3.75134 1.75539 5.28364 1.42924L7.3852 0.982071V5.16051C7.71494 5.18563 8.05649 5.20925 8.41085 5.22977V0.923077C8.41085 0.413333 8.82418 0 9.33392 0H14.6673ZM19.9411 6.35181C18.076 6.61233 15.3739 6.87179 12.0011 6.87179C8.62827 6.87179 5.9257 6.61284 4.06109 6.35181C4.01493 6.34515 3.96929 6.339 3.92417 6.33233C3.90673 6.44104 3.89803 6.55283 3.89803 6.66667V17.7436C3.89803 18.9333 4.86213 19.8974 6.05187 19.8974H9.02623C9.26008 19.5862 9.63239 19.3846 10.0519 19.3846H13.9493C14.3688 19.3846 14.7411 19.5862 14.9749 19.8974H17.9493C19.139 19.8974 20.1032 18.9333 20.1032 17.7436H20.1042V6.66667C20.1042 6.55283 20.0949 6.44155 20.078 6.33233C20.0329 6.339 19.9872 6.34515 19.9411 6.35181ZM10.616 1.4359C10.3611 1.4359 10.1544 1.64256 10.1544 1.89744V2.14874C10.1544 3.06155 10.5601 3.92771 11.2616 4.51232L11.7052 4.88206C11.7909 4.95333 11.896 4.98923 12.0006 4.98923C12.1052 4.98923 12.2103 4.95334 12.296 4.88206L12.7396 4.51232C13.4411 3.92771 13.8467 3.06206 13.8467 2.14874V1.89744C13.8467 1.64257 13.6401 1.4359 13.3852 1.4359H10.616Z" fill="currentColor"/>
    </svg>
  )
}

// Summary bullet point pools for randomization
const summaryBulletPools = [
  [
    "Kshitiz asked if research was done regarding Opsmate relying on impact area for SEV taxonomy.",
    "Kshitiz reported Opsmate found impact area available for 60% of SEVs within 15 minutes.",
    "Kshitiz stated they are building LLM prediction logic for the remaining 40% of SEVs.",
  ],
  [
    "Team identified root cause as a database connection pool exhaustion issue.",
    "Mitigation was applied by scaling up connection limits and adding retry logic.",
    "Post-incident analysis revealed similar patterns in 3 previous SEVs this quarter.",
  ],
  [
    "Initial detection came from anomaly alerts on error rate metrics at 09:47 UTC.",
    "Impact assessment showed 2.3M users affected during the 18-minute incident window.",
    "Recovery was confirmed after deploying hotfix and clearing the cache layer.",
  ],
  [
    "Investigation traced the issue to a recent config change in the auth service.",
    "Team implemented a rollback which restored service within 12 minutes.",
    "Prevention measures include adding validation checks before config deployment.",
  ],
  [
    "Automated detection triggered 3 minutes before user reports started coming in.",
    "Cross-team coordination was initiated involving Platform, API, and SRE teams.",
    "Lessons learned session scheduled for next Tuesday to discuss improvements.",
  ],
]

const getRandomSummaryBullets = () => {
  const pool = summaryBulletPools[Math.floor(Math.random() * summaryBulletPools.length)]
  const numBullets = Math.random() > 0.5 ? 3 : 2
  return pool.slice(0, numBullets)
}

const Copilot = forwardRef(function Copilot({ onOpenSources, onOpenSteps, onAddSection, onViewSharedCanvas, recommendationContext }, ref) {
  const [message, setMessage] = useState('')
  const [activeTab, setActiveTab] = useState('runbook')
  const chatContainerRef = useRef(null)
  
  // Check if we're in protection mode, feed mode, quality home mode, data exploration mode, or fix action mode
  const params = new URLSearchParams(window.location.search)
  const isProtectionMode = params.get('mode') === 'protection'
  const isFeedMode = params.get('page') === 'feed'
  const isQualityHomeMode = params.get('page') === 'quality-home'
  const isDataExplorationMode = params.get('page') === 'data-exploration'
  const isFixAction = params.get('action') === 'fix'
  
  // For fix actions, start with thinking state and empty messages
  const [isThinking, setIsThinking] = useState(isFixAction)
  
  // Parse feed context to extract title for reference
  const parseFeedContext = (context) => {
    if (!context) return null
    // Context format: "Help me with this TYPE: "TITLE" (Priority: X) - Status: Y"
    const titleMatch = context.match(/"([^"]+)"/)
    if (titleMatch) {
      return { title: titleMatch[1] }
    }
    return null
  }
  
  // Initialize referencedSection from feedContext (but not for fix actions)
  const [referencedSection, setReferencedSection] = useState(() => {
    // Don't show reference for fix actions - the title is already in the message
    if (isFixAction) {
      return null
    }
    if (recommendationContext?.feedContext) {
      return parseFeedContext(recommendationContext.feedContext)
    }
    return null
  })
  
  // Generate initial message based on recommendation context
  const getInitialMessages = () => {
    // Handle fix action from Feed (Fix with Devmate button)
    if (isFixAction && recommendationContext?.feedContext) {
      const itemTitle = parseFeedContext(recommendationContext.feedContext)?.title || 'this item'
      return [
        {
          id: 'initial',
          type: 'assistant',
          content: `I can help you fix "${itemTitle}". I've analyzed the issue and have a recommended mitigation ready.`,
          followUp: "What would you like to do?",
          quickActions: [
            { id: 'apply-fix', label: 'Apply fix', primary: true },
            { id: 'preview-fix', label: 'Preview changes' },
            { id: 'explain-fix', label: 'Explain the fix' },
            { id: 'investigate', label: 'Investigate first' },
          ],
        },
      ]
    }
    
    // Handle feed page mode (general feed, no specific item)
    if (isFeedMode && !recommendationContext?.feedContext) {
      return [
        {
          id: 'initial',
          type: 'assistant',
          content: "Hi! I'm Opsmate. I can help you navigate your feed, prioritize what needs attention, and investigate any issues.",
          followUp: "What would you like to explore?",
          quickActions: [
            { id: 'focus-priority', label: 'What should I focus on?', primary: true },
            { id: 'summarize-feed', label: 'Summarize my feed' },
            { id: 'show-critical', label: 'Show critical items' },
            { id: 'find-related', label: 'Show related issues' },
          ],
        },
      ]
    }
    
    // Handle specific item context (from "Ask Opsmate" on a Feed item)
    if (recommendationContext?.feedContext) {
      return [
        {
          id: 'initial',
          type: 'assistant',
          content: "Hi! I'm Opsmate. I can help you investigate this item and find relevant information.",
          followUp: "What would you like to explore?",
          quickActions: [
            { id: 'summarize', label: 'Summarize' },
            { id: 'investigate', label: 'Start investigation' },
            { id: 'find-related', label: 'Find related issues' },
            { id: 'suggest-action', label: 'Suggest next actions' },
          ],
        },
      ]
    }
    
    if (recommendationContext?.title) {
      const typeLabels = {
        detection: 'Detection',
        prevention: 'Prevention',
        quality: 'Quality',
      }
      const typeLabel = typeLabels[recommendationContext.type] || 'Recommendation'
      const isAutoApply = recommendationContext.action === 'auto-apply'
      
      return [
        {
          id: 'initial',
          type: 'assistant',
          content: `Hi! I'm Opsmate. I see you're looking at a ${typeLabel.toLowerCase()} recommendation:`,
          followUp: null,
        },
        {
          id: 'recommendation-context',
          type: 'assistant',
          header: {
            icon: 'opsmate',
            title: 'Opsmate',
            badge: {
              type: recommendationContext.type,
              label: typeLabel,
            },
            priority: recommendationContext.priority,
          },
          recommendationCard: {
            title: recommendationContext.title,
            type: typeLabel,
            priority: recommendationContext.priority,
            action: recommendationContext.action,
          },
          content: isAutoApply 
            ? `This recommendation is set for auto-apply. I can help you apply it now, review the changes first, or explain what will happen.`
            : `This recommendation requires manual review. I can help you understand the changes, walk you through the implementation steps, or apply it for you.`,
          quickActions: isAutoApply
            ? [
                { id: 'apply-now', label: 'Apply now' },
                { id: 'preview-changes', label: 'Preview changes' },
                { id: 'explain-recommendation', label: 'Explain this' },
                { id: 'skip-recommendation', label: 'Skip for now' },
              ]
            : [
                { id: 'start-review', label: 'Start review' },
                { id: 'explain-recommendation', label: 'Explain this' },
                { id: 'show-implementation', label: 'Show implementation steps' },
                { id: 'skip-recommendation', label: 'Skip for now' },
              ],
        },
      ]
    }
    
    // Protection mode - show protection-focused copy
    if (isProtectionMode) {
      return [
        {
          id: 'initial',
          type: 'assistant',
          content: "Hi! I'm Opsmate. I can help you configure this protection, analyze its effectiveness, and optimize your thresholds.",
          followUp: 'What would you like to explore?',
          quickActions: [
            { id: 'execute-protection', label: 'Execute protection', primary: true },
            { id: 'summarize', label: 'Summarize protection' },
            { id: 'datasets', label: 'Analyze effectiveness' },
            { id: 'recovery', label: 'Optimize thresholds' },
            { id: 'similar', label: 'Find similar protections' },
          ],
        },
      ]
    }
    
    // Quality Home mode - show recommendations and protection-focused copy
    if (isQualityHomeMode) {
      return [
        {
          id: 'initial',
          type: 'assistant',
          content: "Hi! I'm Opsmate. I can help you improve your monitoring quality and find the best protections for your services.",
          followUp: 'What would you like help with?',
          quickActions: [
            { id: 'summarize-quality', label: 'Summarize this page', primary: true },
            { id: 'top-recommendations', label: 'What should I focus on?' },
            { id: 'add-protections', label: 'Add new protections' },
            { id: 'improve-coverage', label: 'Improve detection coverage' },
          ],
        },
      ]
    }
    
    // Data Exploration mode - help with data analysis and visualization
    if (isDataExplorationMode) {
      return [
        {
          id: 'initial',
          type: 'assistant',
          content: "Hi! I'm Opsmate. I can help you explore your data, create visualizations, and find insights in your metrics.",
          followUp: 'What would you like to explore?',
          quickActions: [
            { id: 'build-query', label: 'Help me build a query' },
            { id: 'query-examples', label: 'Show query examples' },
            { id: 'query-syntax', label: 'Explain query syntax' },
            { id: 'debug-query', label: 'Debug my query' },
          ],
        },
      ]
    }
    
    // Default initial message when no recommendation context
    return [
      {
        id: 'initial',
        type: 'assistant',
        content: "Hi! I'm Opsmate. I can help you investigate this SEV, find relevant data, and explore potential solutions.",
        followUp: 'What would you like to explore?',
        quickActions: [
          { id: 'summarize', label: 'Summarize SEV' },
          { id: 'datasets', label: 'Find relevant datasets' },
          { id: 'recovery', label: 'Find recovery metric' },
          { id: 'similar', label: 'Find similar SEVs' },
        ],
      },
    ]
  }
  
  // For fix actions, start with empty messages and load after thinking delay
  const [chatMessages, setChatMessages] = useState(() => isFixAction ? [] : getInitialMessages())
  const [stepCount, setStepCount] = useState(3) // Start with some initial steps
  const MAX_STEPS = 19 // Must match allSteps array length in StepsPanel
  
  // Generate random steps between min and max (inclusive)
  const getRandomSteps = (min = 1, max = 4) => Math.floor(Math.random() * (max - min + 1)) + min

  // Load initial message with thinking delay for fix actions
  useEffect(() => {
    if (isFixAction && chatMessages.length === 0) {
      const timer = setTimeout(() => {
        setChatMessages(getInitialMessages())
        setIsThinking(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isFixAction])

  const tabs = isProtectionMode 
    ? [
        { id: 'runbook', label: 'Config', icon: FileText },
        { id: 'sev', label: 'History', icon: Clock },
      ]
    : [
        { id: 'runbook', label: 'Runbook', icon: FileText },
        { id: 'sev', label: 'SEV', icon: Clock },
      ]

  // Scroll to bottom when new messages are added or when thinking starts
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [chatMessages, isThinking])

  const triggerMitigation = async () => {
    // Start thinking
    setIsThinking(true)

    // Simulate mitigation running for 3.5 seconds
    await new Promise(resolve => setTimeout(resolve, 3500))

    // Stop thinking
    setIsThinking(false)

    // Update step count with random steps
    const steps = getRandomSteps(1, 3)
    setStepCount(prev => Math.min(prev + steps, MAX_STEPS))

    // Add new message to chat
    const newMessage = {
      id: `msg-${Date.now()}`,
      type: 'assistant',
      header: {
        icon: 'opsmate',
        title: 'Opsmate',
        steps: steps,
      },
      content: "Mitigation has been initiated successfully. I've set up enhanced monitoring and alerting for all critical dependencies. You'll receive notifications if any anomalies are detected. The changes are now live and being tracked.",
      quickActions: [
        { id: 'status', label: 'Check mitigation status' },
        { id: 'rollback', label: 'Rollback changes' },
      ],
    }

    setChatMessages(prev => [...prev, newMessage])
  }

  const triggerPromotion = async (sectionTitle) => {
    // Add new message to chat acknowledging promotion
    const steps = getRandomSteps(1, 2)
    const newMessage = {
      id: `msg-${Date.now()}`,
      type: 'assistant',
      header: {
        icon: 'opsmate',
        title: 'Opsmate',
        steps: steps,
      },
      content: `Promotion to shared canvas is done. The "${sectionTitle}" widget is now visible to all team members on the shared canvas.`,
      quickActions: [
        { id: 'view-shared', label: 'View shared canvas' },
      ],
    }

    setChatMessages(prev => [...prev, newMessage])
    setStepCount(prev => Math.min(prev + steps, MAX_STEPS))
  }

  const setReference = (section) => {
    setReferencedSection(section)
  }

  const clearReference = () => {
    setReferencedSection(null)
  }

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    triggerMitigation,
    triggerPromotion,
    setReference
  }))

  const handleSendMessage = async () => {
    if (!message.trim() && !referencedSection) return

    const userMessage = message.trim()
    const referenced = referencedSection

    // Clear input and reference
    setMessage('')
    setReferencedSection(null)

    // Add user message to chat
    const userChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: userMessage || 'What can you tell me about this?',
      reference: referenced ? referenced.title : null,
    }
    setChatMessages(prev => [...prev, userChatMessage])

    // Check if the user is asking about creating protection
    const isProtectionRequest = userMessage.toLowerCase().match(/create.*protection|add.*protection|set.*protection|new.*protection|protection/)

    if (isProtectionRequest) {
      // Show thinking, then respond with protection card
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 2500))
      setIsThinking(false)

      const protectionSteps = getRandomSteps(2, 4)
      const protectionResponse = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: { icon: 'opsmate', title: 'Opsmate', steps: protectionSteps },
        content: "I've created a protection recommendation based on your request.",
        embed: {
          type: 'protection-recommendation',
          title: 'Protection Recommendation Created',
          subtitle: 'Click to configure and activate',
          action: { 
            label: 'Open protection settings', 
            url: 'http://localhost:8888/opsmate-protection/?mode=protection' 
          }
        },
      }
      setChatMessages(prev => [...prev, protectionResponse])
      setStepCount(prev => Math.min(prev + protectionSteps, MAX_STEPS))
      return
    }

    // Start thinking
    setIsThinking(true)

    // Simulate thinking
    await new Promise(resolve => setTimeout(resolve, 7000))

    // Stop thinking
    setIsThinking(false)

    // Add Opsmate response
    const responseSteps = getRandomSteps(1, 3)
    const opsmateResponse = {
      id: `msg-${Date.now()}`,
      type: 'assistant',
      header: {
        icon: 'opsmate',
        title: 'Opsmate',
        steps: responseSteps,
      },
      content: referenced 
        ? `I see you're asking about "${referenced.title}". What would you like me to do with this?`
        : `I understand. How would you like me to help with this?`,
      inlineActions: [
        { id: 're-run', label: 'Re-run analysis' },
        { id: 'more-context', label: 'Get more context' },
        { id: 'explain', label: 'Explain in detail' },
        { id: 'compare', label: 'Compare with similar' },
      ],
    }

    setChatMessages(prev => [...prev, opsmateResponse])
    setStepCount(prev => Math.min(prev + responseSteps, MAX_STEPS))
  }

  const handleQuickAction = async (actionId, actionLabel) => {
    // Handle view shared canvas action immediately
    if (actionId === 'view-shared') {
      onViewSharedCanvas?.()
      return
    }

    // Handle feed-specific actions
    if (actionId === 'focus-priority') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 3000))
      setIsThinking(false)

      const focusSteps = getRandomSteps(2, 4)
      const focusMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: focusSteps,
        },
        content: `Based on your feed, here's what needs your attention:\n\n**Immediate Priority:**\n• S512847 Super Bowl LVIII - Audio Sync Failures is actively mitigating and has 11 comments\n• API latency threshold exceeded - High priority with 9 new comments\n\n**Soon:**\n• SSL certificate expiring soon - High priority alert\n• Task regression: Database connection pool tuning needs review\n\nWould you like me to dig deeper into any of these?`,
        quickActions: [
          { id: 'summarize-feed', label: 'Summarize my feed' },
          { id: 'find-related', label: 'Show related issues' },
        ],
      }

      setChatMessages(prev => [...prev, focusMessage])
      setStepCount(prev => Math.min(prev + focusSteps, MAX_STEPS))
      return
    }

    if (actionId === 'summarize-feed') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 3500))
      setIsThinking(false)

      const summarySteps = getRandomSteps(2, 4)
      const summaryMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: summarySteps,
        },
        content: `Here's a summary of your feed:\n\n**Active Items:** 12 total\n• 3 SEVs (2 investigating, 1 mitigating)\n• 4 Alerts (2 active, 1 acknowledged)\n• 4 Tasks (2 in progress, 2 to do)\n• 1 Recommendation (auto-apply ready)\n\n**Activity:**\n• 5 items have new comments\n• 3 items updated in the last 24 hours\n• 2 High priority items need attention`,
        quickActions: [
          { id: 'show-critical', label: 'Show critical items' },
          { id: 'focus-priority', label: 'What should I focus on?' },
        ],
      }

      setChatMessages(prev => [...prev, summaryMessage])
      setStepCount(prev => Math.min(prev + summarySteps, MAX_STEPS))
      return
    }

    if (actionId === 'show-critical') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 2500))
      setIsThinking(false)

      const criticalSteps = getRandomSteps(2, 3)
      const criticalMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: criticalSteps,
        },
        content: `**Critical Items Requiring Immediate Attention:**\n\n1. **S512847 Super Bowl LVIII - Halftime Show - Audio Sync Failures**\n   Status: Mitigating | Priority: High | 11 new comments\n\n2. **API latency threshold exceeded**\n   Status: Acknowledged | Priority: High | 9 new comments\n\n3. **SSL certificate expiring soon**\n   Status: Active | Priority: High\n\nThese items have either high user impact or approaching deadlines.`,
        quickActions: [
          { id: 'investigate', label: 'Investigate top item' },
          { id: 'find-related', label: 'Show related issues' },
        ],
      }

      setChatMessages(prev => [...prev, criticalMessage])
      setStepCount(prev => Math.min(prev + criticalSteps, MAX_STEPS))
      return
    }

    // Quality Home specific actions
    if (actionId === 'summarize-quality') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 3000))
      setIsThinking(false)

      const summarySteps = getRandomSteps(2, 4)
      const summaryMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: summarySteps,
        },
        content: `Here's a summary of your Quality Home:\n\n**Overall Score:** 82/100 – Good, but room for improvement\n\n**Key Highlights:**\n• 40% of potential SEVs were prevented this month\n• 68% detection coverage – 32 metrics still need detectors\n• 15 recommendations ready for review (8 need your action)\n\n**Biggest Opportunities:**\n• Add SLI detector for rb_app_responsiveness (High priority)\n• Health check for payment service would prevent ~3 incidents/month\n\nWould you like me to dive deeper into any area?`,
        quickActions: [
          { id: 'top-recommendations', label: 'Show top recommendations' },
          { id: 'improve-coverage', label: 'How to improve coverage?' },
        ],
      }

      setChatMessages(prev => [...prev, summaryMessage])
      setStepCount(prev => Math.min(prev + summarySteps, MAX_STEPS))
      return
    }

    if (actionId === 'top-recommendations') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 2500))
      setIsThinking(false)

      const recsSteps = getRandomSteps(2, 4)
      const recsMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: recsSteps,
        },
        content: `Based on impact and urgency, here's what I'd prioritize:\n\n**Immediate (this week):**\n1. **Missing SLO for checkout flow** – Deadline in 1 day, high customer impact\n2. **RIG widget for auth service** – 2 days deadline, prevents auth outages\n\n**High Impact:**\n3. **SLI detector for rb_app_responsiveness** – Will auto-apply in 4 days if approved\n4. **Health check for payment service** – Could prevent 40% of payment-related SEVs\n\n**Quick Wins:**\n5. **Cache hit rate threshold** – 5 min setup, reduces alert noise by ~20%\n\nWant me to help you apply any of these?`,
        quickActions: [
          { id: 'apply-checkout-slo', label: 'Start with checkout SLO' },
          { id: 'review-all', label: 'Review all recommendations' },
        ],
      }

      setChatMessages(prev => [...prev, recsMessage])
      setStepCount(prev => Math.min(prev + recsSteps, MAX_STEPS))
      return
    }

    if (actionId === 'add-protections') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 3000))
      setIsThinking(false)

      const protSteps = getRandomSteps(2, 4)
      const protMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: protSteps,
        },
        content: `I've analyzed your services and found these protection gaps:\n\n**Recommended Protections:**\n\n🛡️ **Deployment freeze for prod** (Medium priority)\nPrevents risky deploys during high-traffic periods. Similar teams saw 25% fewer incident SEVs.\n\n🛡️ **Circuit breaker for external APIs** (High priority)\nYour payment service calls 3 external APIs without circuit breakers.\n\n🛡️ **Rate limiting on auth endpoints** (Medium priority)\nProtects against credential stuffing attacks.\n\nI can help you set up any of these – which interests you most?`,
        quickActions: [
          { id: 'setup-circuit-breaker', label: 'Set up circuit breaker' },
          { id: 'setup-deployment-freeze', label: 'Configure deployment freeze' },
          { id: 'view-all-protections', label: 'View all protection options' },
        ],
      }

      setChatMessages(prev => [...prev, protMessage])
      setStepCount(prev => Math.min(prev + protSteps, MAX_STEPS))
      return
    }

    if (actionId === 'improve-coverage') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 3500))
      setIsThinking(false)

      const covSteps = getRandomSteps(3, 5)
      const covMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: covSteps,
        },
        content: `Your detection coverage is at **68%** – here's how to reach optimal levels:\n\n**Missing Detectors (32 metrics):**\n• 12 API latency metrics without anomaly detection\n• 8 database metrics missing threshold alerts\n• 7 cache metrics with no monitoring\n• 5 queue depth metrics untracked\n\n**Fastest Path to 80%:**\nAdd detectors to these 5 high-impact metrics:\n1. \`rb_app_responsiveness\` – User-facing latency\n2. \`database_connection_pool\` – Resource exhaustion risk\n3. \`cache_hit_rate\` – Performance degradation signal\n4. \`api_error_rate\` – Early incident indicator\n5. \`queue_processing_time\` – Backlog detection\n\nI can auto-configure detectors for these with smart thresholds based on your historical data. Want me to proceed?`,
        quickActions: [
          { id: 'auto-add-detectors', label: 'Add recommended detectors', primary: true },
          { id: 'customize-detectors', label: 'Customize thresholds first' },
          { id: 'view-all-gaps', label: 'View all coverage gaps' },
        ],
      }

      setChatMessages(prev => [...prev, covMessage])
      setStepCount(prev => Math.min(prev + covSteps, MAX_STEPS))
      return
    }

    // Data Exploration specific actions
    if (actionId === 'summarize-doc') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 3000))
      setIsThinking(false)

      const summarySteps = getRandomSteps(2, 4)
      const summaryMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: summarySteps,
        },
        content: `Here's a summary of this document:\n\n**Document:** Untitled Doc\n**Status:** Draft\n\n**Contents:**\n• 3 metric queries currently configured\n• 2 time series visualizations\n• Data range: Last 7 days\n\n**Key Insights:**\n• API latency shows a 15% increase during peak hours (2-4pm)\n• Error rate correlates with deployment events\n• Cache hit ratio dropped on Jan 20th\n\nWould you like me to explain any of these patterns?`,
        quickActions: [
          { id: 'explain-patterns', label: 'Explain the patterns' },
          { id: 'suggest-queries', label: 'Suggest more queries' },
        ],
      }

      setChatMessages(prev => [...prev, summaryMessage])
      setStepCount(prev => Math.min(prev + summarySteps, MAX_STEPS))
      return
    }

    if (actionId === 'suggest-queries') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 2500))
      setIsThinking(false)

      const querySteps = getRandomSteps(2, 4)
      const queryMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: querySteps,
        },
        content: `Based on your current data, here are some queries you might find useful:\n\n**Performance Analysis:**\n• \`p99 latency by endpoint\` – Find your slowest endpoints\n• \`error_rate WHERE service='api'\` – Track API errors\n\n**Capacity Planning:**\n• \`cpu_usage by host percentile(95)\` – Identify hotspots\n• \`request_count trend 7d\` – Traffic growth patterns\n\n**Correlation:**\n• \`latency vs deployment_events\` – Impact of releases\n• \`error_rate vs traffic_volume\` – Load-related failures\n\nWant me to add any of these to your document?`,
        quickActions: [
          { id: 'add-latency-query', label: 'Add latency query' },
          { id: 'add-error-query', label: 'Add error rate query' },
          { id: 'create-chart', label: 'Help me create a chart' },
        ],
      }

      setChatMessages(prev => [...prev, queryMessage])
      setStepCount(prev => Math.min(prev + querySteps, MAX_STEPS))
      return
    }

    if (actionId === 'find-anomalies') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 4000))
      setIsThinking(false)

      const anomalySteps = getRandomSteps(3, 5)
      const anomalyMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: anomalySteps,
        },
        content: `I analyzed your data and found these anomalies:\n\n**🔴 High Severity:**\n• **Jan 20, 3:42pm** – Error rate spiked to 12% (normal: <1%)\n  Correlated with deployment D12847\n\n**🟡 Medium Severity:**\n• **Jan 19, 2:15am** – Latency increased 40% for 23 minutes\n  Coincided with database maintenance window\n\n**🟢 Low Severity:**\n• **Jan 18-21** – Gradual 8% increase in request volume\n  Likely organic traffic growth\n\nWould you like me to create alerts for these patterns?`,
        quickActions: [
          { id: 'create-alert', label: 'Create alert for error spikes' },
          { id: 'investigate-deployment', label: 'Investigate D12847' },
          { id: 'view-more-anomalies', label: 'View more anomalies' },
        ],
      }

      setChatMessages(prev => [...prev, anomalyMessage])
      setStepCount(prev => Math.min(prev + anomalySteps, MAX_STEPS))
      return
    }

    if (actionId === 'create-chart') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsThinking(false)

      const chartSteps = getRandomSteps(1, 3)
      const chartMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: chartSteps,
        },
        content: `I can help you create a chart! What would you like to visualize?\n\n**Popular options:**\n• **Time series** – Great for trends over time\n• **Heatmap** – See patterns by hour/day\n• **Bar chart** – Compare values across dimensions\n• **Histogram** – Distribution of values\n\n**Quick suggestions based on your data:**\n• Latency percentiles over the last 24h\n• Error rate by service (stacked area)\n• Request volume comparison (this week vs last)\n\nTell me what you'd like to see, or pick one above!`,
        quickActions: [
          { id: 'chart-latency', label: 'Latency over time' },
          { id: 'chart-errors', label: 'Error rate by service' },
          { id: 'chart-traffic', label: 'Traffic comparison' },
        ],
      }

      setChatMessages(prev => [...prev, chartMessage])
      setStepCount(prev => Math.min(prev + chartSteps, MAX_STEPS))
      return
    }

    if (actionId === 'find-patterns') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 4000))
      setIsThinking(false)

      const patternsSteps = getRandomSteps(3, 5)
      const patternsMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: patternsSteps,
        },
        content: `I found some patterns across your feed items:\n\n**Recurring Issues:**\n• 3 items are related to performance/latency (cache, API, checkout)\n• 2 SEVs involve live streaming events (Super Bowl, Grammy Awards)\n\n**Cluster Analysis:**\n• Media streaming issues tend to spike during major events\n• Database-related tasks have been open for 2+ weeks\n\n**Recommendation:**\nConsider creating a runbook for live event monitoring to prevent future SEVs.`,
        quickActions: [
          { id: 'summarize-feed', label: 'Summarize my feed' },
          { id: 'focus-priority', label: 'What should I focus on?' },
        ],
      }

      setChatMessages(prev => [...prev, patternsMessage])
      setStepCount(prev => Math.min(prev + patternsSteps, MAX_STEPS))
      return
    }

    // Handle fix actions (from Fix with Devmate button)
    if (actionId === 'apply-fix') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 3000))
      setIsThinking(false)

      const fixSteps = getRandomSteps(3, 5)
      const fixMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: fixSteps,
        },
        content: `I've kicked off Devmate to create a fix for this issue.`,
        embed: {
          type: 'devmate-diff',
          title: 'Devmate created a diff',
          subtitle: 'Ready for your review',
          action: { label: 'Open session to review', url: '#' }
        },
      }

      setChatMessages(prev => [...prev, fixMessage])
      setStepCount(prev => Math.min(prev + fixSteps, MAX_STEPS))
      return
    }

    if (actionId === 'preview-fix') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 2500))
      setIsThinking(false)

      const previewSteps = getRandomSteps(2, 4)
      const previewMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: previewSteps,
        },
        content: `Here's what the fix will change:\n\n**Files Modified:**\n• \`services/cache/invalidator.py\` - Fix memory leak in cleanup routine\n• \`config/cache_settings.yaml\` - Adjust timeout thresholds\n\n**Expected Impact:**\n• Memory usage should decrease by ~40%\n• No service disruption during deployment\n• Rollback plan ready if issues occur\n\n**Risk Assessment:** Low - Similar fix deployed successfully on staging`,
        quickActions: [
          { id: 'apply-fix', label: 'Apply fix', primary: true },
          { id: 'explain-fix', label: 'Explain more' },
        ],
      }

      setChatMessages(prev => [...prev, previewMessage])
      setStepCount(prev => Math.min(prev + previewSteps, MAX_STEPS))
      return
    }

    if (actionId === 'explain-fix') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 3500))
      setIsThinking(false)

      const explainSteps = getRandomSteps(3, 5)
      const explainMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: explainSteps,
        },
        content: `**Why this fix works:**\n\nThe issue stems from a race condition in the cache invalidation logic. When multiple requests try to invalidate the same cache key simultaneously, the cleanup routine doesn't properly release memory.\n\n**The Fix:**\n1. Added mutex lock around cache invalidation\n2. Implemented proper cleanup of orphaned cache entries\n3. Added configurable timeout for stale entries\n\n**How I found this:**\n• Analyzed memory patterns from the last 7 days\n• Correlated spikes with cache invalidation events\n• Identified similar fix from SEV S398271 (3 months ago)\n\nThis has been tested on staging with 99.7% confidence.`,
        quickActions: [
          { id: 'apply-fix', label: 'Apply fix', primary: true },
          { id: 'preview-fix', label: 'Preview changes' },
        ],
      }

      setChatMessages(prev => [...prev, explainMessage])
      setStepCount(prev => Math.min(prev + explainSteps, MAX_STEPS))
      return
    }

    // Handle execute protection action
    if (actionId === 'execute-protection') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 2500))
      setIsThinking(false)

      const executeSteps = getRandomSteps(3, 5)
      const executeMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: executeSteps,
        },
        content: `✓ Protection executed successfully!\n\nThe protection is now active and monitoring your service. Here's what's been configured:\n\n• **Detection**: Anomaly detection enabled with configured thresholds\n• **Alerting**: High priority incidents will be auto-assigned\n• **Monitoring**: Real-time tracking is now active\n\nYou'll receive notifications when the protection triggers.`,
        quickActions: [
          { id: 'view-status', label: 'View protection status' },
          { id: 'modify-config', label: 'Modify configuration' },
        ],
      }

      setChatMessages(prev => [...prev, executeMessage])
      setStepCount(prev => Math.min(prev + executeSteps, MAX_STEPS))
      return
    }

    // Handle recommendation-specific actions
    if (actionId === 'apply-now') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 3000))
      setIsThinking(false)

      const applySteps = getRandomSteps(2, 4)
      const applyMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: applySteps,
        },
        content: `Done! I've applied the recommendation. The changes are now active and monitoring is in place. You can track the impact in your Quality Home dashboard.`,
        quickActions: [
          { id: 'view-changes', label: 'View changes' },
          { id: 'undo-apply', label: 'Undo' },
        ],
      }

      setChatMessages(prev => [...prev, applyMessage])
      setStepCount(prev => Math.min(prev + applySteps, MAX_STEPS))
      return
    }

    if (actionId === 'preview-changes') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 2500))
      setIsThinking(false)

      const previewSteps = getRandomSteps(1, 3)
      const previewMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: previewSteps,
        },
        content: `Here's what will change when you apply this recommendation:\n\n• A new detector will be added to monitor the specified metric\n• Alert thresholds will be set based on historical data analysis\n• Notifications will be routed to your team's on-call channel\n\nNo existing configurations will be modified.`,
        quickActions: [
          { id: 'apply-now', label: 'Apply now' },
          { id: 'modify-config', label: 'Modify configuration' },
        ],
      }

      setChatMessages(prev => [...prev, previewMessage])
      setStepCount(prev => Math.min(prev + previewSteps, MAX_STEPS))
      return
    }

    if (actionId === 'explain-recommendation') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 4000))
      setIsThinking(false)

      const explainSteps = getRandomSteps(2, 4)
      const explainMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: explainSteps,
        },
        content: `This recommendation was generated based on:\n\n1. **Gap Analysis**: Your current monitoring coverage was analyzed against best practices for your service type\n\n2. **Historical SEVs**: Similar services that lacked this detection experienced 23% more incidents\n\n3. **Team Patterns**: Other teams in your org have successfully implemented similar detectors\n\nApplying this recommendation typically takes 2-3 minutes and has shown to reduce incident response time by up to 40%.`,
        quickActions: recommendationContext?.action === 'auto-apply'
          ? [
              { id: 'apply-now', label: 'Apply now' },
              { id: 'preview-changes', label: 'Preview changes' },
            ]
          : [
              { id: 'start-review', label: 'Start review' },
              { id: 'show-implementation', label: 'Show implementation steps' },
            ],
      }

      setChatMessages(prev => [...prev, explainMessage])
      setStepCount(prev => Math.min(prev + explainSteps, MAX_STEPS))
      return
    }

    if (actionId === 'start-review') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 3500))
      setIsThinking(false)

      const reviewSteps = getRandomSteps(3, 5)
      const reviewMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: reviewSteps,
        },
        content: `Let's review this recommendation together.\n\n**Current State:**\nThis metric currently has no automated detection, meaning issues must be discovered manually or through downstream effects.\n\n**Proposed Change:**\nAdd an anomaly detector with smart thresholds based on 30 days of historical data.\n\n**Impact Assessment:**\n• Estimated alert volume: 2-3 alerts/week\n• False positive rate: <5% based on similar configurations\n• Coverage improvement: +8% for your service`,
        quickActions: [
          { id: 'approve-and-apply', label: 'Approve & Apply' },
          { id: 'request-changes', label: 'Request changes' },
          { id: 'skip-recommendation', label: 'Skip for now' },
        ],
      }

      setChatMessages(prev => [...prev, reviewMessage])
      setStepCount(prev => Math.min(prev + reviewSteps, MAX_STEPS))
      return
    }

    if (actionId === 'show-implementation') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 3000))
      setIsThinking(false)

      const implSteps = getRandomSteps(2, 4)
      const implMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: implSteps,
        },
        content: `Here are the implementation steps:\n\n**Step 1:** Configure metric source\n→ Connect to your existing data pipeline\n\n**Step 2:** Set detection thresholds\n→ I'll suggest optimal values based on historical patterns\n\n**Step 3:** Configure alerting\n→ Route to your team's preferred channels\n\n**Step 4:** Validate & activate\n→ Test with historical data before going live\n\nWould you like me to guide you through each step?`,
        quickActions: [
          { id: 'start-guided-setup', label: 'Start guided setup' },
          { id: 'apply-with-defaults', label: 'Apply with defaults' },
        ],
      }

      setChatMessages(prev => [...prev, implMessage])
      setStepCount(prev => Math.min(prev + implSteps, MAX_STEPS))
      return
    }

    if (actionId === 'skip-recommendation') {
      const skipMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        content: `No problem! I've noted that you're skipping this recommendation for now. It will remain in your Quality Home for future consideration.\n\nIs there anything else I can help you with?`,
        quickActions: [
          { id: 'summarize', label: 'Explore other recommendations' },
          { id: 'close-panel', label: 'Close' },
        ],
      }

      setChatMessages(prev => [...prev, skipMessage])
      return
    }

    if (actionId === 'close-panel') {
      // Send message to parent to close the panel
      window.parent.postMessage('closeOpsmate', '*')
      return
    }

    if (actionId === 'approve-and-apply') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 3000))
      setIsThinking(false)

      const approveSteps = getRandomSteps(2, 4)
      const approveMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: approveSteps,
        },
        content: `Excellent! The recommendation has been approved and applied. Here's a summary:\n\n✓ Detector configured and active\n✓ Alert thresholds set\n✓ Notifications configured\n\nYou'll see this reflected in your Quality Home dashboard within a few minutes.`,
        quickActions: [
          { id: 'view-changes', label: 'View in dashboard' },
          { id: 'close-panel', label: 'Done' },
        ],
      }

      setChatMessages(prev => [...prev, approveMessage])
      setStepCount(prev => Math.min(prev + approveSteps, MAX_STEPS))
      return
    }

    // Handle summarize SEV action - shows as a new chat reply
    if (actionId === 'summarize') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 2500))
      setIsThinking(false)

      const bullets = getRandomSummaryBullets()
      const summarySteps = getRandomSteps(2, 4)
      const summaryText = bullets.map(b => `• ${b}`).join('\n\n')
      
      const summaryMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: summarySteps,
        },
        content: `Here's a summary of this SEV:\n\n${summaryText}`,
        followUp: 'Would you like me to dig deeper into any of these points?',
        quickActions: [
          { id: 'datasets', label: 'Find relevant datasets' },
          { id: 'similar', label: 'Find similar SEVs' },
        ],
      }

      setChatMessages(prev => [...prev, summaryMessage])
      setStepCount(prev => Math.min(prev + summarySteps, MAX_STEPS))
      return
    }

    // Handle find relevant datasets action
    if (actionId === 'datasets') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 6000))
      setIsThinking(false)

      const datasetsSteps = getRandomSteps(3, 5)
      const datasetsMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: datasetsSteps,
        },
        richContent: {
          type: 'datasets',
          intro: 'I found 3 relevant datasets for this SEV investigation:',
          datasets: [
            {
              name: 'non_kfs_overload_test_metrics_raw',
              confidence: 0.85,
              reasoning: 'This dataset is directly related to overload testing and was discovered through both the SEV owner\'s oncall relationships (keanu oncall) and the service connection (overload_protection/test_determinator). Given the SEV is about "Demand shift test with multifeed shrink test", this dataset is highly relevant for investigating overload and demand shift scenarios.',
            },
            {
              name: 'kfs_metrics',
              confidence: 0.65,
              reasoning: 'Found through semantic search for "overload test metrics keanu". This dataset tracks KFS (Kernel Feature Store) metrics which are commonly used for monitoring system performance during load tests and demand shifts. The connection to overload testing makes it relevant for this SEV investigation.',
            },
            {
              name: 'keanu_monitor_service_metrics',
              confidence: 0.60,
              reasoning: 'Discovered through the SEV owner\'s oncall ownership (keanu oncall). This dataset monitors the keanu service metrics, which is directly related to the SEV owner\'s area of responsibility and likely contains relevant monitoring data for the demand shift test scenario.',
            },
          ],
        },
      }

      setChatMessages(prev => [...prev, datasetsMessage])
      setStepCount(prev => Math.min(prev + datasetsSteps, MAX_STEPS))
      return
    }

    // Handle add datasets to canvas action
    if (actionId === 'add-datasets-to-canvas') {
      const datasetsSection = {
        id: `datasets-${Date.now()}`,
        type: 'summary',
        title: 'Relevant Datasets',
        createdBy: 'Opsmate',
        isExpanded: true,
        content: {
          title: 'Datasets for SEV Investigation',
          description: `1. non_kfs_overload_test_metrics_raw (Confidence: 0.85)
Directly related to overload testing, discovered through SEV owner's oncall relationships.

2. kfs_metrics (Confidence: 0.65)
Tracks KFS metrics for monitoring system performance during load tests.

3. keanu_monitor_service_metrics (Confidence: 0.60)
Monitors keanu service metrics related to SEV owner's area of responsibility.`,
        },
      }

      onAddSection(datasetsSection)

      const confirmSteps = getRandomSteps(1, 2)
      const confirmMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: confirmSteps,
        },
        content: "I've added the relevant datasets to your canvas.",
        quickActions: [
          { id: 'recovery', label: 'Find recovery metric' },
          { id: 'similar', label: 'Find similar SEVs' },
        ],
      }

      setChatMessages(prev => [...prev, confirmMessage])
      setStepCount(prev => Math.min(prev + confirmSteps, MAX_STEPS))
      return
    }

    // Handle add to canvas action
    if (actionId === 'add-to-canvas') {
      // Create a summary section for the canvas
      const summarySection = {
        id: `summary-${Date.now()}`,
        type: 'summary',
        title: 'SEV Summary',
        createdBy: 'Opsmate',
        isExpanded: true,
        content: {
          title: 'Taylor Swift - Life of a Showgirl Distribution Issue',
          description: `Taylor Swift is a Superstar Creator with 79M followers on Facebook, 280M followers on Instagram, and 61M followers on YouTube. Her recent posts have had challenges with unconnected distribution. The Creator Forensics team filed T234502850 to monitor her "Life of a Showgirl" album announcement.`,
        },
      }

      onAddSection(summarySection)

      const canvasSteps = getRandomSteps(1, 2)
      const confirmMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: canvasSteps,
        },
        content: "I've added the SEV summary to your canvas.",
        quickActions: [
          { id: 'datasets', label: 'Find relevant datasets' },
          { id: 'similar', label: 'Find similar SEVs' },
        ],
      }

      setChatMessages(prev => [...prev, confirmMessage])
      setStepCount(prev => Math.min(prev + canvasSteps, MAX_STEPS))
      return
    }

    // Handle find recovery metric action
    if (actionId === 'recovery') {
      setIsThinking(true)
      await new Promise(resolve => setTimeout(resolve, 4000))
      setIsThinking(false)

      // Create new alert section for recovery metric
      const newSection = {
        id: `alert-${Date.now()}`,
        type: 'alert',
        title: 'Alert',
        createdBy: 'Jamie Gomez',
        avatar: '/profile.jpg',
        isExpanded: true,
        content: {
          title: 'Recovery Metric: Error rate for API gateway',
          description: 'Around 9:48, a regression began trending upward. The alert "Success rate for Auth Service" was identified as the key signal, steadily rising before crossing the threshold and entering the violation zone by 10:00.',
        },
      }

      // Add the section to canvas
      const recoverySteps = getRandomSteps(2, 4)
      onAddSection(newSection)
      setStepCount(prev => Math.min(prev + recoverySteps, MAX_STEPS))

      const confirmMessage = {
        id: `msg-${Date.now()}`,
        type: 'assistant',
        header: {
          icon: 'opsmate',
          title: 'Opsmate',
          steps: recoverySteps,
        },
        content: "I've identified the key recovery metric and added it to your canvas. This alert shows the error rate trend that correlates with the incident timeline.",
        quickActions: [
          { id: 'similar', label: 'Find similar SEVs' },
        ],
      }

      setChatMessages(prev => [...prev, confirmMessage])
      return
    }

    // Start thinking
    setIsThinking(true)

    // Simulate thinking for 4 seconds
    await new Promise(resolve => setTimeout(resolve, 4000))

    // Stop thinking
    setIsThinking(false)

    // Create new alert section
    const newSection = {
      id: `alert-${Date.now()}`,
      type: 'alert',
      title: 'Alert',
      createdBy: 'Jamie Gomez',
      avatar: '/profile.jpg',
      isExpanded: true,
      content: {
        title: 'Error rate for API gateway',
        description: 'Around 9:48, a regression began trending upward. The alert "Success rate for Auth Service" was identified as the key signal, steadily rising before crossing the threshold and entering the violation zone by 10:00.',
      },
    }

    // Add the section to canvas
    onAddSection(newSection)

    // Update step count with random steps
    const actionSteps = getRandomSteps(2, 4)
    setStepCount(prev => Math.min(prev + actionSteps, MAX_STEPS))

    // Add new message to chat
    const newMessage = {
      id: `msg-${Date.now()}`,
      type: 'assistant',
      header: {
        icon: 'opsmate',
        title: 'Opsmate',
        steps: actionSteps,
      },
      tabs: ['Runbook'],
      content: "I've completed the analysis and detected a high-confidence crash in the payment service. I've added an alert to your canvas so you can review the findings and take next steps.",
      quickActions: [
        { id: 'datasets', label: 'Find relevant datasets' },
      ],
    }

    setChatMessages(prev => [...prev, newMessage])
  }

  return (
    <div className="w-[380px] bg-white border-l border-gray-200 flex flex-col h-full overflow-hidden">
      {/* Chat Content - shrinks to make room for composer */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-5 space-y-6 min-h-0 shrink">
        {/* Initial Header - Scrolls with content */}
        <div className="pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <OpsmateLogo className="w-6 h-6 text-gray-900" />
              <span className="font-semibold text-gray-900">Opsmate</span>
            </div>
            <button 
              onClick={() => onOpenSteps(stepCount)}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <List className="w-4 h-4" />
              <span>{stepCount} steps</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                <tab.icon className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">{tab.label}</span>
              </button>
            ))}
            
            {/* More Button */}
            <button
              onClick={onOpenSources}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">More</span>
            </button>
          </div>
        </div>
        {chatMessages.map((msg, msgIndex) => (
          <div key={msg.id}>
            {/* User Message */}
            {msg.type === 'user' && (
              <div className="flex flex-col items-end">
                {msg.reference && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                    <CornerDownRight className="w-3 h-3" />
                    <span>Re: "{msg.reference}"</span>
                  </div>
                )}
                <div className="bg-blue-500 text-white px-4 py-2.5 rounded-2xl rounded-br-md max-w-[85%]">
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            )}

            {/* Assistant Message */}
            {msg.type === 'assistant' && (
              <>
                {/* Message Header (for follow-up messages) */}
                {msg.header && (
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <OpsmateLogo className="w-5 h-5 text-gray-900" />
                      <span className="text-sm font-medium text-gray-900">{msg.header.title}</span>
                      {msg.header.badge && (
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          msg.header.badge.type === 'detection' ? 'bg-blue-100 text-blue-700' :
                          msg.header.badge.type === 'prevention' ? 'bg-green-100 text-green-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {msg.header.badge.label}
                        </span>
                      )}
                      {msg.header.priority && (
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          msg.header.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {msg.header.priority}
                        </span>
                      )}
                    </div>
                    {msg.header.steps && (
                      <button 
                        onClick={() => onOpenSteps(msg.header.steps)}
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <List className="w-3.5 h-3.5" />
                        <span>{msg.header.steps} steps</span>
                      </button>
                    )}
                  </div>
                )}
                
                {/* Recommendation Card */}
                {msg.recommendationCard && (
                  <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        msg.recommendationCard.type === 'Detection' ? 'bg-blue-100' :
                        msg.recommendationCard.type === 'Prevention' ? 'bg-green-100' :
                        'bg-amber-100'
                      }`}>
                        {msg.recommendationCard.type === 'Detection' && (
                          <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <circle cx="12" cy="12" r="6"/>
                            <circle cx="12" cy="12" r="2"/>
                          </svg>
                        )}
                        {msg.recommendationCard.type === 'Prevention' && (
                          <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                          </svg>
                        )}
                        {msg.recommendationCard.type === 'Quality' && (
                          <svg className="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-gray-500">{msg.recommendationCard.type}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-gray-900 leading-snug">
                          {msg.recommendationCard.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            msg.recommendationCard.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {msg.recommendationCard.priority}
                          </span>
                          <span className="text-xs text-gray-500">
                            {msg.recommendationCard.action === 'auto-apply' ? '• Auto-apply ready' : '• Manual review required'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tabs for follow-up messages */}
                {msg.tabs && (
                  <div className="flex gap-2 mb-3">
                    {msg.tabs.map((tab) => (
                      <div
                        key={tab}
                        className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-white shadow-sm"
                      >
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900">{tab}</span>
                      </div>
                    ))}
                    {/* More button */}
                    <button
                      onClick={onOpenSources}
                      className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-white shadow-sm hover:border-gray-300 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-900">More</span>
                    </button>
                  </div>
                )}

                {msg.content && (
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    {msg.content}
                  </p>
                )}

                {/* Devmate Embed Card */}
                {msg.embed?.type === 'devmate-diff' && (
                  <a
                    href={msg.embed.action?.url || '#'}
                    className="block mb-4 p-4 rounded-xl bg-gray-100 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      {/* Devmate Logo */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-700">
                          <path d="M8.582 5.377H7.082C6.087 5.377 5.281 6.217 5.281 7.252V9.436C5.281 10.478 4.811 11.405 4.08 12C4.45771 12.3116 4.76135 12.7033 4.9689 13.1468C5.17646 13.5903 5.28273 14.0744 5.28 14.564V16.748C5.28 17.783 6.087 18.623 7.081 18.623H8.581V20H7.081C5.357 20 3.959 18.544 3.959 16.748V14.564C3.959 13.528 3.153 12.688 2.159 12.688H2V11.312H2.159C3.153 11.312 3.959 10.472 3.959 9.436V7.252C3.96 5.456 5.357 4 7.081 4H8.581L8.582 5.377ZM16.919 4C18.643 4 20.041 5.456 20.041 7.252V9.436C20.041 10.472 20.847 11.312 21.841 11.312H22V12.688H21.841C20.847 12.688 20.041 13.528 20.041 14.564V16.748C20.041 18.544 18.643 20 16.919 20H15.419V18.623H16.919C17.913 18.623 18.719 17.783 18.719 16.748V14.564C18.719 13.522 19.189 12.595 19.92 12C19.5423 11.6884 19.2386 11.2967 19.0311 10.8532C18.8235 10.4097 18.7173 9.92563 18.72 9.436V7.252C18.72 6.216 17.913 5.377 16.919 5.377H15.419V4H16.919ZM10.303 14.402C10.528 15.156 11.203 15.703 12.001 15.703C12.799 15.703 13.473 15.156 13.698 14.403H14.545C14.301 15.633 13.255 16.558 12.001 16.558C10.747 16.558 9.701 15.633 9.457 14.402H10.303Z" fill="currentColor"/>
                          <path fillRule="evenodd" clipRule="evenodd" d="M8.708 7.798C9.945 7.798 10.948 8.843 10.948 10.133C10.948 11.423 9.945 12.469 8.708 12.469C7.471 12.469 6.467 11.423 6.467 10.133C6.467 8.843 7.47 7.798 8.707 7.798M8.707 8.652C7.922 8.652 7.287 9.315 7.287 10.133C7.287 10.951 7.922 11.613 8.707 11.613C9.492 11.613 10.127 10.951 10.127 10.133C10.127 9.315 9.491 8.652 8.707 8.652ZM15.287 7.798C16.524 7.798 17.527 8.843 17.527 10.133C17.527 11.423 16.524 12.469 15.287 12.469C14.05 12.469 13.046 11.423 13.046 10.133C13.046 8.843 14.05 7.798 15.287 7.798ZM15.286 8.652C14.501 8.652 13.865 9.315 13.865 10.133C13.865 10.951 14.501 11.613 15.285 11.613C16.07 11.613 16.706 10.951 16.706 10.133C16.706 9.315 16.07 8.652 15.286 8.652Z" fill="currentColor"/>
                        </svg>
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-gray-900">{msg.embed.title}</h4>
                        </div>
                        <p className="text-xs text-gray-600">
                          {msg.embed.action?.label || msg.embed.subtitle}
                        </p>
                      </div>
                      {/* Arrow */}
                      <div className="flex-shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </div>
                    </div>
                  </a>
                )}

                {/* Protection Recommendation Embed Card */}
                {msg.embed?.type === 'protection-recommendation' && (
                  <button
                    onClick={() => {
                      const url = msg.embed.action?.url || '#'
                      // Send message to parent to open in overlay modal
                      window.parent.postMessage({ type: 'openProtectionOverlay', url }, '*')
                    }}
                    className="block w-full text-left mb-4 p-4 rounded-xl bg-gray-100 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      {/* Shield Icon */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-gray-900">{msg.embed.title}</h4>
                        </div>
                        <p className="text-xs text-gray-600">
                          {msg.embed.action?.label || msg.embed.subtitle}
                        </p>
                      </div>
                      {/* Arrow */}
                      <div className="flex-shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </div>
                    </div>
                  </button>
                )}

                {/* Rich Content - Datasets */}
                {msg.richContent?.type === 'datasets' && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                      {msg.richContent.intro}
                    </p>
                    <div className="space-y-6">
                      {msg.richContent.datasets.map((dataset, idx) => (
                        <div key={idx}>
                          <p className="text-sm font-semibold text-gray-900 mb-2">
                            {idx + 1}. <span className="text-blue-600">{dataset.name}</span>
                          </p>
                          <p className="text-sm text-gray-700 mb-1">
                            <span className="font-semibold">Confidence score:</span> {dataset.confidence}
                          </p>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            <span className="font-semibold">Reasoning:</span> {dataset.reasoning}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {msg.followUp && (
                  <p className="text-sm text-gray-700 leading-relaxed mb-6">
                    {msg.followUp}
                  </p>
                )}

                {/* Inline Actions */}
                {msg.inlineActions && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {msg.inlineActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.id, action.label)}
                        disabled={isThinking}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-medium text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick Actions */}
                {msg.quickActions && (
                  <div className="flex flex-wrap gap-2">
                    {msg.quickActions.map((action, index) => (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.id, action.label)}
                        disabled={isThinking}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${
                          action.primary 
                            ? 'bg-blue-500 hover:bg-blue-600 text-white font-medium' 
                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                        }`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        {/* Thinking State */}
        {isThinking && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <OpsmateLogo className="w-5 h-5 text-gray-900" />
              <span className="text-sm font-medium text-gray-900">Opsmate</span>
            </div>
            <div className="relative overflow-hidden">
              <span className="text-sm text-gray-400 shimmer-text">Opsmate thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area - pinned to bottom */}
      <div className="px-4 pt-4 pb-5 border-t border-gray-100 bg-white shrink-0">
        <div className="bg-gray-50 rounded-xl border border-gray-200 focus-within:border-blue-400 focus-within:bg-white transition-colors overflow-hidden">
          {/* Referenced Section */}
          {referencedSection && (
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white">
              <div className="flex items-center gap-2 text-gray-600">
                <CornerDownRight className="w-4 h-4 shrink-0" />
                <span className="text-sm font-medium truncate">"{referencedSection.title}"</span>
              </div>
              <button 
                onClick={clearReference}
                className="p-1 hover:bg-gray-100 rounded transition-colors shrink-0"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          )}
          
          {/* Input Row */}
          <div className="flex items-center gap-2 px-4 py-3">
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              placeholder="Ask anything"
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!message.trim() && !referencedSection}
              className={`p-2 rounded-full transition-colors ${
                message.trim() || referencedSection
                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                  : 'bg-gray-300 text-white cursor-not-allowed'
              }`}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 text-center mt-3">
          Do not submit any <a href="#" className="underline hover:text-gray-500">User Data</a> into Opsmate
        </p>
      </div>
    </div>
  )
})

export default Copilot

