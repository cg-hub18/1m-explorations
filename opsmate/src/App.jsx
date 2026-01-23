import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import Canvas from './components/Canvas'
import Copilot from './components/Copilot'
import SEVChat from './components/SEVChat'
import SourcesPanel from './components/SourcesPanel'
import StepsPanel from './components/StepsPanel'
import ShareModal from './components/ShareModal'
import Toast from './components/Toast'
import LeftNav from './components/LeftNav'
import TaskPanel from './components/TaskPanel'
import Feed from './components/Feed'
import EntitiesPage from './components/EntitiesPage'
import MetricsPage from './components/MetricsPage'

function App() {
  // Check for chat-only mode, sev mode, investigation mode, and protection mode
  const params = new URLSearchParams(window.location.search)
  const isChatOnlyMode = params.get('chatOnly') === 'true'
  const isSevMode = params.get('page') === 'sev'  // Show SEV investigation canvas
  const isInvestigationMode = params.get('page') === 'investigation'
  const isProtectionMode = params.get('mode') === 'protection'
  const isEntitiesPage = params.get('page') === 'entities'
  const isMetricsPage = params.get('page') === 'metrics'
  
  // Investigation params from Quality Home
  const investigationType = params.get('type') || 'detection'
  const investigationTitle = params.get('title') || 'Recommendation'
  const investigationPriority = params.get('priority') || 'High'
  const investigationAction = params.get('action') || 'manual-review'
  
  // Recommendation context params (for chatOnly mode from Quality Home)
  // Also support generic 'context' param for pre-filled messages from Feed
  const feedContext = params.get('context')
  const recommendationContext = isChatOnlyMode ? {
    type: params.get('recommendationType'),
    title: params.get('recommendationTitle'),
    priority: params.get('recommendationPriority'),
    action: params.get('recommendationAction'),
    feedContext: feedContext, // Generic context from Feed page
  } : null
  
  const [showSources, setShowSources] = useState(false)
  const [showSteps, setShowSteps] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isSEVChatOpen, setIsSEVChatOpen] = useState(true)
  const [isReadOnlySharedMode, setIsReadOnlySharedMode] = useState(false)
  const [sharedSectionsFromUrl, setSharedSectionsFromUrl] = useState(null)
  const [sharedTitleFromUrl, setSharedTitleFromUrl] = useState(null)
  const [sharedIsBranch, setSharedIsBranch] = useState(false)
  const [sections, setSections] = useState([])
  const [promotedSections, setPromotedSections] = useState([])
  const [activeCanvasTab, setActiveCanvasTab] = useState('shared')
  const [toast, setToast] = useState({ isOpen: false, title: '', message: '' })
  const [stepsToShow, setStepsToShow] = useState(null)
  const [isCreatingBranch, setIsCreatingBranch] = useState(false)
  const [activeBranchId, setActiveBranchId] = useState(null)
  const [hasNavNotification, setHasNavNotification] = useState(false)
  const [isTaskPanelOpen, setIsTaskPanelOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isSevMitigated, setIsSevMitigated] = useState(false)
  const [analyses, setAnalyses] = useState([
    { id: 'analysis-1', title: 'Shared Investigation', isNew: false, branches: [] }
  ])
  const [activeAnalysisId, setActiveAnalysisId] = useState('analysis-1')
  const copilotRef = useRef(null)
  const sevChatRef = useRef(null)

  // Handle paste (Cmd+V) to paste copied widgets
  useEffect(() => {
    const handlePaste = async (e) => {
      // Don't paste in read-only mode
      if (isReadOnlySharedMode) return
      
      try {
        const clipboardText = await navigator.clipboard.readText()
        const data = JSON.parse(clipboardText)
        
        if (data.type === 'opsmate-widget' && data.section) {
          e.preventDefault()
          
          const newSection = {
            ...data.section,
            id: `pasted-${Date.now()}`,
          }
          
          // If on a branch, add to that branch's sections
          if (activeBranchId) {
            setAnalyses(prev => prev.map(analysis => {
              if (analysis.id !== activeAnalysisId) return analysis
              return {
                ...analysis,
                branches: analysis.branches.map(branch => {
                  if (branch.id !== activeBranchId) return branch
                  return {
                    ...branch,
                    sections: [...branch.sections, newSection]
                  }
                })
              }
            }))
          } else {
            // On shared canvas - for analysis-1 use promotedSections, for others add to their sections
            if (activeAnalysisId === 'analysis-1') {
              setPromotedSections(prev => [...prev, newSection])
            } else {
              setAnalyses(prev => prev.map(analysis => 
                analysis.id === activeAnalysisId 
                  ? { ...analysis, sections: [...(analysis.sections || []), newSection] }
                  : analysis
              ))
            }
          }
          
          setToast({
            isOpen: true,
            title: 'Widget Pasted',
            message: `${newSection.title} has been added to your canvas`,
          })
        }
      } catch {
        // Not valid JSON or not an Opsmate widget - ignore
      }
    }
    
    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [activeBranchId, activeAnalysisId, isReadOnlySharedMode])

  // Detect if viewing via shared link (read-only mode)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sharedId = params.get('shared')
    const encodedData = params.get('data')
    
    if (sharedId) {
      setIsReadOnlySharedMode(true)
      
      if (encodedData) {
        try {
          const decoded = decodeURIComponent(atob(encodedData))
          const sharedData = JSON.parse(decoded)
          
          if (sharedData.sections) {
            setSharedSectionsFromUrl(sharedData.sections)
            setSharedTitleFromUrl(sharedData.title || null)
            setSharedIsBranch(sharedData.isBranch || false)
          } else {
            setSharedSectionsFromUrl(sharedData)
          }
        } catch (err) {
          console.error('Failed to decode shared data:', err)
        }
      }
      
      if (sharedId.startsWith('branch-')) {
        setActiveBranchId(sharedId)
        setActiveCanvasTab('personal')
      }
    }
  }, [])

  const handleTriggerProactiveRun = () => {
    // Update the investigation sections with new lorem ipsum content
    setInvestigation(prev => ({
      ...prev,
      sections: [
        {
          id: 'hypothesis',
          type: 'hypothesis',
          title: 'Hypothesis',
          createdBy: 'Opsmate',
          priority: 'High',
          isExpanded: false,
          content: {
            summary: 'Proin eget tortor risus. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.',
            hypotheses: [
              {
                id: 'h1',
                title: 'Pellentesque Service Timeout Analysis',
                rationale: 'Nulla porttitor accumsan tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.',
                detailedSteps: [
                  {
                    title: 'Analyze Request Latency Patterns',
                    tableName: 'pellentesque_metrics_cube',
                    query: {
                      table: 'request_latency_raw',
                      filters: 'time_range = last_24h',
                      groupBy: 'endpoint, region, status_code',
                      lookFor: 'P99 latency spikes, timeout patterns',
                    },
                  },
                ],
              },
              {
                id: 'h2',
                title: 'Donec Sollicitudin Cache Invalidation',
                rationale: 'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Praesent sapien massa, convallis a pellentesque nec.',
                detailedSteps: [
                  {
                    title: 'Check Cache Hit Rates',
                    tableName: 'cache_performance_cube',
                    query: {
                      table: 'cache_stats_raw',
                      filters: 'cache_type = distributed',
                      groupBy: 'cache_key_prefix, hit_miss',
                      lookFor: 'Sudden drop in hit rates, eviction spikes',
                    },
                  },
                ],
              },
            ],
            nextSteps: [
              'Investigate hypothesis 1 for timeout correlation with deployment',
              'Review cache invalidation logs for anomalies',
            ],
          },
        },
        {
          id: 'root-cause',
          type: 'root-cause',
          title: 'Root cause',
          createdBy: 'Opsmate',
          priority: 'High',
          isExpanded: true,
          content: {
            summary: 'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec rutrum congue leo eget malesuada. Quisque velit nisi, pretium ut lacinia in, elementum id enim.',
            linkedSev: 'S612847',
            hasDetailedAnalysis: true,
          },
        },
        {
          id: 'mitigation',
          type: 'mitigation',
          title: 'Mitigation',
          createdBy: 'Opsmate',
          priority: 'High',
          isExpanded: true,
          content: {
            summary: 'Sed porttitor lectus nibh. Nulla quis lorem ut libero malesuada feugiat. Curabitur arcu erat, accumsan id imperdiet et.',
            linkedSev: 'S612847',
            actions: [
              { id: 1, text: 'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.', completed: false },
              { id: 2, text: 'Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.', completed: false },
              { id: 3, text: 'Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit.', completed: false },
            ],
          },
        },
      ],
    }))
    
    // Mark the shared investigation as having new content
    setAnalyses(prev => prev.map(a => 
      a.id === 'analysis-1' ? { ...a, isNew: true } : a
    ))
    setHasNavNotification(true)
    
    setToast({
      isOpen: true,
      title: 'Proactive Run Complete',
      message: 'Investigation updated with new analysis',
    })
  }

  const handleSelectAnalysis = (analysisId) => {
    setActiveAnalysisId(analysisId)
    setActiveBranchId(null)
    setActiveCanvasTab('shared')
    setHasNavNotification(false)
    setIsNavOpen(false)
    
    setAnalyses(prev => prev.map(a => 
      a.id === analysisId ? { ...a, isNew: false } : a
    ))
  }

  const handleReferenceInSEVChat = (section) => {
    // Open SEVChat if not already open
    setIsSEVChatOpen(true)
    // Add the reference to SEVChat
    setTimeout(() => {
      sevChatRef.current?.addReference(section)
    }, 100) // Small delay to ensure chat is open
  }

  const handleCreateBranch = async () => {
    setIsCreatingBranch(true)
    
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const activeAnalysis = analyses.find(a => a.id === activeAnalysisId)
    const analysisBranches = activeAnalysis?.branches || []
    
    let sectionsToClone = []
    if (activeBranchId) {
      const currentBranch = analysisBranches.find(b => b.id === activeBranchId)
      sectionsToClone = currentBranch?.sections || []
    } else {
      sectionsToClone = activeAnalysisId === 'analysis-1' 
        ? [...investigation.sections, ...promotedSections]
        : (activeAnalysis?.sections || [])
    }
    
    const clonedSections = JSON.parse(JSON.stringify(sectionsToClone))
    
    const newBranch = {
      id: `branch-${Date.now()}`,
      name: `Opsmate Chat ${analysisBranches.length + 1}`,
      createdAt: new Date().toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true 
      }),
      sections: clonedSections,
    }
    
    setAnalyses(prev => prev.map(analysis => 
      analysis.id === activeAnalysisId 
        ? { ...analysis, branches: [...(analysis.branches || []), newBranch] }
        : analysis
    ))
    
    setActiveBranchId(newBranch.id)
    setActiveCanvasTab('personal')
    setIsCreatingBranch(false)
    
    setToast({
      isOpen: true,
      title: 'Branch Created',
      message: `${newBranch.name} has been created`,
    })
  }

  const handleSelectBranch = (branchId, analysisId) => {
    if (branchId === 'shared') {
      setActiveBranchId(null)
      setActiveCanvasTab('shared')
    } else {
      if (analysisId) {
        setActiveAnalysisId(analysisId)
      }
      setActiveBranchId(branchId)
      setActiveCanvasTab('personal')
    }
    setIsNavOpen(false)
  }

  const handleRenameBranch = (branchId, newName) => {
    setAnalyses(prev => prev.map(analysis => ({
      ...analysis,
      branches: analysis.branches.map(branch =>
        branch.id === branchId ? { ...branch, name: newName } : branch
      )
    })))
  }

  const handleRemoveSection = (section) => {
    // For analysis-1, remove from promotedSections; for others, remove from their sections array
    if (activeAnalysisId === 'analysis-1') {
      setPromotedSections(prev => prev.filter(s => s.id !== section.id))
    } else {
      setAnalyses(prev => prev.map(analysis => 
        analysis.id === activeAnalysisId 
          ? { ...analysis, sections: (analysis.sections || []).filter(s => s.id !== section.id) }
          : analysis
      ))
    }
    
    setToast({
      isOpen: true,
      title: 'Removed from Canvas',
      message: `${section.title} has been removed`,
    })
  }

  const handleRemoveBranchSection = (section) => {
    setAnalyses(prev => prev.map(analysis => {
      if (analysis.id !== activeAnalysisId) return analysis
      return {
        ...analysis,
        branches: analysis.branches.map(branch => {
          if (branch.id !== activeBranchId) return branch
          return {
            ...branch,
            sections: branch.sections.filter(s => s.id !== section.id)
          }
        })
      }
    }))
    
    setToast({
      isOpen: true,
      title: 'Widget Removed',
      message: `${section.title} has been removed`,
    })
  }

  const [investigation, setInvestigation] = useState({
    id: 'S448319',
    title: 'Taylor Swift - Life of a Showgirl - Only In Polish',
    sections: [
      {
        id: 'hypothesis',
        type: 'hypothesis',
        title: 'Hypothesis',
        createdBy: 'Opsmate',
        priority: 'High',
        isExpanded: true,
        content: {
          summary: 'Taylor Swift\'s "Life of a Showgirl" content is only being distributed to Polish language users, affecting global reach. Opsmate has identified three potential root causes for investigation:',
          hypotheses: [
            {
              id: 'locale-routing',
              title: 'Content Locale Routing Misconfiguration',
              rationale: 'The content distribution pipeline may have an incorrect locale filter applied. Recent changes to the Creator distribution service (D892341) modified locale routing logic. This could explain why content is exclusively reaching pl_PL locale users while being filtered out for all other regions.',
              detailedSteps: [
                {
                  title: 'Check Locale Filter Configuration',
                  tableName: 'content_distribution_cube',
                  query: {
                    table: 'distribution_routing_raw',
                    filters: 'creator_id = taylor_swift, content_type = album_announcement',
                    groupBy: 'target_locale, routing_rule, filter_status',
                    lookFor: 'Locale filters showing pl_PL as only active target, missing en_US, es_ES, etc.',
                  },
                },
              ],
            },
            {
              id: 'experiment-holdout',
              title: 'Experiment Holdout Group Overlap',
              rationale: 'An active A/B experiment (EXP-445892) for creator content localization may have incorrectly assigned Taylor Swift\'s content to a test group. The experiment\'s holdout logic could be filtering non-Polish audiences, causing SEV S448319. Similar issues occurred with S412847 last month.',
              detailedSteps: [
                {
                  title: 'Analyze Experiment Assignment',
                  tableName: 'experiment_assignments_cube',
                  query: {
                    table: 'creator_experiment_raw',
                    filters: 'experiment_id = EXP-445892, creator_id = taylor_swift',
                    groupBy: 'variant_id, audience_segment, distribution_status',
                    lookFor: 'Creator incorrectly assigned to Polish-only test variant',
                  },
                },
              ],
            },
            {
              id: 'cdn-propagation',
              title: 'CDN Content Propagation Failure',
              rationale: 'Content may have been uploaded with correct metadata but CDN propagation failed for non-Polish regions. Edge cache invalidation issues in D891203 deployment could cause regional content availability gaps. CDN logs show 403 errors for content requests outside pl_PL.',
              detailedSteps: [
                {
                  title: 'Review CDN Propagation Status',
                  tableName: 'cdn_distribution_cube',
                  query: {
                    table: 'cdn_edge_logs_raw',
                    filters: 'content_id = life_of_showgirl, time_range = last_6h',
                    groupBy: 'edge_location, response_code, cache_status',
                    lookFor: 'Non-Polish edge locations showing cache misses or 403 responses',
                  },
                },
              ],
            },
          ],
          nextSteps: [
            'Investigate locale routing configuration in the distribution service for Taylor Swift\'s content',
            'Check if EXP-445892 experiment is affecting this creator\'s audience targeting',
            'Review CDN propagation logs for regional availability issues',
            'Coordinate with Creator Forensics team on T234502850 findings',
          ],
        },
      },
      {
        id: 'root-cause',
        type: 'root-cause',
        title: 'Root cause',
        createdBy: 'Opsmate',
        priority: 'High',
        isExpanded: true,
        content: {
          summary: 'The root cause of the recent authorization service issues was a cascading failure triggered by SEV S568713.',
          linkedSev: 'S568713',
          hasDetailedAnalysis: true,
        },
      },
      {
        id: 'mitigation',
        type: 'mitigation',
        title: 'Mitigation',
        createdBy: 'Opsmate',
        priority: 'High',
        isExpanded: true,
        content: {
          summary: 'To address the risk of future authorization service outages caused by upstream dependency failures.',
          linkedSev: 'S568713',
          actions: [
            { id: 1, text: 'Set up enhanced monitoring and alerting for all critical dependencies.', completed: false },
            { id: 2, text: 'Ensure automated alerts are in place for error spikes.', completed: false },
          ],
        },
      },
    ],
  })

  // Auto-create branch for protection mode (skip shared investigation view)
  useEffect(() => {
    if (isProtectionMode && !activeBranchId) {
      // Clone only the hypothesis section for protection mode (exclude root-cause and mitigation)
      const clonedSections = JSON.parse(JSON.stringify(
        investigation.sections.filter(s => s.type === 'hypothesis')
      ))
      
      // Create a branch immediately without the loading delay
      const newBranch = {
        id: `branch-protection-${Date.now()}`,
        name: 'Opsmate Protection',
        createdAt: new Date().toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true 
        }),
        sections: clonedSections,
      }
      
      setAnalyses(prev => prev.map(analysis => 
        analysis.id === 'analysis-1' 
          ? { ...analysis, branches: [newBranch] }
          : analysis
      ))
      
      setActiveBranchId(newBranch.id)
      setActiveCanvasTab('personal')
    }
  }, [isProtectionMode])

  const addSection = (newSection) => {
    // If on a branch, add to that branch's sections
    if (activeBranchId) {
      setAnalyses(prev => prev.map(analysis => {
        if (analysis.id !== activeAnalysisId) return analysis
        return {
          ...analysis,
          branches: analysis.branches.map(branch => {
            if (branch.id !== activeBranchId) return branch
            return { ...branch, sections: [...branch.sections, newSection] }
          })
        }
      }))
    } else {
      // On shared canvas - for analysis-1 use promotedSections, for others add to their sections
      if (activeAnalysisId === 'analysis-1') {
        setPromotedSections(prev => [...prev, newSection])
      } else {
        setAnalyses(prev => prev.map(analysis => 
          analysis.id === activeAnalysisId 
            ? { ...analysis, sections: [...(analysis.sections || []), newSection] }
            : analysis
        ))
      }
    }
  }

  const handleAddChart = (input) => {
    const isUrl = input.startsWith('http://') || input.startsWith('https://')
    
    const newChart = {
      id: `chart-${Date.now()}`,
      type: 'chart',
      title: 'Canvas Chart',
      createdBy: 'Jamie Gomez',
      avatar: '/profile.jpg',
      isExpanded: true,
      content: {
        url: isUrl ? input : null,
        description: 'This chart has been embedded from an external analytics tool.',
      },
    }
    
    if (activeBranchId) {
      setAnalyses(prev => prev.map(analysis => {
        if (analysis.id !== activeAnalysisId) return analysis
        return {
          ...analysis,
          branches: analysis.branches.map(branch => {
            if (branch.id !== activeBranchId) return branch
            return { ...branch, sections: [...branch.sections, newChart] }
          })
        }
      }))
    } else {
      // On shared canvas - for analysis-1 use promotedSections, for others add to their sections
      if (activeAnalysisId === 'analysis-1') {
        setPromotedSections(prev => [...prev, newChart])
      } else {
        setAnalyses(prev => prev.map(analysis => 
          analysis.id === activeAnalysisId 
            ? { ...analysis, sections: [...(analysis.sections || []), newChart] }
            : analysis
        ))
      }
    }
  }

  const handleAddSharedChart = (input) => {
    const isUrl = input.startsWith('http://') || input.startsWith('https://')
    
    const newChart = {
      id: `chart-${Date.now()}`,
      type: 'chart',
      title: 'Canvas Chart',
      createdBy: 'Jamie Gomez',
      avatar: '/profile.jpg',
      isExpanded: true,
      content: {
        url: isUrl ? input : null,
        description: 'This chart has been embedded from an external analytics tool.',
      },
    }
    
    // For analysis-1, use promotedSections; for other analyses, add to their sections array
    if (activeAnalysisId === 'analysis-1') {
      setPromotedSections(prev => [...prev, newChart])
    } else {
      setAnalyses(prev => prev.map(analysis => 
        analysis.id === activeAnalysisId 
          ? { ...analysis, sections: [...(analysis.sections || []), newChart] }
          : analysis
      ))
    }
  }

  // Get the active analysis and its branches
  const activeAnalysis = analyses.find(a => a.id === activeAnalysisId)
  const analysisBranches = activeAnalysis?.branches || []

  // For shared view, check which analysis is active
  const sharedSections = activeAnalysisId === 'analysis-1' 
    ? [...investigation.sections, ...promotedSections]
    : (activeAnalysis?.sections || [])
  
  // Get the active branch's sections if on a branch
  const activeBranch = analysisBranches.find(b => b.id === activeBranchId)
  const branchSections = activeBranch?.sections || []
  
  // Display sections based on current view
  const displaySections = isReadOnlySharedMode && sharedSectionsFromUrl 
    ? sharedSectionsFromUrl 
    : (activeCanvasTab === 'shared' ? sharedSections : branchSections)

  // Investigation mode - from Quality Home recommendations
  if (isInvestigationMode) {
    console.log('Investigation mode active:', { investigationType, investigationTitle, investigationPriority })
    console.log('URL params:', window.location.search)
    
    // Generate investigation content based on type
    const getInvestigationContent = () => {
      const baseContent = {
        detection: {
          sections: [
            {
              id: 'overview',
              type: 'root-cause',
              title: 'Overview',
              createdBy: 'Opsmate',
              priority: investigationPriority,
              isExpanded: true,
              content: {
                summary: `This detection recommendation will help improve monitoring coverage for your service. ${investigationTitle} is currently missing and could help catch issues before they become SEVs.`,
                hasDetailedAnalysis: true,
              },
            },
            {
              id: 'implementation',
              type: 'mitigation',
              title: 'Implementation Steps',
              createdBy: 'Opsmate',
              priority: investigationPriority,
              isExpanded: true,
              content: {
                summary: 'Follow these steps to implement the recommended detection:',
                actions: [
                  { id: 1, text: 'Review the metric definition and thresholds', completed: false },
                  { id: 2, text: 'Configure the detector with appropriate alerting rules', completed: false },
                  { id: 3, text: 'Set up notification channels for alerts', completed: false },
                  { id: 4, text: 'Test the detector with historical data', completed: false },
                ],
              },
            },
          ],
        },
        prevention: {
          sections: [
            {
              id: 'overview',
              type: 'root-cause',
              title: 'Overview',
              createdBy: 'Opsmate',
              priority: investigationPriority,
              isExpanded: true,
              content: {
                summary: `This prevention measure will help protect your service from potential failures. ${investigationTitle} adds an additional layer of safety to your infrastructure.`,
                hasDetailedAnalysis: true,
              },
            },
            {
              id: 'implementation',
              type: 'mitigation',
              title: 'Implementation Steps',
              createdBy: 'Opsmate',
              priority: investigationPriority,
              isExpanded: true,
              content: {
                summary: 'Follow these steps to implement the prevention measure:',
                actions: [
                  { id: 1, text: 'Review the prevention requirements and scope', completed: false },
                  { id: 2, text: 'Identify affected services and dependencies', completed: false },
                  { id: 3, text: 'Implement the protection mechanism', completed: false },
                  { id: 4, text: 'Validate the prevention is working correctly', completed: false },
                ],
              },
            },
          ],
        },
        quality: {
          sections: [
            {
              id: 'overview',
              type: 'root-cause',
              title: 'Overview',
              createdBy: 'Opsmate',
              priority: investigationPriority,
              isExpanded: true,
              content: {
                summary: `This quality improvement will enhance the reliability and observability of your service. ${investigationTitle} helps ensure better monitoring practices.`,
                hasDetailedAnalysis: true,
              },
            },
            {
              id: 'implementation',
              type: 'mitigation',
              title: 'Implementation Steps',
              createdBy: 'Opsmate',
              priority: investigationPriority,
              isExpanded: true,
              content: {
                summary: 'Follow these steps to implement the quality improvement:',
                actions: [
                  { id: 1, text: 'Assess current monitoring coverage', completed: false },
                  { id: 2, text: 'Define quality metrics and targets', completed: false },
                  { id: 3, text: 'Implement the monitoring improvements', completed: false },
                  { id: 4, text: 'Set up dashboards and alerts', completed: false },
                ],
              },
            },
          ],
        },
      }
      return baseContent[investigationType] || baseContent.detection
    }

    const investigationContent = getInvestigationContent()
    console.log('Investigation content:', investigationContent)
    console.log('Sections:', investigationContent?.sections)

    return (
      <div className="h-screen flex flex-col bg-[#f0f2f5]">
        {/* Debug: Header to confirm render */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wide ${
            investigationType === 'detection' ? 'bg-blue-100 text-blue-700' :
            investigationType === 'prevention' ? 'bg-green-100 text-green-700' :
            'bg-amber-100 text-amber-700'
          }`}>
            {investigationType}
          </span>
          <h1 className="text-lg font-semibold text-gray-900">{investigationTitle}</h1>
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
            investigationPriority === 'High' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
          }`}>
            {investigationPriority}
          </span>
        </div>
        
        <div className="flex-1 flex overflow-hidden">
          <Canvas 
            sections={investigationContent.sections} 
            isSharedView={true}
            isReadOnly={false}
            onMitigate={() => {}}
            onOpenTask={() => {}}
            isSevMitigated={false}
            hideProactiveRun={true}
          />
          <Copilot 
            ref={copilotRef}
            onOpenSources={() => setShowSources(true)} 
            onOpenSteps={(count) => {
              setStepsToShow(count)
              setShowSteps(true)
            }}
            onAddSection={() => {}}
            onViewSharedCanvas={() => {}}
          />
        </div>
        <SourcesPanel isOpen={showSources} onClose={() => setShowSources(false)} />
        <StepsPanel isOpen={showSteps} onClose={() => setShowSteps(false)} stepsToShow={stepsToShow} />
      </div>
    )
  }

  // Chat-only mode - just render the Copilot component full width
  if (isChatOnlyMode) {
    return (
      <div className="h-screen w-full bg-white overflow-hidden">
        <div className="h-full w-full [&>div]:w-full [&>div]:border-l-0 [&>div]:h-full">
          <Copilot 
            ref={copilotRef}
            onOpenSources={() => setShowSources(true)} 
            onOpenSteps={(count) => {
              setStepsToShow(count)
              setShowSteps(true)
            }}
            onAddSection={() => {}}
            onViewSharedCanvas={() => {}}
            recommendationContext={recommendationContext}
          />
        </div>
        <SourcesPanel isOpen={showSources} onClose={() => setShowSources(false)} />
        <StepsPanel isOpen={showSteps} onClose={() => setShowSteps(false)} stepsToShow={stepsToShow} />
      </div>
    )
  }

  // SEV investigation mode - show the full investigation canvas (accessed via ?page=sev)
  if (isSevMode || isProtectionMode) {
    return (
    <div className="h-screen flex flex-col bg-[#f0f2f5]">
      
      <Header 
        investigationId={investigation.id} 
        title={investigation.title}
        activeCanvasTab={activeCanvasTab}
        onCanvasTabChange={setActiveCanvasTab}
        onShare={() => setShowShareModal(true)}
        onToggleNav={() => {
          setIsNavOpen(true)
          setHasNavNotification(false)
        }}
        onCreateBranch={handleCreateBranch}
        isCreatingBranch={isCreatingBranch}
        activeBranch={activeBranch}
        hasNotification={hasNavNotification}
        analysisTitle={isReadOnlySharedMode && sharedTitleFromUrl ? sharedTitleFromUrl : activeAnalysis?.title}
        onRenameBranch={handleRenameBranch}
        isReadOnly={isReadOnlySharedMode}
        sharedIsBranch={sharedIsBranch}
        onToggleSEVChat={() => setIsSEVChatOpen(!isSEVChatOpen)}
        isSEVChatOpen={isSEVChatOpen}
        hideCreateBranch={isProtectionMode}
      />
      <LeftNav 
        isOpen={isNavOpen} 
        onClose={() => setIsNavOpen(false)} 
        activeBranchId={activeBranchId}
        onSelectBranch={handleSelectBranch}
        analyses={analyses}
        activeAnalysisId={activeAnalysisId}
        onSelectAnalysis={handleSelectAnalysis}
      />
      <ShareModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)} 
        activeBranchId={activeBranchId}
        activeAnalysisId={activeAnalysisId}
        currentSections={displaySections}
        currentTitle={activeAnalysis?.title || ''}
        currentBranchName={activeBranch?.name || ''}
      />
      <Toast 
        isOpen={toast.isOpen}
        onClose={() => setToast(prev => ({ ...prev, isOpen: false }))}
        title={toast.title}
        message={toast.message}
      />
      <TaskPanel 
        isOpen={isTaskPanelOpen} 
        onClose={() => {
          setIsTaskPanelOpen(false)
          setSelectedTask(null)
        }}
        task={selectedTask}
        isSevMitigated={isSevMitigated}
      />
      
      {/* Read-only shared mode banner */}
      {isReadOnlySharedMode && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2.5 flex items-center justify-center">
          <span className="text-sm text-amber-800">
            📎 This canvas is read-only
          </span>
        </div>
      )}
      
      <div className="flex-1 flex overflow-hidden">
        <Canvas 
          sections={displaySections} 
          isSharedView={activeCanvasTab === 'shared'}
          isReadOnly={isReadOnlySharedMode}
          onMitigate={() => setIsSevMitigated(true)}
          onOpenTask={(task) => {
            setSelectedTask(task)
            setIsTaskPanelOpen(true)
          }}
          isSevMitigated={isSevMitigated}
          onAskOpsmate={isReadOnlySharedMode ? undefined : (section) => {
            if (copilotRef.current) {
              copilotRef.current.setReference(section)
            }
          }}
          onAddChart={isReadOnlySharedMode ? undefined : (activeCanvasTab === 'personal' ? handleAddChart : handleAddSharedChart)}
          onRemove={isReadOnlySharedMode ? undefined : (activeCanvasTab === 'shared' ? handleRemoveSection : handleRemoveBranchSection)}
          onCopy={isReadOnlySharedMode ? undefined : (section) => {
            setToast({
              isOpen: true,
              title: 'Widget Copied',
              message: `${section.title} copied. Use Cmd+V to paste in any branch.`,
            })
          }}
          onReferenceInSEVChat={!isReadOnlySharedMode && activeCanvasTab === 'shared' ? handleReferenceInSEVChat : undefined}
          hideProactiveRun={true}
        />
        {activeBranchId && !isReadOnlySharedMode && (
          <>
            <Copilot 
              key={activeBranchId}
              ref={copilotRef}
              onOpenSources={() => setShowSources(true)} 
              onOpenSteps={(count) => {
                setStepsToShow(count)
                setShowSteps(true)
              }}
              onAddSection={addSection}
              onViewSharedCanvas={() => setActiveCanvasTab('shared')}
            />
            <SourcesPanel isOpen={showSources} onClose={() => setShowSources(false)} />
            <StepsPanel isOpen={showSteps} onClose={() => setShowSteps(false)} stepsToShow={stepsToShow} />
          </>
        )}
        {/* SEVChat - only show on Shared Investigation (not on branches) */}
        {!activeBranchId && !isReadOnlySharedMode && (
          <SEVChat 
            ref={sevChatRef}
            isOpen={isSEVChatOpen} 
            onClose={() => setIsSEVChatOpen(false)} 
          />
        )}
      </div>
    </div>
    )
  }

  // Entities page
  if (isEntitiesPage) {
    return <EntitiesPage />
  }

  // Metrics page
  if (isMetricsPage) {
    return <MetricsPage />
  }

  // Default: Feed is the home page
  return <Feed onAskOpsmate={() => {}} />
}

export default App
